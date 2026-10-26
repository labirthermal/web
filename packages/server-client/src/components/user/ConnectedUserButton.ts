import type { ThermalDialogElement } from "@labirthermal/webcomponents";
import { booleanConverter } from "@labirthermal/webcomponents";
import type { CSSResultGroup, TemplateResult } from "lit";
import { css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { T } from "../../translations/Languages";
import { AbstractControlledConsumer } from "../../abstraction/AbstractControlledConsumer";

export class UserButton extends AbstractControlledConsumer {

    @state()
    protected message?: string;

    @property({ reflect: true, attribute: "disable-logging", converter: booleanConverter(false) })
    public disableLogging: boolean = false;

    connectedCallback(): void {
        super.connectedCallback();

        this.client.subscribeToIdentityChanges(this);
        this.client.subscribeToLoadingChanges(this);


        this.client.api.auth.onIdentity.set(this.UUID, () => {
            this.message = undefined;
        });
    }

    public static styles?: CSSResultGroup | undefined = css`

        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        .login-form {
            display: flex;
            gap: 1em;
            flex-wrap: wrap;
            width: 100%;
            box-sizing: border-box;
            justify-content: stretch;
        }

        input[type="text"],
        input[type="password"] {
            padding: 0.5em;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            box-sizing: border-box;
            flex: 1;
            min-width: 0;
        }

        .login-error {
            color: red;
            padding-top: .5em;
            font-size: .8em;
        }
    `;

    private async doLogout(): Promise<boolean> {

        const result = await this.client?.api.routes.post.logout().execute();
        this.client?.api.auth.logout();
        return result && result.success;

    }

    private async doLogin(): Promise<boolean> {

        this.message = undefined;

        // Najdeme thermal-dialog v shadowRoot
        const dialog = this.shadowRoot?.querySelector('thermal-dialog');
        // Najdeme slot s obsahem ve shadowRoot thermal-dialogu
        const dialogShadow = (dialog as ThermalDialogElement)?.shadowRoot;
        const contentSlot = dialogShadow?.querySelector('slot[name="content"]') as HTMLSlotElement;

        if (contentSlot) {
            // Získáme elementy vložené do slotu
            const assigned = contentSlot.assignedElements({ flatten: true });
            // Najdeme první div (váš <div slot="content">)
            const contentDiv = assigned.find(el => el.tagName === "DIV");
            if (contentDiv) {
                const loginInput = contentDiv.querySelector('input[name="login"]') as HTMLInputElement;
                const passwordInput = contentDiv.querySelector('input[name="password"]') as HTMLInputElement;

                if (loginInput && passwordInput) {
                    const login = loginInput.value;
                    const password = passwordInput.value;

                    if (login && password) {
                        const result = await this.client?.api.routes.post.login(login, password).execute();

                        if (result && result.success) {
                            this.message = "Přihlášení proběhlo úspěšně";
                        } else {
                            this.message = "Přihlášení se nezdařilo";
                        }

                        return result && result.success;
                    }
                }
            }
        }

        return false;

    }

    private async handleBeforeClose(): Promise<boolean> {


        if (this.client.isLoggedIn) {

            return await this.doLogout();

        }

        return await this.doLogin();



    }


    protected handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Najdeme thermal-dialog v shadowRoot
            const dialog = this.shadowRoot?.querySelector('thermal-dialog') as ThermalDialogElement;
            if (dialog) {
                // Zavoláme close metodu na dialogu
                dialog.closeFromTheOutside();
            }
        }
    }

    protected renderLoginForm(): TemplateResult {
        return html`
        <div class="login-form">
            <input 
                type="text" 
                name="login" 
                placeholder="Login" 
                required
                @keydown=${this.handleKeyDown}
            ></input>
            <input 
                type="password" 
                name="password" 
                placeholder="${this.t(T.password)}" 
                required
                @keydown=${this.handleKeyDown}
            ></input>
        </div>
        ${this.message ? html`<div class="login-error">${this.message}</div>` : nothing}
        `;
    }

    protected renderUserLogoutNotice(): TemplateResult {
        return html`
            Opravdu se chcete odhlásit?
        `;
    }


    private renderTriggerButton(): unknown {

        const buttonLabel = this.client.identity?.meta.name ?? this.client.identity?.meta.login ?? this.t(T.login);
        const variant = this.client.isLoggedIn
            ? "primary"
            : "default";

        return html`<thermal-btn 
            slot="invoker" 
            variant=${variant} 
            icon="user" 
            iconStyle="micro"
        >
            ${buttonLabel}
        </thermal-btn>`;

    }

    private renderFallbackButton(): unknown {

        if (this.client.isLoggedIn === false) {
            return nothing;
        }

        const userName = this.client.identity?.meta.name ?? this.client.identity?.meta.login;

        if (userName !== undefined) {
            return nothing;
        }

        return html`<thermal-btn 
        slot="invoker" 
        variant="background" 
        disabled="true" 
        tooltip="Aktuálně přihlášený uživatel" 
        icon="user" 
        iconStyle="micro"
    >
        ${userName}
    </thermal-btn>`;

    }

    private renderDialog(): unknown {

        const label = this.client.isLoggedIn
            ? this.t(T.logout)
            : this.t(T.login);

        const submitLabel = this.client.isLoggedIn
            ? this.t(T.logout)
            : this.t(T.login);

        const content = this.client.isLoggedIn === true
            ? this.renderUserLogoutNotice()
            : this.renderLoginForm();

        // Standardní login dialog
        return html`
            <thermal-dialog 
                label="${label}" 
                button="${submitLabel}" 
                .beforeClose=${this.handleBeforeClose.bind( this )}
            >

                ${this.renderTriggerButton()}

                <div slot="content">
                    ${content}
                </div>

            </thermal-dialog>
        `;


    }





    render(): unknown {


        // In case the user is logged out and logging is disabled, show nothing
        if (this.disableLogging === true && this.client.isLoggedIn === false) {

            return nothing;

        }

        // In case the user is logged in but logging is disabled, show a fallback button displaying the username
        else if (this.disableLogging === true && this.client.isLoggedIn === true) {

            return this.renderFallbackButton();

        }

        // In all other cases, show the standard loin/logout dialogue
        return this.renderDialog();


    }

}