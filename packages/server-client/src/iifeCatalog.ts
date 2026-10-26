import { ConnectedBrowserApp } from "./controllers/apps/ConnectedBrowserApp";
import { ConnectedUploadForm } from "./controllers/components/folder/upload/ConnectedUploadForm";
import { ConnectedUploadDialog } from "./controllers/components/folder/upload/ConnectedUploadDialog";
import { ConnectedFolderHeader } from "./controllers/components/folder/ConnectedFolderHeader";
import { ConnectedFolderRow } from "./controllers/components/folder/thumbs/ConnectedFolderRow";
import { ConnectedFolderThumbnail } from "./controllers/components/folder/thumbs/ConnectedFolderThumbnail";
import { ConnectedFileList } from "./controllers/components/folder/listing/ConnetcedFileList";
import { SubfoldersGrid } from "./controllers/components/folder/listing/ConnectedSubfoldersGrid";
import { ConnectedFolderFileList } from "./controllers/components/folder/listing/ConnectedSubfolderList";
import { ConnectedLoginForm } from "./controllers/components/user/LoginFormNew";
import { UserButton } from "./controllers/components/user/ConnectedUserButton";
import { FolderEditDialogNew } from "./controllers/components/FolderEditDialogNew";
import { ConnectedShareDialog } from "./controllers/components/ConnectedShareDialog";
import { ConnectedBreadcrumb } from "./controllers/components/ConnectedBreadcrumb";
import { ConnectedFolderSelectionCheckbox } from "./controllers/components/selection/ConnectedFolderSelectionCheckbox";
import { ConnectedFolderSelectionActions } from "./controllers/components/selection/ConnectedFolderSelectionActions";
import { ConnectedFileSelectionCheckbox } from "./controllers/components/selection/ConnectedFileSelectionCheckbox";
import { ConnectedFileSelectionActions } from "./controllers/components/selection/ConnectedFileSelectionActions";
import { ConnectedLocationSelector } from "./controllers/components/selection/move/ConnectedLocationSelector";
import { ConnectedFolderMoveDialog } from "./controllers/components/folder/crud/ConnectedFolderMoveDialog";
import { FolderEditDialog } from "./controllers/components/folder/crud/ConnectedFolderEditDialog";
import { FolderDeleteDialog } from "./controllers/components/folder/crud/ConnectedFolderDeleteDialog";
import { FolderAddDialog } from "./controllers/components/folder/crud/ConnectedFolderCreateDialog";
import { ConnectedFolderContentModeSwitch } from "./controllers/components/folder/crud/ConnectedFolderContentModeSwitch";
import { FileThumbnail } from "./controllers/components/file/ConnectedFileThumbnail";
import { ControlledFileTags } from "./controllers/components/file/ConnectedFileTags";
import { ConnectedFileMoveDialog } from "./controllers/components/file/ConnectedFileMoveDialog";
import { ConnectedFileHeader } from "./controllers/components/file/ConnectedFileHeader";
import { ConnectedFileEditDialog } from "./controllers/components/file/ConnectedFileEditDialog";
import { ConnectedFileDeleteDialog } from "./controllers/components/file/ConnectedFileDeleteDialog";
import { ConnectedFileComments } from "./controllers/components/file/comments/ConnectedFileComments";
import { ConnectedFileComment } from "./controllers/components/file/comments/ConnectedFileComment";
import { ConnectedFileAnalysisButtons } from "./controllers/components/file/analysis/ConnectedFileAnalysisButtons";
import { ConnectedConfigSubfolderMode } from "./controllers/components/configuration/ConnectedConfigSubfolderMode";
import { ConnectedConfigFileMode } from "./controllers/components/configuration/ConnectedConfigFileDisplayMode";
import { ConnectedConfigFileContentMode } from "./controllers/components/configuration/ConnectedConfigFileContentMode";

const connectedAppElements = {
    "connected-config-file-content-mode": ConnectedConfigFileContentMode,
    "connected-config-file-display-mode": ConnectedConfigFileMode,
    "connected-config-subfolder-mode": ConnectedConfigSubfolderMode,
    "connected-file-analysis-buttons": ConnectedFileAnalysisButtons,
    "connected-file-comment": ConnectedFileComment,
    "connected-file-comments": ConnectedFileComments,
    "connected-file-delete-dialog": ConnectedFileDeleteDialog,
    "connected-file-edit-dialog": ConnectedFileEditDialog,
    "connected-file-header": ConnectedFileHeader,
    "connected-file-move-dialog": ConnectedFileMoveDialog,
    "connected-file-tags": ControlledFileTags,
    "connected-file-thumbnail": FileThumbnail,
    "connected-folder-content-mode-switch": ConnectedFolderContentModeSwitch,
    "connected-folder-create-dialog": FolderAddDialog,
    "connected-folder-delete-dialog": FolderDeleteDialog,
    "connected-folder-edit-dialog": FolderEditDialog,
    "connected-folder-move-dialog": ConnectedFolderMoveDialog,
    "connected-location-selector": ConnectedLocationSelector,
    "connected-file-selection-actions": ConnectedFileSelectionActions,
    "connected-file-selection-checkbox": ConnectedFileSelectionCheckbox,
    "connected-folder-selection-actions": ConnectedFolderSelectionActions,
    "connected-folder-selection-checkbox": ConnectedFolderSelectionCheckbox,
    "connected-breadcrumb": ConnectedBreadcrumb,
    "connected-share-dialog": ConnectedShareDialog,
    "folder-edit-dialog-new": FolderEditDialogNew,
    "connected-user-button": UserButton,
    "connected-login-form": ConnectedLoginForm,
    "connected-subfolder-list": ConnectedFolderFileList,
    "connected-subfolders-grid": SubfoldersGrid,
    "connected-file-list": ConnectedFileList,
    "connected-folder-thumbnail": ConnectedFolderThumbnail,
    "connected-folder-row": ConnectedFolderRow,
    "connected-folder-header": ConnectedFolderHeader,
    "connected-upload-dialog": ConnectedUploadDialog,
    "connected-upload-form": ConnectedUploadForm,
    "connected-browser-app": ConnectedBrowserApp
}

/** 
 * All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
 * @see {@link defineAllWebcomponents}
 */
export const elementsAll = {
    ...connectedAppElements
} as const;

export const isLabirthermalWebcomponent = (tag: string): boolean => {
    return tag in elementsAll;
};