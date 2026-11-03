import { CSSResultGroup, PropertyValues, ReactiveController, TemplateResult } from "lit";
import { Ref } from "lit/directives/ref.js";
import { AbstractApp, AbstractThermalElement, BtnSizes, BtnVariants, FileProviderElement, RegistryController } from "@labirthermal/webcomponents";
import { AvailableThermalPalette, CallbacksManager, ThermalFileInstance, ThermalGroup, ThermalManager, ThermalRegistry } from "@labirthermal/core";
//#region src/controllers/AbstractConnectedController.d.ts
declare abstract class AbstractConnectedController {
  host: AppWithClientController;
  protected log(...args: any[]): void;
}
//#endregion
//#region src/client/responseEntities.d.ts
/**
 * @package `@labirthermal/client`
 */
type ServerInfo = {
  url: string;
  name?: string;
  description?: string;
  version: string;
};
/**
 * @package `@labirthermal/client`
 */
type Identity = {
  user: string;
  path: string;
  token: string;
  meta: {
    login: string;
    name: string;
    description: string | null;
    institution: string | null;
    is_root: boolean;
    email: string;
  };
};
/**
 * @package `@labirthermal/client`
 */
type TagInfo = {
  name: string;
  description?: string | null;
  color?: string | null;
};
/**
 * @package `@labirthermal/client`
 */
type ApiEditableEntity = object;
/**
 * @package `@labirthermal/client`
 */
type BreadcrumbItem = {
  name: string;
  slug: string;
  path: string;
  protected: boolean;
  current: boolean;
  type: "folder" | "server" | "user";
};
/**
 * @package `@labirthermal/client`
 */
interface FolderInfo extends ApiEditableEntity {
  entity: "folder";
  api: string;
  path: string;
  slug: string;
  name: string;
  description: string | null;
  thumb: string | null;
  meta: Record<string, any>;
  lrc_count: number;
  protected: boolean;
  may_have_files?: boolean;
  may_manage_files_in: boolean;
  may_manage_folders_in: boolean;
  may_read_folder: boolean;
  own_tags: [] | {
    [index: string]: TagInfo;
  };
  parent_tags: [] | {
    [index: string]: TagInfo;
  };
}
/**
 * @package `@labirthermal/client`
 */
type Comment = {
  message: string;
  timestamp: number;
  by: {
    name: string;
    login: string;
    institution: string | null;
    description: string | null;
  };
};
/**
 * @package `@labirthermal/client`
 */
interface FileInfo extends ApiEditableEntity {
  entity: "file";
  /** URL address of the file itself */
  url: string;
  /** Optioanl label of the file */
  label: string | null;
  /** Optional description of the file */
  description: string | null;
  /** Name of the file including its extension */
  fileName: string;
  /** Slug of the folder in which this file is located */
  folder: string;
  /** Slug of the parent folder of the `folder` */
  parent: string;
  /** A path of the `folder` relative to the www/data. Usable in all api calls. */
  path: string;
  /** URL of the visual image or false */
  visual: string | false;
  /** URL of the preview file or undefined */
  preview: string | false;
  /** Timestamp of the file stored in its .json file. */
  timestamp: number;
  /** Timestamp of the upload date */
  uploaded: number;
  uploadedby: null | {
    login: string;
    name: string;
    description: string | null;
    institution: string | null;
  };
  /** This file is assigned to these tags. Tags may be defined in `_tags.json` of the `parent` folder */
  tags: string[];
  /** A human-redable date - is taken from the timestamp */
  dateHuman: string;
  /** An api root of this file may serve for calling subsequent requests related to this file */
  apiRoot: string;
  /** Storage of the analyses */
  analyses: string[];
  /** Stoage of comments */
  comments: Comment[];
}
/**
 * @package `@labirthermal/client`
 */
type TagDefinition = {
  slug: string;
  count: number;
  meta?: {
    name?: string;
    description?: string;
    color?: string;
  };
};
/**
 * @package `@labirthermal/client`
 */
type TagWithContent = TagDefinition & {
  folders: {
    [index: string]: FileInfo[];
  };
};
/**
 * @package `@labirthermal/client`
 */
type TagsWithContent = {
  [index: string]: TagWithContent;
};
/**
 * @package `@labirthermal/client`
 */
type TreeItem = {
  entity: "treeitem";
  path: string;
  api: string;
  slug: string;
  name: string;
  descriotion: string | null;
  lrc_count: number;
  protected: boolean;
  may_have_files: boolean;
  metadata: Record<string, any>;
  subfolders: TreeItem[];
};
/**
 * @package `@labirthermal/client`
 * @deprecated updating of tags should go without this object. There should be a type for tags in response...
 */
type TagUpdateObject = {
  [slug: string]: {
    name: string;
    description?: string;
    color?: string;
  };
};
//#endregion
//#region src/client/authentication/Auth.d.ts
declare class Auth {
  protected readonly client: ApiClient;
  protected identity?: Identity;
  protected session?: string;
  readonly onIdentity: CallbacksManager<(identity: Identity | undefined, userFolders?: FolderInfo[]) => void>;
  constructor(client: ApiClient);
  isLoggedIn(): boolean;
  login(identity: Identity, userFolders?: FolderInfo[]): void;
  logout(): void;
  setSession(value: string | undefined): void;
  getSession(): string | undefined;
  getIdentity(): Identity | undefined;
  getAuthorisationHeader(): string | undefined;
  private toBase64;
  private manualBase64Encode;
}
//#endregion
//#region src/client/request/RequestFactory.d.ts
type AvailableMethod = "GET" | "POST";
/**
 * An universal factory of requests to LabIR servers.
 *
 * It is intended to be used in the `routes` factories, such as `GetRoutesFactory` or `PostRoutesFactory`.
 *
 * These classes take care of all the parameters settings and this RequestFactory shall never be exposed publically.
 *
 * **Functionality**
 * - accepts the query parameters, body and header contents
 * - creates a `Request` object that is used internally by `Client.fetch()`
 * - takes care of passing credentials and session ID to the request
 *
 */
declare class RequestFactory {
  protected readonly client: ApiClient;
  protected path?: string;
  protected method: AvailableMethod;
  protected action?: string;
  protected query: Map<string, string>;
  protected body: {
    [key: string]: any;
  };
  protected headers: {
    [key: string]: string;
  };
  protected files: {
    [key: string]: File;
  };
  constructor(client: ApiClient);
  setPath(value: string): RequestFactory;
  setMethod(value: AvailableMethod): RequestFactory;
  setAction(value: string): RequestFactory;
  addQueryParameter(key: string, value: string): RequestFactory;
  addBodyParameter(key: string, value: any): RequestFactory;
  addHeader(key: string, value: string): RequestFactory;
  addFile(key: string, file: File): RequestFactory;
  protected createRequestInit(): {
    url: URL;
    options: RequestInit;
  } | false;
  /**
   * Vytvoří Request s application/json body (bez souborů)
   */
  protected createRequestJson(): Request | false;
  /**
   * Vytvoří Request s multipart/form-data (pro upload souborů)
   */
  protected createRequestFormData(): Request | false;
  createRequest(): Request | false;
  getAction(): string | undefined;
}
//#endregion
//#region src/client/routes/ResponseTypes.d.ts
type ApiResponseDataType = object;
/**
 * The response of LabIR server to any request.
 * @package `@labirthermal/client`
 */
type ApiResponseType<R extends ApiResponseDataType = ApiResponseDataType> = {
  message: string;
  code: number;
  colophon: {
    time: number;
    path: string | null;
    action: string;
    server: ServerInfo;
  };
  raw: {
    request: Request;
    response: Response;
  };
} & ({
  success: true;
  data: R;
} | {
  success: false;
  data: undefined;
});
//#endregion
//#region src/client/routes/Operation.d.ts
/**
 * A base class for all routes. It is intentionally concieved very universally, because it might happen that one operation would consist of several subsequent requests.
 * @package `@labirthermal/client`
 * @author Jan Jáchim <jachim@ntc.zcu.cz>*/
declare abstract class Operation<R extends ApiResponseDataType> {
  protected readonly client: ApiClient;
  protected readonly request: RequestFactory;
  constructor(client: ApiClient);
  /** In a factory, the operation needs to be initialised before returning. */
  abstract init(): this;
  /** Perform the operation and all its requests. */
  abstract execute(): Promise<ApiResponseType<R>>;
}
//#endregion
//#region src/client/routes/get/GetConnect.d.ts
type GetConnectDataType = {
  identity: false | Identity;
  userFolders: FolderInfo[];
};
/**
 * Get route for connecting to a remote folder on a remote server.
 * @package `@labirthermal/client`
 */
declare class GetConnect extends Operation<GetConnectDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<GetConnectDataType>>;
}
//#endregion
//#region src/client/routes/get/GetCurrentUserTree.d.ts
type GetCurrentUserTreeDataType = {
  tree: TreeItem[];
};
/**
 * Get the list of all folders accessible to the currently logged in user.
 * @package `@labirthermal/client`
 */
declare class GetCurrentUserTree extends Operation<GetCurrentUserTreeDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<GetCurrentUserTreeDataType>>;
}
//#endregion
//#region src/client/routes/OperationWithPath.d.ts
/**
 * A base operation that needs to have a path specified.
 * @package `@labirthermal/client`
 */
declare abstract class OperationWithPath<R extends ApiResponseDataType> extends Operation<R> {
  setPath(path: string): this;
}
//#endregion
//#region src/client/routes/get/GetInfo.d.ts
type GetInfoDataType = {
  breadcrumb: BreadcrumbItem[];
  folder: FolderInfo;
  subfolders: false | {
    [index: string]: FolderInfo;
  };
  tags: {
    [index: string]: TagDefinition;
  };
};
/**
 * Get route for retrieving folder information from the server.
 * @package `@labirthermal/client`
 */
declare class GetInto extends OperationWithPath<GetInfoDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<GetInfoDataType>>;
}
//#endregion
//#region src/client/routes/get/GetFile.d.ts
type GetFileDataType = {
  file: FileInfo;
};
/**
 * Get route for retrieving a file's information from the server.
 * @package `@labirthermal/client`
 */
declare class GetFile extends OperationWithPath<GetFileDataType> {
  init(): this;
  setFileName(value: string): this;
  execute(): Promise<ApiResponseType<GetFileDataType>>;
}
//#endregion
//#region src/client/routes/OperationWithPathAndFilters.d.ts
/**
 * An operation containing filters based on time and tags. Needs to have path specified.
 * @package `@labirthermal/client`
 */
declare abstract class OperationWithFilters<R extends ApiResponseDataType> extends OperationWithPath<R> {
  private tags;
  setFrom(value: number | Date): this;
  setTo(value: number | Date): this;
  setTags(value: string[]): this;
  addTag(value: string): this;
  removeTag(value: string): this;
  /**
   * Internal method used to propagate changed tags to the request.
   */
  private applyTags;
}
//#endregion
//#region src/client/routes/get/GetFiles.d.ts
type GetFilesDataType = {
  folder: FolderInfo;
  subfolders: {
    [index: string]: FolderInfo;
  };
  time: {
    files: {
      from: number;
      to: number;
    };
  };
  count: {
    displayed: number;
    omitted: number;
    total: number;
  };
  files: FileInfo[];
  tags: TagsWithContent;
};
/**
 * Get route for retrieving files information from a folder on the server.
 * @package `@labirthermal/client`
 */
declare class GetFiles extends OperationWithFilters<GetFilesDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<GetFilesDataType>>;
}
//#endregion
//#region src/client/routes/get/GetGrid.d.ts
type GetGridDataType = {
  folder: FolderInfo;
  all_subdirectories: {
    [index: string]: FolderInfo;
  };
  header: {
    [index: string]: FolderInfo;
  };
  groups: {
    [index: string]: {
      label: string;
      from: number;
      to: number;
      folders: {
        [index: string]: FileInfo[];
      };
    };
  };
  time: {
    selection: {
      from: number;
      to: number;
    };
    files: {
      from: number;
      to: number;
    };
  };
  count: {
    displayed: number;
    omitted: number;
    total: number;
  };
  tags: TagsWithContent;
};
/**
 * Keys of grid grouping types
 * @package `@labirthermal/client`
 */
declare enum GridGrouping {
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year"
}
/**
 * Get route for retrieving grid content from the server, grouped by time intervals.
 * @package `@labirthermal/client`
 */
declare class GetGrid extends OperationWithFilters<GetGridDataType> {
  protected folders: string[];
  protected by: GridGrouping;
  init(): this;
  setBy(value: GridGrouping): this;
  setFolders(value: string[]): this;
  addFolder(value: string): this;
  removeFolder(value: string): this;
  protected applyFolders(): this;
  execute(): Promise<ApiResponseType<GetGridDataType>>;
}
//#endregion
//#region src/client/routes/factories/GetRoutesFactory.d.ts
/**
 * Factory for creating GET routes
 *
 * @package `@labirthermal/webcomponents`
 */
declare class GetRoutesFactory {
  protected readonly client: ApiClient;
  constructor(client: ApiClient);
  /**
   * Connects to a server, eventually returning the existing identity of the currently logged-in user.
   *
   * If you want to load existing user identity, you need to pass the PHPSESSID to the client before calling this method using `auth.setSession()`.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.auth.setSession("PHPSESSID=1234567890abcdef"); // Set the session ID
   * await client.connect(); // This method is accessible from the Client object itself
   * ```
   */
  connect(): GetConnect;
  /**
   * Get information about a folder.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.connect();
   * const request = client.routes.get.info("path/to/folder");
   * // Configure request:
   * request.setPath("path/to/folder"); // already set by factory
   * const result = await request.execute();
   * ```
   *
   * @param path Path of the folder.
   */
  info(path: string): GetInto;
  /**
   * List of files in the given folder.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.connect();
   * const request = client.routes.get.files("path/to/folder");
   * request
   *  .setFrom(new Date("2023-01-01")) // Optional filter
   *  .setTo(new Date("2023-12-31")) // Optional filter
   *  .addTag("tag-slug"); // Optional filter
   * const result = await request.execute();
   * ```
   *
   * @param path Path to the folder from which you want to get the files
   */
  files(path: string): GetFiles;
  /**
   * List of files in the given folder.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.connect();
   * const request = client.routes.get.files("path/to/folder");
   * // Configure request:
   * request.setFrom(new Date("2023-01-01")); // Optional filter
   * request.setTo(new Date("2023-12-31"));   // Optional filter
   * request.addTag("tag-slug");              // Optional filter
   * const result = await request.execute();
   * ```
   *
   * @param path Path to the folder from which you want to get the files
   */
  grid(path: string): GetGrid;
  /**
   * Generate the grid from subfolders inside the given directory.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.connect();
   * const request = client.routes.get.grid("path/to/folder");
   * const result = await request.execute();
   * ```
   *
   * @param path Path to the folder from which you want the grid to be generated
   * @param filename Name of the LRC file
   */
  file(path: string, filename: string): GetFile;
  /**
   * Get list of folders accessible by the currently logged-in user.
   *
   * ```typescript
   * const client = new Client("http://localhost:8080");
   * await client.connect();
   * const request = client.routes.get.currentUserTree();
   * const result = await request.execute();
   * ```
   */
  currentUserTree(): GetCurrentUserTree;
}
//#endregion
//#region src/client/routes/post/CreateFolder.d.ts
type CreateDataType = {
  result: {
    slug?: string;
    name?: string;
    description?: string;
    info?: any;
  };
};
/**
 * Vytvoření nové složky (viz actionCreate v PHP)
 * Parametry: name (povinné), description (volitelné), meta (volitelné), tags (volitelné), access (volitelné)
 *
 * @package `@labirthermal/client`
 */
declare class CreateFolder extends OperationWithPath<CreateDataType> {
  protected tagBuffer: Record<string, any>;
  protected accessBuffer: {
    show?: boolean;
    may_have_files?: boolean;
  };
  init(): this;
  setName(name: string): this;
  setDescription(description: string): this;
  setMeta(meta: Record<string, any>): this;
  /**
   * Přidej jeden tag (klíčem je název, hodnotou objekt s name, description, color)
   */
  addTag(name: string, description?: string, color?: string): this;
  /**
   * Nastaví access.show (viditelnost složky)
   */
  setShow(show: boolean): this;
  /**
   * Nastaví access.may_have_files (zda složka může obsahovat soubory)
   */
  setMayHaveFiles(mayHaveFiles: boolean): this;
  execute(): Promise<ApiResponseType<CreateDataType>>;
}
//#endregion
//#region src/client/routes/OperationWithFile.d.ts
/**
 * A base operation that needs to have a path specified.
 * @package `@labirthermal/client`
 */
declare abstract class OperationWithFile<R extends ApiResponseDataType> extends OperationWithPath<R> {
  setFile(filename: string): this;
}
//#endregion
//#region src/client/routes/post/DeleteFile.d.ts
type DeleteFileDataType = object;
/**
 * Post route for deleting a file on the server.
 * @package `@labirthermal/client`
 */
declare class DeleteFile extends OperationWithFile<DeleteFileDataType> {
  init(): this;
  setLrc(file: File): this;
  execute(): Promise<ApiResponseType<DeleteFileDataType>>;
}
//#endregion
//#region src/client/routes/post/DeleteFolder.d.ts
type DeleteFolderDataType = object;
/**
 * Post route for deleting a folder on the server.
 * @package `@labirthermal/client`
 */
declare class DeleteFolder extends OperationWithPath<DeleteFolderDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<DeleteFolderDataType>>;
}
//#endregion
//#region src/client/routes/post/FileAddComment.d.ts
type FileAddCommentDataType = {
  file: FileInfo;
};
/**
 * Post route for adding a comment to a file on the server.
 * @package `@labirthermal/client`
 */
declare class FileAddComment extends OperationWithFile<FileAddCommentDataType> {
  init(): this;
  /**
   * Nastaví text komentáře, který bude odeslán na server.
   *
   * @param message Text komentáře
   */
  setMessage(message: string): this;
  execute(): Promise<ApiResponseType<FileAddCommentDataType>>;
}
//#endregion
//#region src/client/routes/post/FileClearComments.d.ts
type FileClearCommentsDataType = {
  file: FileInfo;
};
/**
 * Post route for clearing all comments on a file on the server.
 * @package `@labirthermal/client`
 */
declare class FileClearComments extends OperationWithFile<FileClearCommentsDataType> {
  init(): this;
  /**
   * Executes the request to clear comments on a file.
   */
  execute(): Promise<ApiResponseType<FileClearCommentsDataType>>;
}
//#endregion
//#region src/client/routes/post/FileDeleteComment.d.ts
type FileDeleteCommentDataType = {
  file: FileInfo;
};
/**
 * Post route for deleting a file's comment on the server.
 * @package `@labirthermal/client`
 */
declare class FileDeleteComment extends OperationWithFile<FileDeleteCommentDataType> {
  init(): this;
  setCommentTimestamp(timestamp: number): this;
  execute(): Promise<ApiResponseType<FileDeleteCommentDataType>>;
}
//#endregion
//#region src/client/routes/post/FileUpdateComment.d.ts
type FileUpdateCommentDataType = {
  file: FileInfo;
};
/**
 * Post route for updating a file's comment on the server.
 * @package `@labirthermal/client`
 */
declare class FileUpdateComment extends OperationWithFile<FileUpdateCommentDataType> {
  init(): this;
  setCommentTimestamp(timestamp: number): this;
  /**
   * Nastaví text komentáře, který bude odeslán na server.
   *
   * @param message Text komentáře
   */
  setMessage(message: string): this;
  execute(): Promise<ApiResponseType<FileUpdateCommentDataType>>;
}
//#endregion
//#region src/client/routes/post/Login.d.ts
type PostLoginDataType = {
  login: Identity;
  userFolders: FolderInfo[];
};
/**
 * Post route for logging in a user to the server.
 * @package `@labirthermal/client`
 */
declare class Login extends Operation<PostLoginDataType> {
  init(): this;
  setUser(user: string): this;
  setPassword(password: string): this;
  execute(): Promise<ApiResponseType<PostLoginDataType>>;
}
//#endregion
//#region src/client/routes/post/Logout.d.ts
type LogoutDataType = object;
/**
 * Post route for logging out a user from the server.
 * @package `@labirthermal/client`
 */
declare class Logout extends Operation<LogoutDataType> {
  init(): this;
  execute(): Promise<ApiResponseType<LogoutDataType>>;
}
//#endregion
//#region src/client/routes/post/MoveFolder.d.ts
type MoveFolderDataType = object;
/**
 * Post route for moving a folder within one server.
 * @package `@labirthermal/client`
 */
declare class MoveFolder extends OperationWithPath<MoveFolderDataType> {
  init(): this;
  setTarget(target: string): this;
  execute(): Promise<ApiResponseType<MoveFolderDataType>>;
}
//#endregion
//#region src/client/routes/post/UpdateFile.d.ts
type UpdateFileDataType = {
  file: FileInfo;
};
/**
 * Post route for updating metadata of a file on the server.
 * @package `@labirthermal/client`
 */
declare class UpdateFile extends OperationWithFile<UpdateFileDataType> {
  protected _clearTags: boolean;
  protected _clearAnalyses: boolean;
  protected _tagsAdd: string[];
  protected _tagsRemove: string[];
  protected _analysisAdd: string[];
  protected _analysisRemove: string[];
  init(): this;
  setLabel(value: string): this;
  setDescription(value: string): this;
  addTag(tag: string): this;
  removeTag(tag: string): this;
  addAnalysis(analysis: string): this;
  removeAnalysis(analysis: string): this;
  clearTags(): this;
  clearAnalyses(): this;
  execute(): Promise<ApiResponseType<UpdateFileDataType>>;
}
//#endregion
//#region src/client/routes/post/UpdateFolder.d.ts
type PostUpdateFolderDataType = {
  result: {
    /** The new slug of the updated folder */
    slug?: string;
    /** The new name of the updated folder */
    name?: string;
    /** The new description of the updsated folder */
    description?: string;
    /** The old slug of the folder (in case it moved) */
    oldSlug?: string;
    /** The standard folder info */
    info: FolderInfo;
    /** Whether the folder itself renames on the disk */
    moved: boolean;
  };
};
/**
 * Post route for updating a folder on the server.
 * @package `@labirthermal/client`
 */
declare class UpdateFolder extends OperationWithPath<PostUpdateFolderDataType> {
  protected tagBuffer: TagUpdateObject;
  init(): this;
  setName(value: string): this;
  setDescription(value: string): this;
  setThumbnail(value: File): this;
  addTag(key: string, name: string, description?: string, color?: string): this;
  removeTags(tags: string[]): this;
  setMayHaveFiles(value: boolean): this;
  setMetadata(value: Record<string, any>): this;
  execute(): Promise<ApiResponseType<PostUpdateFolderDataType>>;
}
//#endregion
//#region src/client/routes/post/UploadFile.d.ts
type UploadFileDataType = {
  file: FileInfo;
};
/**
 * Post route for uploading a file to a server folder.
 * @package `@labirthermal/client`
 */
declare class UploadFile extends OperationWithPath<UploadFileDataType> {
  init(): this;
  setLrc(file: File): this;
  setVisual(file: File): this;
  setPreview(file: File): this;
  /**
   * Nastaví label pro uploadovaný soubor
   */
  setLabel(label: string): this;
  /**
   * Nastaví description pro uploadovaný soubor
   */
  setDescription(description: string): this;
  /**
   * Nastaví tagy pro uploadovaný soubor
   */
  setTags(tags: string[]): this;
  execute(): Promise<ApiResponseType<UploadFileDataType>>;
}
//#endregion
//#region src/client/routes/post/MoveFile.d.ts
type MoveFileDataType = object;
/**
 * Post route for moving a file within one server.
 * @package `@labirthermal/client`
 */
declare class MoveFile extends OperationWithFile<MoveFileDataType> {
  init(): this;
  setTarget(target: string): this;
  execute(): Promise<ApiResponseType<MoveFileDataType>>;
}
//#endregion
//#region src/client/routes/factories/PostRoutesFactory.d.ts
/**
 * Factory for creating POST routes
 *
 * @package `@labirthermal/webcomponents`
 */
declare class PostRoutesFactory {
  protected readonly client: ApiClient;
  constructor(client: ApiClient);
  login(login: string, password: string): Login;
  logout(): Logout;
  createFolder(
  /** An obligatory path of the folder in which the new Folder shall be created */
  targetPath: string,
  /** Name of the new folder - will be webalised for the real folder name in the file system */
  newFolderName: string): CreateFolder;
  updateFolder(path: string): UpdateFolder;
  moveFolder(folderPath: string, target: string): MoveFolder;
  uploadFile(folderPath: string, file: File): UploadFile;
  updateFile(folderPath: string, filename: string): UpdateFile;
  fileAddComment(folderPath: string, filename: string, message: string): FileAddComment;
  fileClearComments(folderPath: string, filename: string): FileClearComments;
  fileUpdateComment(folderPath: string, filename: string, timestamp: number, message: string): FileUpdateComment;
  fileDeleteComment(folderPath: string, filename: string, timestamp: number): FileDeleteComment;
  deleteFolder(folderPath: string): DeleteFolder;
  deleteFile(folderPath: string, fileName: string): DeleteFile;
  moveFile(folderPath: string, fileName: string, target: string): MoveFile;
}
//#endregion
//#region src/client/routes/factories/Routes.d.ts
/**
 * Object containing instances of all available API routes.
 * @package `@labirthermal/webcomponents`
 */
declare class Routes {
  protected readonly client: ApiClient;
  /**
   * All the available GET routed of the API
   */
  readonly get: GetRoutesFactory;
  /**
   * All the available POST routes of the API
   */
  readonly post: PostRoutesFactory;
  constructor(client: ApiClient);
}
//#endregion
//#region src/client/ApiClient.d.ts
/**
 * The client for accessing a remote LabIR server.
 *
 * - needs to call the asynchronouse method `connect()` method before any other request
 *
 * - if `auth.setSession()` is called before connection, the session ID shall be passed to the connected server. In case there is a logged-in user in the given session its credentials will be sent back and the user will be logged in automatically right after the connection.
 *
 * - otherwise, a standard login request needs to be performed via the `routes.post.login()`
 *
 * @package `@labirthermal/client`
 *
 */
declare class ApiClient {
  private readonly apiRoot;
  /**
   * Version of the API === version of the NPM package.
   */
  static readonly VERSION: string;
  /**
   * The core server URL ending with a slash
   */
  private serverUrl;
  private _serverInfo?;
  get serverInfo(): ServerInfo | undefined;
  /**
   * The authentication service stores the session ID and also the identity of the currently logged in user.
   * - The authentication itself is provided by the operation `PostLogin` which is accessible through the `routes.post.login()` method.
   */
  readonly auth: Auth;
  /**
   * The factories for creating requests to the API.
   *
   * ```typescript
   * // Create a client
   * const client = new Client("http://localhost:8080");
   *
   * // Connect it to the server
   * await client.connect();
   *
   * // Create a request to list files inside a folder
   * const request = client.routes.get.files("path/to/folder");
   *
   * request
   *  .setFrom( new Date("2023-01-01") ) // Set optional filter
   *  .setTo( new Date("2023-12-31") ) // Set optional filter
   *  .addTag( "tag-slug" ); // Set optional filter
   *
   * // Execute the request
   * const result = await request.execute();
   * ```
   *
   * All requests are created as instances of `Operation`, or one of its subclasses.
   *
   * A request contains a hidden `RequestFactory` that is used to create the actual `Request` object. This object shall never be exposed nor manipulated publically.
   * Every individual `Operation` has its own methods for setting parameters, such as `setPath()`, `addTags()`, etc.
   *
   * These methods will store the data in the internal `RequestFactory` object. The `Operation` instance needs to be executed using its asynchronous `execute()` method, which will return a promise that resolves to an `ApiResponseType` object.
   *
   * Note:
   * - upon creation of the `Client` instance, the route `connect` needs to be called
   * - after connection to the server, other requests are available
   */
  readonly routes: Routes;
  /**
   * Needs to be set to `true` before any requests are made (with the exception of the `connect()` route).
   */
  private connected;
  readonly onConnection: CallbacksManager<(status: false | ServerInfo) => void>;
  readonly onResult: CallbacksManager<(timestamp: number, success: boolean, code: boolean, message: boolean, method: string) => void>;
  private activeRequests;
  readonly onLoading: CallbacksManager<(loading: boolean) => void>;
  get loading(): boolean;
  constructor(serverUrl: string, apiRoot?: string);
  /**
   * Tests the availability of the server, establishes the connection and stores the following data crucial for all subsequent requests:
   * - PHPSESSID is stored in `Auth.setSesson()`
   * - if a logged-in user was found on the session, its credentials will be stored in `Auth.login()`
   */
  connect(): Promise<ApiResponseType<GetConnectDataType>>;
  /**
   * Was this `Client` already connected using `Client.connect()`?
   */
  isConnected(): boolean;
  /**
   * Creates a new RequestFactory instance
   * - do not use this method directly, use the `routes` property instead
   */
  createRequest(): RequestFactory;
  /**
   * @returns The server URL with a trailing slash
   */
  getServerUrl(): string;
  /**
   * @returns The API root path with slashes (e.g. '/api/')
   */
  getApiRoot(): string;
  getPublicUrl(): string;
  /**
   * Automatically process every incoming response.
   * - store the session ID in Auth class
   */
  private processResponse;
  /**
   * Processes a request factory created using `routes`
   *
   * All request factories need to be executed this way because there are necessary checks & processes upon every request:
   * - request is refused until the client is connected
   * - handling of unavailable server errors
   * - storage of the PHPSESSID in the `Auth` class
   *
   * @todo implement emission of events using the `EventEmitter` class
   * @param factory The request factory to execute
   */
  fetch<R extends ApiResponseDataType>(factory: RequestFactory): Promise<ApiResponseType<R>>;
}
//#endregion
//#region src/controllers/ClientController.d.ts
/** Public properties for application elements using ClientController */
interface AppWithClientController extends AbstractThermalElement {
  /** URL Address of the webserver */
  serverUrl: string;
  /** API root path of the server. */
  serverApiRoot: string;
  /** The main client instance*/
  apiClient: ApiClient;
  /** Authentication url */
  authUrl?: string;
  /** Authentication token */
  authToken?: string;
}
/**
 * Basic reactive controller for applications connected to the API
 */
declare class ClientController extends AbstractConnectedController implements ReactiveController {
  host: AppWithClientController;
  private _isLoading;
  private _whatIsLoading?;
  private _loadingError?;
  private _isClientConnected;
  private _isLoggedIn;
  private _isRoot;
  private _identity?;
  private _serverInfo?;
  get isLoading(): boolean;
  get whatIsLoading(): string | undefined;
  get loadingError(): string | undefined;
  get isClientConnected(): boolean;
  get isLoggedIn(): boolean;
  get isRoot(): boolean;
  get identity(): Identity | undefined;
  get serverInfo(): ServerInfo | undefined;
  get api(): ApiClient;
  readonly onLoadingChange: CallbacksManager<(value: boolean) => void>;
  readonly onIdentity: CallbacksManager<(identity?: Identity, isRoot?: boolean) => void>;
  private _hasCalledReadyForContentRequests;
  /** Callbacks that needs will be triggered after the client is ready for content requests:
   * - after connection
   * - after the eventual login
   */
  readonly onReadyForContentRequests: CallbacksManager<() => void>;
  readonly onServerInfoUpdate: CallbacksManager<() => void>;
  /** Unique identificator for the purpose of event listeners */
  private UUID;
  constructor(host: AppWithClientController);
  hostConnected(): Promise<void>;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostUpdated(): void;
  private initialLogin;
  loadingStart(what?: string): void;
  loadingSuccessfull(): void;
  loadingFailed(error?: string): void;
  private setIsClientConnected;
  private setIsLoggedIn;
  private setIsRoot;
  private setIdentity;
  private setServerInfo;
  /**
   * This event will be called once, when the client is connected and logged in eventually.
   * It is used by other controllers who will then fire their content requests.
   */
  private callReadyForContentRequestsIfNotAllready;
  subscribeToIdentityChanges(element: AbstractThermalElement): void;
  subscribeToLoadingChanges(element: AbstractThermalElement): void;
  subscribeToServerInfoUpdates(element: AbstractThermalElement): void;
}
//#endregion
//#region src/controllers/ContentController.d.ts
/**
 * Public parameters of an application
 */
interface AppWithContentController extends AppWithClientController {
  /** @property The main parameter indicating the current folder path */
  folderPath?: string;
  /** @property The main parameter indicating the current file name */
  fileName?: string;
  /** @property The view is locked to a specific path */
  lockedPath?: string;
  /** @property The folders to be displayed in the grid */
  gridFolders?: string[];
  client: ClientController;
}
/**
 * This controller takes care of the entire content state management:
 * - fetching data from the server
 * - updates everywhere
 * - loading state (separate from the client controller who has a loading state of its own)
 */
declare class ContentController extends AbstractConnectedController implements ReactiveController {
  host: AppWithContentController;
  private _folder?;
  private _subfolders;
  private _files?;
  private _file?;
  private _grid?;
  private _breadcrumb?;
  private _tree;
  private _userFolders;
  private _gridFolders;
  get folder(): FolderInfo | undefined;
  get subfolders(): FolderInfo[];
  get files(): FileInfo[] | undefined;
  get file(): FileInfo | undefined;
  get grid(): GetGridDataType | undefined;
  get breadcrumb(): BreadcrumbItem[] | undefined;
  get tree(): TreeItem[];
  get userFolders(): FolderInfo[];
  get gridFolders(): FolderInfo[];
  readonly onFolderUpdate: CallbacksManager<(folder?: FolderInfo) => void>;
  readonly onSubfoldersUpdate: CallbacksManager<(subfolders?: FolderInfo[]) => void>;
  readonly onFilesUpdate: CallbacksManager<(files?: FileInfo[]) => void>;
  readonly onFileUpdate: CallbacksManager<(file?: FileInfo) => void>;
  readonly onGridUpdate: CallbacksManager<(grid?: GetGridDataType) => void>;
  readonly onBreadcrumbUpdate: CallbacksManager<(breadcrumb?: BreadcrumbItem[]) => void>;
  readonly onTree: CallbacksManager<(tree?: TreeItem[]) => void>;
  readonly onUserFoldersUpdate: CallbacksManager<(userFolders?: FolderInfo[]) => void>;
  readonly onError: CallbacksManager<(error: string) => void>;
  private _isLoading;
  get isLoading(): boolean;
  private _whatIsLoading?;
  get whatIsLoading(): string | undefined;
  /** Triggered whenever loading status changes */
  readonly onLoadingChange: CallbacksManager<(isLoading: boolean, whatIsLoading?: string) => void>;
  constructor(host: AppWithContentController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostUpdated(): void;
  private loadingStart;
  private loadingEnded;
  /** Set the current folder state. Intended for API calls, but can be used by routers & buttons as well. This method tries to modify the current folder path property */
  dangerouslySetFolder(folder: FolderInfo | undefined): void;
  /** Set the current subfolders state. Intended for API calls */
  dangerouslySetSubfolders(subfolders: FolderInfo[] | undefined): void;
  /** Update the current state of the file. Intended for API calls. */
  dangerouslySetFiles(files: FileInfo[] | undefined): void;
  /** Update the inner state of of the current file. Intended for API calls but can be used by routers or the UI as well. */
  dangerouslySetFileState(file: FileInfo | undefined): void;
  /** Update the current grid state. Intended for API calls only. */
  dangerouslySetGridState(grid?: GetGridDataType): void;
  private dangerouslySetTree;
  private dangerouslySetBreadcrumb;
  /**
   * Update the information about the folder wherever it is:
   * - in the main folder state if the path matches
   * - in the subfolders list if the path matches
   * - in the grid groups if the path matches
   * - in the grid header if the slug matches
   * - in the grid all_subdirectories if the slug matches
   */
  updateFolderState(folder: FolderInfo): void;
  /**
   * Update the information about a file wherever it is:
   * - in the main file state if the URL matches
   * - in the files list if the URL matches
   * - in the grid groups if the URL matches
   * - in the grid tags if the URL matches
   */
  updateFileState(file: FileInfo): void;
  /** Clear the entire content in this controller */
  purgeContentState(): void;
  private throwIfNot200;
  /** Request and update a folder information, storing also all subfolders */
  fetchFolder(folderPath: string): Promise<void>;
  /** Request all files in a folder */
  fetchFiles(folderPath: string): Promise<void>;
  /** Request the grid data for a folder */
  fetchGridData(folderPath: string, inclidedSubfolderPaths?: string[]): Promise<void>;
  /** Fetch information about a file */
  fetchFile(folderPath: string, fileName: string): Promise<void>;
  /** Fetch the complete tree for the given user */
  fetchUserTree(): Promise<void>;
  fetchDeleteFile(folderPath: string, fileName: string): Promise<void>;
  subscribeToFolderUpdates(element: AbstractThermalElement): void;
  subscribeToFileUpdates(element: AbstractThermalElement): void;
  subscribeToFilesUpdates(element: AbstractThermalElement): void;
  subscribeToSubfoldersUpdates(element: AbstractThermalElement): void;
  subscribeToBreadcrumbUpdates(element: AbstractThermalElement): void;
  subscribeToGridUpdates(element: AbstractThermalElement): void;
  subscribeToTreeUpdates(element: AbstractThermalElement): void;
  subscribeToContentLoading(): void;
  unsubscribeFromAll(element: AbstractThermalElement): void;
  getRegistrySlug(): string;
}
//#endregion
//#region src/controllers/DisplayController.d.ts
declare enum DisplayState {
  LOADING = 0,
  ARBITRARY = 1,
  USER = 2,
  FOLDER = 3,
  FILE = 4,
  LOGIN = 5,
  ERROR = 6
}
/** Which way should we display list of folders? */
declare enum FolderListDisplayMode {
  /** Folders shall be displayed as table, one under another */
  TABLE = "asTable",
  /** Folders shall be displayed as list of folders */
  LIST = "asList",
  /** The files within subfolders shall be displayed in a grid */
  GRID = "asGrid"
}
/** Which way should we display lists of files? */
declare enum FileListDisplayMode {
  /** Files shall be displayed in a responsive grid, taking in consideration a predefined columns mode & compact mode */
  GRID = "asGrid",
  /** Files shall be displayed in a table, one under another */
  TABLE = "asTable"
}
/** A standard interface for navigation & display. It uses the ContentController to fetch data based on the current folder and file */
interface AppWithDisplayController extends AppWithContentController {
  /** @context Provides the current state & perform the fetches */
  content: ContentController;
  /** @state Indicating the current application display state */
  appState: DisplayState;
  /** @property Reflected from the inside */
  folderListDisplayMode: FolderListDisplayMode;
  /** @property Reflected from the inside */
  fileDisplayMode: FileListDisplayMode;
  /** @property Compact list */
  fileDisplayCompact: boolean;
  /** @property Reflected from the inside */
  editTags: boolean;
  /** @property Reflected from the inside */
  displayComments: boolean;
}
declare class DisplayController extends AbstractConnectedController implements ReactiveController {
  private static readonly LISTENER_ID;
  host: AppWithDisplayController;
  private _arbitraryContent?;
  private _slug;
  /** Identificator for current internals based on the current state
   * - us updated upon navigation which might be change of the state or enforcing to load a specific folder / file / grid
   */
  get slug(): string;
  /** The content that is being used for various messages & stuff */
  get arbitraryContent(): unknown;
  /** The current state of the application - its main router */
  get appState(): DisplayState;
  /** Which way should we display list of folders? The setting is in the host element */
  get folderListDisplayMode(): FolderListDisplayMode;
  /** Which way should we display lists of files? The setting is in the host element */
  get fileDisplayMode(): FileListDisplayMode;
  /** Are the displayed files in the list compact or not? */
  get fileDisplayCompact(): boolean;
  /** Whether tags are editable. The setting is in the host element. */
  get editTags(): boolean;
  /** Whether comments are displayed. The setting is in the host element. */
  get displayComments(): boolean;
  readonly onAppModeUpdate: CallbacksManager<() => void>;
  private readonly onFolderDisplayModeUpdate;
  private readonly onFileDisplayModeUpdate;
  private readonly onFileDisplayCompactUpdate;
  private readonly onEditTagsUpdate;
  private readonly onDisplayCommentsUpdate;
  readonly onNavigate: CallbacksManager<() => void>;
  private readonly onArbitraryContentUpdate;
  private readonly onRecreateContext;
  constructor(host: AppWithDisplayController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostUpdated(): void;
  /** A callback that is necessary for any navigation calls. */
  private refreshSlugOnNavigate;
  navigateToLoadingState(whatIsLoading?: unknown): void;
  navigateToFolderAndLoad(targetFolderPath: string): Promise<void>;
  navigateToPreloadedFile(parentFolder: FolderInfo, file: FileInfo): Promise<void>;
  navigateToFileAndLoad(targetFolderPath: string, targetFileName: string): Promise<void>;
  navigateToUserFoldersAndLoad(): Promise<void>;
  navigateToErrorState(errorContent?: unknown): Promise<void>;
  navigateToLoginState(): void;
  navigateToFolderParentAndLoad(originalFolderPath: string): Promise<void>;
  /** Will take the current parameters of the application, load it and set the required app state */
  reloadCurrentState(): Promise<void>;
  /** Setup initial values, trying to avoid any rerenders */
  initialiseWithoutUpdate(state: DisplayState, arbitraryContent?: unknown): void;
  /**
   * Setup the internal display mode state and triger all events
   */
  private setAppMode;
  /** Setup the internal file display mode state */
  setFileListDisplayMode(mode: FileListDisplayMode): void;
  setFilesCompact(value: boolean): void;
  setEditTags(value: boolean): void;
  setDisplayComments(value: boolean): void;
  /** Public display internal  folder display setter */
  setFolderListDisplayMode(mode: FolderListDisplayMode): void;
  setArbitraryContent(content: unknown): void;
  /** The given element will request update whenever the app mode changes */
  subscribeToAppMode(element: AbstractThermalElement): void;
  /** The given element will request update whenever the folder display mode changes */
  subscribeToFolderDisplayMode(element: AbstractThermalElement): void;
  /** The given element will request update whenever the file display mode changes */
  subscribeToFileDisplayMode(element: AbstractThermalElement): void;
  subscribeToEditTags(element: AbstractThermalElement): void;
  subscribeToDisplayComments(element: AbstractThermalElement): void;
  subscribeToDisplayCompact(element: AbstractThermalElement): void;
  subscribeToNavigate(element: AbstractThermalElement, callback?: () => void): void;
  subscribeOnRecrteateContext(element: AbstractThermalElement, callback: () => void): void;
  /** Unsubscribe the element from all display mode changes */
  unsubscribeFromAll(element: AbstractThermalElement): void;
  /**
   * Can the current folder have a grid display?
   * - only if the subfolders have sime lrc files
   */
  canHaveGrid(subfolders: FolderInfo[]): boolean;
  /**
   * Is the current user allowed to edit the given folder?
   * - only when they may manage folders or files in it
   */
  canEditFolder(folder: FolderInfo): boolean;
  /** Is the user allowed to delete the folder?
   * - roots can delete everything
   * - other users can delete the folder only if they may manage folders in it AND the folder can contain files
   */
  canDeleteFolder(folder: FolderInfo): boolean;
  /** Is the user allowed to edit or upload files in the given folder? */
  canEditOrUploadFiles(folder: FolderInfo): boolean;
  /**
   * Is the user allowed to display comments at all?
   * - roots can allways
   * - logged in users can allways
   */
  canTurnOnComments(): boolean;
  /** Is the user allowed to turn on the tags editing?
   * - anonymous can not
   * - root can edit everything
   * - logged in users can edit only if they may manage files in the folder
   */
  canTurnOnTagsEditing(folder: FolderInfo): boolean;
}
//#endregion
//#region src/controllers/FileSelectionController.d.ts
interface AppWithFileSelectionController extends AppWithDisplayController {
  display: DisplayController;
  fileSelection: FileSelectionController;
}
/** Controls the selection inside the current app*/
declare class FileSelectionController implements ReactiveController {
  host: AppWithFileSelectionController;
  /** Unique identifier for the listeners */
  private UUID;
  /** Internal container for selection */
  private _selectedFiles;
  /** Dynamically converted upon every call - created from the _selectedFiles Set */
  get array(): FileInfo[];
  /** Callback called when the selection changes */
  private _onSelectionChange;
  constructor(host: AppWithFileSelectionController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostUpdated(): void;
  /**
   * Iterate over every selected file synchronously
   */
  forEverySelectedSync(callback: (file: FileInfo) => void): void;
  /**
   * Iterate over every selected file asynchronously using `Promise.all()s`
   */
  forEverySelectedAsync(callback: (file: FileInfo) => Promise<void>): Promise<void>;
  /**
   * Clear the current selection
   */
  clearSelection(): void;
  /**
   * Add a file to the current selection
   * @return boolean Whether the file was added
   */
  addToSelection(file: FileInfo): boolean;
  addMultipleToSelection(files: FileInfo[]): void;
  /**
   * Remove the file from the current selection
   * @return boolean Whether the file was removed
   */
  removeFromSelection(file: FileInfo): boolean;
  /**
   * Rerender the provided element whenever the selection changes
   */
  subscribeToSelectionChange(element: AbstractThermalElement): void;
  fileIsSelected(file: FileInfo): boolean;
  getSelectedFiles(): FileInfo[];
}
//#endregion
//#region src/controllers/FolderSelectionController.d.ts
interface AppWithFolderSelectionController extends AppWithDisplayController {
  display: DisplayController;
  folderSelection: FolderSelectionController;
}
/** Controls the selection inside the current app */
declare class FolderSelectionController implements ReactiveController {
  host: AppWithFolderSelectionController;
  /** Unique identifier for the listeners */
  private UUID;
  /** Internal container for selection */
  private _selectedFolders;
  /** Dynamically converted upon every call - created from the _selectedFiles Set */
  get array(): FolderInfo[];
  /** Callback called when the selection changes */
  private _onSelectionChange;
  constructor(host: AppWithFolderSelectionController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostUpdated(): void;
  /**
   * Iterate over every selected file synchronously
   */
  forEverySelectedSync(callback: (folder: FolderInfo) => void): void;
  /**
   * Iterate over every selected file asynchronously using `Promise.all()s`
   */
  forEverySelectedAsync(callback: (folder: FolderInfo) => Promise<void>): Promise<void>;
  /**
   * Clear the current selection
   */
  clearSelection(): void;
  /**
   * Add a file to the current selection
   * @return boolean Whether the file was added
   */
  addToSelection(folder: FolderInfo): boolean;
  addMultipleToSelection(folders: FolderInfo[]): void;
  /**
   * Remove the folder from the current selection
   * @return boolean Whether the folder was removed
   */
  removeFromSelection(folder: FolderInfo): boolean;
  /**
   * Rerender the provided element whenever the selection changes
   */
  subscribeToSelectionChange(element: AbstractThermalElement): void;
  folderIsSelected(folder: FolderInfo): boolean;
  getSelectedFiles(): FolderInfo[];
}
//#endregion
//#region src/abstraction/AbstractConnectedApp.d.ts
declare abstract class AbstractConnectedApp extends AbstractApp implements AppWithClientController, AppWithContentController, AppWithDisplayController, AppWithFileSelectionController, AppWithFolderSelectionController {
  /** Name of the listener event called upon initialisation of the connected app */
  static readonly INITIALISATION_LISTENER = "connected-app-initialisation";
  apiClient: ApiClient;
  /** The reactive reactive controller for the client connection */
  readonly client: ClientController;
  /** The reactive controller for contents */
  readonly content: ContentController;
  /** The settings controller for display parameters */
  readonly display: DisplayController;
  readonly fileSelection: FileSelectionController;
  readonly folderSelection: FolderSelectionController;
  readonly selectedFiles?: string | undefined;
  serverUrl: string;
  serverApiRoot: string;
  authUrl?: string | undefined;
  authToken?: string | undefined;
  folderPath?: string | undefined;
  fileName?: string | undefined;
  palette?: AvailableThermalPalette;
  from?: number;
  to?: number;
  folderListDisplayMode: FolderListDisplayMode;
  fileDisplayMode: FileListDisplayMode;
  fileDisplayCompact: boolean;
  editTags: boolean;
  displayComments: boolean;
  /** The crucial variable for routing the display */
  appState: DisplayState;
  label?: string;
  labelTooltip?: string;
  labelIcon?: string;
  labelIconStyle?: string;
  labelVariant?: string;
  /** States that have the registry around */
  private static readonly STATES_WITH_REGISTRY;
  /**
   * Should we render the Registry provider around the content?
   */
  private get hasRegistryProvider();
  /**
   * Should we render the Group provider around the content?
   */
  private get hasGroupProvider();
  static styles?: CSSResultGroup | undefined;
  /** Handle fullscreen changes from the browser (e.g. Escape key) to keep CSS class in sync */
  private _handleFullscreenChange;
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected toggleFullscreen(): void;
  /**
   * Renders the app wrapped in all necessary providers of internal context
   */
  protected renderAppWithInternals(innerContent: unknown): unknown;
  /**
   * Renders the inspector layout with header, content and tools
   * @returns
   */
  protected renderBrowserLayout(header: unknown, content: unknown): unknown;
  /** This method is used to setup the absolutely initial state of the application before any initialisation of the client takes place. */
  protected abstract setupInitialStateBeforeClientIsRead(): void;
  /**
   * This method is used for the initial content requests after the client is ready & logged in. It is called only once, in the same time as `this.client.onReadyForContentRequests`
   */
  protected abstract initialiseContentAfterClientReady(): Promise<void>;
  /** Checks whether a given template output is not empty */
  protected unknownIsNotEmpty(value: unknown): boolean;
  protected wrapContentIfNotEmpty(content: unknown, classes: string): unknown;
}
//#endregion
//#region src/apps/ConnectedBrowserApp.d.ts
declare class ConnectedBrowserApp extends AbstractConnectedApp {
  private managerProviderRef;
  get manager(): ThermalManager;
  protected renderStateLogin(): unknown;
  protected renderStateLoading(): unknown;
  /** Main router for the folder state display. Particular content depends on existence of files, subfolders and display mode setting. */
  protected renderStateFolder(): unknown;
  /** Render a folder's files */
  protected renderStateFolderFiles(): unknown;
  /** Render a folder's subfolders */
  protected renderStateFolderSubfolders(): unknown;
  /** Render a folder's grid of files */
  protected renderStateFolderGrid(): unknown;
  protected renderStateFile(): unknown;
  protected renderStateUser(): unknown;
  protected setupInitialStateBeforeClientIsRead(): void;
  protected initialiseContentAfterClientReady(): Promise<void>;
  private renderErrorState;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-browser-app": ConnectedBrowserApp;
  }
}
//#endregion
//#region src/abstraction/AbstractControlledConsumer.d.ts
declare abstract class AbstractControlledConsumer extends AbstractThermalElement {
  /**  */
  protected client: ClientController;
  protected content: ContentController;
  protected display: DisplayController;
  protected selectionFile: FileSelectionController;
  protected selectionFolder: FolderSelectionController;
  disconnectedCallback(): void;
}
//#endregion
//#region src/components/folder/upload/ConnectedUploadForm.d.ts
declare class ConnectedUploadForm extends AbstractControlledConsumer {
  folder: FolderInfo;
  label: string;
  prompt?: string;
  variant: string;
  private errorMessage;
  private plain;
  tooltip?: string;
  private allFiles;
  private pairedFiles;
  private unmatchedPngs;
  private isDragging;
  private infoMessage;
  onSuccess?: (files: File[]) => void;
  static styles?: CSSResultGroup;
  highlight(timeinms: number): void;
  protected handleSubmit(): Promise<boolean>;
  private addFiles;
  private handleMainFileChange;
  private handleInlineFileChange;
  private clearAllFiles;
  private removePairedGroup;
  private removePairedFile;
  private removeUnmatchedPng;
  private pairFiles;
  private handleDragOver;
  private handleDragLeave;
  private handleDrop;
  private handleZoneDragOver;
  private handleZoneDragLeave;
  private handleMainDrop;
  private handleInlineDrop;
  private openFileSelector;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private get hasFiles();
  private get maySubmit();
  private renderDropinArea;
  private renderFilePreview;
  private renderPairedFileRow;
  private renderPairedFiles;
  private renderUnmatchedFiles;
  private renderErrorMessage;
  private renderSubmitButton;
  protected renderPreviewAndSubmit(): unknown;
  private renderBottomDropzone;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-upload-form": ConnectedUploadForm;
  }
}
//#endregion
//#region src/components/folder/upload/ConnectedUploadDialog.d.ts
declare class ConnectedUploadDialog extends AbstractControlledConsumer {
  folder: FolderInfo;
  label: string;
  variant: BtnVariants;
  private errorMessage;
  private plain;
  tooltip?: string;
  private allFiles;
  private pairedFiles;
  private unmatchedPngs;
  private isDragging;
  private infoMessage;
  onSuccess?: (files: File[]) => void;
  static styles?: CSSResultGroup;
  protected handleSubmit(): Promise<boolean>;
  private addFiles;
  private handleMainFileChange;
  private handleInlineFileChange;
  private clearAllFiles;
  private removePairedGroup;
  private removePairedFile;
  private removeUnmatchedPng;
  private pairFiles;
  private handleZoneDragOver;
  private handleZoneDragLeave;
  private handleMainDrop;
  private handleInlineDrop;
  private openFileSelector;
  disconnectedCallback(): void;
  protected render(): unknown;
  private renderInitialDropzone;
  private renderPreview;
  private renderPairedTable;
  private renderPairedRow;
  private renderFilePreview;
  private renderUnmatchedFiles;
  private renderBottomDropzone;
  protected shouldRenderDialog(): boolean;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-upload-dialog": ConnectedUploadDialog;
  }
}
//#endregion
//#region src/components/folder/ConnectedFolderHeader.d.ts
declare class ConnectedFolderHeader extends AbstractControlledConsumer {
  onParentClick?: (folder: BreadcrumbItem) => void;
  protected icon: string;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  protected renderUpButton(): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-header": ConnectedFolderHeader;
  }
}
//#endregion
//#region src/components/folder/thumbs/AbstractFolderThumbnail.d.ts
declare class AbstractFolderThumbnail extends AbstractControlledConsumer {
  folder: FolderInfo;
  onClick?: (folder: FolderInfo) => void;
  onUpdate?: (folder: FolderInfo) => void;
  subfoldersCount?: number;
  get internalSlug(): string;
  static readonly styles: CSSResultGroup;
  connectedCallback(): void;
  protected handleActionClick(event: MouseEvent): void;
  protected renderCountWithIcon(count: number, icon: string, variant?: string): unknown;
  protected renderThumbnail(): import("lit").TemplateResult<1>;
  private shouldRenderThumbnailLrc;
  private shouldRenderThumbnailImage;
  private renderThumbnailWrapper;
  private renderThumbnailIcon;
  private renderThumbnailImage;
  private renderThumbnailLrc;
}
//#endregion
//#region src/components/folder/thumbs/ConnectedFolderRow.d.ts
declare class ConnectedFolderRow extends AbstractFolderThumbnail {
  static styles: CSSResultGroup;
  render(): TemplateResult;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-row": ConnectedFolderRow;
  }
}
//#endregion
//#region src/components/folder/thumbs/ConnectedFolderThumbnail.d.ts
declare class ConnectedFolderThumbnail extends AbstractFolderThumbnail {
  static styles: CSSResultGroup;
  render(): TemplateResult;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-thumbnail": ConnectedFolderThumbnail;
  }
}
//#endregion
//#region src/components/folder/listing/ConnetcedFileList.d.ts
declare class ConnectedFileList extends AbstractControlledConsumer {
  onFileClick: (file: FileInfo) => void;
  onChange?: (file: FileInfo) => void;
  onFileDelete?: (file: FileInfo) => void;
  protected icon: string;
  compact: boolean;
  displayMode: FileListDisplayMode;
  showDiscussion: boolean;
  editableTags: boolean;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  protected renderFile(file: FileInfo): TemplateResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-list": ConnectedFileList;
  }
}
//#endregion
//#region src/components/folder/listing/ConnectedSubfoldersGrid.d.ts
declare class ConnectedSubfoldersGrid extends AbstractControlledConsumer {
  slug: string;
  onFolderClick?: (folder: FolderInfo) => void;
  onFileClick?: (folder: FolderInfo, file: FileInfo) => void;
  onFileEdit?: (file: FileInfo) => void;
  protected registryController: RegistryController;
  private columnCount;
  selectedFolders: string[];
  onSelectionChange: (selected: string[]) => void;
  protected registry: ThermalRegistry;
  firstUpdated(_changedProperties: PropertyValues): void;
  disconnectedCallback(): void;
  updated(_changedProperties: PropertyValues): void;
  private renderHeader;
  private renderHeaderCell;
  private renderBody;
  private renderBodyRow;
  private renderBodyRowCellHeader;
  private renderBodyRowCellBody;
  private renderBodyRowCellBodyFile;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-subfolders-grid": ConnectedSubfoldersGrid;
  }
}
//#endregion
//#region src/components/folder/listing/ConnectedSubfolderList.d.ts
declare class ConnectedFolderFileList extends AbstractControlledConsumer {
  onFolderClick?: (folder: FolderInfo) => void;
  folderMode: FolderListDisplayMode;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  protected renderSubfolder(info: FolderInfo): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-subfolder-list": ConnectedFolderFileList;
  }
}
//#endregion
//#region src/components/user/LoginFormNew.d.ts
declare class ConnectedLoginForm extends AbstractControlledConsumer {
  prompt?: string;
  protected error?: string;
  protected message?: string;
  protected isLoggingIn: boolean;
  onLoginSuccess?: (identity: Identity) => void;
  protected get mayLogIn(): boolean;
  protected login?: string;
  protected password?: string;
  connectedCallback(): void;
  private valueIsNotEmpty;
  protected validateFieldInput(event: Event, field: "login" | "password"): void;
  protected handleKeyDown(event: KeyboardEvent): void;
  /**
   * The main operation that performs the request.
   * Shall never be triggered externally.
   */
  protected doLoginInternal(): Promise<void>;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-login-form": ConnectedLoginForm;
  }
}
//#endregion
//#region src/components/user/ConnectedUserButton.d.ts
declare class ConnectedUserButton extends AbstractControlledConsumer {
  protected message?: string;
  disableLogging: boolean;
  connectedCallback(): void;
  static styles?: CSSResultGroup | undefined;
  private doLogout;
  private doLogin;
  private handleBeforeClose;
  protected handleKeyDown(event: KeyboardEvent): void;
  protected renderLoginForm(): TemplateResult;
  protected renderUserLogoutNotice(): TemplateResult;
  private renderTriggerButton;
  private renderFallbackButton;
  private renderDialog;
  render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-user-button": ConnectedUserButton;
  }
}
//#endregion
//#region src/components/ConnectedShareDialog.d.ts
declare class ConnectedShareDialog extends AbstractControlledConsumer {
  private palette;
  private from?;
  private to?;
  private get _path();
  private get _folder();
  private get _file();
  private get _appState();
  private get _folderListDisplayMode();
  private get _fileListDisplayMode();
  private get _fileListDisplayCompact();
  private renderEntity;
  private renderLink;
  static styles?: CSSResultGroup | undefined;
  private assambleUrl;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-share-dialog": ConnectedShareDialog;
  }
}
//#endregion
//#region src/components/ConnectedBreadcrumb.d.ts
type BreadcrumbItemInternal = {
  onClick?: () => void;
  icon: string;
  iconStyle: string;
  label: string;
  tooltip?: string;
};
declare class ConnectedBreadcrumb extends AbstractControlledConsumer {
  onFolderClick?: (folder: BreadcrumbItem) => void;
  onUserClick?: () => void;
  private items;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  protected update(changedProperties: PropertyValues): void;
  disconnectedCallback(): void;
  private refreshItems;
  private calculateItems;
  protected renderItem(item: BreadcrumbItemInternal, index: number): TemplateResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-breadcrumb": ConnectedBreadcrumb;
  }
}
//#endregion
//#region src/components/selection/ConnectedFolderSelectionCheckbox.d.ts
/** Connected folder selection checkbox component */
declare class ConnectedFolderSelectionCheckbox extends AbstractControlledConsumer {
  folder: FolderInfo;
  connectedCallback(): void;
  private renderCheckbox;
  private renderButton;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-selection-checkbox": ConnectedFolderSelectionCheckbox;
  }
}
//#endregion
//#region src/components/selection/ConnectedFolderSelectionActions.d.ts
declare class ConnectedFolderSelectionActions extends AbstractControlledConsumer {
  private progress;
  private total;
  private dialogDeleteRef;
  private dialogSaveAnalysesRef;
  private dialogClearAnalysesRef;
  private dialogMoveRef;
  private group?;
  connectedCallback(): void;
  private getCount;
  private renderTrigger;
  private renderOptionClear;
  private renderOptionAll;
  private renderOptionGrid;
  private renderDialogGrid;
  private renderOptionMove;
  private renderDialogMove;
  static styles?: CSSResultGroup | undefined;
  private renderDropdownSelection;
  private renderArrow;
  private renderDropdownActions;
  private renderDalogs;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-selection-actions": ConnectedFolderSelectionActions;
  }
}
//#endregion
//#region src/components/selection/ConnectedFileSelectionCheckbox.d.ts
/** Connected file selection checkbox component */
declare class ConnectedFileSelectionCheckbox extends AbstractControlledConsumer {
  file: FileInfo;
  connectedCallback(): void;
  private renderCheckbox;
  private renderButton;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-selection-checkbox": ConnectedFileSelectionCheckbox;
  }
}
//#endregion
//#region src/components/selection/ConnectedFileSelectionActions.d.ts
declare class ConnectedFileSelectionActions extends AbstractControlledConsumer {
  private progress;
  private total;
  private dialogDeleteRef;
  private dialogSaveAnalysesRef;
  private dialogClearAnalysesRef;
  private dialogMoveRef;
  private group?;
  connectedCallback(): void;
  private getCount;
  private renderTrigger;
  private renderOptionClear;
  private renderOptionAll;
  private renderOptionDelete;
  private renderDialogDelete;
  private renderOptionClearAnalyses;
  private renderDialogClearAnalyses;
  private renderOptionMove;
  private renderDialogMove;
  private renderOptionDownload;
  static styles?: CSSResultGroup | undefined;
  private renderDropdownSelection;
  private renderArrow;
  private renderDropdownActions;
  private renderDalogs;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-selection-actions": ConnectedFileSelectionActions;
  }
}
//#endregion
//#region src/components/selection/move/ConnectedLocationSelector.d.ts
declare enum LocationSelectorMode {
  FOLDER = "folder",
  FILE = "file"
}
declare class ConnectedLocationSelector extends AbstractControlledConsumer {
  private dialogRef;
  asDialogue: boolean;
  dialogTitle?: string;
  mode: LocationSelectorMode;
  onSelect?: (selectedPath: string) => void;
  operationLabel: string;
  private _loading;
  private _currentFolderInfo?;
  private _currentSubfolders?;
  private _userFolders?;
  private _breadcrumb?;
  get selectedFolderName(): string | undefined;
  get selectedFolderPath(): string | undefined;
  openDialogue(): void;
  closeDialogue(): void;
  connectedCallback(): void;
  private _onPathChange;
  static styles?: CSSResultGroup | undefined;
  private renderBreadcrumbItemInternal;
  private renderBreadcrumbItem;
  private renderBreadcrumb;
  private renderBackButton;
  private renderFolderSelector;
  private folderIsValidForFiles;
  private folderIsValidForFolders;
  private renderNoSubfolders;
  private renderFolderList;
  private getEllipsisName;
  private wrapInDialogue;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-location-selector": ConnectedLocationSelector;
  }
}
//#endregion
//#region src/components/folder/crud/ConnectedFolderMoveDialog.d.ts
declare class ConnectedFolderMoveDialog extends AbstractControlledConsumer {
  folder: FolderInfo;
  private selectionRef;
  private renderTrigger;
  private renderDialog;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-move-dialog": ConnectedFolderMoveDialog;
  }
}
//#endregion
//#region src/components/folder/crud/AbstractFolderDialog.d.ts
/** A base class for all dialogs related to folder CRUD operations. */
declare abstract class AbstractFolderDialog extends AbstractControlledConsumer {
  folder: FolderInfo;
  icon?: string;
  iconStyle?: string;
  variant?: BtnVariants;
  size?: BtnSizes;
  plain?: boolean;
  disabled?: boolean;
  interactive?: boolean;
  tooltip?: string;
  label?: string;
  /** Internally defined label of the close button might be modified only internally. */
  protected closeLabel: string;
  protected dialogLabel: string;
  /** A callback that is triggered upon successfull operation in the dialog. */
  onSuccess?: (folder: FolderInfo) => void;
  /** Implement the function that is triggered before the dialog is closed */
  protected abstract beforeClose(): Promise<boolean>;
  /** Function for the main content of the dialog window. */
  protected abstract renderContent(): unknown;
  /** Optionally render additional buttons in the dialog footer. */
  protected abstract renderButtons(): unknown;
  private dialogRef;
  protected close(): void;
  static styles?: CSSResultGroup;
  protected abstract shouldRenderDialog(): boolean;
  protected render(): unknown;
}
//#endregion
//#region src/components/folder/crud/ConnectedFolderEditDialog.d.ts
declare class ConnectedFolderEditDialog extends AbstractFolderDialog {
  protected closeLabel: string;
  protected dialogLabel: string;
  private folderName;
  private folderDescription;
  private errorMessage;
  onSuccess?: (folder: FolderInfo) => void;
  static styles?: CSSResultGroup;
  protected firstUpdated(): void;
  protected beforeClose(): Promise<boolean>;
  private handleTitleChange;
  private handleDescriptionChange;
  protected renderContent(): unknown;
  protected renderButtons(): unknown;
  protected shouldRenderDialog(): boolean;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-edit-dialog": ConnectedFolderEditDialog;
  }
}
//#endregion
//#region src/components/folder/crud/ConnectedFolderDeleteDialog.d.ts
declare class ConnectedFolderDeleteDialog extends AbstractFolderDialog {
  protected closeLabel: string;
  protected dialogLabel: string;
  onSuccess?: (folder: FolderInfo) => void;
  private errorMessage;
  static styles?: CSSResultGroup;
  protected beforeClose(): Promise<boolean>;
  protected shouldRenderDialog(): boolean;
  protected renderContent(): unknown;
  protected renderButtons(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-delete-dialog": ConnectedFolderDeleteDialog;
  }
}
//#endregion
//#region src/components/folder/crud/ConnectedFolderCreateDialog.d.ts
declare class ConnectedFolderCreateDialog extends AbstractFolderDialog {
  protected closeLabel: string;
  protected dialogLabel: string;
  private folderName;
  private folderDescription;
  private errorMessage;
  onSuccess?: (folder: FolderInfo) => void;
  private mayHaveFiles;
  static styles?: CSSResultGroup;
  protected beforeClose(): Promise<boolean>;
  private handleInputChange;
  private handleDescriptionChange;
  private renderToggleButton;
  protected renderContentMode(): unknown;
  protected renderContent(): unknown;
  protected renderButtons(): unknown;
  protected shouldRenderDialog(): boolean;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-create-dialog": ConnectedFolderCreateDialog;
  }
}
//#endregion
//#region src/components/folder/crud/ConnectedFolderContentModeSwitch.d.ts
declare class ConnectedFolderContentModeSwitch extends AbstractControlledConsumer {
  connectedCallback(): void;
  private userMayEdit;
  private folderIsEditable;
  private renderCounts;
  private getFilesCount;
  private getSubfoldersCount;
  private renderSlot;
  private updateFolderMayHaveFiles;
  private renderFiles;
  private renderSubfolders;
  private renderSwitch;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-folder-content-mode-switch": ConnectedFolderContentModeSwitch;
  }
}
//#endregion
//#region src/components/file/ConnectedFileThumbnail.d.ts
declare class ConnectedFileThumbnail extends AbstractControlledConsumer {
  protected group?: ThermalGroup;
  protected instanceRef: Ref<FileProviderElement>;
  file: FileInfo;
  folder: FolderInfo;
  onFileClick: (file: FileInfo) => void;
  onFileDelete?: (file: FileInfo) => void;
  compact: boolean;
  protected displayMode: FileListDisplayMode;
  showDiscussion: boolean;
  editableTags: boolean;
  protected hasDisplayedAnalysis: boolean;
  protected icon: string;
  protected get fileObject(): import("@labirthermal/core").ThermalFileInstance | undefined;
  firstUpdated(_changedProperties: PropertyValues): void;
  protected hydrate(): void;
  protected dehydrate(): void;
  updated(changedProperties: PropertyValues<ConnectedFileThumbnail>): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  protected renderTime(): unknown;
  protected renderLabel(): unknown;
  protected renderDescription(): unknown;
  protected renderSelectBox(): unknown;
  protected renderActionDetail(): unknown;
  protected renderActionEdit(): unknown;
  protected renderActionComments(): unknown;
  protected renderActionDelete(): unknown;
  protected renderNumAnalyses(): unknown;
  restoreAnalyses(): void;
  protected renderAnalyses(): unknown;
  static styles?: CSSResultGroup | undefined;
  protected render(): TemplateResult;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-thumbnail": ConnectedFileThumbnail;
  }
}
//#endregion
//#region src/components/file/ConnectedFileTags.d.ts
type TagSizes = "sm" | "md";
declare class ConnectedFileTags extends AbstractControlledConsumer {
  editable: boolean;
  inline?: boolean;
  size?: TagSizes;
  file: FileInfo;
  folder: FolderInfo;
  onChange: (file: FileInfo) => void;
  protected check: string;
  connectedCallback(): void;
  protected handleTagClick(slug: string): Promise<void>;
  protected hasTag(slug: string): boolean;
  protected getContrastColor(backgroundColor: string): string;
  protected renderTagButton(slug: string, tag: TagInfo): import("lit").TemplateResult<1>;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-tags": ConnectedFileTags;
  }
}
//#endregion
//#region src/components/file/ConnectedFileMoveDialog.d.ts
declare class ConnectedFileMoveDialog extends AbstractControlledConsumer {
  file?: FileInfo;
  private dialogRef;
  connectedCallback(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-move-dialog": ConnectedFileMoveDialog;
  }
}
//#endregion
//#region src/components/file/ConnectedFileHeader.d.ts
declare class ConnectedFileHeader extends AbstractControlledConsumer {
  connectedCallback(): void;
  static styles?: CSSResultGroup | undefined;
  protected renderColophon(): unknown;
  protected renderUpButton(): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-header": ConnectedFileHeader;
  }
}
//#endregion
//#region src/components/file/ConnectedFileEditDialog.d.ts
declare class ConnectedFileEditDialog extends AbstractControlledConsumer {
  label: string;
  variant?: BtnVariants;
  size?: BtnSizes;
  plain?: boolean;
  file: FileInfo;
  private fileLabel;
  private fileDescription;
  private errorMessage;
  static styles?: CSSResultGroup;
  protected firstUpdated(): void;
  protected handleSubmit(): Promise<boolean>;
  private handleLabelChange;
  private handleDescriptionChange;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-edit-dialog": ConnectedFileEditDialog;
  }
}
//#endregion
//#region src/components/file/ConnectedFileDeleteDialog.d.ts
declare class ConnectedFileDeleteDialog extends AbstractControlledConsumer {
  showLabel: boolean;
  label: string;
  variant?: BtnVariants;
  size: BtnSizes;
  plain: boolean;
  file: FileInfo;
  folder: FolderInfo;
  onDelete?: (file: FileInfo) => void;
  protected isOpen: boolean;
  protected isDeleting: boolean;
  protected error?: string;
  static styles?: CSSResultGroup | undefined;
  protected handleDelete(): Promise<boolean>;
  protected mayDelete(): boolean;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-delete-dialog": ConnectedFileDeleteDialog;
  }
}
//#endregion
//#region src/components/file/comments/ConnectedFileComments.d.ts
declare class ConnectedFileComments extends AbstractControlledConsumer {
  file: FileInfo;
  folder: FolderInfo;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  firstUpdated(): void;
  updated(): void;
  private scrollToBottom;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-comments": ConnectedFileComments;
  }
}
//#endregion
//#region src/components/file/comments/ConnectedFileComment.d.ts
declare class ConnectedFileComment extends AbstractControlledConsumer {
  comment: Comment;
  file: FileInfo;
  folder: FolderInfo;
  onChange?: (file: FileInfo) => void;
  protected error?: string;
  protected isEditing: boolean;
  static styles?: CSSResultGroup | undefined;
  connectedCallback(): void;
  protected handleDelete(): Promise<void>;
  protected mayManage(): boolean;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-comment": ConnectedFileComment;
  }
}
//#endregion
//#region src/components/file/analysis/ConnectedFileAnalysisButtons.d.ts
declare class ConnectedFileAnalysisButtons extends AbstractControlledConsumer {
  label: string;
  tooltip: string;
  icon: string;
  iconStyle: string;
  info: FileInfo;
  enableCopyToAll: boolean;
  protected analyses: string[];
  protected hasChanged: boolean;
  private file?;
  connectedCallback(): void;
  updated(_changedProperties: PropertyValues): void;
  onInstanceCreated(instance: ThermalFileInstance): void;
  protected getCurrentAnalysisState(instance: ThermalFileInstance): string[];
  protected renderCopyToAllButton(): unknown;
  private renderDeleteButton;
  private renderServerSaveButton;
  private renderServerRestoreButton;
  private renderServerDeleteButton;
  private renderDisplaySlot;
  private renderServerSlot;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-analysis-buttons": ConnectedFileAnalysisButtons;
  }
}
//#endregion
//#region src/components/configuration/AbstractConfigElement.d.ts
declare abstract class AbstractConfigElement extends AbstractControlledConsumer {
  static styles?: CSSResultGroup | undefined;
  protected renderToggle(label: string, checked: boolean, onChange: (checked: boolean) => void): unknown;
  protected renderToggleButton(active: boolean, onClick: () => void, icon?: string, label?: string, tooltip?: string): unknown;
}
//#endregion
//#region src/components/configuration/ConnectedConfigSubfolderMode.d.ts
declare class ConnectedConfigSubfolderMode extends AbstractConfigElement {
  connectedCallback(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-config-subfolder-mode": ConnectedConfigSubfolderMode;
  }
}
//#endregion
//#region src/components/configuration/ConnectedConfigFileDisplayMode.d.ts
declare class ConnectedConfigFileMode extends AbstractConfigElement {
  connectedCallback(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-config-file-display-mode": ConnectedConfigFileMode;
  }
}
//#endregion
//#region src/components/configuration/ConnectedConfigFileContentMode.d.ts
declare class ConnectedConfigFileContentMode extends AbstractConfigElement {
  connectedCallback(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-config-file-content-mode": ConnectedConfigFileContentMode;
  }
}
//#endregion
//#region src/components/file/comments/ControlledFileCommentForm.d.ts
declare class ConnectedFileCommentForm extends AbstractControlledConsumer {
  comment?: Comment;
  file: FileInfo;
  folder: FolderInfo;
  onChange?: (file: FileInfo) => void;
  protected error?: string;
  protected message: string;
  connectedCallback(): void;
  updated(changedProperties: Map<string | number | symbol, unknown>): void;
  static styles?: CSSResultGroup | undefined;
  protected handleSubmit(event: Event): Promise<void>;
  protected handleMessageChange(event: Event): void;
  protected handleKeyDown(event: KeyboardEvent): void;
  protected mayManage(): boolean;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "connected-file-comment-form": ConnectedFileCommentForm;
  }
}
//#endregion
//#region src/iifeCatalog.d.ts
/**
 * All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
 * @see {@link defineAllWebcomponents}
 */
export declare const elementsAll: {
  readonly "connected-file-comment-form": typeof ConnectedFileCommentForm;
  readonly "connected-config-file-content-mode": typeof ConnectedConfigFileContentMode;
  readonly "connected-config-file-display-mode": typeof ConnectedConfigFileMode;
  readonly "connected-config-subfolder-mode": typeof ConnectedConfigSubfolderMode;
  readonly "connected-file-analysis-buttons": typeof ConnectedFileAnalysisButtons;
  readonly "connected-file-comment": typeof ConnectedFileComment;
  readonly "connected-file-comments": typeof ConnectedFileComments;
  readonly "connected-file-delete-dialog": typeof ConnectedFileDeleteDialog;
  readonly "connected-file-edit-dialog": typeof ConnectedFileEditDialog;
  readonly "connected-file-header": typeof ConnectedFileHeader;
  readonly "connected-file-move-dialog": typeof ConnectedFileMoveDialog;
  readonly "connected-file-tags": typeof ConnectedFileTags;
  readonly "connected-file-thumbnail": typeof ConnectedFileThumbnail;
  readonly "connected-folder-content-mode-switch": typeof ConnectedFolderContentModeSwitch;
  readonly "connected-folder-create-dialog": typeof ConnectedFolderCreateDialog;
  readonly "connected-folder-delete-dialog": typeof ConnectedFolderDeleteDialog;
  readonly "connected-folder-edit-dialog": typeof ConnectedFolderEditDialog;
  readonly "connected-folder-move-dialog": typeof ConnectedFolderMoveDialog;
  readonly "connected-location-selector": typeof ConnectedLocationSelector;
  readonly "connected-file-selection-actions": typeof ConnectedFileSelectionActions;
  readonly "connected-file-selection-checkbox": typeof ConnectedFileSelectionCheckbox;
  readonly "connected-folder-selection-actions": typeof ConnectedFolderSelectionActions;
  readonly "connected-folder-selection-checkbox": typeof ConnectedFolderSelectionCheckbox;
  readonly "connected-breadcrumb": typeof ConnectedBreadcrumb;
  readonly "connected-share-dialog": typeof ConnectedShareDialog;
  readonly "connected-user-button": typeof ConnectedUserButton;
  readonly "connected-login-form": typeof ConnectedLoginForm;
  readonly "connected-subfolder-list": typeof ConnectedFolderFileList;
  readonly "connected-subfolders-grid": typeof ConnectedSubfoldersGrid;
  readonly "connected-file-list": typeof ConnectedFileList;
  readonly "connected-folder-thumbnail": typeof ConnectedFolderThumbnail;
  readonly "connected-folder-row": typeof ConnectedFolderRow;
  readonly "connected-folder-header": typeof ConnectedFolderHeader;
  readonly "connected-upload-dialog": typeof ConnectedUploadDialog;
  readonly "connected-upload-form": typeof ConnectedUploadForm;
  readonly "connected-browser-app": typeof ConnectedBrowserApp;
};
export declare const isLabirthermalWebcomponent: (tag: string) => boolean;
//#endregion
export {};
//# sourceMappingURL=index.export.d.mts.map