import { AbstractManagerProvider } from "../abstraction/AbstractManagerProvider";

export class ManagerProviderElement extends AbstractManagerProvider {}

declare global {
    interface HTMLElementTagNameMap {
        "manager-provider": ManagerProviderElement;
    }
}