import type { FolderInfo, Identity } from "../../responseEntities";
import { Operation } from "../Operation";
import type { ApiResponseType } from "../ResponseTypes";

export type GetConnectDataType = {
    identity: false | Identity,
    userFolders: FolderInfo[]
}

/**
 * Get route for connecting to a remote folder on a remote server.
 * @package `@labirthermal/client`
 */
export class GetConnect extends Operation<GetConnectDataType> {

    public init(): this {
        this.request.setMethod("GET");
        this.request.setAction("connect");

        return this;
    }


    public async execute(): Promise<ApiResponseType<GetConnectDataType>> {
        const response = await this.client.fetch<GetConnectDataType>(this.request);

        if (response.success) {

            // If the identity is not false, login the user
            if (response.data.identity !== false) {
                this.client.auth.login(response.data.identity, response.data.userFolders);
            }

        }

        return response;
    }


}