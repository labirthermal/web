/**
 * @license
 * Copyright 2014-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { CSSResultGroup, PropertyValues } from 'lit';
import { css, html, nothing } from 'lit';
import { state } from 'lit/decorators.js';

import type { ThermalFileInstance } from '@labirthermal/core';
import { AbstractGroupConsumer } from '../../hierarchy/consumers/AbstractGroupConsumer';


export class GroupChartElement extends AbstractGroupConsumer {

    @state()
    protected instances: ThermalFileInstance[] = [];

    @state()
    protected timeout?: NodeJS.Timeout;

    @state()
    protected data: [
        string[],
        ...[Date, ...number[]][]
    ] | undefined;

    @state()
    protected colors?: string[];

    @state()
    protected on: boolean = false;

    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);

        this.groupObject.files.addListener(this.UUID, () => {
            this.groupObject.analysisGraph.turnOn();
        });

        this.groupObject.analysisGraph.addListener(this.UUID, value => {

            if (value !== undefined) {
                this.data = value.data;
                this.colors = value.colors;
                this.on = true;
            } else {
                this.data = undefined;
                this.colors = undefined;
                this.on = false;
            }

        });

    }

    static styles?: CSSResultGroup | undefined = css`
    
        .wrapper {
            transition: all 0.3s ease-in-out;
            width: 100%;
            overflow: hidden;
        }

        .on {
            height: 300px;
            border-bottom: 1px solid var( --thermalforeground );
        }

        .off {
            height: 0px;
        }

    `;

    download() {

        const svg = this.shadowRoot?.querySelectorAll("google-chart");

        console.log(svg);

    }


    protected render(): unknown {


        return html`
            <div class="wrapper ${this.on ? "on" : "off"}">

                ${this.on === true ? html`
                    <google-chart 
                        .data=${this.data} 
                        .options=${{
                    colors: this.colors,
                    legend: { position: 'bottom' },
                    hAxis: { title: 'Time' },
                    vAxis: { title: 'Temperature °C' },
                    chartArea: {
                        width: '90%',
                    },
                }}
                        type="line"
                        width="100%"
                        style="width: 100%;height: 300px"
                    ></google-chart>
                ` : nothing}
                
            </div>
        `;
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "group-chart": GroupChartElement;
    }
}