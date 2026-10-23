import type { ThermalGroup } from "@labirthermal/core";
import { html } from "lit";
import { AbstractRegistryConsumer } from "../consumers/AbstractRegistryConsumer";
import type { IElementWithGroupController } from "../../controllers/GroupController";
import { GroupController } from "../../controllers/GroupController";

export abstract class AbstractGroupProvider extends AbstractRegistryConsumer implements IElementWithGroupController {

    public static properties = {
        ...GroupController.HOST_PROPERTIES,
    };

    public groupSlug!: string;

    public groupController: GroupController = new GroupController(this)

    public groupObject!: ThermalGroup;

    public autoclearGroup: boolean = true;

    protected render(): unknown {
        return html`<slot></slot>`;
    }

}