import { createContext } from "@lit/context";
import type { ClientController } from "./ClientController";
import type { ContentController } from "./ContentController";
import type { DisplayController } from "./DisplayController";
import type { FileSelectionController } from "./FileSelectionController";
import type { FolderSelectionController } from "./FolderSelectionController";

export const ControlledClientContext = createContext<ClientController>("controlled-client-controller");

export const ControlledContentContext = createContext<ContentController>("controlled-content-controller");

export const DisplayControllerContext = createContext<DisplayController>("connected-display-controller");

export const FileSelectionControllerContext = createContext<FileSelectionController>("connected-file-selection-controller");

export const FolderSelectionControllerContext = createContext<FolderSelectionController>("connected-folder-selection-controller");