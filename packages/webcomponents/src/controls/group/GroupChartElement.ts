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
import { guard } from 'lit/directives/guard.js';

import type { ThermalFileInstance, ThermalGroup, ThermalUnit } from '@labirthermal/core';
import { consume } from '@lit/context';
import { managerUnitContext } from '../../controllers/ManagerController';
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

    @state()
    @consume({ context: managerUnitContext, subscribe: true })
    protected unit?: ThermalUnit;

    private boundGroup?: ThermalGroup;

    connectedCallback(): void {
        super.connectedCallback();
        this.bindGroup();
    }

    disconnectedCallback(): void {
        this.unbindGroup();
        super.disconnectedCallback();
    }

    willUpdate(changedProperties: PropertyValues<this>): void {
        super.willUpdate(changedProperties);
        this.bindGroup();
    }

    /** Subscribe to the actual group and hydrate graphs that already exist. */
    private bindGroup(): void {
        const group = this.groupController?.groupObject;
        if (!this.isConnected || group === this.boundGroup) return;

        this.unbindGroup();
        this.boundGroup = group;
        this.receiveGraph(group?.analysisGraph.value);
        if (!group) return;

        group.files.addListener(this.UUID, () => group.analysisGraph.turnOn());
        group.analysisGraph.addListener(this.UUID, this.receiveGraph);
        group.analysisGraph.turnOn();
    }

    private unbindGroup(): void {
        this.boundGroup?.files.removeListener(this.UUID);
        this.boundGroup?.analysisGraph.removeListener(this.UUID);
        this.boundGroup = undefined;
    }

    private readonly receiveGraph = (value: ThermalGroup["analysisGraph"]["value"]): void => {
        this.data = value?.data;
        this.colors = value?.colors;
        this.on = value !== undefined;
    };

    /** Copy the graph data and convert only temperatures, leaving core data in Celsius. */
    private getChartData(): typeof this.data {
        if (!this.data) return undefined;

        const [header, ...rows] = this.data;
        const converted: [Date, ...number[]][] = rows.map(([time, ...values]) => [
            time,
            ...values.map(value => Number.isFinite(value)
                ? this.managerController.toCurrentUnit(value)
                : value),
        ]);
        return [[...header], ...converted];
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

        const svg = this.shadowRoot?.querySelectorAll("thermal-chart");

        console.log(svg);

    }


    protected render(): unknown {


        return html`
            <div class="wrapper ${this.on ? "on" : "off"}">

                ${this.on === true ? html`
                    <thermal-chart
                        .data=${guard([this.data, this.unit], () => this.getChartData())}
                        .options=${guard([this.colors, this.unit], () => ({
                            colors: this.colors,
                            legend: { position: 'bottom' },
                            hAxis: { title: 'Time' },
                            vAxis: { title: `Temperature ${this.managerController.currentUnit.symbol}` },
                            chartArea: {
                                width: '90%',
                            },
                        }))}
                        type="line"
                        width="100%"
                        style="width: 100%;height: 300px"
                    ></thermal-chart>
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