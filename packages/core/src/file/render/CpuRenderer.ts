import { Pool } from "workerpool";
import { AbstractRenderer } from "./AbstractRenderer";

export class CpuRenderer extends AbstractRenderer {

    private get pool(): Pool {
        return this.registry.pool;
    }

    private context!: CanvasRenderingContext2D;

    public async onInit(): Promise<boolean> {

        const context = this.canvas.getContext("2d");

        if ( context === null ) {
            return false;
        }

        this.context = context;

        return true;

    }

    public async executeRender(): Promise<void> {

        const image = await this.pool.exec(
            // Callback funkce, která se spustí na workeru
            async (from: number, to: number,
                width: number, height: number,
                pixels: number[], palette: string[]
            ) => {

                const canvas = new OffscreenCanvas(width, height);

                const context = canvas.getContext("2d")!;

                const displayRange = to - from;

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {

                        const index = x + (y * width);

                        const rawTemperature = pixels[index];

                        let temperature = rawTemperature;

                        if (temperature < from) {
                            temperature = from;
                        }
                        if (temperature > to) {
                            temperature = to;
                        }

                        const temperatureRelative = temperature - from;

                        const temperatureAspect = temperatureRelative / displayRange;

                        const colorIndex = Math.floor( ( palette.length - 1 ) * temperatureAspect);

                        const color = palette[colorIndex];

                        context.fillStyle = color;
                        context.fillRect(x, y, 1, 1);

                    }
                }

                const imageData = context.getImageData(0, 0, width, height);

                return await createImageBitmap(imageData)!;

            },
            // Předat do workeru potřebné parametry
            [
                this.from,
                this.to,
                this.width,
                this.height,
                this.file.pixels,
                this.palette
            ],
            {}
        );

        this.context.drawImage(image, 0, 0);

    }


    public async destroy(): Promise<void> {
        // žádná speciální logika
    }


}