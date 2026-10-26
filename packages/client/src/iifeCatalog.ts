import { ConnectedBrowserApp } from "./apps/ConnectedBrowserApp";
import { ConnectedUploadForm } from "./components/folder/upload/ConnectedUploadForm";
import { ConnectedUploadDialog } from "./components/folder/upload/ConnectedUploadDialog";
import { ConnectedFolderHeader } from "./components/folder/ConnectedFolderHeader";
import { ConnectedFolderRow } from "./components/folder/thumbs/ConnectedFolderRow";
import { ConnectedFolderThumbnail } from "./components/folder/thumbs/ConnectedFolderThumbnail";
import { ConnectedFileList } from "./components/folder/listing/ConnetcedFileList";
import { ConnectedSubfoldersGrid } from "./components/folder/listing/ConnectedSubfoldersGrid";
import { ConnectedFolderFileList } from "./components/folder/listing/ConnectedSubfolderList";
import { ConnectedLoginForm } from "./components/user/LoginFormNew";
import { ConnectedUserButton } from "./components/user/ConnectedUserButton";
import { ConnectedShareDialog } from "./components/ConnectedShareDialog";
import { ConnectedBreadcrumb } from "./components/ConnectedBreadcrumb";
import { ConnectedFolderSelectionCheckbox } from "./components/selection/ConnectedFolderSelectionCheckbox";
import { ConnectedFolderSelectionActions } from "./components/selection/ConnectedFolderSelectionActions";
import { ConnectedFileSelectionCheckbox } from "./components/selection/ConnectedFileSelectionCheckbox";
import { ConnectedFileSelectionActions } from "./components/selection/ConnectedFileSelectionActions";
import { ConnectedLocationSelector } from "./components/selection/move/ConnectedLocationSelector";
import { ConnectedFolderMoveDialog } from "./components/folder/crud/ConnectedFolderMoveDialog";
import { ConnectedFolderEditDialog } from "./components/folder/crud/ConnectedFolderEditDialog";
import { ConnectedFolderDeleteDialog } from "./components/folder/crud/ConnectedFolderDeleteDialog";
import { ConnectedFolderCreateDialog } from "./components/folder/crud/ConnectedFolderCreateDialog";
import { ConnectedFolderContentModeSwitch } from "./components/folder/crud/ConnectedFolderContentModeSwitch";
import { ConnectedFileThumbnail } from "./components/file/ConnectedFileThumbnail";
import { ConnectedFileTags } from "./components/file/ConnectedFileTags";
import { ConnectedFileMoveDialog } from "./components/file/ConnectedFileMoveDialog";
import { ConnectedFileHeader } from "./components/file/ConnectedFileHeader";
import { ConnectedFileEditDialog } from "./components/file/ConnectedFileEditDialog";
import { ConnectedFileDeleteDialog } from "./components/file/ConnectedFileDeleteDialog";
import { ConnectedFileComments } from "./components/file/comments/ConnectedFileComments";
import { ConnectedFileComment } from "./components/file/comments/ConnectedFileComment";
import { ConnectedFileAnalysisButtons } from "./components/file/analysis/ConnectedFileAnalysisButtons";
import { ConnectedConfigSubfolderMode } from "./components/configuration/ConnectedConfigSubfolderMode";
import { ConnectedConfigFileMode } from "./components/configuration/ConnectedConfigFileDisplayMode";
import { ConnectedConfigFileContentMode } from "./components/configuration/ConnectedConfigFileContentMode";
import { ConnectedFileCommentForm } from "./components/file/comments/ControlledFileCommentForm";

const connectedAppElements = {
    "connected-file-comment-form": ConnectedFileCommentForm,
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
    "connected-file-tags": ConnectedFileTags,
    "connected-file-thumbnail": ConnectedFileThumbnail,
    "connected-folder-content-mode-switch": ConnectedFolderContentModeSwitch,
    "connected-folder-create-dialog": ConnectedFolderCreateDialog,
    "connected-folder-delete-dialog": ConnectedFolderDeleteDialog,
    "connected-folder-edit-dialog": ConnectedFolderEditDialog,
    "connected-folder-move-dialog": ConnectedFolderMoveDialog,
    "connected-location-selector": ConnectedLocationSelector,
    "connected-file-selection-actions": ConnectedFileSelectionActions,
    "connected-file-selection-checkbox": ConnectedFileSelectionCheckbox,
    "connected-folder-selection-actions": ConnectedFolderSelectionActions,
    "connected-folder-selection-checkbox": ConnectedFolderSelectionCheckbox,
    "connected-breadcrumb": ConnectedBreadcrumb,
    "connected-share-dialog": ConnectedShareDialog,
    "connected-user-button": ConnectedUserButton,
    "connected-login-form": ConnectedLoginForm,
    "connected-subfolder-list": ConnectedFolderFileList,
    "connected-subfolders-grid": ConnectedSubfoldersGrid,
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