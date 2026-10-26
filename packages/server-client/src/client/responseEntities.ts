/** 
 * @package `@labirthermal/client`
 */
export type ServerInfo = {
  url: string,
  name?: string,
  description?: string,
  version: string
}

/** 
 * @package `@labirthermal/client`
 */
export type Identity = {

    user: string,
    path: string,
    token: string,
    meta: {
        login: string,
        name: string,
        description: string | null,
        institution: string | null,
        is_root: boolean,
        email: string
    }

}

/** 
 * @package `@labirthermal/client`
 */
export type TagInfo = {
    name: string,
    description?: string | null,
    color?: string | null
}

/** 
 * @package `@labirthermal/client`
 */
export interface ApiEditableEntity {

}

/** 
 * @package `@labirthermal/client`
 */
export type BreadcrumbItem = {
  name: string,
  slug: string,
  path: string,
  protected: boolean,
  current: boolean,
  type: "folder" | "server" | "user"
}

/** 
 * @package `@labirthermal/client`
 */
export interface FolderInfo extends ApiEditableEntity {
  entity: "folder";
  api: string;
  path: string;
  slug: string;
  name: string;
  description: string | null,
  thumb: string | null,
  meta: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
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
export type Comment = {
  message: string
  timestamp: number
  by: {
    name: string
    login: string
    institution: string | null
    description: string | null
  }
}

/** 
 * @package `@labirthermal/client`
 */
export interface FileInfo extends ApiEditableEntity{
  entity: "file",
  /** URL address of the file itself */
  url: string,
  /** Optioanl label of the file */
  label: string | null,
  /** Optional description of the file */
  description: string | null,
  /** Name of the file including its extension */
  fileName: string,
  /** Slug of the folder in which this file is located */
  folder: string,
  /** Slug of the parent folder of the `folder` */
  parent: string,
  /** A path of the `folder` relative to the www/data. Usable in all api calls. */
  path: string,
  /** URL of the visual image or false */
  visual: string | false,
  /** URL of the preview file or undefined */
  preview: string | false,
  /** Timestamp of the file stored in its .json file. */
  timestamp: number,
  /** Timestamp of the upload date */
  uploaded: number,
  uploadedby: null | {
    login: string,
    name: string,
    description: string | null,
    institution: string | null
  },
  /** This file is assigned to these tags. Tags may be defined in `_tags.json` of the `parent` folder */
  tags: string[],
  /** A human-redable date - is taken from the timestamp */
  dateHuman: string,
  /** An api root of this file may serve for calling subsequent requests related to this file */
  apiRoot: string,
  /** Storage of the analyses */
  analyses: string[]
  /** Stoage of comments */
  comments: Comment[]
}

/** 
 * @package `@labirthermal/client`
 */
export type TagDefinition = {
  slug: string,
  count: number,
  meta?: {
    name?: string,
    description?: string,
    color?: string
  }
}

/** 
 * @package `@labirthermal/client`
 */
export type TagDefinitions = {
  [index: string]: TagDefinition;
}

/** 
 * @package `@labirthermal/client`
 */
export type TagWithContent = TagDefinition & {
  folders: {
    [index:string]: FileInfo[]
  }
}

/** 
 * @package `@labirthermal/client`
 */
export type TagsWithContent = {
  [index: string]: TagWithContent;
}

/** 
 * @package `@labirthermal/client`
 */
export type TreeItem = {
  entity: "treeitem",
  path: string,
  api: string,
  slug: string,
  name: string,
  descriotion: string | null,
  lrc_count: number,
  protected: boolean,
  may_have_files: boolean,
  metadata: Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  subfolders: TreeItem[]
}

/**
 * @package `@labirthermal/client`
 * @deprecated updating of tags should go without this object. There should be a type for tags in response...  
 */
export type TagUpdateObject = {
  [slug: string]: {
    name: string;
    description?: string;
    color?: string;
  };
};
