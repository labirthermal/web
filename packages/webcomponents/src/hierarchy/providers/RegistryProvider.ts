import { AbstractRegistryProvider } from "../abstraction/AbstractRegistryProvider";

export class RegistryProviderElement extends AbstractRegistryProvider {}

declare global {
    interface HTMLElementTagNameMap {
        "registry-provider": RegistryProviderElement;
    }
}