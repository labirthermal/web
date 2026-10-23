import { AbstractGroupProvider } from "../abstraction/AbstractGroupProvider";

export class GroupProviderElement extends AbstractGroupProvider {}

declare global {
    interface HTMLElementTagNameMap {
        "group-provider": GroupProviderElement;
    }
}