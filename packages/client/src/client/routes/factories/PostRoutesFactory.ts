import type { ApiClient } from "../../ApiClient";
import { CreateFolder } from "../post/CreateFolder";
import { DeleteFile } from "../post/DeleteFile";
import { DeleteFolder } from "../post/DeleteFolder";
import { FileAddComment } from "../post/FileAddComment";
import { FileClearComments } from "../post/FileClearComments";
import { FileDeleteComment } from "../post/FileDeleteComment";
import { FileUpdateComment } from "../post/FileUpdateComment";
import { Login } from "../post/Login";
import { Logout } from "../post/Logout";
import { MoveFolder } from "../post/MoveFolder";
import { UpdateFile } from "../post/UpdateFile";
import { UpdateFolder } from "../post/UpdateFolder";
import { UploadFile } from "../post/UploadFile";
import { MoveFile } from "../post/MoveFile";

/**
 * Factory for creating POST routes
 * 
 * @package `@labirthermal/webcomponents`
 */
export class PostRoutesFactory {

    constructor(
        protected readonly client: ApiClient
    ) { }

    public login(
        login: string,
        password: string
    ): Login {
        return (new Login(this.client))
            .init()
            .setUser(login)
            .setPassword(password);
    }

    public logout(): Logout {
        return (new Logout(this.client))
            .init();
    }

    public createFolder(
        /** An obligatory path of the folder in which the new Folder shall be created */
        targetPath: string,
        /** Name of the new folder - will be webalised for the real folder name in the file system */
        newFolderName: string
    ): CreateFolder {
        return (new CreateFolder(this.client))
            .init()
            .setName(newFolderName)
            .setPath(targetPath);
    }

    public updateFolder(
        path: string
    ): UpdateFolder {
        return (new UpdateFolder(this.client))
            .init()
            .setPath( path );
    }

    public moveFolder(
        folderPath: string,
        target: string
    ): MoveFolder {
        return (new MoveFolder(this.client))
            .init()
            .setPath( folderPath )
            .setTarget( target );
    }

    public uploadFile(
        folderPath: string,
        file: File
    ): UploadFile {
        return (new UploadFile(this.client))
            .init()
            .setPath( folderPath )
            .setLrc( file );
    }

    public updateFile(
        folderPath: string,
        filename: string
    ): UpdateFile {
        return (new UpdateFile(this.client))
            .init()
            .setPath( folderPath )
            .setFile( filename );
    }

    public fileAddComment(
        folderPath: string,
        filename: string,
        message: string
    ): FileAddComment {
        return (new FileAddComment(this.client))
            .init()
            .setPath( folderPath )
            .setFile( filename )
            .setMessage( message );
    }

    public fileClearComments(
        folderPath: string,
        filename: string
    ): FileClearComments {
        return (new FileClearComments(this.client))
            .init()
            .setPath( folderPath )
            .setFile( filename );
    }

    public fileUpdateComment(
        folderPath: string,
        filename: string,
        timestamp: number,
        message: string
    ): FileUpdateComment {
        return (new FileUpdateComment(this.client))
            .init()
            .setPath( folderPath )
            .setFile( filename )
            .setCommentTimestamp( timestamp )
            .setMessage( message );
    }

    public fileDeleteComment(
        folderPath: string,
        filename: string,
        timestamp: number
    ): FileDeleteComment {
        return (new FileDeleteComment(this.client))
            .init()
            .setPath( folderPath )
            .setFile( filename )
            .setCommentTimestamp( timestamp );
    }

    public deleteFolder(
        folderPath: string
    ): DeleteFolder {
        return (new DeleteFolder(this.client))
            .init()
            .setPath( folderPath );
    }

    public deleteFile(
        folderPath: string,
        fileName: string
    ): DeleteFile {
        return (new DeleteFile(this.client))
            .setPath(folderPath)
            .setFile( fileName )
            .init();
    }

    public moveFile(
        folderPath: string,
        fileName: string,
        target: string
    ): MoveFile {
        return (new MoveFile(this.client))
            .init()
            .setPath(folderPath)
            .setFile(fileName)
            .setTarget(target);
    }

}