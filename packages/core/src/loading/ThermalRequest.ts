/** A stupid object containing only requested URLS. Does not perform any further logic. */
export type ThermalFileRequest = {
    thermalUrl: string,
    visibleUrl?: string
}