import { AbstractRenderer } from "./AbstractRenderer";

export class GlRenderer extends AbstractRenderer {

    private context!: WebGL2RenderingContext;

    private program!: WebGLProgram;
    private fragmentShader!: WebGLShader;
    private vertexShader!: WebGLShader;

    private pixelsBuffer!: Float32Array;
    private pixelsTexture!: WebGLTexture;
    private uploadedPixelsVersion?: number;

    private paletteBuffer!: Float32Array;
    private paletteTexture!: WebGLTexture;
    private vertexBuffer!: WebGLBuffer;

    public get listenerIdPalette(): string {
        return this.file.id + "_palette";
    }

    public get listenerIdRange(): string {
        return this.file.id + "_range";
    }

    public get listenerIdPixels(): string {
        return this.file.id + "_pixels";
    }


    protected async onInit(): Promise<boolean> {

        const context = this.canvas.getContext("webgl2", {
            preserveDrawingBuffer: true
        });

        if (context === null) {
            return false;
        }

        this.context = context;

        

        // Vytvoř buffer pro pixely, který budeme později zapisovat do textury
        this.pixelsBuffer = this.initPixelsBuffer();
        
        // Vytvoř texturu teplot
        this.pixelsTexture = this.initPixelsTexture();

        // Zapiš současný snímek do textury
        // this.writePixelsTexture(this.file.pixels);

        /** Vytvoř buffer pro paletu, do které budeme zapisovat paletu */
        this.paletteBuffer = this.initPaletteBuffer();

        // Vytvoř texturu palety
        this.paletteTexture = this.initPaletteTexture();

        // Nastav listener na změnu palety
        this.registry.palette.addListener( this.listenerIdPalette, () => {
            const novaPaleta = this.registry.palette.currentPalette.texturePixels;
            this.writePaletteTexture(novaPaleta);
        });

        // Nastav listener na změnu rozsahu
        this.registry.range.addListener( this.listenerIdRange, () => {
            const range = this.registry.range.currentRange;
            const from = range ? range.from : this.file.min;
            const to = range ? range.to : this.file.max;
            this.writeRangeUniform(from, to);
        });

        // Vytvoř obecné věci ve WebGL kontextu
        this.initGl();

        // Nastav počáteční rozsah
        const initialRange = this.registry.range.currentRange;
        const initialFrom = initialRange ? initialRange.from : this.file.min;
        const initialTo = initialRange ? initialRange.to : this.file.max;
        this.writeRangeUniform(initialFrom, initialTo);

        // NAstav pořáteční paletu
        const initialPalette = this.registry.palette.currentPalette.texturePixels;
        this.writePaletteTexture(initialPalette);

        this.context.viewport(0, 0, this.canvas.width, this.canvas.height);



        

        return true;

    }

    public static readonly VERTEX_SHADER = `#version 300 es
        in vec2 a_position;
        out vec2 v_uv;
        void main() {
            v_uv = ( a_position + 1.0 ) * 0.5;
            v_uv.y = 1.0 - v_uv.y;  // Převrácení Y osy pro správnou orientaci textury
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    public static readonly FRAGMENT_SHADER =`#version 300 es
        precision highp float;
        in vec2 v_uv;
        uniform sampler2D u_pixels;
        uniform sampler2D u_palette;
        uniform float u_from;
        uniform float u_to;
        out vec4 outColor;
        void main() {
            float temp = texture(u_pixels, v_uv).r;
            float t = clamp( (temp - u_from) / (u_to - u_from), 0.0, 1.0 );
            outColor = texture( u_palette, vec2(t, 0.5) );
        }
    `;

    private initGl(): void {

        const gl = this.context;
        this.vertexBuffer = gl.createBuffer()!;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1.0, -1.0,
                1.0, -1.0,
                -1.0, 1.0,
                1.0, 1.0,
            ]),
            gl.STATIC_DRAW
        );

        this.vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(this.vertexShader, GlRenderer.VERTEX_SHADER);
        gl.compileShader(this.vertexShader);

        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(this.fragmentShader, GlRenderer.FRAGMENT_SHADER);
        gl.compileShader(this.fragmentShader);

        this.program = gl.createProgram()!;
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);

        gl.useProgram(this.program);

        // Nastav atributy
        const a_position = gl.getAttribLocation(this.program, "a_position");
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    }

    

    private createTexture(
        width: number,
        height: number,
        internalFormat: number,
        format: number,
        type: number,
        initialData: Float32Array
    ): WebGLTexture {

        const texture = this.context.createTexture()!;

        this.context.bindTexture(this.context.TEXTURE_2D, texture);

        this.context.texImage2D(
            this.context.TEXTURE_2D,
            0,
            internalFormat,
            width,
            height,
            0,
            format,
            type,
            initialData
        );

        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_MIN_FILTER,
            this.context.NEAREST
        );

        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_MAG_FILTER,
            this.context.NEAREST
        );

        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_WRAP_S,
            this.context.CLAMP_TO_EDGE
        );

        this.context.texParameteri(
            this.context.TEXTURE_2D,
            this.context.TEXTURE_WRAP_T,
            this.context.CLAMP_TO_EDGE
        );

        return texture;
    }


    /** Vytvoř buffer, do kterého budu uploadovat hodnoty teplot pro jednotlivé pixely a následně ho budu nahrávat do textury */
    private initPixelsBuffer(): Float32Array {
        return new Float32Array(this.file.pixels);
    }

    /** Inicializuj pixel buffer */
    private initPixelsTexture(): WebGLTexture {

        return this.createTexture(
            this.width,
            this.height,
            this.context.R32F,
            this.context.RED,
            this.context.FLOAT,
            this.pixelsBuffer
        );

    }

    private writePixelsTexture(
        pixels: Float32Array | number[]
    ): void {

        // Naplň buffer daty
        if (pixels instanceof Float32Array) {
            this.pixelsBuffer.set(pixels, 0);
        } else {
            this.pixelsBuffer.set(pixels, 0);
        }
        // Nahráj buffer do textury
        this.context.activeTexture(this.context.TEXTURE0);
        this.context.bindTexture(this.context.TEXTURE_2D, this.pixelsTexture);
        this.context.texSubImage2D(
            this.context.TEXTURE_2D,
            0,
            0,
            0,
            this.width,
            this.height,
            this.context.RED,
            this.context.FLOAT,
            this.pixelsBuffer
        );

    }

    /** Inicializuj palette buffer */
    private initPaletteBuffer(): Float32Array {

        return new Float32Array(256 * 4);

    }

    /** Inicializuj palette texture */
    private initPaletteTexture(): WebGLTexture {
        // Použij správné float parametry pro Float32Array
        return this.createTexture(
            256,
            1,
            this.context.RGBA32F,
            this.context.RGBA,
            this.context.FLOAT,
            this.paletteBuffer
        );
    }

    private writePaletteTexture(
        palettePixels: Float32Array | Uint8Array
    ): void {
        // Naplň buffer daty
        if (palettePixels instanceof Float32Array) {
            this.paletteBuffer.set(palettePixels, 0);
            this.context.bindTexture(this.context.TEXTURE_2D, this.paletteTexture);
            this.context.texSubImage2D(
                this.context.TEXTURE_2D,
                0,
                0,
                0,
                256,
                1,
                this.context.RGBA,
                this.context.FLOAT,
                this.paletteBuffer
            );
        } else {
            // Pokud je Uint8Array, použij přímo
            this.context.bindTexture(this.context.TEXTURE_2D, this.paletteTexture);
            this.context.texSubImage2D(
                this.context.TEXTURE_2D,
                0,
                0,
                0,
                256,
                1,
                this.context.RGBA,
                this.context.UNSIGNED_BYTE,
                palettePixels
            );
        }
    }

    /** Nastaví uniformy pro rozsah teplot */
    private writeRangeUniform(from: number, to: number): void {
        const gl = this.context;
        gl.useProgram(this.program);
        const u_from = gl.getUniformLocation(this.program, "u_from");
        const u_to = gl.getUniformLocation(this.program, "u_to");
        gl.uniform1f(u_from, from);
        gl.uniform1f(u_to, to);
    }



    protected async executeRender(): Promise<void> {
        const gl = this.context;
        // Temporarily upload on every render to diagnose playback updates.
        // if (this.uploadedPixelsVersion !== this.file.pixelsVersion) {
        this.writePixelsTexture(this.file.pixels);
        this.uploadedPixelsVersion = this.file.pixelsVersion;
        // }
        gl.useProgram(this.program);

        // Bind vertex buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

        // Bindni textury a nastav uniformy
        const u_pixels = gl.getUniformLocation(this.program, "u_pixels");
        const u_palette = gl.getUniformLocation(this.program, "u_palette");
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pixelsTexture);
        gl.uniform1i(u_pixels, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.paletteTexture);
        gl.uniform1i(u_palette, 1);

        // Clear canvas
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Vykresli fullscreen quad (4 vrcholy, TRIANGLE_STRIP)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    public async destroy(): Promise<void> {
        this.context.deleteProgram(this.program);
        this.context.deleteShader(this.vertexShader);
        this.context.deleteShader(this.fragmentShader);
        this.context.deleteTexture(this.pixelsTexture);
        this.context.deleteTexture(this.paletteTexture);
    }

}