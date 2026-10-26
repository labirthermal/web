import type { ServerInfo } from "../responseEntities"

export type ApiResponseDataType = object;

/**
 * The response of LabIR server to any request.
 * @package `@labirthermal/client`
 */
export type ApiResponseType<R extends ApiResponseDataType = ApiResponseDataType> =
    {
        message: string,
        code: number,
        colophon: {
            time: number,
            path: string | null,
            action: string,
            server: ServerInfo
        },
        raw: {
            request: Request,
            response: Response
        }
    }
    & (
        {
            success: true,
            data: R,
        }
        | {
            success: false,
            data: undefined
        }
    )