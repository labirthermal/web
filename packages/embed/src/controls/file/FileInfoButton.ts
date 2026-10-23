import { TimeFormat } from "@labirthermal/core";
import { t } from "i18next";
import { css, html, nothing } from "lit";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AbstractFileConsumer } from "../../hierarchy/consumers/AbstractFileConsumer";
import { T } from "../../translations/Languages";

export class FileInfoButton extends AbstractFileConsumer {

    protected onFileLoaded(): void { }

    public onInstanceCreated(): void { }

    public onFailure(): void { }

    static styles = css`

        table {
            width: 100%;
        }



        td {
            padding: calc( var( --thermal-gap ) * .5 ) 0;
        }


        tr:not(:last-child) {
            td {
                border-bottom: var(--thermal-border-width) solid var( --thermal-slate );
            }
        }

        .small,
        small {
            font-size: calc( var( --thermal-fs-sm ) * .8 );
        }

        .opaque {
            opacity: .5;
        }

        h2 {
            font-size: calc( var( --thermal-fs ) * 1.4 );
        }

        h3 {
            font-size: var( --thermal-fs-small );
            margin: .2rem 0 .1rem 0;
            padding: 0;
            font-weight: normal;    
        }

        ul {
            margin: 0;
            padding: 0;
            padding-left: var( --thermal-fs-small );
        }

        a {
            color: var( --thermal-primary );
        }

        .download {
            width: var( --thermal-fs );
            display: inline-block;
            margin-left: var( --thermal-gap );
            transition: color .2s ease-in-out;

            &:hover {
                color: var( --thermal-foreground );
            }
        }
    
    `;

    protected renderRow(
        label: string,
        value: string
    ) {
        return `<tr>
            <td style="width: 110px">${label}</td>
            <td>${value}</td>
        </tr>`;
    }

    protected renderNumericalRow(
        label: string,
        value: number,
        fixed: number = 4,
        unit?: string
    ) {

        const val = value.toFixed(fixed);
        const output = unit !== undefined
            ? val + " " + unit
            : val;

        return this.renderRow(label, output);
    }

    protected renderDownloadRow(
        label: string,
        text: string,
        href: string,
        title: string
    ) {
        return this.renderRow(
            label,
            `<span>${text}</span>
            <a href=${href} target="_blank" title="${title}" class="download">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
            </a>`
        );
    }

    protected render(): unknown {

        if (!this.file) {
            return nothing;
        }

        return html`
            <thermal-dialog label=${t(T.fileinfo)}>
                <slot name="invoker" slot="invoker">
                    <thermal-btn
                        tooltip=${t(T.fileinfo)}
                        icon="info"
                        iconStyle="mini"
                    >
                    </thermal-btn>
                </slot>
                <div slot="content">

                    <table>

                        ${unsafeHTML(this.renderRow(t(T.thermalfilename), this.file.fileName))}

                        ${unsafeHTML(this.renderDownloadRow(
            t(T.thermalfileurl),
            this.file.thermalUrl,
            this.file.thermalUrl,
            t(T.thermalfiledownload)
        ))}

                        ${this.file.visibleUrl
                ? unsafeHTML(this.renderDownloadRow(
                    t(T.visiblefileurl),
                    this.file.visibleUrl,
                    this.file.visibleUrl,
                    t(T.visiblefiledownload)
                ))
                : nothing
            }

                        ${unsafeHTML(this.renderRow(
                t(T.time),
                TimeFormat.human(this.file.timestamp)
            ))}

                        ${unsafeHTML(this.renderNumericalRow(
                t(T.duration),
                this.file.duration,
                0,
                "ms"
            ))}

                        ${unsafeHTML(this.renderRow(
                t(T.resolution),
                `${this.file.width} x ${this.file.height}<small class="opaque">${this.file.pixels.length} pixels</small>`
            ))}

                        ${unsafeHTML(this.renderNumericalRow(
                t(T.bytesize),
                this.file.bytesize,
                0
            ))}
                        
                        ${unsafeHTML(this.renderNumericalRow(
                t(T.minimaltemperature),
                this.file.min,
                10,
                "°C"
            ))}

                        ${unsafeHTML(this.renderNumericalRow(
                t(T.maximaltemperature),
                this.file.max,
                10,
                "°C"
            ))}

                        

                    </table>

                    <h2>${t(T.filetype)}</h2>
                    <table>
                    ${unsafeHTML(this.renderRow(
                t(T.type),
                this.file.reader.parser.name
            ))}
                    ${unsafeHTML(this.renderRow(
                t(T.description),
                this.file.reader.parser.description
            ))}

                    <tr>
                        <td>${t(T.supporteddevices)}</td>
                        <td><ul>${this.file.reader.parser.devices.map(device => html`<li>
                            <h3><a href="${device.deviceUrl}" target="_blank">${device.deviceName}</a></h3>
                            <div class="small">${device.deviceDescription}</div>
                            <div class="small">Manufactured by <a href="${device.manufacturerUrl}" target="_blank">${device.manufacturer}</a></div>
                        </li>` )}</ul></td>
                    </tr>
                    </table>
                </div>
            </thermal-dialog>
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "file-info-button": FileInfoButton;
    }
}
