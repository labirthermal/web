import { nothing } from "lit";
import type { ClientController } from "../../ClientController";
import type { FolderInfo, FileInfo } from "@labirthermal/client";

/** Utilities for rendering */
export class DirectiveHelpers {

    public static unknownContainsSomething(
        content: unknown
    ): boolean {

        if (
            content === nothing
            || content === null
            || content === undefined
        ) {
            return false;
        }

        if (typeof content === "string" && content.trim().length === 0) {
            return false;
        }

        if (Array.isArray(content)) {

            if (content.length === 0) {
                return false;
            } else if (!content.some(item => this.unknownContainsSomething(item))) {
                return false;
            }

        }

        return true;

    }

    public static userMayEditFolder(
        client: ClientController,
        folder: FolderInfo
    ): boolean {

        if (client.isRoot) {
            return true;
        }

        return folder.may_manage_folders_in || folder.may_manage_files_in;

    }

    public static userMayEditFile(
        client: ClientController,
        folder: FolderInfo
    ): boolean {
        if (client.isRoot) {
            return true;
        }
        return folder.may_manage_files_in;
    }

    public static userMaySwithFolderContentMode(
        folder: FolderInfo,
        subfolders?: FolderInfo[]
    ): boolean {

        if (
            !folder.may_manage_files_in
            || !folder.may_manage_folders_in
        ) {
            return false;
        }

        if (folder.may_have_files) {
            return folder.lrc_count <= 0;
        }

        if (!folder.may_have_files) {
            return Array.isArray(subfolders) && subfolders.length > 0;
        }

        return false;

    }

    public static userMayDeleteFolder(
        client: ClientController,
        folder: FolderInfo,
        subfolders?: FolderInfo[],
        files?: FileInfo[]
    ): boolean {

        if (
            // Uživatel je odhlášený
            client.isLoggedIn === false
            // Uživatel nemá vůbec žádné oprávnění k této složce
            || (
                !folder.may_manage_folders_in
                &&
                !folder.may_manage_files_in
            )
        ) {
            return false;
        }

        // Složka je určena pro podsložky
        if (!folder.may_have_files) {
            return Array.isArray(subfolders) && subfolders.length === 0;
        }

        // Složka je určena pro soubory
        else if (folder.may_have_files) {

            return (Array.isArray(files) && files.length === 0) && folder.lrc_count === 0;

        }

        return false;

    }

    public static folderContainsFiles(
        folder: FolderInfo,
        files: FileInfo[]
    ): boolean {
        return Array.isArray(files) && files.length > 0 && folder.lrc_count > 0;
    }



    public static userIsRoot(
        client: ClientController
    ): boolean {
        return client.isRoot;
    }

    public static userIsLoggedIn(
        client: ClientController
    ): boolean {
        return client.isLoggedIn;
    }

}