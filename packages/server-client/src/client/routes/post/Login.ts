import type { FolderInfo, Identity } from "../../responseEntities";
import { Operation } from "../Operation";
import type { ApiResponseType } from "../ResponseTypes";

export type PostLoginDataType = {
    login: Identity,
    userFolders: FolderInfo[]
}

/**
 * Post route for logging in a user to the server.
 * @package `@labirthermal/client`
 */
export class Login extends Operation<PostLoginDataType> {

    public init(): this {
        this.request.setMethod( "POST" );
        this.request.setAction( "login" );
        return this;
    }

    public setUser(
        user: string
    ): this {
        this.request.addBodyParameter("user", user);
        return this;
    }

    public setPassword(
        password: string
    ): this {
        this.request.addBodyParameter("password", password);
        return this;
    }

    public async execute(): Promise<ApiResponseType<PostLoginDataType>> {

        const response = await this.client.fetch<PostLoginDataType>(this.request);

        if (response.success ) {

            // Login the user
            this.client.auth.login( response.data.login, response.data.userFolders );

        }


        return response;
    }

}