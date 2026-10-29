import { IParserObject } from "../../structure";

export const is: IParserObject["is"] = (data, url) => {

    // Check if the URL has appropriate extension
    const hasCorrectExtension = url.endsWith("lrc");

    // Check if the file contains correct signature
    const decoder = new TextDecoder();
    const hasCorrectSignature = decoder.decode(data.slice(0, 4)) === "LRC\0";

    // Return value
    return hasCorrectExtension && hasCorrectSignature;

};
