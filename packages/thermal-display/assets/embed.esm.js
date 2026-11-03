Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let lit = require("lit");
let lit_directives_ref_js = require("lit/directives/ref.js");
let _lit_context = require("@lit/context");
let lit_decorators_js = require("lit/decorators.js");
let lit_directives_cache_js = require("lit/directives/cache.js");
let lit_directives_if_defined_js = require("lit/directives/if-defined.js");
let _labirthermal_webcomponents = require("@labirthermal/webcomponents");
let lit_directive_js = require("lit/directive.js");
let _labirthermal_core = require("@labirthermal/core");
let lit_directives_class_map_js = require("lit/directives/class-map.js");
let lit_directives_map_js = require("lit/directives/map.js");
let lit_directives_style_map_js = require("lit/directives/style-map.js");
//#region src/translations/Languages.ts
/**
* Keys of all translation keys.
* 
* In the comment is the englis version. Use only the keys in any t() function.
*/
let T = /* @__PURE__ */ function(T) {
	T["moreoptions"] = "moreoptions";
	T["loading"] = "loading";
	T["config"] = "config";
	T["temperature"] = "temperature";
	T["upload"] = "upload";
	T["uploadafile"] = "uploadafile";
	T["selectfile"] = "selectfile";
	T["addfiles"] = "addfiles";
	T["clear"] = "clear";
	T["dragorselectfile"] = "dragorselectfile";
	T["share"] = "share";
	T["fileloadingerror"] = "fileloadingerror";
	T["embedhint"] = "embedhint";
	T["embedlibrary"] = "embedlibrary";
	T["embedcomponent"] = "embedcomponent";
	T["copy"] = "copy";
	T["create"] = "create";
	T["remotefoldersbrowseraddfolderhint"] = "remotefoldersbrowseraddfolderhint";
	T["file"] = "file";
	T["layout_simple"] = "layout_simple";
	T["layout_advanced"] = "layout_advanced";
	T["layout_nogui"] = "layout_nogui";
	T["layout_lesson"] = "layout_lesson";
	/** Next */
	T["next"] = "next";
	/** Previous */
	T["prev"] = "prev";
	/** Back */
	T["back"] = "back";
	/** Close */
	T["close"] = "close";
	T["open"] = "open";
	T["detail"] = "detail";
	T["showeverything"] = "showeverything";
	T["palette"] = "palette";
	/** Description */
	T["description"] = "description";
	/** Author */
	T["author"] = "author";
	/** License */
	T["license"] = "license";
	/** Recorded at */
	T["recordedat"] = "recordedat";
	/** Display settings */
	T["displaysettings"] = "displaysettings";
	/** File rendering */
	T["filerendering"] = "filerendering";
	/** Pixelated */
	T["pixelated"] = "pixelated";
	/** Smooth */
	T["smooth"] = "smooth";
	/** 'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are. */
	T["filerenderinghint"] = "filerenderinghint";
	/** Adjust time scale */
	T["adjusttimescale"] = "adjusttimescale";
	T["automaticrange"] = "automaticrange";
	T["fullrange"] = "fullrange";
	/** Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max). */
	T["adjusttimescalehint"] = "adjusttimescalehint";
	/** Select colour palette of thermal display. */
	T["colourpalettehint"] = "colourpalettehint";
	/** Palette {name} */
	T["palettename"] = "palettename";
	/** File info */
	T["fileinfo"] = "fileinfo";
	/** IR file name */
	T["thermalfilename"] = "thermalfilename";
	/** IR file URL */
	T["thermalfileurl"] = "thermalfileurl";
	/** Download the IR file */
	T["thermalfiledownload"] = "thermalfiledownload";
	/** Visible file name */
	T["visiblefilename"] = "visiblefilename";
	/** Visible file URL */
	T["visiblefileurl"] = "visiblefileurl";
	/** Download visible file */
	T["visiblefiledownload"] = "visiblefiledownload";
	T["togglevisibleimage"] = "togglevisibleimage";
	/** Time */
	T["time"] = "time";
	/** Duration */
	T["duration"] = "duration";
	/** Resolution */
	T["resolution"] = "resolution";
	/** Bytesize */
	T["bytesize"] = "bytesize";
	/** Minimal temperature */
	T["minimaltemperature"] = "minimaltemperature";
	/** Maximal temperature */
	T["maximaltemperature"] = "maximaltemperature";
	/** File type */
	T["filetype"] = "filetype";
	/** Type */
	T["type"] = "type";
	/** Supported devices */
	T["supporteddevices"] = "supporteddevices";
	T["numfiles"] = "numfiles";
	T["download"] = "download";
	T["downloadoriginalfiles"] = "downloadoriginalfiles";
	T["downloadoriginalfileshint"] = "downloadoriginalfileshint";
	T["downloadoriginalfile"] = "downloadoriginalfile";
	T["exportcurrentframeaspng"] = "exportcurrentframeaspng";
	T["convertentiresequencetovideo"] = "convertentiresequencetovideo";
	T["pngofindividualimages"] = "pngofindividualimages";
	T["pngofindividualimageshint"] = "pngofindividualimageshint";
	T["pngofentiregroup"] = "pngofentiregroup";
	T["pngofentiregrouphint"] = "pngofentiregrouphint";
	T["csvofanalysisdata"] = "csvofanalysisdata";
	T["csvofanalysisdatahint"] = "csvofanalysisdatahint";
	T["exportimagewidth"] = "exportimagewidth";
	T["exportimagefontsize"] = "exportimagefontsize";
	T["exportgroupname"] = "exportgroupname";
	T["exportfilenames"] = "exportfilenames";
	T["numberofcolumns"] = "numberofcolumns";
	T["exportdimensions"] = "exportdimensions";
	T["exportgroup"] = "exportgroup";
	T["thermalscale"] = "thermalscale";
	T["thermalrange"] = "thermalrange";
	T["filedate"] = "filedate";
	T["folder"] = "folder";
	T["folders"] = "folders";
	T["showingfolder"] = "showingfolder";
	T["showingfolders"] = "showingfolders";
	T["and"] = "and";
	T["or"] = "or";
	T["doyouwanttoadd"] = "doyouwanttoadd";
	T["youmayalsoadd"] = "youmayalsoadd";
	T["range"] = "range";
	T["info"] = "info";
	T["note"] = "note";
	T["group"] = "group";
	T["donotgroup"] = "donotgroup";
	T["groupby"] = "groupby";
	T["groupped"] = "groupped";
	T["bydays"] = "bydays";
	T["byhours"] = "byhours";
	T["byweeks"] = "byweeks";
	T["bymonths"] = "bymonths";
	T["byyears"] = "byyears";
	T["play"] = "play";
	T["pause"] = "pause";
	T["stop"] = "stop";
	T["date"] = "date";
	T["frame"] = "frame";
	T["playbackspeed"] = "playbackspeed";
	T["graphlines"] = "graphlines";
	T["straightlines"] = "straightlines";
	T["smoothlines"] = "smoothlines";
	T["graphlineshint"] = "graphlineshint";
	T["reload"] = "reload";
	T["analysis"] = "analysis";
	T["analyses"] = "analyses";
	T["avg"] = "avg";
	T["min"] = "min";
	T["max"] = "max";
	T["size"] = "size";
	T["edit"] = "edit";
	T["editsth"] = "editsth";
	T["remove"] = "remove";
	T["addpoint"] = "addpoint";
	T["addrectangle"] = "addrectangle";
	T["addellipsis"] = "addellipsis";
	T["analysishint"] = "analysishint";
	T["graph"] = "graph";
	T["graphhint1"] = "graphhint1";
	T["graphhint2"] = "graphhint2";
	T["rectangle"] = "rectangle";
	T["ellipsis"] = "ellipsis";
	T["point"] = "point";
	T["name"] = "name";
	T["color"] = "color";
	T["top"] = "top";
	T["left"] = "left";
	T["right"] = "right";
	T["bottom"] = "bottom";
	T["columns"] = "columns";
	T["fromto"] = "fromto";
	T["downloadgraphdataascsv"] = "downloadgraphdataascsv";
	T["apparenttemperature"] = "apparenttemperature";
	T["airtemperature"] = "airtemperature";
	T["relativeairhumidity"] = "relativeairhumidity";
	T["windspeed"] = "windspeed";
	T["inpercent"] = "inpercent";
	T["apparenttemperatureverbose"] = "apparenttemperatureverbose";
	T["youfeelwarmer"] = "youfeelwarmer";
	T["youfeelcolder"] = "youfeelcolder";
	T["apparenttemperaturehint"] = "apparenttemperaturehint";
	T["analysissync"] = "analysissync";
	/** Inspect tool */
	T["inspecttemperatures"] = "inspecttemperatures";
	T["usemousetoinspecttemperaturevalues"] = "usemousetoinspecttemperaturevalues";
	/**  Edit analysis tool */
	T["editanalysis"] = "editanalysis";
	T["dragcornersofselectedanalysis"] = "dragcornersofselectedanalysis";
	/** Add point tool */
	T["addpointanalysis"] = "addpointanalysis";
	T["clickandaddpoint"] = "clickandaddpoint";
	/** Add rectangle tool */
	T["addrectangleanalysis"] = "addrectangleanalysis";
	T["clickandaddrectangle"] = "clickandaddrectangle";
	/** Add ellipsis tool */
	T["addellipsisanalysis"] = "addellipsisanalysis";
	T["clickandaddellipsis"] = "clickandaddellipsis";
	/** Tutorial */
	T["tutorial"] = "tutorial";
	/** Colour Palette */
	T["colourpalette"] = "colourpalette";
	/** Use the dropdown to change the palette */
	T["palettehint"] = "palettehint";
	T["remotefoldersbrowser"] = "remotefoldersbrowser";
	/** Server */
	T["server"] = "server";
	T["networklog"] = "networklog";
	T["editfile"] = "editfile";
	T["editfolder"] = "editfolder";
	T["editcomment"] = "editcomment";
	T["user"] = "user";
	T["griddisplay"] = "griddisplay";
	T["tabledisplay"] = "tabledisplay";
	T["deletefile"] = "deletefile";
	T["deletefolder"] = "deletefolder";
	T["comments"] = "comments";
	T["deletecomment"] = "deletecomment";
	T["savecomment"] = "savecomment";
	T["addcomment"] = "addcomment";
	T["nocomments"] = "nocomments";
	T["savechanges"] = "savechanges";
	T["uploadfile"] = "uploadfile";
	T["compactview"] = "compactview";
	T["showdiscussion"] = "showdiscussion";
	T["edittags"] = "edittags";
	T["assignedtags"] = "assignedtags";
	T["availabletags"] = "availabletags";
	T["connectioninformation"] = "connectioninformation";
	T["serverurl"] = "serverurl";
	T["servername"] = "servername";
	T["login"] = "login";
	T["logout"] = "logout";
	T["logoutmessage"] = "logoutmessage";
	T["loginerror"] = "logineerror";
	T["password"] = "password";
	T["accessibletologgedinusers"] = "accessibletologgedinusers";
	T["display"] = "display";
	T["content"] = "content";
	T["syncanalyses"] = "syncanalyses";
	T["overviewofyourfolders"] = "overviewofyourfolders";
	T["uploadedby"] = "uploadedby";
	T["uploadeddat"] = "uploadeddat";
	T["createfolder"] = "createfolder";
	T["subfolder"] = "subfolder";
	T["createsubfolder"] = "createsubfolder";
	T["delete"] = "delete";
	T["export"] = "export";
	T["exportcontent"] = "exportcontent";
	T["histogram"] = "histogram";
	T["timeline"] = "timeline";
	T["exportwidth"] = "exportwidth";
	T["exportmargin"] = "exportmargin";
	T["exportgap"] = "exportgap";
	T["exportgrahpheight"] = "exportgrahpheight";
	T["imagecompression"] = "imagecompression";
	T["videoquality"] = "videoquality";
	T["exportvideo"] = "exportvideo";
	T["exportpng"] = "exportpng";
	T["exportrecordingframes"] = "exportrecordingframes";
	T["exportencodingfile"] = "exportencodingfile";
	T["exportdonotclosewindowhint"] = "exportdonotclosewindowhint";
	T["theme"] = "theme";
	T["light"] = "light";
	T["dark"] = "dark";
	T["foldermayhavefiles"] = "foldermayhavefiles";
	T["foldermayhavesubfolders"] = "foldermayhavesubfolders";
	return T;
}({});
Object.fromEntries([
	{
		code: "cs",
		name: "Čeština",
		flag: "🇨🇿"
	},
	{
		code: "cy",
		name: "Cymraeg",
		flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
		disabled: true
	},
	{
		code: "de",
		name: "Deutsch",
		flag: "🇩🇪"
	},
	{
		code: "en",
		name: "English",
		flag: "🇬🇧"
	},
	{
		code: "fr",
		name: "Français",
		flag: "🇫🇷"
	}
].map((l) => [l.code, l]));
//#endregion
//#region src/directives/DirectiveHelpers.ts
/** Utilities for rendering */
var DirectiveHelpers = class {
	static unknownContainsSomething(content) {
		if (content === lit.nothing || content === null || content === void 0) return false;
		if (typeof content === "string" && content.trim().length === 0) return false;
		if (Array.isArray(content)) {
			if (content.length === 0) return false;
			else if (!content.some((item) => this.unknownContainsSomething(item))) return false;
		}
		return true;
	}
	static userMayEditFolder(client, folder) {
		if (client.isRoot) return true;
		return folder.may_manage_folders_in || folder.may_manage_files_in;
	}
	static userMayEditFile(client, folder) {
		if (client.isRoot) return true;
		return folder.may_manage_files_in;
	}
	static userMaySwithFolderContentMode(folder, subfolders) {
		if (!folder.may_manage_files_in || !folder.may_manage_folders_in) return false;
		if (folder.may_have_files) return folder.lrc_count <= 0;
		if (!folder.may_have_files) return Array.isArray(subfolders) && subfolders.length > 0;
		return false;
	}
	static userMayDeleteFolder(client, folder, subfolders, files) {
		if (client.isLoggedIn === false || !folder.may_manage_folders_in && !folder.may_manage_files_in) return false;
		if (!folder.may_have_files) return Array.isArray(subfolders) && subfolders.length === 0;
		else if (folder.may_have_files) return Array.isArray(files) && files.length === 0 && folder.lrc_count === 0;
		return false;
	}
	static folderContainsFiles(folder, files) {
		return Array.isArray(files) && files.length > 0 && folder.lrc_count > 0;
	}
	static userIsRoot(client) {
		return client.isRoot;
	}
	static userIsLoggedIn(client) {
		return client.isLoggedIn;
	}
};
//#endregion
//#region src/directives/AbstractConnectedDirective.ts
var AbstractConnectedDirective = class extends lit_directive_js.Directive {
	t(key) {
		return (0, _labirthermal_webcomponents.t)(T[key]);
	}
	update(_part, props) {
		return this.render(...props);
	}
	unknownContainsSomething(content) {
		return DirectiveHelpers.unknownContainsSomething(content);
	}
	renderThermalScale() {
		return lit.html`<div>
        <registry-histogram ?expandable=${true}></registry-histogram>
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
    </div>`;
	}
	renderDef(...args) {
		const content = [];
		const first = args.shift();
		if (first) content.push(lit.html`<dt>${first}</dt>`);
		args.forEach((item) => {
			content.push(lit.html`<dd>${item}</dd>`);
		});
		return content;
	}
};
//#endregion
//#region src/directives/layout/AbstractLayoutDirective.ts
var AbstractLayoutDirective = class extends AbstractConnectedDirective {
	static {
		this.styles = lit.css`

        .cLayout__header {
            display: flex;
            flex-direction: column;
            gap: .5em;
        }

        .cLayout__content {
            
            width: 100%;
            position: relative;
            padding-top: .5em;

            &.cLayout__content--with-toolbar {
                display: grid;
                grid-template-columns: 2em 1fr;
                gap: 1em;
            }

        }

        .clayout__content__toolbar {
            position: relative;
            & > * {
                position: sticky;
                top: 0px;
            }
        }

        .clayout__content__inner {
            width: 100%;
            display: grid;
            gap: 1em;
            position: relative;
        }

        .cLayout__user_folders_list {
            display: flex;
            flex-direction: column;
            gap: .5em;
        }

        .cLayout--user_folders {

            margin-top: 1em;
        
            display: grid;
            gap: 1em;

            grid-template-columns: 1fr 200px;
            grid-template-rows: auto;

            dl {
                dt {
                    
                }
                dd {
                    margin-left: 0;
                    font-weight: bold;
                    margin-bottom: 1em;
                }
            }

            h2,
            dt {
                margin-bottom: .25em;
                font-size: .8em;
                color: var(--thermal-slate-dark);
                text-transform: uppercase;
                font-weight: normal;
            }
        
        }
    
    `;
	}
	renderBreadcrumb(app) {
		return lit.html`<connected-breadcrumb 
            slot="pre"
            .onFolderClick=${(folder) => app.display.navigateToFolderAndLoad(folder.path)}
            .onUserClick=${() => app.display.navigateToUserFoldersAndLoad()}
        ></connected-breadcrumb>`;
	}
	renderHeader(content) {
		return lit.html`<header class="cLayout__header" slot="pre">${content}</header>`;
	}
	renderContent(hasToolbar = false, gridTemplateColumns, classes, content) {
		return lit.html`<div class="cLayout__content ${hasToolbar ? "cLayout__content--with-toolbar" : ""}">
            ${hasToolbar ? lit.html`<div class="clayout__content__toolbar" >
                    <manager-tool-bar></manager-tool-bar>
                </div>` : lit.nothing}
            <div class="clayout__content__inner ${classes}" style="grid-template-columns: ${gridTemplateColumns}">
                ${content}
            </div>
        </div>`;
	}
	renderThermalScaleSlot() {
		return lit.html`<thermal-slot
            label=${this.t("thermalscale")}
        >
            <manager-palette-dropdown></manager-palette-dropdown>
            <registry-range-form></registry-range-form>
        </thermal-slot>`;
	}
	renderLoading(message) {
		return lit.html`<thermal-poster
            .message=${message}
        ></thermal-poster>`;
	}
	renderError(message) {
		return lit.html`<thermal-poster
            .message=${message}
            icon="warning"
            iconStyle="outline"
            .loading=${false}
        ></thermal-poster>`;
	}
};
//#endregion
//#region src/controllers/AbstractConnectedController.ts
var AbstractConnectedController = class {
	log(...args) {
		this.host.log(this.constructor.name, ...args);
	}
};
//#endregion
//#region src/controllers/ClientController.ts
/** 
* Basic reactive controller for applications connected to the API 
*/
var ClientController = class extends AbstractConnectedController {
	get isLoading() {
		return this._isLoading;
	}
	get whatIsLoading() {
		return this._whatIsLoading;
	}
	get loadingError() {
		return this._loadingError;
	}
	get isClientConnected() {
		return this._isClientConnected;
	}
	get isLoggedIn() {
		return this._isLoggedIn;
	}
	get isRoot() {
		return this._isRoot;
	}
	get identity() {
		return this._identity;
	}
	get serverInfo() {
		return this._serverInfo;
	}
	get api() {
		return this.host.apiClient;
	}
	constructor(host) {
		super();
		this._isLoading = false;
		this._isClientConnected = false;
		this._isLoggedIn = false;
		this._isRoot = false;
		this.onLoadingChange = new _labirthermal_core.CallbacksManager();
		this.onIdentity = new _labirthermal_core.CallbacksManager();
		this._hasCalledReadyForContentRequests = false;
		this.onReadyForContentRequests = new _labirthermal_core.CallbacksManager();
		this.onServerInfoUpdate = new _labirthermal_core.CallbacksManager();
		this.host = host;
		this.UUID = this.host.UUID + "__client_controller";
		host.addController(this);
	}
	async hostConnected() {
		const shouldLogin = this.host.authUrl && this.host.authToken;
		/** After the server responds and is connected */
		this.host.apiClient.onConnection.set(this.UUID, async (status) => {
			this.setIsClientConnected(status !== false);
			this.setServerInfo(status || void 0);
			/** @todo Zde by mělo být přihlašování postaru, ale uděláme to pak přes cookie... */
			await this.initialLogin();
			if (!shouldLogin) {
				this.onIdentity.call(this.identity, this.isRoot);
				this.callReadyForContentRequestsIfNotAllready();
			}
			this.host.log("Client connection status changed:", status);
		});
		this.host.apiClient.auth.onIdentity.set(this.UUID, (identity) => {
			if (identity) {
				this.setIdentity(identity);
				this.setIsLoggedIn(true);
				this.setIsRoot(identity.meta.is_root);
			} else {
				this.setIdentity(void 0);
				this.setIsLoggedIn(false);
				this.setIsRoot(false);
			}
			if (shouldLogin) this.callReadyForContentRequestsIfNotAllready();
			this.onIdentity.call(this.identity, this.isRoot);
		});
		this.loadingStart();
		await this.host.apiClient.connect();
		this.loadingSuccessfull();
	}
	hostDisconnected() {}
	hostUpdate() {}
	hostUpdated() {}
	async initialLogin() {
		if (this.isClientConnected) {
			if (this.host.authUrl && this.host.authToken) {
				this.loadingStart("Přihlašuji se k serveru...");
				if (this.host.apiClient.auth.isLoggedIn()) await this.host.apiClient.routes.post.logout().execute();
				const request = new Request(this.host.authUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json"
					},
					body: JSON.stringify({ token: this.host.authToken })
				});
				const body = await (await fetch(request)).json();
				if (!body.success) {
					this.loadingFailed("Nepodařilo se ověřit uživatele.");
					return;
				}
				const user = body.data.user;
				const pass = body.data.pass;
				await this.host.apiClient.routes.post.login(user, pass).execute();
			}
		}
	}
	loadingStart(what) {
		this._whatIsLoading = what;
		this._loadingError = void 0;
		if (this._isLoading) return;
		this._isLoading = true;
		this.onLoadingChange.call(true);
		this.host.requestUpdate();
	}
	loadingSuccessfull() {
		if (!this._isLoading) return;
		this._isLoading = false;
		this._whatIsLoading = void 0;
		this._loadingError = void 0;
		this.onLoadingChange.call(false);
		this.host.requestUpdate();
	}
	loadingFailed(error) {
		if (!this._isLoading) return;
		this._isLoading = false;
		this._whatIsLoading = void 0;
		this._loadingError = error;
		this.onLoadingChange.call(false);
		this.host.requestUpdate();
	}
	setIsClientConnected(value) {
		if (this._isClientConnected === value) return;
		this._isClientConnected = value;
		this.host.requestUpdate();
	}
	setIsLoggedIn(value) {
		if (this._isLoggedIn === value) return;
		this._isLoggedIn = value;
		this.host.requestUpdate();
	}
	setIsRoot(value) {
		if (this._isRoot === value) return;
		this._isRoot = value;
		this.host.requestUpdate();
	}
	setIdentity(value) {
		if (this._identity === value) return;
		this._identity = value;
		this.host.requestUpdate();
	}
	setServerInfo(value) {
		if (this._serverInfo === value) return;
		this._serverInfo = value;
		this.host.requestUpdate();
	}
	/**
	* This event will be called once, when the client is connected and logged in eventually.
	* It is used by other controllers who will then fire their content requests.
	*/
	callReadyForContentRequestsIfNotAllready() {
		if (this._hasCalledReadyForContentRequests) return;
		this._hasCalledReadyForContentRequests = true;
		this.onReadyForContentRequests.call();
	}
	subscribeToIdentityChanges(element) {
		this.onIdentity.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToLoadingChanges(element) {
		this.onLoadingChange.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToServerInfoUpdates(element) {
		this.onServerInfoUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
};
//#endregion
//#region src/controllers/ContentController.ts
/**
* This controller takes care of the entire content state management:
* - fetching data from the server
* - updates everywhere
* - loading state (separate from the client controller who has a loading state of its own)
*/
var ContentController = class extends AbstractConnectedController {
	get folder() {
		return this._folder;
	}
	get subfolders() {
		return this._subfolders;
	}
	get files() {
		return this._files;
	}
	get file() {
		return this._file;
	}
	get grid() {
		return this._grid;
	}
	get breadcrumb() {
		return this._breadcrumb;
	}
	get tree() {
		return this._tree;
	}
	get userFolders() {
		return this._userFolders;
	}
	get gridFolders() {
		return this._gridFolders;
	}
	get isLoading() {
		return this._isLoading;
	}
	get whatIsLoading() {
		return this._whatIsLoading;
	}
	constructor(host) {
		super();
		this._subfolders = [];
		this._tree = [];
		this._userFolders = [];
		this._gridFolders = [];
		this.onFolderUpdate = new _labirthermal_core.CallbacksManager();
		this.onSubfoldersUpdate = new _labirthermal_core.CallbacksManager();
		this.onFilesUpdate = new _labirthermal_core.CallbacksManager();
		this.onFileUpdate = new _labirthermal_core.CallbacksManager();
		this.onGridUpdate = new _labirthermal_core.CallbacksManager();
		this.onBreadcrumbUpdate = new _labirthermal_core.CallbacksManager();
		this.onTree = new _labirthermal_core.CallbacksManager();
		this.onUserFoldersUpdate = new _labirthermal_core.CallbacksManager();
		this.onError = new _labirthermal_core.CallbacksManager();
		this._isLoading = false;
		this.onLoadingChange = new _labirthermal_core.CallbacksManager();
		this.host = host;
		host.addController(this);
	}
	hostConnected() {
		this.host.client.api.auth.onIdentity.set(this.host.UUID + "___USER_FOLDERS", (identity, userFolders) => {
			this._userFolders = userFolders || [];
			this.onUserFoldersUpdate.call(this._userFolders);
			this.host.requestUpdate();
		});
	}
	hostDisconnected() {}
	hostUpdate() {}
	hostUpdated() {}
	loadingStart(what) {
		if (what) {
			this._whatIsLoading = what;
			this.host.requestUpdate();
		}
		if (!this._isLoading) {
			this._isLoading = true;
			this.onLoadingChange.call(true, what);
			this.host.requestUpdate();
		}
	}
	loadingEnded() {
		if (this._isLoading) {
			this._isLoading = false;
			this._whatIsLoading = void 0;
			this.onLoadingChange.call(false);
			this.host.requestUpdate();
		}
	}
	/** Set the current folder state. Intended for API calls, but can be used by routers & buttons as well. This method tries to modify the current folder path property */
	dangerouslySetFolder(folder) {
		if (this._folder === folder) return;
		if (this.folder && folder) Object.assign(this.folder, folder);
		else this._folder = folder;
		if (this.host.folderPath !== folder?.path) this.host.folderPath = folder?.path;
		this.onFolderUpdate.call(this._folder);
		this.host.requestUpdate();
	}
	/** Set the current subfolders state. Intended for API calls */
	dangerouslySetSubfolders(subfolders) {
		if (this._subfolders === subfolders) return;
		const orderedSubfolders = subfolders ? subfolders.sort((a, b) => a.name.localeCompare(b.name)) : [];
		this._subfolders = orderedSubfolders;
		this.onSubfoldersUpdate.call(this._subfolders);
		this.host.requestUpdate();
	}
	/** Update the current state of the file. Intended for API calls. */
	dangerouslySetFiles(files) {
		if (this._files === files) return;
		this._files = files;
		this.onFilesUpdate.call(this._files);
		this.host.requestUpdate();
	}
	/** Update the inner state of of the current file. Intended for API calls but can be used by routers or the UI as well. */
	dangerouslySetFileState(file) {
		if (this.file && file) Object.assign(this.file, file);
		else this._file = file;
		if (this.file) this.host.fileName = this.file.fileName;
		else this.host.fileName = void 0;
		if (this.files && this.files.length > 0) {
			let hasChanged = false;
			this.files.forEach((currentFile) => {
				if (currentFile.url === file?.url) {
					Object.assign(currentFile, file);
					hasChanged = true;
				}
			});
			if (hasChanged) this.onFilesUpdate.call(this._files);
		}
		this.onFileUpdate.call(this._file);
		this.host.requestUpdate();
	}
	/** Update the current grid state. Intended for API calls only. */
	dangerouslySetGridState(grid) {
		if (this._grid === grid) return;
		this._grid = grid;
		this.onGridUpdate.call(this._grid);
		this.host.requestUpdate();
	}
	dangerouslySetTree(tree) {
		if (this._tree === tree) return;
		this._tree = tree;
		this.onTree.call(this._tree);
		this.host.requestUpdate();
	}
	dangerouslySetBreadcrumb(breadcrumb) {
		this._breadcrumb = breadcrumb;
		this.onBreadcrumbUpdate.call(this._breadcrumb);
		this.host.requestUpdate();
	}
	/** 
	* Update the information about the folder wherever it is:
	* - in the main folder state if the path matches
	* - in the subfolders list if the path matches
	* - in the grid groups if the path matches
	* - in the grid header if the slug matches
	* - in the grid all_subdirectories if the slug matches
	*/
	updateFolderState(folder) {
		if (this.folder && this.folder.path === folder.path) {
			Object.assign(this.folder, folder);
			this.onFolderUpdate.call(this._folder);
		}
		if (this.subfolders) {
			let hasChanged = false;
			this.subfolders.forEach((subfolder) => {
				if (subfolder.path === folder.path) {
					Object.assign(subfolder, folder);
					hasChanged = true;
				}
			});
			if (hasChanged) this.onSubfoldersUpdate.call(this._subfolders);
		}
		if (this.grid && this.grid.folder && this.grid.folder.path !== folder.path) {
			Object.assign(this.grid.folder, folder);
			this.onGridUpdate.call(this._grid);
		}
		if (this.grid && this.grid.header && this.grid.header[folder.slug] !== void 0) {
			Object.assign(this.grid.header[folder.slug], folder);
			this.onGridUpdate.call(this._grid);
		}
		if (this.grid && this.grid.all_subdirectories && this.grid.all_subdirectories[folder.slug] !== void 0) Object.assign(this.grid.all_subdirectories[folder.slug], folder);
		if (this._breadcrumb) this._breadcrumb.forEach((item) => {
			if (item.path === folder.path) item.name = folder.name;
		});
		this.host.requestUpdate();
	}
	/** 
	* Update the information about a file wherever it is:
	* - in the main file state if the URL matches
	* - in the files list if the URL matches
	* - in the grid groups if the URL matches
	* - in the grid tags if the URL matches
	*/
	updateFileState(file) {
		if (this.file) Object.assign(this.file, file);
		if (this.files) this.files.forEach((currentFile) => {
			if (currentFile.url === file.url) {
				Object.assign(currentFile, file);
				this.onFilesUpdate.call();
			}
		});
		if (this.grid) {
			for (const group of Object.values(this.grid.groups)) Object.values(group.folders).forEach((folder) => {
				folder.forEach((fileInFolder) => {
					if (fileInFolder.url === file.url) Object.assign(fileInFolder, file);
				});
			});
			for (const tag of Object.values(this.grid.tags)) for (const folder of Object.values(tag.folders)) folder.forEach((fileInFolder) => {
				if (fileInFolder.url === file.url) Object.assign(fileInFolder, file);
			});
		}
		this.onFileUpdate.call(this._file);
		this.host.requestUpdate();
	}
	/** Clear the entire content in this controller */
	purgeContentState() {
		this._folder = void 0;
		this._subfolders = [];
		this._files = void 0;
		this._file = void 0;
		this._grid = void 0;
	}
	throwIfNot200(response) {
		if (response.success === false || response.code !== 200) {
			this.onError.call(response.message || "Neznámá chyba při komunikaci se serverem");
			throw new Error(response.message, { cause: { code: response.code } });
		}
	}
	/** Request and update a folder information, storing also all subfolders */
	async fetchFolder(folderPath) {
		const result = await this.host.apiClient.routes.get.info(folderPath).execute();
		this.throwIfNot200(result);
		if (result.success) {
			this.dangerouslySetFolder(result.data.folder);
			this.dangerouslySetSubfolders(Object.values(result.data.subfolders));
			this.dangerouslySetBreadcrumb(result.data.breadcrumb);
		}
	}
	/** Request all files in a folder */
	async fetchFiles(folderPath) {
		const result = await this.host.apiClient.routes.get.files(folderPath).execute();
		this.throwIfNot200(result);
		if (result.success) this.dangerouslySetFiles(Object.values(result.data.files));
	}
	/** Request the grid data for a folder */
	async fetchGridData(folderPath, inclidedSubfolderPaths) {
		const request = this.host.apiClient.routes.get.grid(folderPath);
		if (inclidedSubfolderPaths && inclidedSubfolderPaths.length > 0) for (const folder of inclidedSubfolderPaths) request.addFolder(folder);
		const result = await request.execute();
		this.host.requestUpdate();
		this.throwIfNot200(result);
		if (result.success) {
			this.dangerouslySetFolder(result.data.folder);
			this.dangerouslySetGridState(result.data);
		} else this.dangerouslySetGridState(void 0);
	}
	/** Fetch information about a file */
	async fetchFile(folderPath, fileName) {
		const result = await this.host.apiClient.routes.get.file(folderPath, fileName).execute();
		this.throwIfNot200(result);
		if (result.success) this.dangerouslySetFileState(result.data.file);
	}
	/** Fetch the complete tree for the given user */
	async fetchUserTree() {
		const response = await this.host.apiClient.routes.get.currentUserTree().execute();
		this.throwIfNot200(response);
		const tree = response.data?.tree || [];
		this.dangerouslySetTree(tree);
	}
	async fetchDeleteFile(folderPath, fileName) {
		const result = await this.host.apiClient.routes.post.deleteFile(folderPath, fileName).execute();
		this.throwIfNot200(result);
		if (this.file && this.file.path === folderPath && this.file.fileName === fileName) this.dangerouslySetFileState(void 0);
		if (this.files && this.files.length > 0) {
			const newFiles = this.files.filter((f) => {
				if (f.path.includes(folderPath) || folderPath.includes(f.path)) return f.fileName !== fileName;
				return true;
			});
			this.dangerouslySetFiles(newFiles);
		}
		if (this.grid) {
			let hasChanged = false;
			Object.entries(this.grid.groups).forEach(([groupKey, group]) => {
				Object.entries(group.folders).forEach(([folderKey, folder]) => {
					const newFiles = folder.filter((f) => {
						if (f.path === folderPath) return f.fileName !== fileName;
						return true;
					});
					if (newFiles.length !== folder.length) {
						hasChanged = true;
						this.grid.groups[groupKey].folders[folderKey] = newFiles;
					}
				});
			});
			if (hasChanged) this.host.requestUpdate();
		}
	}
	subscribeToFolderUpdates(element) {
		this.onFolderUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToFileUpdates(element) {
		this.onFileUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToFilesUpdates(element) {
		this.onFilesUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToSubfoldersUpdates(element) {
		this.onSubfoldersUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToBreadcrumbUpdates(element) {
		this.onBreadcrumbUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToGridUpdates(element) {
		this.onGridUpdate.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToTreeUpdates(element) {
		this.onTree.set(element.UUID, () => {
			element.requestUpdate();
		});
	}
	subscribeToContentLoading() {
		this.onLoadingChange.set(this.host.UUID, () => {
			this.host.requestUpdate();
		});
	}
	unsubscribeFromAll(element) {
		this.onFolderUpdate.delete(element.UUID);
		this.onSubfoldersUpdate.delete(element.UUID);
		this.onFilesUpdate.delete(element.UUID);
		this.onFileUpdate.delete(element.UUID);
		this.onGridUpdate.delete(element.UUID);
		this.onBreadcrumbUpdate.delete(element.UUID);
		this.onTree.delete(element.UUID);
		this.onUserFoldersUpdate.delete(element.UUID);
	}
	getRegistrySlug() {
		const items = [this.host.UUID];
		if (this.folder !== void 0) items.push(this.folder.path);
		if (this.file !== void 0) items.push(this.file.fileName);
		if (this.grid !== void 0) items.push("grid");
		return items.join("__");
	}
};
//#endregion
//#region src/controllers/DisplayController.ts
let DisplayState = /* @__PURE__ */ function(DisplayState) {
	DisplayState[DisplayState["LOADING"] = 0] = "LOADING";
	DisplayState[DisplayState["ARBITRARY"] = 1] = "ARBITRARY";
	DisplayState[DisplayState["USER"] = 2] = "USER";
	DisplayState[DisplayState["FOLDER"] = 3] = "FOLDER";
	DisplayState[DisplayState["FILE"] = 4] = "FILE";
	DisplayState[DisplayState["LOGIN"] = 5] = "LOGIN";
	DisplayState[DisplayState["ERROR"] = 6] = "ERROR";
	return DisplayState;
}({});
/** Which way should we display list of folders? */
let FolderListDisplayMode = /* @__PURE__ */ function(FolderListDisplayMode) {
	/** Folders shall be displayed as table, one under another */
	FolderListDisplayMode["TABLE"] = "asTable";
	/** Folders shall be displayed as list of folders */
	FolderListDisplayMode["LIST"] = "asList";
	/** The files within subfolders shall be displayed in a grid */
	FolderListDisplayMode["GRID"] = "asGrid";
	return FolderListDisplayMode;
}({});
/** Which way should we display lists of files? */
let FileListDisplayMode = /* @__PURE__ */ function(FileListDisplayMode) {
	/** Files shall be displayed in a responsive grid, taking in consideration a predefined columns mode & compact mode */
	FileListDisplayMode["GRID"] = "asGrid";
	/** Files shall be displayed in a table, one under another */
	FileListDisplayMode["TABLE"] = "asTable";
	return FileListDisplayMode;
}({});
var DisplayController = class DisplayController extends AbstractConnectedController {
	static {
		this.LISTENER_ID = "DisplayController";
	}
	/** Identificator for current internals based on the current state 
	* - us updated upon navigation which might be change of the state or enforcing to load a specific folder / file / grid
	*/
	get slug() {
		return this._slug;
	}
	/** The content that is being used for various messages & stuff */
	get arbitraryContent() {
		return this._arbitraryContent;
	}
	/** The current state of the application - its main router */
	get appState() {
		return this.host.appState;
	}
	/** Which way should we display list of folders? The setting is in the host element */
	get folderListDisplayMode() {
		return this.host.folderListDisplayMode;
	}
	/** Which way should we display lists of files? The setting is in the host element */
	get fileDisplayMode() {
		return this.host.fileDisplayMode;
	}
	/** Are the displayed files in the list compact or not? */
	get fileDisplayCompact() {
		return this.host.fileDisplayCompact;
	}
	/** Whether tags are editable. The setting is in the host element. */
	get editTags() {
		return this.host.editTags;
	}
	/** Whether comments are displayed. The setting is in the host element. */
	get displayComments() {
		return this.host.displayComments;
	}
	constructor(host) {
		super();
		this._slug = "";
		this.onAppModeUpdate = new _labirthermal_core.CallbacksManager();
		this.onFolderDisplayModeUpdate = new _labirthermal_core.CallbacksManager();
		this.onFileDisplayModeUpdate = new _labirthermal_core.CallbacksManager();
		this.onFileDisplayCompactUpdate = new _labirthermal_core.CallbacksManager();
		this.onEditTagsUpdate = new _labirthermal_core.CallbacksManager();
		this.onDisplayCommentsUpdate = new _labirthermal_core.CallbacksManager();
		this.onNavigate = new _labirthermal_core.CallbacksManager();
		this.onArbitraryContentUpdate = new _labirthermal_core.CallbacksManager();
		this.onRecreateContext = new _labirthermal_core.CallbacksManager();
		this.host = host;
		host.addController(this);
	}
	hostConnected() {
		this.host.client.onIdentity.set(DisplayController.LISTENER_ID, () => {
			this.reloadCurrentState().catch((error) => {
				this.log("Chyba při načítání po změně identity uživatele:", error);
			});
		});
		this.host.content.onError.set(DisplayController.LISTENER_ID, (error) => {
			console.log("Chyba při načítání obsahu:", error);
			this.navigateToErrorState(error);
		});
	}
	hostDisconnected() {}
	hostUpdate() {}
	hostUpdated() {}
	/** A callback that is necessary for any navigation calls. */
	refreshSlugOnNavigate() {
		this._slug = this.host.content.getRegistrySlug();
		this.onNavigate.call();
		this.onRecreateContext.call();
		this.host.requestUpdate();
	}
	navigateToLoadingState(whatIsLoading) {
		this.setArbitraryContent(whatIsLoading);
		this.setAppMode(0);
	}
	async navigateToFolderAndLoad(targetFolderPath) {
		this.navigateToLoadingState("Načítám složku");
		try {
			this.host.content.dangerouslySetFileState(void 0);
			await this.host.content.fetchFolder(targetFolderPath);
			if (this.folderListDisplayMode === "asGrid") {
				if (this.canHaveGrid(this.host.content.subfolders)) {
					await this.host.content.fetchGridData(targetFolderPath);
					this.setAppMode(3);
					this.refreshSlugOnNavigate();
					return;
				} else this.setFolderListDisplayMode("asList");
			}
			await this.host.content.fetchFiles(targetFolderPath);
			this.setAppMode(3);
		} catch (error) {
			this.navigateToErrorState(error.message);
		} finally {
			this.refreshSlugOnNavigate();
		}
	}
	async navigateToPreloadedFile(parentFolder, file) {
		this.log("Nastavuji se na soubor:", file);
		this.host.content.dangerouslySetFolder(parentFolder);
		this.host.content.dangerouslySetFileState(file);
		this.setAppMode(4);
		this.refreshSlugOnNavigate();
	}
	async navigateToFileAndLoad(targetFolderPath, targetFileName) {
		this.navigateToLoadingState("Načítám soubor");
		try {
			if (targetFolderPath !== this.host.content.folder?.path) await this.host.content.fetchFolder(targetFolderPath);
			await this.host.content.fetchFile(targetFolderPath, targetFileName);
			this.setAppMode(4);
		} catch (error) {
			this.navigateToErrorState(error.message);
		} finally {
			this.refreshSlugOnNavigate();
		}
	}
	async navigateToUserFoldersAndLoad() {
		this.setAppMode(2);
		this.host.folderPath = void 0;
		this.host.fileName = void 0;
		this.refreshSlugOnNavigate();
	}
	async navigateToErrorState(errorContent) {
		this.setArbitraryContent(errorContent);
		this.setAppMode(6);
	}
	navigateToLoginState() {
		this.setAppMode(5);
	}
	async navigateToFolderParentAndLoad(originalFolderPath) {
		/** @todo */
		const segments = originalFolderPath.split("/").filter((segment) => segment.length > 0);
		if (segments.length === 0) {
			await this.navigateToUserFoldersAndLoad();
			return;
		}
		segments.pop();
		const parentPath = "/" + segments.join("/");
		await this.navigateToFolderAndLoad(parentPath);
	}
	/** Will take the current parameters of the application, load it and set the required app state */
	async reloadCurrentState() {
		if (this.host.folderPath !== void 0 && this.host.fileName !== void 0) {
			/** Načítám složku i soubor */
			this.log("Načítám soubor a složku");
			await this.navigateToFileAndLoad(this.host.folderPath, this.host.fileName);
			return;
		} else if (this.host.folderPath !== void 0) {
			this.log("Načítám pouze složku");
			await this.navigateToFolderAndLoad(this.host.folderPath);
			return;
		}
		if (this.host.client.isLoggedIn) {
			this.log("Načítám uživatelovu složku");
			await this.navigateToUserFoldersAndLoad();
			return;
		}
		this.navigateToLoginState();
	}
	/** Setup initial values, trying to avoid any rerenders */
	initialiseWithoutUpdate(state, arbitraryContent) {
		if (state === this.host.appState) this.host.appState = state;
		this._arbitraryContent = arbitraryContent;
	}
	/** 
	* Setup the internal display mode state and triger all events
	*/
	setAppMode(mode) {
		if (mode !== this.host.appState) {
			this.host.appState = mode;
			this.onAppModeUpdate.call();
			this.host.requestUpdate();
		}
	}
	/** Setup the internal file display mode state */
	setFileListDisplayMode(mode) {
		if (mode !== this.host.fileDisplayMode) {
			this.host.fileDisplayMode = mode;
			this.onFileDisplayModeUpdate.call();
			this.host.requestUpdate();
		}
	}
	setFilesCompact(value) {
		this.log("Nastavuji compact na", value, "z", this.host.fileDisplayCompact);
		if (value !== this.host.fileDisplayCompact) {
			this.host.fileDisplayCompact = value;
			this.onFileDisplayCompactUpdate.call();
			this.host.requestUpdate();
		}
	}
	setEditTags(value) {
		if (this.host.editTags !== value) {
			this.host.editTags = value;
			this.onEditTagsUpdate.call();
			this.host.requestUpdate();
		}
	}
	setDisplayComments(value) {
		if (this.host.displayComments !== value) {
			this.host.displayComments = value;
			this.onDisplayCommentsUpdate.call();
			this.host.requestUpdate();
		}
	}
	/** Public display internal  folder display setter */
	setFolderListDisplayMode(mode) {
		if (mode !== this.host.folderListDisplayMode) {
			this.host.folderListDisplayMode = mode;
			this.onFolderDisplayModeUpdate.call();
			if (mode === "asGrid" && this.host.folderPath) {
				this.host.content.fetchGridData(this.host.folderPath);
				this.onRecreateContext.call();
			} else this.host.content.dangerouslySetGridState(void 0);
			this.host.requestUpdate();
		}
	}
	setArbitraryContent(content) {
		this._arbitraryContent = content;
		this.onArbitraryContentUpdate.call();
		this.host.requestUpdate();
	}
	/** The given element will request update whenever the app mode changes */
	subscribeToAppMode(element) {
		this.onAppModeUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	/** The given element will request update whenever the folder display mode changes */
	subscribeToFolderDisplayMode(element) {
		this.onFolderDisplayModeUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	/** The given element will request update whenever the file display mode changes */
	subscribeToFileDisplayMode(element) {
		this.onFileDisplayModeUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	subscribeToEditTags(element) {
		this.onEditTagsUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	subscribeToDisplayComments(element) {
		this.onDisplayCommentsUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	subscribeToDisplayCompact(element) {
		this.onFileDisplayCompactUpdate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			element.requestUpdate();
		});
	}
	subscribeToNavigate(element, callback) {
		this.onNavigate.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			callback?.();
		});
	}
	subscribeOnRecrteateContext(element, callback) {
		this.onRecreateContext.set(element.getUUID(DisplayController.LISTENER_ID), () => {
			callback();
		});
	}
	/** Unsubscribe the element from all display mode changes */
	unsubscribeFromAll(element) {
		const UUID = element.getUUID(DisplayController.LISTENER_ID);
		this.onAppModeUpdate.delete(UUID);
		this.onFolderDisplayModeUpdate.delete(UUID);
		this.onFileDisplayModeUpdate.delete(UUID);
		this.onFileDisplayCompactUpdate.delete(UUID);
		this.onEditTagsUpdate.delete(UUID);
		this.onDisplayCommentsUpdate.delete(UUID);
		this.onNavigate.delete(UUID);
		this.onRecreateContext.delete(UUID);
	}
	/** 
	* Can the current folder have a grid display?
	* - only if the subfolders have sime lrc files
	*/
	canHaveGrid(subfolders) {
		return subfolders.filter((f) => f.lrc_count > 0).length > 1;
	}
	/** 
	* Is the current user allowed to edit the given folder?
	* - only when they may manage folders or files in it
	*/
	canEditFolder(folder) {
		return folder.may_manage_folders_in || folder.may_manage_files_in;
	}
	/** Is the user allowed to delete the folder?
	* - roots can delete everything
	* - other users can delete the folder only if they may manage folders in it AND the folder can contain files
	*/
	canDeleteFolder(folder) {
		if (this.host.client.isRoot) return true;
		return folder.may_manage_files_in;
	}
	/** Is the user allowed to edit or upload files in the given folder? */
	canEditOrUploadFiles(folder) {
		return folder.may_manage_files_in;
	}
	/** 
	* Is the user allowed to display comments at all?
	* - roots can allways
	* - logged in users can allways
	*/
	canTurnOnComments() {
		if (this.host.client.isRoot) return true;
		return this.host.client.isLoggedIn;
	}
	/** Is the user allowed to turn on the tags editing? 
	* - anonymous can not
	* - root can edit everything
	* - logged in users can edit only if they may manage files in the folder
	*/
	canTurnOnTagsEditing(folder) {
		if (this.host.client.isLoggedIn === false) return false;
		if (this.host.client.isRoot) return true;
		return folder.may_manage_files_in;
	}
};
//#endregion
//#region src/controllers/FileSelectionController.ts
/** Controls the selection inside the current app*/
var FileSelectionController = class {
	/** Dynamically converted upon every call - created from the _selectedFiles Set */
	get array() {
		return Array.from(this._selectedFiles);
	}
	constructor(host) {
		this._selectedFiles = [];
		this._onSelectionChange = new _labirthermal_core.CallbacksManager();
		this.host = host;
		this.UUID = host.UUID + "__file_selection_controller";
		this.host.addController(this);
	}
	hostConnected() {
		this.host.display.onNavigate.add(this.UUID, () => {
			this.clearSelection();
		});
	}
	hostDisconnected() {}
	hostUpdate() {}
	hostUpdated() {}
	/**
	* Iterate over every selected file synchronously
	*/
	forEverySelectedSync(callback) {
		this._selectedFiles.forEach((file) => {
			callback(file);
		});
	}
	/**
	* Iterate over every selected file asynchronously using `Promise.all()s`
	*/
	async forEverySelectedAsync(callback) {
		const promises = this._selectedFiles.map((file) => {
			return callback(file);
		});
		await Promise.all(promises);
	}
	/**
	* Clear the current selection
	*/
	clearSelection() {
		if (this._selectedFiles.length === 0) return;
		this._selectedFiles = [];
		this._onSelectionChange.call(this._selectedFiles);
		this.host.requestUpdate();
	}
	/** 
	* Add a file to the current selection 
	* @return boolean Whether the file was added
	*/
	addToSelection(file) {
		if (!this._selectedFiles.includes(file)) {
			this._selectedFiles.push(file);
			this._onSelectionChange.call(this._selectedFiles);
			this.host.requestUpdate();
			return true;
		}
		return false;
	}
	addMultipleToSelection(files) {
		let hasChanged = false;
		files.forEach((file) => {
			if (!this._selectedFiles.includes(file)) {
				this._selectedFiles.push(file);
				hasChanged = true;
			}
		});
		if (hasChanged) {
			this._onSelectionChange.call(this._selectedFiles);
			this.host.requestUpdate();
		}
	}
	/**
	* Remove the file from the current selection
	* @return boolean Whether the file was removed
	*/
	removeFromSelection(file) {
		if (this._selectedFiles.includes(file)) {
			this._selectedFiles = this._selectedFiles.filter((f) => f !== file);
			this._onSelectionChange.call(this._selectedFiles);
			this.host.requestUpdate();
			return true;
		}
		return false;
	}
	/** 
	* Rerender the provided element whenever the selection changes 
	*/
	subscribeToSelectionChange(element) {
		this._onSelectionChange.add(element.UUID, () => {
			element.requestUpdate();
		});
	}
	fileIsSelected(file) {
		return this._selectedFiles.includes(file);
	}
	getSelectedFiles() {
		return this._selectedFiles;
	}
};
//#endregion
//#region src/controllers/FolderSelectionController.ts
/** Controls the selection inside the current app */
var FolderSelectionController = class {
	/** Dynamically converted upon every call - created from the _selectedFiles Set */
	get array() {
		return Array.from(this._selectedFolders);
	}
	constructor(host) {
		this._selectedFolders = [];
		this._onSelectionChange = new _labirthermal_core.CallbacksManager();
		this.host = host;
		this.UUID = host.UUID + "__folder_selection_controller";
		this.host.addController(this);
	}
	hostConnected() {
		this.host.display.onNavigate.add(this.UUID, () => {
			this.clearSelection();
		});
	}
	hostDisconnected() {}
	hostUpdate() {}
	hostUpdated() {}
	/**
	* Iterate over every selected file synchronously
	*/
	forEverySelectedSync(callback) {
		this._selectedFolders.forEach((folder) => {
			callback(folder);
		});
	}
	/**
	* Iterate over every selected file asynchronously using `Promise.all()s`
	*/
	async forEverySelectedAsync(callback) {
		const promises = this._selectedFolders.map((folder) => {
			return callback(folder);
		});
		await Promise.all(promises);
	}
	/**
	* Clear the current selection
	*/
	clearSelection() {
		if (this._selectedFolders.length === 0) return;
		this._selectedFolders = [];
		this._onSelectionChange.call(this._selectedFolders);
		this.host.requestUpdate();
	}
	/** 
	* Add a file to the current selection 
	* @return boolean Whether the file was added
	*/
	addToSelection(folder) {
		if (!this._selectedFolders.includes(folder)) {
			this._selectedFolders.push(folder);
			this._onSelectionChange.call(this._selectedFolders);
			this.host.requestUpdate();
			return true;
		}
		return false;
	}
	addMultipleToSelection(folders) {
		let hasChanged = false;
		folders.forEach((folder) => {
			if (!this._selectedFolders.includes(folder)) {
				this._selectedFolders.push(folder);
				hasChanged = true;
			}
		});
		if (hasChanged) {
			this._onSelectionChange.call(this._selectedFolders);
			this.host.requestUpdate();
		}
	}
	/**
	* Remove the folder from the current selection
	* @return boolean Whether the folder was removed
	*/
	removeFromSelection(folder) {
		if (this._selectedFolders.includes(folder)) {
			this._selectedFolders = this._selectedFolders.filter((f) => f !== folder);
			this._onSelectionChange.call(this._selectedFolders);
			this.host.requestUpdate();
			return true;
		}
		return false;
	}
	/** 
	* Rerender the provided element whenever the selection changes 
	*/
	subscribeToSelectionChange(element) {
		this._onSelectionChange.add(element.UUID, () => {
			element.requestUpdate();
		});
	}
	folderIsSelected(folder) {
		return this._selectedFolders.includes(folder);
	}
	getSelectedFiles() {
		return this._selectedFolders;
	}
};
//#endregion
//#region package.json
var version = "2.0.1";
//#endregion
//#region src/client/authentication/Auth.ts
var Auth = class {
	constructor(client) {
		this.client = client;
		this.onIdentity = new _labirthermal_core.CallbacksManager();
	}
	isLoggedIn() {
		return this.identity !== void 0;
	}
	login(identity, userFolders) {
		this.identity = identity;
		this.onIdentity.call(this.identity, userFolders);
	}
	logout() {
		this.identity = void 0;
		this.onIdentity.call(void 0);
	}
	setSession(value) {
		this.session = value;
	}
	getSession() {
		return this.session;
	}
	getIdentity() {
		return this.identity;
	}
	getAuthorisationHeader() {
		if (this.identity) return `Basic ${this.toBase64(`${this.identity.user}:${this.identity.token}`)}`;
	}
	toBase64(str) {
		if (typeof Buffer !== "undefined") return Buffer.from(str).toString("base64");
		if (typeof btoa !== "undefined") return btoa(str);
		return this.manualBase64Encode(str);
	}
	manualBase64Encode(str) {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		let result = "";
		for (let i = 0; i < str.length; i += 3) {
			const chunk = str.charCodeAt(i) << 16 | (i + 1 < str.length ? str.charCodeAt(i + 1) << 8 : 0) | (i + 2 < str.length ? str.charCodeAt(i + 2) : 0);
			result += chars[chunk >> 18 & 63] + chars[chunk >> 12 & 63] + chars[chunk >> 6 & 63] + chars[chunk & 63];
		}
		const padding = str.length % 3;
		if (padding > 0) result = result.slice(0, -padding) + "=".repeat(padding);
		return result;
	}
};
//#endregion
//#region src/client/request/RequestFactory.ts
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
var RequestFactory = class {
	constructor(client) {
		this.client = client;
		this.path = void 0;
		this.method = "GET";
		this.action = void 0;
		this.query = /* @__PURE__ */ new Map();
		this.body = {};
		this.headers = {};
		this.files = {};
	}
	setPath(value) {
		value = value.replace(/^\/+|\/+$/g, "");
		this.path = value;
		return this;
	}
	setMethod(value) {
		this.method = value;
		return this;
	}
	setAction(value) {
		this.action = value;
		return this;
	}
	addQueryParameter(key, value) {
		this.query.set(key, value);
		return this;
	}
	addBodyParameter(key, value) {
		this.body[key] = value;
		return this;
	}
	addHeader(key, value) {
		this.headers[key] = value;
		return this;
	}
	addFile(key, file) {
		this.files[key] = file;
		return this;
	}
	createRequestInit() {
		const isValidRequestToRoot = [
			"connect",
			"login",
			"logout",
			"currentusertree"
		].includes(this.action || "");
		if (this.path === void 0 && !isValidRequestToRoot) return false;
		let address = this.client.getServerUrl();
		if (!isValidRequestToRoot) address += this.path;
		const queryString = {};
		if (this.action !== void 0) queryString["action"] = this.action;
		if (this.query.size > 0) this.query.forEach((value, key) => {
			queryString[key] = value;
		});
		if (Object.keys(queryString).length > 0) {
			address += "?";
			address += new URLSearchParams(queryString).toString();
		}
		const url = new URL(address);
		const headers = { ...this.headers };
		if (this.client.auth.isLoggedIn()) headers["Authorization"] = this.client.auth.getAuthorisationHeader() || "";
		const session = this.client.auth.getSession();
		if (session) headers["Cookie"] = session;
		return {
			url,
			options: {
				method: this.method,
				headers,
				credentials: "include"
			}
		};
	}
	/**
	* Vytvoří Request s application/json body (bez souborů)
	*/
	createRequestJson() {
		const init = this.createRequestInit();
		if (init !== false) {
			const { url, options } = init;
			if (this.method === "POST" && Object.keys(this.body).length > 0) options.body = JSON.stringify(this.body);
			const finaleOptions = {
				...options,
				headers: {
					...options.headers,
					"Content-Type": "application/json"
				}
			};
			return new Request(url, finaleOptions);
		}
		return false;
	}
	/**
	* Vytvoří Request s multipart/form-data (pro upload souborů)
	*/
	createRequestFormData() {
		const init = this.createRequestInit();
		if (init === false) return false;
		const { url, options } = init;
		const formData = new FormData();
		for (const [key, value] of Object.entries(this.body)) formData.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
		for (const [key, file] of Object.entries(this.files)) formData.append(key, file, file.name);
		const finaleOptions = {
			...options,
			body: formData
		};
		if (finaleOptions.headers && typeof finaleOptions.headers === "object" && !Array.isArray(finaleOptions.headers) && "Content-Type" in finaleOptions.headers) delete finaleOptions.headers["Content-Type"];
		return new Request(url, finaleOptions);
	}
	createRequest() {
		if (Object.keys(this.files).length > 0) return this.createRequestFormData();
		else return this.createRequestJson();
	}
	getAction() {
		return this.action;
	}
};
//#endregion
//#region src/client/routes/Operation.ts
/** 
* A base class for all routes. It is intentionally concieved very universally, because it might happen that one operation would consist of several subsequent requests. 
* @package `@labirthermal/client`
* @author Jan Jáchim <jachim@ntc.zcu.cz>*/
var Operation = class {
	constructor(client) {
		this.client = client;
		this.request = this.client.createRequest();
	}
};
//#endregion
//#region src/client/routes/get/GetConnect.ts
/**
* Get route for connecting to a remote folder on a remote server.
* @package `@labirthermal/client`
*/
var GetConnect = class extends Operation {
	init() {
		this.request.setMethod("GET");
		this.request.setAction("connect");
		return this;
	}
	async execute() {
		const response = await this.client.fetch(this.request);
		if (response.success) {
			if (response.data.identity !== false) this.client.auth.login(response.data.identity, response.data.userFolders);
		}
		return response;
	}
};
//#endregion
//#region src/client/routes/get/GetCurrentUserTree.ts
/**
* Get the list of all folders accessible to the currently logged in user.
* @package `@labirthermal/client`
*/
var GetCurrentUserTree = class extends Operation {
	init() {
		this.request.setMethod("GET");
		this.request.setAction("currentusertree");
		return this;
	}
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/OperationWithPath.ts
/** 
* A base operation that needs to have a path specified. 
* @package `@labirthermal/client`
*/
var OperationWithPath = class extends Operation {
	setPath(path) {
		this.request.setPath(path);
		return this;
	}
};
//#endregion
//#region src/client/routes/get/GetInfo.ts
/**
* Get route for retrieving folder information from the server.
* @package `@labirthermal/client`
*/
var GetInto = class extends OperationWithPath {
	init() {
		this.request.setMethod("GET");
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/get/GetFile.ts
/**
* Get route for retrieving a file's information from the server.
* @package `@labirthermal/client`
*/
var GetFile = class extends OperationWithPath {
	init() {
		this.request.setMethod("GET");
		this.request.setAction("file");
		return this;
	}
	setFileName(value) {
		this.request.addQueryParameter("file", value);
		return this;
	}
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/OperationWithPathAndFilters.ts
/** 
* An operation containing filters based on time and tags. Needs to have path specified. 
* @package `@labirthermal/client`
*/
var OperationWithFilters = class extends OperationWithPath {
	constructor(..._args) {
		super(..._args);
		this.tags = [];
	}
	setFrom(value) {
		const timestamp = value instanceof Date ? value.getTime() : value;
		this.request.addQueryParameter("from", timestamp.toString());
		return this;
	}
	setTo(value) {
		const timestamp = value instanceof Date ? value.getTime() : value;
		this.request.addQueryParameter("to", timestamp.toString());
		return this;
	}
	setTags(value) {
		this.tags = value;
		this.applyTags();
		return this;
	}
	addTag(value) {
		if (!this.tags.includes(value)) {
			this.tags.push(value);
			this.applyTags();
		}
		return this;
	}
	removeTag(value) {
		const originalLength = this.tags.length;
		this.tags = this.tags.filter((tag) => tag !== value);
		if (this.tags.length !== originalLength) this.applyTags();
		return this;
	}
	/**
	* Internal method used to propagate changed tags to the request.
	*/
	applyTags() {
		this.request.addQueryParameter("tags", this.tags.join(","));
		return this;
	}
};
//#endregion
//#region src/client/routes/get/GetFiles.ts
/**
* Get route for retrieving files information from a folder on the server.
* @package `@labirthermal/client`
*/
var GetFiles = class extends OperationWithFilters {
	init() {
		this.request.setMethod("GET");
		this.request.setAction("files");
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/get/GetGrid.ts
/**
* Get route for retrieving grid content from the server, grouped by time intervals.
* @package `@labirthermal/client`
*/
var GetGrid = class extends OperationWithFilters {
	constructor(..._args) {
		super(..._args);
		this.folders = [];
		this.by = "hour";
	}
	init() {
		this.request.setMethod("GET");
		this.request.setAction("grid");
		this.request.addQueryParameter("by", this.by);
		return this;
	}
	setBy(value) {
		this.by = value;
		this.request.addQueryParameter("by", value);
		return this;
	}
	setFolders(value) {
		this.folders = value;
		this.applyFolders();
		return this;
	}
	addFolder(value) {
		if (!this.folders.includes(value)) {
			this.folders.push(value);
			this.applyFolders();
		}
		return this;
	}
	removeFolder(value) {
		const originalLength = this.folders.length;
		this.folders = this.folders.filter((folder) => folder !== value);
		if (this.folders.length !== originalLength) this.applyFolders();
		return this;
	}
	applyFolders() {
		this.request.addQueryParameter("folders", this.folders.join(","));
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/factories/GetRoutesFactory.ts
/**
* Factory for creating GET routes
* 
* @package `@labirthermal/webcomponents`
*/
var GetRoutesFactory = class {
	constructor(client) {
		this.client = client;
	}
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
	connect() {
		return new GetConnect(this.client).init();
	}
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
	info(path) {
		return new GetInto(this.client).init().setPath(path);
	}
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
	files(path) {
		return new GetFiles(this.client).init().setPath(path);
	}
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
	grid(path) {
		return new GetGrid(this.client).init().setPath(path);
	}
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
	file(path, filename) {
		return new GetFile(this.client).init().setPath(path).setFileName(filename);
	}
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
	currentUserTree() {
		return new GetCurrentUserTree(this.client).init();
	}
};
//#endregion
//#region src/client/routes/post/CreateFolder.ts
/**
* Vytvoření nové složky (viz actionCreate v PHP)
* Parametry: name (povinné), description (volitelné), meta (volitelné), tags (volitelné), access (volitelné)
*
* @package `@labirthermal/client`
*/
var CreateFolder = class extends OperationWithPath {
	constructor(..._args) {
		super(..._args);
		this.tagBuffer = {};
		this.accessBuffer = {};
	}
	init() {
		this.request.setMethod("POST");
		this.request.setAction("create");
		return this;
	}
	setName(name) {
		this.request.addBodyParameter("name", name);
		return this;
	}
	setDescription(description) {
		this.request.addBodyParameter("description", description);
		return this;
	}
	setMeta(meta) {
		this.request.addBodyParameter("meta", meta);
		return this;
	}
	/**
	* Přidej jeden tag (klíčem je název, hodnotou objekt s name, description, color)
	*/
	addTag(name, description, color) {
		this.tagBuffer[name] = { name };
		if (description !== void 0) this.tagBuffer[name].description = description;
		if (color !== void 0) this.tagBuffer[name].color = color;
		return this;
	}
	/**
	* Nastaví access.show (viditelnost složky)
	*/
	setShow(show) {
		this.accessBuffer.show = show;
		return this;
	}
	/**
	* Nastaví access.may_have_files (zda složka může obsahovat soubory)
	*/
	setMayHaveFiles(mayHaveFiles) {
		this.accessBuffer.may_have_files = mayHaveFiles;
		return this;
	}
	async execute() {
		if (Object.keys(this.tagBuffer).length > 0) this.request.addBodyParameter("tags", this.tagBuffer);
		if (Object.keys(this.accessBuffer).length > 0) this.request.addBodyParameter("access", this.accessBuffer);
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/OperationWithFile.ts
/** 
* A base operation that needs to have a path specified.
* @package `@labirthermal/client`
*/
var OperationWithFile = class extends OperationWithPath {
	setFile(filename) {
		this.request.addQueryParameter("file", filename);
		return this;
	}
};
//#endregion
//#region src/client/routes/post/DeleteFile.ts
/**
* Post route for deleting a file on the server.
* @package `@labirthermal/client`
*/
var DeleteFile = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("filedelete");
		return this;
	}
	setLrc(file) {
		this.request.addFile("lrc", file);
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/DeleteFolder.ts
/**
* Post route for deleting a folder on the server.
* @package `@labirthermal/client`
*/
var DeleteFolder = class extends OperationWithPath {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("delete");
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/FileAddComment.ts
/**
* Post route for adding a comment to a file on the server.
* @package `@labirthermal/client`
*/
var FileAddComment = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("fileaddcomment");
		return this;
	}
	/**
	* Nastaví text komentáře, který bude odeslán na server.
	*
	* @param message Text komentáře
	*/
	setMessage(message) {
		this.request.addBodyParameter("message", message);
		return this;
	}
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/FileClearComments.ts
/**
* Post route for clearing all comments on a file on the server.
* @package `@labirthermal/client`
*/
var FileClearComments = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("fileclearcomments");
		return this;
	}
	/**
	* Executes the request to clear comments on a file.
	*/
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/FileDeleteComment.ts
/**
* Post route for deleting a file's comment on the server.
* @package `@labirthermal/client`
*/
var FileDeleteComment = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("filedeletecomment");
		return this;
	}
	setCommentTimestamp(timestamp) {
		this.request.addBodyParameter("timestamp", timestamp);
		return this;
	}
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/FileUpdateComment.ts
/**
* Post route for updating a file's comment on the server.
* @package `@labirthermal/client`
*/
var FileUpdateComment = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("fileupdatecomment");
		return this;
	}
	setCommentTimestamp(timestamp) {
		this.request.addBodyParameter("timestamp", timestamp);
		return this;
	}
	/**
	* Nastaví text komentáře, který bude odeslán na server.
	*
	* @param message Text komentáře
	*/
	setMessage(message) {
		this.request.addBodyParameter("message", message);
		return this;
	}
	execute() {
		return this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/Login.ts
/**
* Post route for logging in a user to the server.
* @package `@labirthermal/client`
*/
var Login = class extends Operation {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("login");
		return this;
	}
	setUser(user) {
		this.request.addBodyParameter("user", user);
		return this;
	}
	setPassword(password) {
		this.request.addBodyParameter("password", password);
		return this;
	}
	async execute() {
		const response = await this.client.fetch(this.request);
		if (response.success) this.client.auth.login(response.data.login, response.data.userFolders);
		return response;
	}
};
//#endregion
//#region src/client/routes/post/Logout.ts
/**
* Post route for logging out a user from the server.
* @package `@labirthermal/client`
*/
var Logout = class extends Operation {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("logout");
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/MoveFolder.ts
/**
* Post route for moving a folder within one server.
* @package `@labirthermal/client`
*/
var MoveFolder = class extends OperationWithPath {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("move");
		return this;
	}
	setTarget(target) {
		this.request.addBodyParameter("target", target);
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/UpdateFile.ts
/**
* Post route for updating metadata of a file on the server.
* @package `@labirthermal/client`
*/
var UpdateFile = class extends OperationWithFile {
	constructor(..._args) {
		super(..._args);
		this._clearTags = false;
		this._clearAnalyses = false;
		this._tagsAdd = [];
		this._tagsRemove = [];
		this._analysisAdd = [];
		this._analysisRemove = [];
	}
	init() {
		this.request.setMethod("POST");
		this.request.setAction("updatefile");
		return this;
	}
	setLabel(value) {
		this.request.addBodyParameter("label", value);
		return this;
	}
	setDescription(value) {
		this.request.addBodyParameter("description", value);
		return this;
	}
	addTag(tag) {
		this._tagsAdd.push(tag);
		return this;
	}
	removeTag(tag) {
		this._tagsRemove.push(tag);
		return this;
	}
	addAnalysis(analysis) {
		this._analysisAdd.push(analysis);
		return this;
	}
	removeAnalysis(analysis) {
		this._analysisRemove.push(analysis);
		return this;
	}
	clearTags() {
		this._clearTags = true;
		return this;
	}
	clearAnalyses() {
		this._clearAnalyses = true;
		return this;
	}
	async execute() {
		this.request.addBodyParameter("clearTags", this._clearTags);
		if (this._tagsAdd.length > 0) this.request.addBodyParameter("addTags", this._tagsAdd);
		if (this._tagsRemove.length > 0) this.request.addBodyParameter("removeTags", this._tagsRemove);
		this.request.addBodyParameter("clearAnalyses", this._clearAnalyses);
		if (this._analysisAdd.length > 0) this.request.addBodyParameter("addAnalyses", this._analysisAdd);
		if (this._analysisRemove.length > 0) this.request.addBodyParameter("removeAnalyses", this._analysisRemove);
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/UpdateFolder.ts
/**
* Post route for updating a folder on the server.
* @package `@labirthermal/client`
*/
var UpdateFolder = class extends OperationWithPath {
	constructor(..._args) {
		super(..._args);
		this.tagBuffer = {};
	}
	init() {
		this.request.setMethod("POST");
		this.request.setAction("update");
		return this;
	}
	setName(value) {
		this.request.addBodyParameter("name", value);
		return this;
	}
	setDescription(value) {
		this.request.addBodyParameter("description", value);
		return this;
	}
	setThumbnail(value) {
		this.request.addFile("thumbnail", value);
		return this;
	}
	addTag(key, name, description, color) {
		this.tagBuffer[key] = { name };
		if (description !== void 0) this.tagBuffer[key].description = description;
		if (color !== void 0) this.tagBuffer[key].color = color;
		this.request.addBodyParameter("addTags", this.tagBuffer);
		return this;
	}
	removeTags(tags) {
		this.request.addBodyParameter("removeTags", tags);
		return this;
	}
	setMayHaveFiles(value) {
		this.request.addBodyParameter("mayHaveFiles", value);
		return this;
	}
	setMetadata(value) {
		this.request.addBodyParameter("meta", value);
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/UploadFile.ts
/**
* Post route for uploading a file to a server folder.
* @package `@labirthermal/client`
*/
var UploadFile = class extends OperationWithPath {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("uploadfile");
		return this;
	}
	setLrc(file) {
		this.request.addFile("lrc", file);
		return this;
	}
	setVisual(file) {
		this.request.addFile("visual", file);
		return this;
	}
	setPreview(file) {
		this.request.addFile("preview", file);
		return this;
	}
	/**
	* Nastaví label pro uploadovaný soubor
	*/
	setLabel(label) {
		this.request.addBodyParameter("label", label);
		return this;
	}
	/**
	* Nastaví description pro uploadovaný soubor
	*/
	setDescription(description) {
		this.request.addBodyParameter("description", description);
		return this;
	}
	/**
	* Nastaví tagy pro uploadovaný soubor
	*/
	setTags(tags) {
		this.request.addBodyParameter("tags", tags);
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/post/MoveFile.ts
/**
* Post route for moving a file within one server.
* @package `@labirthermal/client`
*/
var MoveFile = class extends OperationWithFile {
	init() {
		this.request.setMethod("POST");
		this.request.setAction("movefile");
		return this;
	}
	setTarget(target) {
		this.request.addBodyParameter("target", target);
		return this;
	}
	async execute() {
		return await this.client.fetch(this.request);
	}
};
//#endregion
//#region src/client/routes/factories/PostRoutesFactory.ts
/**
* Factory for creating POST routes
* 
* @package `@labirthermal/webcomponents`
*/
var PostRoutesFactory = class {
	constructor(client) {
		this.client = client;
	}
	login(login, password) {
		return new Login(this.client).init().setUser(login).setPassword(password);
	}
	logout() {
		return new Logout(this.client).init();
	}
	createFolder(targetPath, newFolderName) {
		return new CreateFolder(this.client).init().setName(newFolderName).setPath(targetPath);
	}
	updateFolder(path) {
		return new UpdateFolder(this.client).init().setPath(path);
	}
	moveFolder(folderPath, target) {
		return new MoveFolder(this.client).init().setPath(folderPath).setTarget(target);
	}
	uploadFile(folderPath, file) {
		return new UploadFile(this.client).init().setPath(folderPath).setLrc(file);
	}
	updateFile(folderPath, filename) {
		return new UpdateFile(this.client).init().setPath(folderPath).setFile(filename);
	}
	fileAddComment(folderPath, filename, message) {
		return new FileAddComment(this.client).init().setPath(folderPath).setFile(filename).setMessage(message);
	}
	fileClearComments(folderPath, filename) {
		return new FileClearComments(this.client).init().setPath(folderPath).setFile(filename);
	}
	fileUpdateComment(folderPath, filename, timestamp, message) {
		return new FileUpdateComment(this.client).init().setPath(folderPath).setFile(filename).setCommentTimestamp(timestamp).setMessage(message);
	}
	fileDeleteComment(folderPath, filename, timestamp) {
		return new FileDeleteComment(this.client).init().setPath(folderPath).setFile(filename).setCommentTimestamp(timestamp);
	}
	deleteFolder(folderPath) {
		return new DeleteFolder(this.client).init().setPath(folderPath);
	}
	deleteFile(folderPath, fileName) {
		return new DeleteFile(this.client).setPath(folderPath).setFile(fileName).init();
	}
	moveFile(folderPath, fileName, target) {
		return new MoveFile(this.client).init().setPath(folderPath).setFile(fileName).setTarget(target);
	}
};
//#endregion
//#region src/client/routes/factories/Routes.ts
/** 
* Object containing instances of all available API routes. 
* @package `@labirthermal/webcomponents`
*/
var Routes = class {
	constructor(client) {
		this.client = client;
		this.get = new GetRoutesFactory(this.client);
		this.post = new PostRoutesFactory(this.client);
	}
};
//#endregion
//#region src/client/ApiClient.ts
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
var ApiClient = class {
	static {
		this.VERSION = version;
	}
	get serverInfo() {
		return this._serverInfo;
	}
	get loading() {
		return this.activeRequests > 0;
	}
	constructor(serverUrl, apiRoot = "/api/") {
		this.apiRoot = apiRoot;
		this.connected = false;
		this.onConnection = new _labirthermal_core.CallbacksManager();
		this.onResult = new _labirthermal_core.CallbacksManager();
		this.activeRequests = 0;
		this.onLoading = new _labirthermal_core.CallbacksManager();
		let composedUrl = serverUrl.trim();
		if (composedUrl.endsWith("/")) composedUrl = composedUrl.slice(0, -1);
		composedUrl += apiRoot.trim();
		this.serverUrl = composedUrl;
		if (!this.serverUrl.endsWith("/")) this.serverUrl += "/";
		this.auth = new Auth(this);
		this.routes = new Routes(this);
	}
	/** 
	* Tests the availability of the server, establishes the connection and stores the following data crucial for all subsequent requests:
	* - PHPSESSID is stored in `Auth.setSesson()` 
	* - if a logged-in user was found on the session, its credentials will be stored in `Auth.login()`
	*/
	async connect() {
		if (this.connected) throw new Error("Client is already connected.");
		const request = this.routes.get.connect();
		try {
			const response = await request.execute();
			if (response.success === true) {
				this.connected = true;
				this._serverInfo = response.colophon.server;
				this.onConnection.call(response.colophon.server);
			} else {
				this.onConnection.call(false);
				this.onLoading.call(false);
			}
			return response;
		} catch (error) {
			console.error(error);
			this.onConnection.call(false);
			this.onLoading.call(false);
			return {
				success: false,
				code: 404,
				message: "Server is not available or network error occurred.",
				data: void 0,
				raw: {
					request: {},
					response: {}
				},
				colophon: {
					time: Date.now(),
					server: {
						name: "Unknown",
						version: "unknown",
						url: "unknown"
					},
					action: "connect",
					path: "/"
				}
			};
		}
	}
	/** 
	* Was this `Client` already connected using `Client.connect()`? 
	*/
	isConnected() {
		return this.connected;
	}
	/**
	* Creates a new RequestFactory instance
	* - do not use this method directly, use the `routes` property instead
	*/
	createRequest() {
		return new RequestFactory(this);
	}
	/**
	* @returns The server URL with a trailing slash
	*/
	getServerUrl() {
		return this.serverUrl;
	}
	/**
	* @returns The API root path with slashes (e.g. '/api/')
	*/
	getApiRoot() {
		if (this.apiRoot.endsWith("/") && this.apiRoot.startsWith("/")) return this.apiRoot;
		else if (this.apiRoot.endsWith("/")) return "/" + this.apiRoot;
		else if (this.apiRoot.startsWith("/")) return this.apiRoot + "/";
		return "/" + this.apiRoot + "/";
	}
	getPublicUrl() {
		if (this.serverUrl.endsWith(this.apiRoot)) return this.serverUrl.slice(0, -this.apiRoot.length);
		return this.serverUrl;
	}
	/** 
	* Automatically process every incoming response. 
	* - store the session ID in Auth class
	*/
	processResponse(response) {
		const match = (response.headers.get("set-cookie") || "").match(/PHPSESSID=([^;]+)/);
		this.auth.setSession(match ? match[0] : void 0);
	}
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
	async fetch(factory) {
		if (this.activeRequests === 0) this.onLoading.call(true);
		this.activeRequests++;
		if (factory.getAction() !== "connect" && this.connected === false) throw new Error("Client is not connected to the server!");
		const request = factory.createRequest();
		if (!request) throw new Error("Invalid request configuration");
		let response;
		try {
			response = await fetch(request);
		} catch (error) {
			console.error(error);
			throw new Error("Server is not available or network error occurred.", { cause: error });
		}
		this.processResponse(response);
		try {
			const json = await response.clone().json();
			json.raw = {
				request,
				response
			};
			if (!response.ok) throw new Error("Request was not successfull at all!");
			this.activeRequests--;
			if (this.activeRequests === 0) this.onLoading.call(false);
			this.onResult.call(json.colophon.time, json.success, json.code, json.message, request.method);
			return json;
		} catch (error) {
			const text = await response.clone().text();
			console.error("API Call ended with an error!", {
				request: request.url,
				JSerror: error,
				responseText: text
			});
			return { success: false };
		}
	}
};
//#endregion
//#region src/controllers/controllersContexts.ts
const ControlledClientContext = (0, _lit_context.createContext)("controlled-client-controller");
const ControlledContentContext = (0, _lit_context.createContext)("controlled-content-controller");
const DisplayControllerContext = (0, _lit_context.createContext)("connected-display-controller");
const FileSelectionControllerContext = (0, _lit_context.createContext)("connected-file-selection-controller");
const FolderSelectionControllerContext = (0, _lit_context.createContext)("connected-folder-selection-controller");
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorateMetadata.js
function __decorateMetadata(k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
//#region src/abstraction/AbstractConnectedApp.ts
var AbstractConnectedApp = class AbstractConnectedApp extends _labirthermal_webcomponents.AbstractApp {
	constructor(..._args) {
		super(..._args);
		this.client = new ClientController(this);
		this.content = new ContentController(this);
		this.display = new DisplayController(this);
		this.fileSelection = new FileSelectionController(this);
		this.folderSelection = new FolderSelectionController(this);
		this.folderListDisplayMode = "asList";
		this.fileDisplayMode = "asGrid";
		this.fileDisplayCompact = false;
		this.editTags = false;
		this.displayComments = false;
		this.appState = 0;
		this._handleFullscreenChange = () => {
			if (!document.fullscreenElement && this.classList.contains("fullscreen")) this.classList.remove("fullscreen");
		};
	}
	static {
		this.INITIALISATION_LISTENER = "connected-app-initialisation";
	}
	static {
		this.STATES_WITH_REGISTRY = [3, 4];
	}
	/**
	* Should we render the Registry provider around the content?
	*/
	get hasRegistryProvider() {
		return AbstractConnectedApp.STATES_WITH_REGISTRY.includes(this.appState);
	}
	/**
	* Should we render the Group provider around the content?
	*/
	get hasGroupProvider() {
		if (this.appState === 4 || this.appState === 3 && this.folderListDisplayMode !== "asGrid") return true;
		return false;
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
            width: 100%;
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);
        }

        ${AbstractLayoutDirective.styles}

        .inspector {
            display: grid;
            grid-template-columns: 2em 1fr;
            grid-template-rows: auto;
            gap: var(--thermal-gap);
            width: 100%;
        }

        .inspector__tools {

            manager-tool-bar {
                position: sticky;
                top: 0px;
                z-index: 99;
            }

        }

        :host(.fullscreen) {
        
            thermal-app {
                display: block;
                height: 100vh;
                overflow: auto;
                
            
            }

        }
    
    `;
	}
	connectedCallback() {
		if (this.serverUrl === void 0 || this.serverUrl.length === 0) throw new Error("The 'server-url' attribute is required but was not provided.");
		this.apiClient = new ApiClient(this.serverUrl, this.serverApiRoot);
		super.connectedCallback();
		document.addEventListener("fullscreenchange", this._handleFullscreenChange);
		/** This is very important - call this before the client is ready */
		this.setupInitialStateBeforeClientIsRead();
		this.client.onReadyForContentRequests.add(AbstractConnectedApp.INITIALISATION_LISTENER, async () => {
			this.log("Client is ready for content requests, now initialise the app content");
			await this.initialiseContentAfterClientReady();
			this.log("The content is now ready", this.apiClient);
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
	}
	toggleFullscreen() {
		if (this.classList.contains("fullscreen")) {
			this.classList.remove("fullscreen");
			document.exitFullscreen();
		} else {
			this.requestFullscreen();
			this.classList.add("fullscreen");
		}
	}
	/**
	* Renders the app wrapped in all necessary providers of internal context
	*/
	renderAppWithInternals(innerContent) {
		const shareDialog = lit.html`<connected-share-dialog slot="close"></connected-share-dialog>`;
		const userLoginButton = this.display.appState !== 5 ? lit.html`<connected-user-button slot="close"></connected-user-button>` : lit.nothing;
		const settingsButton = [3, 4].includes(this.display.appState) ? lit.html`<thermal-dialog
                label="Nastavení aplikace"
                slot="close"
            >
                <thermal-btn 
                    slot="invoker"
                    icon="settings"
                    iconStyle="solid"
                    tooltip=${this.t("config")}
                ></thermal-btn>

                <div slot="content">
                    <manager-export-panel></manager-export-panel>
                    <display-panel></display-panel>
                </div>
            </thermal-dialog>` : lit.nothing;
		const thermalApp = lit.html`<thermal-app
            label=${(0, lit_directives_if_defined_js.ifDefined)(this.label)}
            labelTooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.labelTooltip)}
            labelIcon=${(0, lit_directives_if_defined_js.ifDefined)(this.labelIcon)}
            labelIconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.labelIconStyle)}
            labelVariant=${(0, lit_directives_if_defined_js.ifDefined)(this.labelVariant)}
        >

            ${shareDialog}

            <thermal-btn 
                slot="close" 
                icon="reload"
                iconStyle="micro"
                tooltip="Reload the current view"
                @click=${() => {
			this.display.reloadCurrentState();
		}}
            ></thermal-btn>

            ${userLoginButton}

            ${settingsButton}

            ${(0, lit_directives_cache_js.cache)(lit.html`<thermal-btn
                slot="close"
                icon="bigger"
                iconStyle="mini"
                @click=${() => {
			this.toggleFullscreen();
		}}
            ></thermal-btn>`)}

            <slot name="pre" slot="pre"></slot>

            <slot name="before-content"></slot>

            ${innerContent}
            
            <slot name="after-content"></slot>

        </thermal-app>`;
		const fileBlock = this.content.file !== void 0 && this.content.file.url !== void 0 ? lit.html`
                <file-provider
                    thermal=${this.content.file.url}
                    visual=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.visual)}
                    batch="true"
                    autoclear="true"
                    analysis1=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[0])}
                    analysis2=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[1])}
                    analysis3=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[2])}
                    analysis4=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[3])}
                    analysis5=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[4])}
                    analysis6=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[5])}
                    analysis7=${(0, lit_directives_if_defined_js.ifDefined)(this.content.file.analyses[6])}
                    style="display: contents;"
                >
                    ${thermalApp}
                </file-provider>
            ` : thermalApp;
		const groupBlock = this.hasGroupProvider ? lit.html`
                <group-provider
                    slug=${this.display.slug}
                    batch="true"
                    autoclear="true"
                    style="display: contents;"
                >
                    ${fileBlock}
                </group-provider>
            ` : fileBlock;
		const registryBlock = this.hasRegistryProvider ? lit.html`
                <registry-provider
                    slug=${this.display.slug}
                    from=${(0, lit_directives_if_defined_js.ifDefined)(this.from)}
                    to=${(0, lit_directives_if_defined_js.ifDefined)(this.to)}
                    style="display: contents;"
                >
                    ${groupBlock}
                </registry-provider>
            ` : groupBlock;
		return lit.html`
        <manager-provider
            slug=${this.UUID}
            palette=${(0, lit_directives_if_defined_js.ifDefined)(this.palette)}
            style="display: contents;"
        >
            ${registryBlock}
        </manager-provider>`;
	}
	/**
	* Renders the inspector layout with header, content and tools 
	* @returns 
	*/
	renderBrowserLayout(header, content) {
		return lit.html`

        <!-- Draw the header content into the various slots -->
        ${header}

        <div slot="pre">
            <registry-histogram ?expandable=${true}></registry-histogram>
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>
        
        <!-- The inspector goes to the content slot of the thermal-app -->
        <main class="inspector">

            <section class="inspector__tools">
                <manager-tool-bar></manager-tool-bar>
            </section>
            
            <section class="inspector__content">
                ${content}
            </section>
        </main>`;
	}
	/** Checks whether a given template output is not empty */
	unknownIsNotEmpty(value) {
		if (value === lit.nothing || value === void 0 || value === null) return false;
		if (typeof value === "string" && value.trim().length === 0) return false;
		if (Array.isArray(value) && value.length > 0) return !value.some((item) => this.unknownIsNotEmpty(item));
		return true;
	}
	wrapContentIfNotEmpty(content, classes) {
		if (!this.unknownIsNotEmpty(content)) return lit.nothing;
		return lit.html`<div class=${classes}>
            ${content}
        </div>`;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", typeof ApiClient === "undefined" ? Object : ApiClient)], AbstractConnectedApp.prototype, "apiClient", void 0);
__decorate([(0, _lit_context.provide)({ context: ControlledClientContext }), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "client", void 0);
__decorate([(0, _lit_context.provide)({ context: ControlledContentContext }), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "content", void 0);
__decorate([(0, _lit_context.provide)({ context: DisplayControllerContext }), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "display", void 0);
__decorate([(0, _lit_context.provide)({ context: FileSelectionControllerContext }), __decorateMetadata("design:type", typeof FileSelectionController === "undefined" ? Object : FileSelectionController)], AbstractConnectedApp.prototype, "fileSelection", void 0);
__decorate([(0, _lit_context.provide)({ context: FolderSelectionControllerContext }), __decorateMetadata("design:type", typeof FolderSelectionController === "undefined" ? Object : FolderSelectionController)], AbstractConnectedApp.prototype, "folderSelection", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "selected-files"
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "selectedFiles", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "server-url"
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "serverUrl", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "server-api-root"
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "serverApiRoot", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "auth-url"
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "authUrl", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "auth-token"
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "authToken", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "folder-path"
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "folderPath", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "file-name",
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "fileName", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "palette",
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractConnectedApp.prototype, "palette", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	attribute: "from",
	reflect: true
}), __decorateMetadata("design:type", Number)], AbstractConnectedApp.prototype, "from", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	attribute: "to",
	reflect: true
}), __decorateMetadata("design:type", Number)], AbstractConnectedApp.prototype, "to", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "folder-display",
	reflect: true
}), __decorateMetadata("design:type", typeof FolderListDisplayMode === "undefined" ? Object : FolderListDisplayMode)], AbstractConnectedApp.prototype, "folderListDisplayMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "files-display",
	reflect: true
}), __decorateMetadata("design:type", typeof FileListDisplayMode === "undefined" ? Object : FileListDisplayMode)], AbstractConnectedApp.prototype, "fileDisplayMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "files-compact",
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], AbstractConnectedApp.prototype, "fileDisplayCompact", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "edit-tags",
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false),
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractConnectedApp.prototype, "editTags", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "display-comments",
	converter: (0, _labirthermal_webcomponents.booleanConverter)(true),
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractConnectedApp.prototype, "displayComments", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", typeof DisplayState === "undefined" ? Object : DisplayState)], AbstractConnectedApp.prototype, "appState", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "label",
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "label-tooltip",
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "labelTooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "label-icon",
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "labelIcon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "label-icon-style",
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "labelIconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "label-variant",
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractConnectedApp.prototype, "labelVariant", void 0);
//#endregion
//#region src/directives/SlotOrNothing.ts
var SlotOrNothing = class extends AbstractConnectedDirective {
	render(label, content) {
		if (!this.unknownContainsSomething(content)) return lit.nothing;
		return lit.html`<thermal-slot
            label=${(0, _labirthermal_webcomponents.t)(T[label])}
        >${content}</thermal-slot>`;
	}
};
const slotOrNothing = (0, lit_directive_js.directive)(SlotOrNothing);
//#endregion
//#region src/directives/layout/ConnectedFileDetailDirective.ts
var ConnectedFileDetail = class extends AbstractLayoutDirective {
	renderFileHeaderFileSlot(app) {
		if (app.content.folder === void 0) return lit.nothing;
		const fileOperations = [];
		if (app.content.folder.may_manage_files_in) {
			fileOperations.push(lit.html`<connected-file-edit-dialog
                .file=${app.content.file}
                variant="primary"
                size="md"
            ></connected-file-edit-dialog>`);
			fileOperations.push(lit.html`<connected-file-move-dialog .file=${app.content.file}></connected-file-move-dialog>`);
			fileOperations.push(lit.html`<connected-file-delete-dialog
                .file=${app.content.file}
                .folder=${app.content.folder}
                size="md"
                .label=${void 0}
                ></connected-file-delete-dialog>`);
		}
		fileOperations.push(lit.html`<file-info-button></file-info-button>`);
		fileOperations.push(lit.html`<file-download-dropdown></file-download-dropdown>`);
		return slotOrNothing("file", fileOperations);
	}
	renderFileHeader(app) {
		const slots = [this.renderFileHeaderFileSlot(app), slotOrNothing("thermalscale", lit.html`<manager-palette-dropdown></manager-palette-dropdown>
                <registry-range-form></registry-range-form>`)];
		const display = [];
		if (app.content.folder && DirectiveHelpers.userMayEditFile(app.client, app.content.folder)) display.push(lit.html`<connected-config-file-content-mode></connected-config-file-content-mode>`);
		display.push(lit.html`<registry-opacity-slider></registry-opacity-slider>`);
		slots.push(slotOrNothing("display", display));
		slots.push(lit.html`<connected-file-analysis-buttons .info=${app.content.file}></connected-file-analysis-buttons>`);
		if (app.content.file !== void 0 && app.content.file.tags.length > 0) {
			const tags = slotOrNothing("edit", lit.html`<connected-file-tags
                .file=${app.content.file}
                .folder=${app.content.folder}
                editable=${app.display.editTags ? "true" : "false"}
                inline=${true}
                size="sm"
            ></connected-file-tags>`);
			slots.push(tags);
		}
		return this.renderHeader([
			this.renderBreadcrumb(app),
			lit.html`<connected-folder-header
                .onParentClick=${(folder) => app.display.navigateToFolderAndLoad(folder.path)}
            ></connected-folder-header>`,
			lit.html`<connected-file-header>
                ${slots}
            </connected-file-header>`
		]);
	}
	renderFileDetailContent(app) {
		const content = [lit.html`<div>
                <registry-histogram ?expandable=${true}></registry-histogram>
                <registry-range-slider></registry-range-slider>
                <registry-ticks-bar></registry-ticks-bar>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>`, lit.html`<div>
                <file-analysis-complex></file-analysis-complex>
            </div>`];
		let gridTemplateColumns = "1fr 1fr";
		if (app.display.displayComments) {
			gridTemplateColumns = "1fr 1fr 200px";
			content.push(lit.html`<div>
                <connected-file-comments
                    .file=${app.content.file}
                    .folder=${app.content.folder}
                ></connected-file-comments>
            </div>`);
		}
		return this.renderContent(true, gridTemplateColumns, void 0, content);
	}
	render(app) {
		if (app.content.folder === void 0 || app.content.file === void 0) return this.renderLoading("Loading file details...");
		return [this.renderFileHeader(app), this.renderFileDetailContent(app)];
	}
};
const connectedFileDetail = (0, lit_directive_js.directive)(ConnectedFileDetail);
//#endregion
//#region src/directives/layout/AbstractFolderLayoutDirective.ts
var AbstractFolderLayoutDirective = class extends AbstractLayoutDirective {
	renderFolderContentStatsSlot(app) {
		return slotOrNothing("content", lit.html`<connected-folder-content-mode-switch></connected-folder-content-mode-switch>`);
	}
	renderDisplaySlot(app) {
		return slotOrNothing("display", lit.html`<connected-config-subfolder-mode></connected-config-subfolder-mode>`);
	}
	renderHeaderFolderSlot(app) {
		if (!app.content.folder) return lit.nothing;
		const actions = [];
		const mayEdit = DirectiveHelpers.userMayEditFolder(app.client, app.content.folder);
		const mayDelete = DirectiveHelpers.userMayDeleteFolder(app.client, app.content.folder, app.content.subfolders, app.content.files);
		const deleteLabel = mayDelete ? this.t("deletefolder") : "Složku je možno smazat jen, když je prázdná";
		if (mayEdit) {
			if (!app.content.folder.may_have_files) actions.push(lit.html`<connected-folder-create-dialog
                    .folder=${app.content.folder}
                    icon="addfolder"
                    iconStyle="micro"
                    variant="primary"
                    tooltip="Vytvořit podsložku"
                    label="Vytvořit podsložku"
                    .onSuccess=${() => app.display.reloadCurrentState()}
                ></connected-folder-create-dialog>`);
			else actions.push(lit.html`<thermal-btn
                    variant="primary"
                    icon="upload"
                    iconStyle="micro"
                    @click=${() => this.scrollToUploadForm(app)}
                >Nahrát soubor</thermal-btn>`);
			actions.push(lit.html`<connected-folder-edit-dialog
                .folder=${app.content.folder}
                icon="edit"
                iconStyle="micro"
                .onSuccess=${(folder) => app.content.updateFolderState(folder)}
                .tooltip=${this.t("editfolder")}
            ></connected-folder-edit-dialog>`);
			actions.push(lit.html`<connected-folder-move-dialog
                .folder=${app.content.folder}
            ></connected-folder-move-dialog>`);
			actions.push(lit.html`<connected-folder-delete-dialog
                .folder=${app.content.folder}
                icon="trash"
                iconStyle="micro"
                .onSuccess=${() => app.display.navigateToFolderParentAndLoad(app.content.folder.path)}
                .disabled=${!mayDelete}
                .tooltip=${deleteLabel}
            ></connected-folder-delete-dialog>`);
		}
		if (app.content.files && app.content.files.length > 0) actions.push(lit.html`<group-download-dropdown></group-download-dropdown>`);
		return slotOrNothing("folder", actions);
	}
	/**
	* Scrolls the first upload form into view using a smooth animation.
	* The form is positioned in the middle of the viewport so that a
	* sticky header doesn't cover it.
	*/
	scrollToUploadForm(app) {
		let form = app.renderRoot?.querySelector("connected-upload-form");
		if (!form) form = document.querySelector("connected-upload-form");
		if (form) {
			form.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			form.highlight(3e3);
		} else console.warn("scrollToUploadForm: no upload form found");
	}
};
//#endregion
//#region src/directives/layout/ConnectedFolderFilesDirective.ts
var ConnectedFolderFilesDirective = class extends AbstractFolderLayoutDirective {
	renderDisplaySlot(app) {
		if (!DirectiveHelpers.folderContainsFiles(app.content.folder, app.content.files || [])) return lit.nothing;
		const content = [lit.html`<connected-config-file-display-mode></connected-config-file-display-mode>`, lit.html`<connected-config-file-content-mode></connected-config-file-content-mode>`];
		content.push(lit.html`<registry-opacity-slider></registry-opacity-slider>`);
		return slotOrNothing("display", content);
	}
	renderFolderHeader(app) {
		if (!app.content.folder) return lit.nothing;
		const hasFiles = DirectiveHelpers.folderContainsFiles(app.content.folder, app.content.files || []);
		const slots = [this.renderFolderContentStatsSlot(app), this.renderHeaderFolderSlot(app)];
		if (hasFiles) slots.push(this.renderThermalScaleSlot());
		slots.push(this.renderDisplaySlot(app));
		if (app.fileSelection.array.length > 0) slots.push(slotOrNothing("file", lit.html`<connected-file-selection-actions></connected-file-selection-actions>`));
		const content = [this.renderBreadcrumb(app), lit.html`<connected-folder-header
                .onParentClick=${(folder) => {
			app.display.navigateToFolderAndLoad(folder.path);
		}}
            >
                ${slots}
            </connected-folder-header>`];
		if (hasFiles) content.push(this.renderThermalScale());
		return this.renderHeader(content);
	}
	renderFileList(app) {
		const hasFiles = DirectiveHelpers.folderContainsFiles(app.content.folder, app.content.files || []);
		if (!hasFiles) {}
		const mayUpload = DirectiveHelpers.userMayEditFile(app.client, app.content.folder);
		const content = [];
		if (hasFiles) content.push(lit.html`<connected-file-list
                compact=${app.display.fileDisplayCompact}
                display-mode=${app.display.fileDisplayMode}
                editable-tags=${app.display.editTags}
                show-discussion=${app.display.displayComments}
                
                .onFileClick=${(file) => app.display.navigateToFileAndLoad(file.path, file.fileName)}
            ></connected-file-list>`);
		if (mayUpload) content.push(lit.html`<connected-upload-form
                .folder=${app.content.folder}
                .onSuccess=${() => app.display.reloadCurrentState()}
            ></connected-upload-form>`);
		return this.renderContent(hasFiles, "100%", void 0, lit.html`<div style="width: 100%; display: flex; flex-direction: column; gap: 1em;">${content}</div>`);
	}
	render(app) {
		if (app.client.isLoading) return lit.nothing;
		return [this.renderFolderHeader(app), this.renderFileList(app)];
	}
};
const connectedFolderFiles = (0, lit_directive_js.directive)(ConnectedFolderFilesDirective);
//#endregion
//#region src/directives/layout/ConnectedFolderGridDirective.ts
var ConnectedFolderGridDirective = class extends AbstractFolderLayoutDirective {
	renderDisplaySlot(app) {
		if (!DirectiveHelpers.folderContainsFiles(app.content.folder, app.content.files || [])) {}
		const content = [lit.html`<connected-config-file-display-mode></connected-config-file-display-mode>`];
		content.push(lit.html`<registry-opacity-slider></registry-opacity-slider>`);
		return slotOrNothing("display", content);
	}
	renderFolderHeader(app) {
		if (!app.content.folder) return lit.nothing;
		const slots = [
			this.renderHeaderFolderSlot(app),
			slotOrNothing("display", lit.html`<connected-config-subfolder-mode></connected-config-subfolder-mode>
                <registry-opacity-slider></registry-opacity-slider>`),
			this.renderThermalScaleSlot()
		];
		const content = [lit.html`<connected-folder-header
                .onParentClick=${(folder) => {
			app.display.navigateToFolderAndLoad(folder.path);
		}}
            >
            ${slots}
        </connected-folder-header>`, this.renderThermalScale()];
		return this.renderHeader(content);
	}
	renderGrid(app) {
		const content = [lit.html`<connected-subfolders-grid
            .onFolderClick=${(folder) => {
			app.display.navigateToFolderAndLoad(folder.path);
		}}
            .onFileClick=${(folder, file) => {
			app.display.navigateToFileAndLoad(folder.path, file.fileName);
		}}
            .onChange=${() => {
			app.display.reloadCurrentState();
		}}
            .folders=${app.content.grid || []}
        ></connected-subfolders-grid>`];
		return this.renderContent(true, "100%", void 0, content);
	}
	render(app) {
		const content = [];
		if (app.content.grid === void 0) {
			content.push(this.renderLoading("Načítám mřížku..."));
			return content;
		}
		content.push(this.renderBreadcrumb(app), this.renderFolderHeader(app), this.renderGrid(app));
		return content;
	}
};
const connectedFolderGrid = (0, lit_directive_js.directive)(ConnectedFolderGridDirective);
//#endregion
//#region src/directives/layout/ConnectedFolderSubfoldersDirective.ts
var ConnectedFolderSubfoldersDirective = class extends AbstractFolderLayoutDirective {
	renderSelectionSlot(app) {
		if (app.folderSelection.array.length === 0) return lit.nothing;
		return slotOrNothing("edit", lit.html`<connected-folder-selection-actions></connected-folder-selection-actions>`);
	}
	renderFolderHeader(app) {
		if (!app.content.folder) return lit.nothing;
		const slots = [
			this.renderFolderContentStatsSlot(app),
			this.renderHeaderFolderSlot(app),
			this.renderDisplaySlot(app),
			this.renderSelectionSlot(app)
		];
		const content = [this.renderBreadcrumb(app), lit.html`<connected-folder-header
                .onParentClick=${(folder) => {
			app.display.navigateToFolderAndLoad(folder.path);
		}}
            >
                ${slots}
            </connected-folder-header>`];
		return this.renderHeader(content);
	}
	renderSubfolders(app) {
		if (app.content.folder === void 0) return lit.nothing;
		const cont = [];
		if (app.content.subfolders && app.content.subfolders.length > 0) cont.push(lit.html`<connected-subfolder-list
                .onFolderClick=${(folder) => app.display.navigateToFolderAndLoad(folder.path)}
                folder-mode=${app.display.folderListDisplayMode}
            ></connected-subfolder-list>`);
		return this.renderContent(false, "100%", void 0, cont);
	}
	render(app) {
		if (app.client.isLoading) return lit.nothing;
		return [this.renderFolderHeader(app), this.renderSubfolders(app)];
	}
};
const connectedFolderSubfolders = (0, lit_directive_js.directive)(ConnectedFolderSubfoldersDirective);
//#endregion
//#region src/directives/layout/UserFoldersDirective.ts
var UserFoldersDirective = class extends AbstractLayoutDirective {
	renderUserDetail(identity) {
		const rows = [
			["Login", identity.meta.login],
			[this.t("user"), identity.meta.name || "-"],
			["Email", identity.meta.email || "-"],
			["Instituce", identity.meta.institution || "-"]
		];
		return lit.html`<div>
            <dl>
                ${rows.map((row) => this.renderDef(...row))}
            </dl>
        
            <p>Pro změnu hesla kontaktujte administrátora serveru.</p>
        </div>`;
	}
	render(app) {
		const inner = [];
		const list = [];
		app.content.userFolders.sort((a, b) => a.name.localeCompare(b.name)).forEach((folder) => {
			list.push(lit.html`<connected-folder-thumbnail
                .folder=${folder}
                @click=${() => app.display.navigateToFolderAndLoad(folder.path)}
            ></connected-folder-thumbnail>`);
		});
		console.log(list);
		inner.push(lit.html`<div class="cLayout__user_folders_list">
            <h2>Máte přístup ke ${app.content.userFolders.length} složkám:</h2>
            ${list}
        </div>`);
		if (app.client.identity) inner.push(this.renderUserDetail(app.client.identity));
		return lit.html`${this.renderBreadcrumb(app)}
        <div class="cLayout cLayout--user_folders">
            ${inner}
        </div>`;
	}
};
const userFolders = (0, lit_directive_js.directive)(UserFoldersDirective);
//#endregion
//#region src/apps/ConnectedBrowserApp.ts
var ConnectedBrowserApp = class extends AbstractConnectedApp {
	constructor(..._args) {
		super(..._args);
		this.managerProviderRef = (0, lit_directives_ref_js.createRef)();
	}
	get manager() {
		if (!this.managerProviderRef.value) throw new Error("Method not implemented.");
		return this.managerProviderRef.value.managerObject;
	}
	renderStateLogin() {
		return this.renderAppWithInternals(lit.html`<connected-login-form
            style="max-width: 400px; margin: 2em auto; display: block;"
            .onLoginSuccess=${(identity) => {
			this.log("Tohle je login", identity);
			this.display.reloadCurrentState();
		}}
        ></connected-login-form>`);
	}
	renderStateLoading() {
		return this.renderAppWithInternals(lit.html`<thermal-poster
                .message=${this.display.arbitraryContent}
            ></thermal-poster>`);
	}
	/** Main router for the folder state display. Particular content depends on existence of files, subfolders and display mode setting. */
	renderStateFolder() {
		let content;
		if (this.content.folder === void 0) content = lit.html`<p>Folder not found</p>`;
		else if (this.content.folder.may_have_files) content = this.renderStateFolderFiles();
		else if (this.display.folderListDisplayMode === "asGrid") content = this.renderStateFolderGrid();
		else content = this.renderStateFolderSubfolders();
		return this.renderAppWithInternals(content);
	}
	/** Render a folder's files */
	renderStateFolderFiles() {
		return connectedFolderFiles(this);
	}
	/** Render a folder's subfolders */
	renderStateFolderSubfolders() {
		return connectedFolderSubfolders(this);
	}
	/** Render a folder's grid of files */
	renderStateFolderGrid() {
		return connectedFolderGrid(this);
	}
	renderStateFile() {
		const dir = connectedFileDetail(this);
		return this.renderAppWithInternals(dir);
	}
	renderStateUser() {
		return this.renderAppWithInternals(userFolders(this));
	}
	setupInitialStateBeforeClientIsRead() {
		this.display.setArbitraryContent("Připojuju se k arbitrárnímu stavu");
	}
	async initialiseContentAfterClientReady() {
		this.display.navigateToLoadingState("Načítám obsah");
		await this.display.reloadCurrentState();
	}
	renderErrorState() {
		let content = lit.nothing;
		if (this.client.isLoggedIn) content = lit.html`<thermal-btn
                @click=${() => this.display.navigateToUserFoldersAndLoad()}
                icon="right"
                iconStyle="outline"
                variant="primary"
            >Složky uživatele '${this.client.identity?.meta.name}'</thermal-btn>`;
		return this.renderAppWithInternals(lit.html`<thermal-poster
            .message=${this.display.arbitraryContent}
            .loading=${false}
            icon="warning"
            iconStyle="outline"
        >
            ${content}
        </thermal-poster>`);
	}
	render() {
		return (() => {
			switch (this.display.appState) {
				case 0: return this.renderStateLoading();
				case 5: return this.renderStateLogin();
				case 3: return this.renderStateFolder();
				case 4: return this.renderStateFile();
				case 2: return this.renderStateUser();
				case 1: return this.renderAppWithInternals(lit.html`<thermal-poster
                    .message=${this.display.arbitraryContent}
                ></thermal-poster>`);
				case 6: return this.renderErrorState();
				default: return this.renderAppWithInternals(lit.html`<thermal-poster
                    .message=${this.display.arbitraryContent}
                ></thermal-poster>`);
			}
		})();
	}
};
//#endregion
//#region src/abstraction/AbstractControlledConsumer.ts
var AbstractControlledConsumer = class extends _labirthermal_webcomponents.AbstractThermalElement {
	disconnectedCallback() {
		super.disconnectedCallback();
		this.content.unsubscribeFromAll(this);
		this.display.unsubscribeFromAll(this);
	}
};
__decorate([(0, _lit_context.consume)({
	context: ControlledClientContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractControlledConsumer.prototype, "client", void 0);
__decorate([(0, _lit_context.consume)({
	context: ControlledContentContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractControlledConsumer.prototype, "content", void 0);
__decorate([(0, _lit_context.consume)({
	context: DisplayControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractControlledConsumer.prototype, "display", void 0);
__decorate([(0, _lit_context.consume)({
	context: FileSelectionControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractControlledConsumer.prototype, "selectionFile", void 0);
__decorate([(0, _lit_context.consume)({
	context: FolderSelectionControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractControlledConsumer.prototype, "selectionFolder", void 0);
//#endregion
//#region src/components/folder/upload/ConnectedUploadForm.ts
var ConnectedUploadForm = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.label = this.t("upload");
		this.variant = "primary";
		this.errorMessage = "";
		this.plain = false;
		this.allFiles = [];
		this.pairedFiles = [];
		this.unmatchedPngs = [];
		this.isDragging = false;
		this.infoMessage = "";
	}
	static {
		this.styles = lit.css`

        :host {
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .stage {

            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            box-sizing: border-box;
            position: relative;
        
        }

        .drop-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 100, 255, 0.1);
            border: 2px dashed var(--thermal-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            font-size: var(--thermal-fs-lg);
            color: var(--thermal-primary);
            z-index: 10;
        }

        .stage-label {
            font-weight: bold;
            margin: 0;
            padding: 0;
            padding-bottom: .5em;
            font-size: 1.3em;
            line-height: 1.2em;

            small {
                font-size: 1em;
                display: inline-block;
                opacity: .5;
                font-weight: normal;
            }
        }

        .stage-close {
            float: right;
        }

        .stage-preview {

            display: grid;
            grid-template-columns: 1fr 300px;
            gap: 3em;
        
        }

        .stage-preview__actions {

            display: flex;
            flex-direction: column;
            gap: 1em;
            align-items: stretch;
            justify-content: stretch;
        
        }

        .stage-upload {
        
            min-height: 200px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            text-align: center;
            border: 2px dotted var(--thermal-slate);
            border-radius: var( --thermal-radius );
            
            cursor: pointer;

            transition: all .2s;

            label {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1em;
            }

            thermal-button {
                pointer-events: none;
            }
        
        }
        .stage-upload:hover {
            border-color: var(--thermal-primary);
            background: var(--thermal-background);
        }

        .stage-upload--inline {
            margin-top: var(--thermal-gap);
            min-height: 120px;
        }

        /* Highlight only the specific dropzone under drag */
        .stage-upload.drag-over,
        .missing-file-dropzone.drag-over {
            border-color: var(--thermal-primary);
            background: rgba(0, 100, 255, 0.1);
        }

        label {
            display: block;
            width: 100%;
            cursor: pointer;
        }

        input[type="file"] {
            display: none;
        }

        .file-item {
            font-size: calc(var(--thermal-fs) * 0.9);
            margin-bottom: calc(var(--thermal-gap) * 0.25);
            display: flex;
            align-items: center;
            gap: 1em;
        }

        .file-item img {
            max-width: 60px;
            max-height: 60px;
            border-radius: var(--thermal-radius);
            object-fit: cover;
        }

        .paired-file-group {
            background: var(--thermal-slate-light);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap-half);
            margin-top: var(--thermal-gap-half);
        }

        .paired-file-group strong {
            display: block;
            margin-bottom: var(--thermal-gap-quarter);
        }

        .group-remove-btn {

            user-select: none;
        }
        .group-remove-btn:hover { background: var(--thermal-danger); }

        .unmatched-files {

            margin-top: var(--thermal-gap);

            thermal-expandable {
                --font-size: .9em;
            }

            h2 {
                margin: 0;
                font-size: 1em;
            }

            p:last-child,
            li::last-child {
                margin-bottom: 0;
            }

        }

        .info {
            background: var(--thermal-primary-light, #eef);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-primary, #00f);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-primary-dark, #008);
            font-size: calc(var(--thermal-fs) * 0.9);
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }

        .paired-files-table {

            width: 100%;
            border-collapse: collapse;

            td:not(:first-child), 
            th:not(:first-child) {
                width: calc(100% / 3);
            }

            img, file-canvas {
                display: block;
                max-width: 100%;
                height: auto;
            }

            .paired-file-group {
            
                td {
                    padding: .5em;
                    vertical-align: top;
                }

                .centered {
                    display: flex;
                    align-items: center;
                    gap: 1em;
                }


                &.paired-file-group__header {

                    td {
                        vertical-align: middle;
                        border-radius: var(--thermal-radius);
                        background: var( --thermal-background );
                    }

                    thermal-icon {
                        display: inline-block;
                        width: 1.5em;
                        height: 1.5em;
                    }

                    .file-name {
                        font-weight: bold;
                        margin-left: var( --thermal-gap-half );
                    }

                }
            
            }

            .spacer-row {
                td {
                    height: 1em;
                }
            }

        }


.file-preview {

    display: grid;
    grid-template-columns: 5em 1fr;
    gap: .5em;
    position: relative;

    .missing-file-dropzone,
    .file-preview__icon,
    img {
        
        max-width: 5em;
        height: auto;
    }

    .missing-file-dropzone {
        aspect-ratio: 160 / 120;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        display: block;
    }

}

.file-preview__icon {

    color: var( --thermal-background );
    background: var( --thermal-slate-dark );
    border-radius: var( --thermal-radius );

    box-sizing: border-box;

    aspect-ratio: 160 / 120;

    display: flex;
    align-items: center;
    justify-content: center;

    thermal-icon {
        width: 1.5em;
        height: 1.5em;
        display: block;
    }
    
}

.file-preview__empty {
    .file-preview__icon {
        background: transparent;
        color: var( --thermal-slate );
        border: var(--thermal-border-width) dashed var( --thermal-slate );
    }
}


.file-preview__info {
    display: flex;
    flex-direction: column;
    gap: .2em;
}

.file-preview__info > div {
    font-size: .7em;
    color: var( --thermal-slate-dark );
}

.file-preview__label {
    font-size: var( --thermal-fs ) !important;
    color: var( --thermal-foreground );
}

.missing-file-dropzone {
    font-size: var(--thermal-fs-sm);
    color: var(--thermal-slate-dark);
    text-align: center;

    border-radius: var(--thermal-radius);
    border: 2px dotted var(--thermal-slate);

    cursor: pointer;
    
    transition: all .2s;

    thermal-icon {
        display: block;
        width: 1.5em;
        height: 1.5em;
        user-select: none;
        pointer-events: none;
    }
}
.missing-file-dropzone:hover {
    border-color: var(--thermal-primary);
    background: #fff;
}

.remove-btn {
    margin-left: auto;
    cursor: pointer;
}

.file-remove-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    user-select: none;
    transition: background .15s ease;
}


    `;
	}
	highlight(timeinms) {
		const element = this.renderRoot.querySelector(".stage-upload thermal-btn");
		console.info("Highlighting upload form button", {
			element,
			timeinms
		});
		if (element) element.highlight(timeinms);
	}
	async handleSubmit() {
		if (this.pairedFiles.length === 0) {
			this.errorMessage = "Vyberte alespoň jeden .lrc soubor";
			return false;
		}
		this.errorMessage = "";
		try {
			const uploadPromises = this.pairedFiles.map(async (pair) => {
				const upload = this.client.api.routes.post.uploadFile(this.folder.path, pair.lrc);
				if (pair.visual) upload.setVisual(pair.visual);
				if (pair.preview) upload.setPreview(pair.preview);
				const result = await upload.execute();
				if (!result?.success) throw new Error(`Nepodařilo se nahrát soubor ${pair.lrc.name}: ${result?.message}`);
				return pair.lrc;
			});
			const uploadedFiles = await Promise.all(uploadPromises);
			if (this.onSuccess) this.onSuccess(uploadedFiles);
			this.clearAllFiles();
			return true;
		} catch (error) {
			this.errorMessage = error instanceof Error ? error.message : "Nepodařilo se nahrát soubory";
			return false;
		}
	}
	addFiles(newFiles) {
		if (!newFiles || newFiles.length === 0) return;
		const newFilesArray = Array.from(newFiles);
		const hasNewLrc = newFilesArray.some((file) => file.name.toLowerCase().endsWith(".lrc"));
		if (!this.allFiles.some((file) => file.name.toLowerCase().endsWith(".lrc")) && !hasNewLrc) {
			this.infoMessage = "Je třeba nahrávat primárně LRC soubory! PNG obrázky jsou jejich volitelný doplněk.";
			setTimeout(() => {
				this.infoMessage = "";
			}, 5e3);
			return;
		}
		this.infoMessage = "";
		const uniqueNewFiles = newFilesArray.filter((newFile) => !this.allFiles.some((existingFile) => existingFile.name === newFile.name && existingFile.size === newFile.size));
		this.allFiles = [...this.allFiles, ...uniqueNewFiles];
		this.pairFiles();
	}
	handleMainFileChange(event) {
		const target = event.target;
		this.addFiles(target.files);
		target.value = "";
	}
	handleInlineFileChange(event, lrcFile, type) {
		const target = event.target;
		if (target.files && target.files.length > 0) {
			const originalFile = target.files[0];
			const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, "");
			const key = lrcBaseName.includes("_thermal") ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf("_thermal")) : lrcBaseName;
			const newFileName = type === "visual" ? `${key}_visual.png` : `${key}_image_thermal.png`;
			const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
			this.addFiles([renamedFile]);
		}
		target.value = "";
	}
	clearAllFiles() {
		this.pairedFiles.forEach((pair) => {
			if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
			if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
			if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
		});
		this.unmatchedPngs.forEach((unmatched) => URL.revokeObjectURL(unmatched.url));
		this.allFiles = [];
		this.pairedFiles = [];
		this.unmatchedPngs = [];
	}
	removePairedGroup(lrcFileToRemove) {
		const groupToRemove = this.pairedFiles.find((p) => p.lrc === lrcFileToRemove);
		if (!groupToRemove) return;
		const filesToRemove = [
			groupToRemove.lrc,
			groupToRemove.visual,
			groupToRemove.preview
		].filter(Boolean);
		this.allFiles = this.allFiles.filter((f) => !filesToRemove.includes(f));
		this.pairFiles();
	}
	removePairedFile(fileToRemove) {
		this.allFiles = this.allFiles.filter((f) => f !== fileToRemove);
		this.pairFiles();
	}
	removeUnmatchedPng(pngFileToRemove) {
		this.allFiles = this.allFiles.filter((f) => f !== pngFileToRemove);
		this.pairFiles();
	}
	pairFiles() {
		this.pairedFiles.forEach((pair) => {
			if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
			if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
			if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
		});
		this.unmatchedPngs.forEach((unmatched) => URL.revokeObjectURL(unmatched.url));
		const lrcFiles = this.allFiles.filter((file) => file.name.toLowerCase().endsWith(".lrc"));
		const pngFiles = this.allFiles.filter((file) => file.name.toLowerCase().endsWith(".png"));
		const paired = [];
		const usedPngs = /* @__PURE__ */ new Set();
		lrcFiles.forEach((lrcFile) => {
			const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, "");
			const key = lrcBaseName.includes("_thermal") ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf("_thermal")) : lrcBaseName;
			const visualKey = `${key}_visual`;
			const previewKey = `${key}_image_thermal`;
			const visualFile = pngFiles.find((png) => !usedPngs.has(png) && png.name.replace(/\.png$/i, "").startsWith(visualKey));
			const previewFile = pngFiles.find((png) => !usedPngs.has(png) && png.name.replace(/\.png$/i, "").startsWith(previewKey));
			const pair = {
				lrc: lrcFile,
				lrcUrl: URL.createObjectURL(lrcFile)
			};
			if (visualFile) {
				pair.visual = visualFile;
				pair.visualUrl = URL.createObjectURL(visualFile);
				usedPngs.add(visualFile);
			}
			if (previewFile) {
				pair.preview = previewFile;
				pair.previewUrl = URL.createObjectURL(previewFile);
				usedPngs.add(previewFile);
			}
			paired.push(pair);
		});
		this.pairedFiles = paired;
		this.unmatchedPngs = pngFiles.filter((png) => !usedPngs.has(png)).map((file) => ({
			file,
			url: URL.createObjectURL(file)
		}));
	}
	handleDragOver(e) {
		e.preventDefault();
		this.isDragging = true;
	}
	handleDragLeave(e) {
		e.preventDefault();
		this.isDragging = false;
	}
	handleDrop(e) {
		e.preventDefault();
		this.isDragging = false;
		this.addFiles(e.dataTransfer?.files ?? null);
	}
	handleZoneDragOver(e) {
		e.preventDefault();
		e.currentTarget.classList.add("drag-over");
	}
	handleZoneDragLeave(e) {
		e.preventDefault();
		e.currentTarget.classList.remove("drag-over");
	}
	handleMainDrop(e) {
		e.preventDefault();
		e.currentTarget.classList.remove("drag-over");
		this.addFiles(e.dataTransfer?.files ?? null);
	}
	handleInlineDrop(e, lrcFile, type) {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.remove("drag-over");
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			const originalFile = files[0];
			const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, "");
			const key = lrcBaseName.includes("_thermal") ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf("_thermal")) : lrcBaseName;
			const newFileName = type === "visual" ? `${key}_visual.png` : `${key}_image_thermal.png`;
			const renamedFile = new File([originalFile], newFileName, { type: originalFile.type });
			const fileList = new FileList();
			fileList[0] = renamedFile;
			this.addFiles(fileList);
		}
	}
	openFileSelector(id) {
		this.shadowRoot?.getElementById(id)?.click();
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.clearAllFiles();
	}
	get hasFiles() {
		return this.allFiles.length > 0;
	}
	get maySubmit() {
		return this.pairedFiles.length > 0;
	}
	renderDropinArea() {
		if (this.hasFiles) return lit.nothing;
		return lit.html`<div 
            class="stage-upload"
            @click=${() => this.openFileSelector("main-file-input")}
            @dragover=${(e) => this.handleZoneDragOver(e)}
            @dragleave=${(e) => this.handleZoneDragLeave(e)}
            @drop=${(e) => this.handleMainDrop(e)}
        >
            <label for="main-file-input">
                <div>Vyberte či přetáhněte sem LRC soubory a případně odpovídající PNG obrázky.</div>
                <thermal-btn
                    variant="primary"
                    icon="upload"
                    iconStyle="micro"
                >
                    Vybrat soubory
                </thermal-btn>
            </label>
            <input 
                type="file" 
                id="main-file-input"
                @change=${this.handleMainFileChange}
                multiple
                accept=".lrc,.png"
            />
        </div>`;
	}
	renderFilePreview(label, file, lrcFileForContext, type) {
		if (!file) {
			const inputId = `inline-input-${lrcFileForContext.name}-${type}`;
			return lit.html`
            <div class="file-preview file-preview__has-file">
                <div class="file-preview__preview">
                    <div 
                        class="missing-file-dropzone"
                        @click=${() => this.openFileSelector(inputId)}
                        @dragenter=${(e) => this.handleZoneDragOver(e)}
                        @dragover=${(e) => e.preventDefault()}
                        @dragleave=${(e) => this.handleZoneDragLeave(e)}
                        @drop=${(e) => this.handleInlineDrop(e, lrcFileForContext, type)}
                    >

                        <thermal-icon icon="upload" variant="micro"></thermal-icon>

                        <input 
                            type="file" 
                            id=${inputId}
                            @change=${(e) => this.handleInlineFileChange(e, lrcFileForContext, type)}
                            accept=".png"
                        />
                    </div>
                </div>
                <div class="file-preview__info">
                    <div class="file-preview__label">${label}</div>
                    <div class="file-preview__name">Můžete nahrát ${type} obrázek.</div>
                </div>
            </div>
            `;
		}
		const kbsize = (file.size / 1024).toFixed(3);
		const preview = file.name.toLowerCase().endsWith(".png") ? lit.html`<img src=${URL.createObjectURL(file)} alt="File preview" />` : lit.html`<div class="file-preview__icon"><thermal-icon icon="document" variant="outline"></thermal-icon></div>`;
		const removeButton = type === "visual" || type === "preview" || label.toLowerCase().includes("lrc") ? lit.html`<thermal-btn 
                class="file-remove-btn" 
                tooltip="Odstranit" 
                icon="close"
                iconStyle="micro"
                plain="true"
                .variant="breadcrumb"
                @click=${() => this.removePairedFile(file)}></thermal-btn>` : lit.nothing;
		return lit.html`<div class="file-preview file-preview__has-file">
    ${removeButton}
    <div class="file-preview__preview">${preview}</div>
    <div class="file-preview__info">
        <div class="file-preview__label">${label}</div>
        <div class="file-preview__name">${file.name}</div>
        <div class="file-preview__size">${kbsize} kB</div>
    </div>
</div>`;
	}
	renderPairedFileRow(pair, index) {
		return lit.html`
<tr class="paired-file-group paired-file-group__header">
    <td colspan="4">
        <div style="display:flex;align-items:center;gap:1em;">
            <span>${index + 1}. snímek</span>
            <thermal-btn 
            class="group-remove-btn" 
            tooltip="Odstranit celou skupinu" 
            icon="close"
            iconStyle="micro"
            ?plain=${true}
            @click=${() => this.removePairedGroup(pair.lrc)}></thermal-btn>
        </div>
    </td>
</tr>
<tr class="paired-file-group">
    <td></td>
    <td>${this.renderFilePreview("LRC termogram", pair.lrc)}</td>
    <td>${this.renderFilePreview("Snímek ve viditelném spektru", pair.visual, pair.lrc, "visual")}</td>
    <td>${this.renderFilePreview("Printscreen displeje termokamery", pair.preview, pair.lrc, "preview")}</td>
</tr>`;
	}
	renderPairedFiles() {
		if (this.pairedFiles.length === 0) return lit.nothing;
		const lrcCount = this.pairedFiles.length;
		const pngCount = this.pairedFiles.reduce((state, current) => {
			return state + (current.visual ? 1 : 0) + (current.preview ? 1 : 0);
		}, 0);
		let titleSuffix = `${lrcCount}x LRC`;
		if (pngCount > 0) titleSuffix += ` + ${pngCount}x PNG`;
		return lit.html`
<div class="paired-files">

<h3 class="stage-label">Soubory k uploadu <small>${titleSuffix}</h3>

<table class="paired-files-table">
<tbody>
${this.pairedFiles.map((pair, index) => this.renderPairedFileRow(pair, index))}
</tbody>
</table>

</div>`;
	}
	renderUnmatchedFiles() {
		if (this.unmatchedPngs.length === 0) return lit.nothing;
		const title = `${this.pairedFiles.length === 0 ? "Nespárované obrázky" : "Další nespárované obrázky"} (${this.unmatchedPngs.length}) nebudou nahrány`;
		return lit.html`<div class="unmatched-files">

    <thermal-expandable
        label="${title}"
        icon="info"
        iconStyle="outline"
        variantExpanded="foreground"
        closeIcon="true"
    >

        <div class="unmatched-files__list">

            <table>
                <tbody>
                ${this.unmatchedPngs.map((item) => lit.html`
            <tr class="file-item">
                <td>
                    <thermal-btn tooltip="${this.t("remove")}" ?plain=${true} variant="background" icon="close" iconStyle="micro" @click=${() => this.removeUnmatchedPng(item.file)}></thermal-btn>
                </td>
                <td style="position:relative;">
                    <img src=${item.url} alt="Unmatched file preview" />
                </td>
                <td>${item.file.name}</td>
            </tr>`)}
                </tbody>
            </table>

            <thermal-tip
                variant="info"
                style="--font-size: 1em; margin-top: 1em;"
            >
                <h2>Jak párujeme soubory</h2>
                <p>Termokamery TIMI Edu od roku 2024 ukládají soubory v tomto formátu:</p>
                <ul>
                    <li><strong>[datum]_thermal.lrc</strong> - klíčový termogram, který potřebujeme</li>
                    <li><strong>[datum]_visual.png</strong> - snímek ve viditelném spektru (volitelný)</li>
                    <li><strong>[datum]_image_thermal.png</strong> - printscreen displeje termokamery (volitelný, v online aplikaci nemá žádné užití)</li>
                </ul>
                <p>Co jsme schopni spárovat:</p>
                <ul>
                    <li><strong>[datum]</strong>_cokolivdalsiho<strong>_thermal</strong>_neco<strong>.lrc</strong></li>
                    <li><strong>[datum]</strong>_neco_jineho<strong>_visible.png</strong></li>
                    <li><strong>[datum]</strong>_zase_neco_jineho_<strong>_image_thermal</strong> (1)<strong>.png</strong></li>
                </ul>
                <p>Pokud jsou Vaše soubory pojmenovány jinak, můžete k LRC snímkům přiřadit PNG soubory ručně v tabulce výše.</p>
            </thermal-tip>

        </div>
    </thermal-expandable>

</div>`;
	}
	renderErrorMessage() {
		if (!this.errorMessage) return lit.nothing;
		return lit.html`<div class="error">${this.errorMessage}</div>`;
	}
	renderSubmitButton() {
		if (!this.hasFiles) return lit.nothing;
		return lit.html`
            <div style="display:flex;flex-direction:column;gap:1em;">
                <thermal-btn
                    @click=${() => this.handleSubmit()}
                    ?disabled=${!this.maySubmit}
                    variant=${this.maySubmit ? "primary" : "foreground"}
                    icon="upload"
                    iconStyle="micro"
                    size="lg"
                >${this.label}</thermal-btn>
                <thermal-btn
                    @click=${() => {
			this.clearAllFiles();
		}}
                    variant="foreground"
                    icon="close"
                    iconStyle="micro"
                    size="lg"
                >Vybrat jiné soubory</thermal-btn>
            </div>
        `;
	}
	renderPreviewAndSubmit() {
		if (!this.hasFiles) return lit.nothing;
		return lit.html`<div class="stage stage-preview">
    <div class="stage-preview__files">
        ${this.renderPairedFiles()}
        ${this.renderUnmatchedFiles()}
    </div>
    <div class="stage-preview__actions">
        ${this.renderErrorMessage()}
        ${this.renderSubmitButton()}
    </div>
</div>`;
	}
	renderBottomDropzone() {
		return lit.html`
            <div 
                class="stage-upload stage-upload--bottom"
                style="margin-top:2em;"
                @click=${() => this.openFileSelector("bottom-file-input")}
                @dragenter=${(e) => this.handleZoneDragOver(e)}
                @dragover=${(e) => this.handleZoneDragOver(e)}
                @dragleave=${(e) => this.handleZoneDragLeave(e)}
                @drop=${(e) => this.handleMainDrop(e)}
            >
                <label for="bottom-file-input">
                    <div>Přidat další soubory LRC či PNG</div>
                    <thermal-btn
                        variant="primary"
                        icon="upload"
                        iconStyle="micro"
                    >Vybrat soubory</thermal-btn>
                </label>
                <input 
                    type="file" 
                    id="bottom-file-input"
                    @change=${this.handleMainFileChange}
                    multiple
                    accept=".lrc,.png"
                />
            </div>
        `;
	}
	render() {
		if (!this.client.isLoggedIn || !this.folder.may_manage_files_in) return lit.nothing;
		return lit.html`
            <div>
                ${this.renderDropinArea()}

                ${this.infoMessage ? lit.html`<div class="info">${this.infoMessage}</div>` : ""}

                ${this.renderPreviewAndSubmit()}
                ${this.hasFiles ? this.renderBottomDropzone() : lit.nothing}
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedUploadForm.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "prompt", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "errorMessage", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedUploadForm.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadForm.prototype, "allFiles", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadForm.prototype, "pairedFiles", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadForm.prototype, "unmatchedPngs", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], ConnectedUploadForm.prototype, "isDragging", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedUploadForm.prototype, "infoMessage", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedUploadForm.prototype, "onSuccess", void 0);
//#endregion
//#region src/components/folder/upload/ConnectedUploadDialog.ts
var ConnectedUploadDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.label = (0, _labirthermal_webcomponents.t)("uploadafile");
		this.variant = "primary";
		this.errorMessage = "";
		this.plain = false;
		this.allFiles = [];
		this.pairedFiles = [];
		this.unmatchedPngs = [];
		this.isDragging = false;
		this.infoMessage = "";
	}
	static {
		this.styles = lit.css`

        :host {
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .content {
            position: relative;
            box-sizing: border-box;
        }

        .stage-label {

            small {
                font-size: 1em;
                font-weight: normal;
                display: inline-block;
                opacity: .5;
            }
        
        }

        .stage-upload {
            min-height: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 2px dotted var(--thermal-slate);
            border-radius: var(--thermal-radius);
            cursor: pointer;
            transition: all .2s;
            padding: var(--thermal-gap);
            label {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1em;
                cursor: pointer;
            }
        }
        .stage-upload:hover,
        .stage-upload.drag-over { 
            border-color: var(--thermal-primary); 
            background: var(--thermal-background); 
        }

        input[type="file"] { 
            display: none; 
        }

        .paired-files-table { 
            width: 100%; 
            max-width: 100%;
            overflow-x: auto;
            border-collapse: collapse; 
        }
        .paired-files-table td { 
            padding: .5em; 
            vertical-align: top; 
        }
        .paired-files-table td:not(:first-child) { 
            width: calc(100% / 3); 
        }

        .paired-file-group {
        }

        .paired-file-group__header td { 
            background: var(--thermal-background); 
            border-radius: var(--thermal-radius); 
        }

        .file-preview { 
            display: grid; 
            grid-template-columns: 5em 1fr; 
            gap: .5em; 
            position: relative; 
        }

        .file-preview img, 
        .file-preview .file-preview__icon { 
            max-width: 5em; 
            height: auto; 
            display: block; 
        }
        .file-preview__icon { 
            background: var(--thermal-slate-dark); 
            color: var(--thermal-background); 
            border-radius: var(--thermal-radius); 
            aspect-ratio: 160 / 120; 

            display: flex !important; 
            align-items: center; 
            justify-content: center; 

            thermal-icon {
                display: block;
                width: 2em;
                height: 2em;
            }
        }

        .file-preview__preview {
            position: relative;
        }
    
        .file-preview__info { 
            display: flex; 
            flex-direction: column; 
            gap: .2em; 
            font-size: .8em;

            & > *:not(.file-preview__label) {
                opacity: .5;
            }
        }
        .file-preview__label { 
            font-size: 1.2em; 
            font-weight: 500; 
        }
        .file-preview__name {
            max-width: 10em; /* nebo jiná vhodná šířka */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
        }
        .file-remove-btn { 
            position: absolute; 
            top: -4px; 
            left: -4px; 
            cursor: pointer;
            --padding: .3em;
        }

        .missing-file-dropzone { 
            aspect-ratio: 160 / 120; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            border: 2px dotted var(--thermal-slate); 
            border-radius: var(--thermal-radius); 
            cursor: pointer; 
            transition: all .2s; 
            font-size: var(--thermal-fs-sm); 
            color: var(--thermal-slate-dark); 
            text-align: center; 

            thermal-icon {
                display: block;
                width: 1em;
                height: 1em;
            }
        }
        .missing-file-dropzone.drag-over, 
        .missing-file-dropzone:hover { 
            border-color: var(--thermal-primary); 
            background: #fff; 
        }

        .file-remove-btn thermal-btn, 
        .group-remove-btn thermal-btn { 
            pointer-events: auto; 
        }

        .group-header { 
            display: flex; 
            align-items: center; 
            gap: 1em; 
        }

        .unmatched-files { 
            margin-top: var(--thermal-gap);

            thermal-expandable {
                --font-size: .9em;
            }

            h2 {
                margin: 0;
                font-size: 1em;
            }

            p:last-child,
            li::last-child {
                margin-bottom: 0;
            }

            table {
                img {
                    width: 5em;
                    height: auto;
                }
                td {
                    padding-right: .5em;
                }
            }

        }

        .bottom-dropzone-wrapper { 
            margin-top: 2em; 
        }

        .info, .error { 
            border-radius: var(--thermal-radius); 
            padding: calc(var(--thermal-gap) * .5); 
            margin-top: var(--thermal-gap); 
            font-size: calc(var(--thermal-fs) * .9); 
        }
        .info { 
            background: var(--thermal-primary-light,#eef); 
            border:1px var(--thermal-border-style)var(--thermal-primary,#00f); 
            color: var(--thermal-primary-dark,#008); 
        }
        .error { 
            background: var(--thermal-danger-light,#fee); 
            border:1px var(--thermal-border-style)var(--thermal-danger,#f00); 
            color: var(--thermal-danger-dark,#800); 
        }
    `;
	}
	async handleSubmit() {
		if (this.pairedFiles.length === 0) {
			this.errorMessage = "Vyberte alespoň jeden .lrc soubor";
			return false;
		}
		this.errorMessage = "";
		try {
			const uploadPromises = this.pairedFiles.map(async (pair) => {
				const upload = this.client.api.routes.post.uploadFile(this.folder.path, pair.lrc);
				if (pair.visual) upload.setVisual(pair.visual);
				if (pair.preview) upload.setPreview(pair.preview);
				const result = await upload.execute();
				if (!result?.success) throw new Error(`Nepodařilo se nahrát soubor ${pair.lrc.name}: ${result?.message}`);
				return pair.lrc;
			});
			const uploadedFiles = await Promise.all(uploadPromises);
			if (this.onSuccess) this.onSuccess(uploadedFiles);
			this.clearAllFiles();
			return true;
		} catch (error) {
			this.errorMessage = error instanceof Error ? error.message : "Nepodařilo se nahrát soubory";
			return false;
		}
	}
	addFiles(newFiles) {
		if (!newFiles || newFiles.length === 0) return;
		const newArray = Array.from(newFiles);
		const hasNewLrc = newArray.some((f) => f.name.toLowerCase().endsWith(".lrc"));
		if (!this.allFiles.some((f) => f.name.toLowerCase().endsWith(".lrc")) && !hasNewLrc) {
			this.infoMessage = "Je třeba nahrávat primárně LRC soubory! PNG obrázky jsou jejich volitelný doplněk.";
			setTimeout(() => {
				this.infoMessage = "";
			}, 4500);
			return;
		}
		this.infoMessage = "";
		const unique = newArray.filter((nf) => !this.allFiles.some((ef) => ef.name === nf.name && ef.size === nf.size));
		this.allFiles = [...this.allFiles, ...unique];
		this.pairFiles();
	}
	handleMainFileChange(e) {
		const input = e.target;
		this.addFiles(input.files);
		input.value = "";
	}
	handleInlineFileChange(e, lrcFile, type) {
		const input = e.target;
		if (input.files && input.files.length > 0) {
			const original = input.files[0];
			const base = lrcFile.name.replace(/\.lrc$/i, "");
			const key = base.includes("_thermal") ? base.substring(0, base.lastIndexOf("_thermal")) : base;
			const fileName = type === "visual" ? `${key}_visual.png` : `${key}_image_thermal.png`;
			const renamed = new File([original], fileName, { type: original.type });
			this.addFiles({
				0: renamed,
				length: 1,
				item: (i) => i === 0 ? renamed : null
			});
		}
		input.value = "";
	}
	clearAllFiles() {
		this.pairedFiles.forEach((pair) => {
			if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
			if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
			if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
		});
		this.unmatchedPngs.forEach((unmatched) => URL.revokeObjectURL(unmatched.url));
		this.allFiles = [];
		this.pairedFiles = [];
		this.unmatchedPngs = [];
	}
	removePairedGroup(lrcFileToRemove) {
		const group = this.pairedFiles.find((p) => p.lrc === lrcFileToRemove);
		if (!group) return;
		const toRemove = /* @__PURE__ */ new Set([group.lrc]);
		if (group.visual) toRemove.add(group.visual);
		if (group.preview) toRemove.add(group.preview);
		this.allFiles = this.allFiles.filter((f) => !toRemove.has(f));
		this.pairFiles();
	}
	removePairedFile(file) {
		this.allFiles = this.allFiles.filter((f) => f !== file);
		this.pairFiles();
	}
	removeUnmatchedPng(pngFileToRemove) {
		this.allFiles = this.allFiles.filter((f) => f !== pngFileToRemove);
		this.pairFiles();
	}
	pairFiles() {
		this.pairedFiles.forEach((pair) => {
			if (pair.lrcUrl) URL.revokeObjectURL(pair.lrcUrl);
			if (pair.visualUrl) URL.revokeObjectURL(pair.visualUrl);
			if (pair.previewUrl) URL.revokeObjectURL(pair.previewUrl);
		});
		this.unmatchedPngs.forEach((unmatched) => URL.revokeObjectURL(unmatched.url));
		const lrcFiles = this.allFiles.filter((file) => file.name.toLowerCase().endsWith(".lrc"));
		const pngFiles = this.allFiles.filter((file) => file.name.toLowerCase().endsWith(".png"));
		const paired = [];
		const usedPngs = /* @__PURE__ */ new Set();
		lrcFiles.forEach((lrcFile) => {
			const lrcBaseName = lrcFile.name.replace(/\.lrc$/i, "");
			const key = lrcBaseName.includes("_thermal") ? lrcBaseName.substring(0, lrcBaseName.lastIndexOf("_thermal")) : lrcBaseName;
			const visualKey = `${key}_visual`;
			const previewKey = `${key}_image_thermal`;
			const visualFile = pngFiles.find((png) => !usedPngs.has(png) && png.name.replace(/\.png$/i, "").startsWith(visualKey));
			const previewFile = pngFiles.find((png) => !usedPngs.has(png) && png.name.replace(/\.png$/i, "").startsWith(previewKey));
			const pair = {
				lrc: lrcFile,
				lrcUrl: URL.createObjectURL(lrcFile)
			};
			if (visualFile) {
				pair.visual = visualFile;
				pair.visualUrl = URL.createObjectURL(visualFile);
				usedPngs.add(visualFile);
			}
			if (previewFile) {
				pair.preview = previewFile;
				pair.previewUrl = URL.createObjectURL(previewFile);
				usedPngs.add(previewFile);
			}
			paired.push(pair);
		});
		this.pairedFiles = paired;
		this.unmatchedPngs = pngFiles.filter((png) => !usedPngs.has(png)).map((file) => ({
			file,
			url: URL.createObjectURL(file)
		}));
	}
	handleZoneDragOver(e) {
		e.preventDefault();
		e.currentTarget.classList.add("drag-over");
	}
	handleZoneDragLeave(e) {
		e.preventDefault();
		e.currentTarget.classList.remove("drag-over");
	}
	handleMainDrop(e) {
		e.preventDefault();
		e.currentTarget.classList.remove("drag-over");
		this.addFiles(e.dataTransfer?.files ?? null);
	}
	handleInlineDrop(e, lrcFile, type) {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.remove("drag-over");
		const files = e.dataTransfer?.files;
		if (files && files.length > 0) {
			const original = files[0];
			const base = lrcFile.name.replace(/\.lrc$/i, "");
			const key = base.includes("_thermal") ? base.substring(0, base.lastIndexOf("_thermal")) : base;
			const fileName = type === "visual" ? `${key}_visual.png` : `${key}_image_thermal.png`;
			const renamed = new File([original], fileName, { type: original.type });
			this.addFiles({
				0: renamed,
				length: 1,
				item: (i) => i === 0 ? renamed : null
			});
		}
	}
	openFileSelector(id) {
		this.shadowRoot?.getElementById(id)?.click();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.clearAllFiles();
	}
	render() {
		const label = this.label ?? (0, _labirthermal_webcomponents.t)("uploadafile");
		if (!this.client.isLoggedIn || !this.folder.may_manage_files_in) return lit.nothing;
		return lit.html`<thermal-dialog
            .label="${this.tooltip ? this.tooltip : this.label}"
            .beforeClose=${() => this.handleSubmit()}
            button=${(0, _labirthermal_webcomponents.t)("upload")}
        >
            <slot name="invoker" slot="invoker">
                <thermal-btn 
                    size="md" 
                    variant=${this.variant}
                    ?plain=${this.plain}
                    icon="upload" 
                    iconStyle="micro"
                    .tooltip=${this.tooltip ?? ""}
                >${label}</thermal-btn>
            </slot>
            <div class="content" slot="content">
                ${this.renderInitialDropzone()}
                ${this.infoMessage ? lit.html`<div class="info">${this.infoMessage}</div>` : lit.nothing}
                ${this.renderPreview()}
                ${this.pairedFiles.length + this.unmatchedPngs.length > 0 ? this.renderBottomDropzone() : lit.nothing}
                ${this.errorMessage ? lit.html`<div class="error">${this.errorMessage}</div>` : lit.nothing}
            </div>
            ${this.pairedFiles.length > 0 ? lit.html`<thermal-btn
                    slot="button"
                    @click=${() => this.clearAllFiles()}
                >Zrušit výběr</thermal-btn>` : lit.nothing}
        </thermal-dialog>`;
	}
	renderInitialDropzone() {
		if (this.allFiles.length > 0) return lit.nothing;
		return lit.html`<div 
            class="stage-upload"
            @click=${() => this.openFileSelector("dialog-main-input")}
            @dragenter=${(e) => this.handleZoneDragOver(e)}
            @dragover=${(e) => this.handleZoneDragOver(e)}
            @dragleave=${(e) => this.handleZoneDragLeave(e)}
            @drop=${(e) => this.handleMainDrop(e)}
        >
            <label for="dialog-main-input">
                <div>Vyberte či přetáhněte sem LRC soubory a odpovídající PNG obrázky.</div>
                <thermal-btn variant="primary" icon="upload" iconStyle="micro">Vybrat soubory</thermal-btn>
            </label>
            <input id="dialog-main-input" type="file" multiple accept=".lrc,.png" @change=${this.handleMainFileChange} />
        </div>`;
	}
	renderPreview() {
		if (this.pairedFiles.length === 0 && this.unmatchedPngs.length === 0) return lit.nothing;
		const lrcCount = this.pairedFiles.length;
		const pngCount = this.pairedFiles.reduce((state, current) => {
			return state + (current.visual ? 1 : 0) + (current.preview ? 1 : 0);
		}, 0);
		let titleSuffix = `${lrcCount}x LRC`;
		if (pngCount > 0) titleSuffix += ` + ${pngCount}x PNG`;
		return lit.html`<div class="paired-files">
            <h3 class="stage-label">Soubory k uploadu <small>${titleSuffix}</small></h3>
            ${this.renderPairedTable()}
            ${this.renderUnmatchedFiles()}
        </div>`;
	}
	renderPairedTable() {
		if (this.pairedFiles.length === 0) return lit.nothing;
		return lit.html`<table class="paired-files-table"><tbody>
            ${this.pairedFiles.map((p, i) => this.renderPairedRow(p, i))}
        </tbody></table>`;
	}
	renderPairedRow(pair, index) {
		return lit.html`<tr class="paired-file-group paired-file-group__header">
            <td colspan="4">
                <div class="group-header">
                    <span>${index + 1}. snímek</span>
                    <thermal-btn variant="default" ?plain=${true} icon="close" iconStyle="micro" tooltip="Odstranit celou skupinu" @click=${() => this.removePairedGroup(pair.lrc)}></thermal-btn>
                </div>
            </td>
        </tr>
        <tr class="paired-file-group">
            <td></td>
            <td>${this.renderFilePreview("LRC termogram", pair.lrc)}</td>
            <td>${this.renderFilePreview("Snímek ve viditelném spektru", pair.visual, pair.lrc, "visual", pair.visualUrl)}</td>
            <td>${this.renderFilePreview("Printscreen displeje termokamery", pair.preview, pair.lrc, "preview", pair.previewUrl)}</td>
        </tr>`;
	}
	renderFilePreview(label, file, lrcContext, type, url) {
		if (!file) {
			const inputId = `dialog-inline-${lrcContext.name}-${type}`;
			return lit.html`<div class="file-preview file-preview__has-file">
                <div class="file-preview__preview">
                    <div class="missing-file-dropzone"
                        @click=${() => this.openFileSelector(inputId)}
                        @dragenter=${(e) => this.handleZoneDragOver(e)}
                        @dragover=${(e) => e.preventDefault()}
                        @dragleave=${(e) => this.handleZoneDragLeave(e)}
                        @drop=${(e) => this.handleInlineDrop(e, lrcContext, type)}>
                        <thermal-icon icon="upload" variant="micro"></thermal-icon>
                        <input id=${inputId} type="file" accept=".png" @change=${(e) => this.handleInlineFileChange(e, lrcContext, type)} />
                    </div>
                </div>
                <div class="file-preview__info">
                    <div class="file-preview__label">${label}</div>
                    <div class="file-preview__name">Volitelně nahrajte ${type} obrázek.</div>
                </div>
            </div>`;
		}
		const kb = (file.size / 1024).toFixed(2);
		const isImg = file.name.toLowerCase().endsWith(".png");
		const preview = isImg && url ? lit.html`<img src=${url} alt="File preview" />` : isImg ? lit.html`<div class="file-preview__icon"><thermal-icon icon="image" variant="outline"></thermal-icon></div>` : lit.html`<div class="file-preview__icon"><thermal-icon icon="document" variant="outline"></thermal-icon></div>`;
		const removeBtn = type === "visual" || type === "preview" || label.toLowerCase().includes("lrc") ? lit.html`<thermal-btn class="file-remove-btn" variant="primary" ?plain=${true} size="sm" icon="close" iconStyle="micro" tooltip="${(0, _labirthermal_webcomponents.t)("remove")}" @click=${() => this.removePairedFile(file)}></thermal-btn>` : lit.nothing;
		return lit.html`<div class="file-preview file-preview__has-file">
            <div class="file-preview__preview">${preview}${removeBtn}</div>
            <div class="file-preview__info">
                <div class="file-preview__label">${label}</div>
                <div class="file-preview__name">${file.name}</div>
                <div class="file-preview__size">${kb} kB</div>
            </div>
        </div>`;
	}
	renderUnmatchedFiles() {
		if (this.unmatchedPngs.length === 0) return lit.nothing;
		const title = `${this.pairedFiles.length === 0 ? "Nerozpoznané obrázky" : "Další nespárované obrázky"} (${this.unmatchedPngs.length}) nebudou nahrány`;
		return lit.html`<div class="unmatched-files">

            <thermal-expandable
                label="${title}"
                variantExpanded="foreground"
                closeIcon="true"
                icon="info"
                iconStyle="outline"
                tooltip="Obrázky PNG, které se nám dle jejich jména nepodařilo spárovat s žádným LRC souborem"
            >

                <table><tbody>
                    ${this.unmatchedPngs.map((u) => lit.html`<tr class="file-item">
                        <td>
                            <thermal-btn 
                                variant="background"
                                ?plain=${true} 
                                icon="close" 
                                iconStyle="micro" 
                                tooltip="${(0, _labirthermal_webcomponents.t)("remove")}" 
                                @click=${() => this.removeUnmatchedPng(u.file)}></thermal-btn>
                        </td>
                        <td>
                            <img src=${u.url} alt="Unmatched file preview" />
                        </td>
                        <td>${u.file.name}</td>
                    </tr>`)}
                </tbody></table>

                <thermal-tip
                    variant="info"
                    style="--font-size: 1em; margin-top: 1em;"
                >
                    <h2>Jak párujeme soubory</h2>
                    <p>Termokamery TIMI Edu od roku 2024 ukládají soubory v tomto formátu:</p>
                    <ul>
                        <li><strong>[datum]_thermal.lrc</strong> - klíčový termogram, který potřebujeme</li>
                        <li><strong>[datum]_visual.png</strong> - snímek ve viditelném spektru (volitelný)</li>
                        <li><strong>[datum]_image_thermal.png</strong> - printscreen displeje termokamery (volitelný, v online aplikaci nemá žádné užití)</li>
                    </ul>
                    <p>Co jsme schopni spárovat:</p>
                    <ul>
                        <li><strong>[datum]</strong>_cokolivdalsiho<strong>_thermal</strong>_neco<strong>.lrc</strong></li>
                        <li><strong>[datum]</strong>_neco_jineho<strong>_visible.png</strong></li>
                        <li><strong>[datum]</strong>_zase_neco_jineho_<strong>_image_thermal</strong> (1)<strong>.png</strong></li>
                    </ul>
                    <p>Pokud jsou Vaše soubory pojmenovány jinak, můžete k LRC snímkům přiřadit PNG soubory ručně v tabulce výše.</p>
                </thermal-tip>
            
            </thermal-expandable>

            
        </div>`;
	}
	renderBottomDropzone() {
		return lit.html`<div class="bottom-dropzone-wrapper">
            <div class="stage-upload"
                @click=${() => this.openFileSelector("dialog-bottom-input")}
                @dragenter=${(e) => this.handleZoneDragOver(e)}
                @dragover=${(e) => this.handleZoneDragOver(e)}
                @dragleave=${(e) => this.handleZoneDragLeave(e)}
                @drop=${(e) => this.handleMainDrop(e)}
            >
                <label for="dialog-bottom-input">
                    <div>Přidat další soubory LRC či PNG</div>
                    <thermal-btn variant="primary" icon="upload" iconStyle="micro">Vybrat soubory</thermal-btn>
                </label>
                <input id="dialog-bottom-input" type="file" multiple accept=".lrc,.png" @change=${this.handleMainFileChange} />
            </div>
        </div>`;
	}
	shouldRenderDialog() {
		if (!this.client.isLoggedIn || !this.client.identity || !this.folder || !this.folder.may_manage_files_in) return false;
		return true;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedUploadDialog.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadDialog.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", Object)], ConnectedUploadDialog.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedUploadDialog.prototype, "errorMessage", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedUploadDialog.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedUploadDialog.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadDialog.prototype, "allFiles", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadDialog.prototype, "pairedFiles", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedUploadDialog.prototype, "unmatchedPngs", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], ConnectedUploadDialog.prototype, "isDragging", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedUploadDialog.prototype, "infoMessage", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedUploadDialog.prototype, "onSuccess", void 0);
//#endregion
//#region src/components/folder/ConnectedFolderHeader.ts
var ConnectedFolderHeader = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.icon = _labirthermal_webcomponents.icons.folder.outline("icon");
	}
	static {
		this.styles = lit.css`
        :host {
            display: flex;
            flex-wrap: no-wrap;
            font-size: var(--thermal-fs);
            gap: .5em;
        }


        .part {

            display: block;
            background: var(--thermal-background);
            color: var(--thermal-foreground);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            box-sizing: border-box;
        
        }


        section {
            display: grid !important;
            grid-template-columns: 2em 1fr;
            grid-template-rows: auto auto;
            gap: 0 var(--thermal-gap);
            flex-grow: 1;
        }

        .icon {
            grid-row: 1;
            grid-column: 1;
            width: 2em;
            display: block;
            color: var(--thermal-slate);
        }

        .content {
            grid-row: 1;
            grid-column: 2;
        }

        h1 {
            font-size: var(--thermal-fs);
            margin: 0;
            padding: 0;
        }

        .description {
            font-size: .8em;
            color: var(--thermal-slate);
        }

        .actions {
            grid-row: 2;
            grid-column: 1 / -1;
            display: flex;
            flex-wrap: wrap;
            gap: 0 2em;
            align-items: center;

            slot::slotted(*) {
                padding-top: 1em;
            }
        }

        .actions:not(:has(*)) {
            display: none;
        }

        /* Fallback for browsers without :has() support */
        .actions:empty {
            display: none;
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		this.content.subscribeToFolderUpdates(this);
		this.content.subscribeToBreadcrumbUpdates(this);
	}
	renderUpButton() {
		if (!this.content.breadcrumb || this.content.breadcrumb.length === 0) return lit.nothing;
		const folders = this.content.breadcrumb.filter((item) => item.type === "folder");
		if (folders.length <= 1) return lit.nothing;
		const parent = folders[folders.length - 2];
		const lockedPath = this.display.host.lockedPath;
		if (lockedPath && !parent.path.includes(lockedPath)) return lit.nothing;
		const callback = this.onParentClick || (() => {});
		return lit.html`
            <thermal-btn 
                variant="background" 
                @click=${() => callback(parent)} 
                icon="upwards" 
                iconStyle="outline" 
                size="xl"
                tooltip="Jít o úroveň výš do složky '${parent.name}'."
            >
            </thermal-btn>
        `;
	}
	render() {
		return lit.html`

        ${this.renderUpButton()}
        
        <section class="part">

            ${this.i(this.icon)}

            <div class="content">

                <h1>
                    ${this.content.folder?.name}
                </h1>

                ${this.content.folder?.description ? lit.html`<div class="description">${this.content.folder?.description}</div>` : lit.nothing}
            </div>
            
            <div class="actions">
                <slot></slot>
            </div>
        </section>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFolderHeader.prototype, "onParentClick", void 0);
//#endregion
//#region src/components/folder/thumbs/AbstractFolderThumbnail.ts
var AbstractFolderThumbnail = class extends AbstractControlledConsumer {
	get internalSlug() {
		return this.folder.path.replaceAll("/", "-").replaceAll(" ", "_") + "___thumbnail";
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        figure.folder-thumbnail {

            display: block;
            margin: 0;
            padding: 0;

        }

        figure.folder-thumbnail.folder-thumbnail_lrc {

            object-position: center center;

            overflow: hidden;

            manager-provider,
            registry-provider,
            group-provider,
            file-provider {
                display: contents;
                
            }

            file-canvas {
                display: block;
                height: 100%;
                width: auto;
                pointer-events: none;
            }

            file-canvas::part(file-canvas-container),
            file-canvas::part(thermal-canvas-wrapper) {
                width: 100% !important;
                height: 100% !important;
                transition: all .2s ease-in-out;
            }

            file-canvas::part(thermal-file-canvas) {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center center;
            }

        }

        figure.folder-thumbnail.folder-thumbnail_image {

            overflow: hidden;

            img {
                transition: all .2s ease-in-out;
                object-fit: cover;
                object-position: center center;
                width: 100%;
                height: 100%;

            }

        }

        figure.folder-thumbnail.folder-thumbnail_icon {

            display: flex;
            align-items: center;
            justify-content: center;

            thermal-icon {
                transition: all .2s ease-in-out;
                color: var( --thermal-slate );
                width: 2em;
                display: block;
            }
        
        }


        .counter-with-icon {
            display: flex;
            gap: .3em;
            align-items: center;
            thermal-icon {
                display: block;
                width: 1em;
                transform: translateY(.1em);
            }
        }

    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this.handleActionClick.bind(this));
	}
	handleActionClick(event) {
		event.stopPropagation();
		if (!(("originalTarget" in event ? event.originalTarget : event.target) instanceof HTMLInputElement)) {
			this.log(this.onClick);
			this.onClick?.(this.folder);
		}
	}
	renderCountWithIcon(count, icon, variant = "micro") {
		if (count <= 0) return lit.nothing;
		return lit.html`<div class="counter-with-icon">
                <span>${count}x</span>
                <thermal-icon icon=${icon} variant=${variant}></thermal-icon>
            </div>`;
	}
	renderThumbnail() {
		if (this.folder.thumb && this.shouldRenderThumbnailImage()) return this.renderThumbnailWrapper(this.renderThumbnailImage(this.folder.thumb, this.folder.name), "image");
		if (this.folder.thumb && this.shouldRenderThumbnailLrc()) return this.renderThumbnailWrapper(this.renderThumbnailLrc(this.folder.thumb), "lrc");
		return this.renderThumbnailWrapper(this.renderThumbnailIcon(), "icon");
	}
	shouldRenderThumbnailLrc() {
		return this.folder.thumb?.toLowerCase().endsWith(".lrc") ?? false;
	}
	shouldRenderThumbnailImage() {
		if (!this.folder.thumb) return false;
		const lower = this.folder.thumb.toLowerCase();
		return lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".gif") || lower.endsWith(".webp");
	}
	renderThumbnailWrapper(content, typeClass) {
		return lit.html`<figure class="folder-thumbnail folder-thumbnail_${typeClass}">${content}</figure>`;
	}
	renderThumbnailIcon() {
		return lit.html`<thermal-icon icon="folder" variant="outline"></thermal-icon>`;
	}
	renderThumbnailImage(src, alt) {
		return lit.html`<img src="${src}" alt="${alt}" />`;
	}
	renderThumbnailLrc(thermalUrl) {
		return lit.html`<registry-provider
            autoclear="true"
            batch="true"
            slug="${this.internalSlug}"
        >
            <group-provider 
                slug="${this.internalSlug}"
                autoclear="true"
                batch="true"
            >
                <file-provider
                    thermal="${thermalUrl}"
                    batch="true"
                    autoclear="true"
                >
                    <file-canvas></file-canvas>
                </file-provider>
            </group-provider>
        </registry-provider>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], AbstractFolderThumbnail.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], AbstractFolderThumbnail.prototype, "onClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], AbstractFolderThumbnail.prototype, "onUpdate", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Number }), __decorateMetadata("design:type", Number)], AbstractFolderThumbnail.prototype, "subfoldersCount", void 0);
//#endregion
//#region src/components/folder/thumbs/ConnectedFolderRow.ts
var ConnectedFolderRow = class extends AbstractFolderThumbnail {
	static {
		this.styles = [AbstractFolderThumbnail.styles, lit.css`

        :host {
        
            display: table-row;

            cursor: pointer;

            transition: all .2s ease-in-out;

            filter: drop-shadow(0px 0px 1px var(--thermal-slate));

            & > td {

                display: table-cell;
                vertical-align: middle;

                min-width: 1em;
                position: relative;

                border-bottom: .5em var(--thermal-border-style)transparent;

                background: var(--thermal-background);
            

                & > * {

                    display: block;

                    height: 100%;

                    overflow: hidden;

                }
                

                &:first-child {

                    border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );

                    & > * {
                        border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
                    }

                }

                &:last-child {

                    border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;

                    & > * {
                        border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
                    }

                }
            }

        }

        figure.folder-thumbnail.folder-thumbnail_icon {
        
            background: var( --thermal-slate );

            thermal-icon {
                color: var( --thermal-slate-light );
            }
        
        }


        :host(:hover) {

            filter: drop-shadow( var( --thermal-shadow ) );

            figure.folder-thumbnail.folder-thumbnail_icon thermal-icon {
                color: var( --thermal-background );
                scale: 1.1;
            }

            figure.folder-thumbnail.folder-thumbnail_lrc {
            
                file-canvas::part(file-canvas-container),
                file-canvas::part(thermal-canvas-wrapper) {
                    scale: 1.05;
                }
            
            }

            figure.folder-thumbnail.folder-thumbnail_image {
            
                img {
                    scale: 1.05;
                }
            
            }
            
        }

        td {
            padding: 0;
        }

        .cell-texts {

            width: 50% !important;

            min-width: 200px;
            max-width: 500px;
        
        }

        .texts {
            padding: .5em 1em;
            height: 100%;
            box-sizing: border-box;
            
            h3 {
                font-size: 1em;
                margin: 0;
            }
            
            .description,
            .path {
                margin-top: .5em;
            }

            .description { 
                color: var(--thermal-slate); 
                font-size: .8em;
            }
            .path { 
                color: var(--thermal-slate); 
                font-size: .7em;
            }
        }

        .cell-thumbnail,
        figure.folder-thumbnail {

            height: 100px;
            width: 120px;
        
        }

        .cell-count {

            width: 4em;

            box-sizing: border-box;
            padding: .5em;

            vertical-align: middle !important;

            color: var(--thermal-slate);
            

            & > div {
                display: inline-block; 
                
            }
        
        }

        .cell-actions {
            text-align: right;
            box-sizing: border-box;
            padding: .5em 1em;

            & > div {
                display: inline-block;
            }
        }

        

    `];
	}
	render() {
		const name = this.folder.name ?? this.folder.slug;
		return lit.html`
            <td class="cell cell-thumbnail">
                ${this.renderThumbnail()}
            </td>

            <td class="cell cell-texts">
                <div class="texts">
                    <h3>${name}</h3>
                    ${this.folder.description ? lit.html`<div class="description">${this.folder.description.substring(0, 80)}${this.folder.description.length > 80 ? "..." : ""}</div>` : lit.nothing}

                    <div class="path">
                        /${this.folder.path}
                    </div>
                </div>
            </td>

            <td class="cell cell-count">
                <div>
                    ${this.renderCountWithIcon(this.folder.lrc_count, "image")}
                </div>
            </td>

            <td class="cell cell-count">
                <div>
                    ${this.renderCountWithIcon(this.subfoldersCount ?? 0, "folder")}
                </div>
            </td>

            <td class="cell cell-actions" @click="${this.handleActionClick}">
                <div>
                    <slot name="actions"></slot>
                </div>
            </td>

        `;
	}
};
//#endregion
//#region src/components/folder/thumbs/ConnectedFolderThumbnail.ts
var ConnectedFolderThumbnail = class extends AbstractFolderThumbnail {
	static {
		this.styles = [AbstractFolderThumbnail.styles, lit.css`

        :host {
        
            display: grid;
            grid-template-columns: 100px 1fr;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            overflow: hidden;

            cursor: pointer;

            transition: all .2s ease-in-out;

        }

        figure.folder-thumbnail.folder-thumbnail_icon {
        
            background: var( --thermal-slate );

            thermal-icon {
                color: var( --thermal-slate-light );
            }
        
        }


        :host(:hover) {

            box-shadow: var( --thermal-shadow );
            border-color: var( --thermal-slate-dark );

            figure.folder-thumbnail.folder-thumbnail_icon thermal-icon {
                color: var( --thermal-background );
                scale: 1.1;
            }

            figure.folder-thumbnail.folder-thumbnail_lrc {
            
                file-canvas::part(file-canvas-container),
                file-canvas::part(thermal-canvas-wrapper) {
                    scale: 1.05;
                }
            
            }

            figure.folder-thumbnail.folder-thumbnail_image {
            
                img {
                    scale: 1.05;
                }
            
            }
            
        }

        header {
            
            box-sizing: border-box;
            width: 100%;
            min-height: 75px;

            padding: calc( var(--thermal-gap) * .5);
            background: var( --thermal-background );

            .header-top {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: calc( var(--thermal-gap) * .5 );

                width: 100%;

                .header-top-icons {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    color: var( --thermal-slate );
                }
            }

            .header-bottom {
                display: flex;
                justify-content: flex-start;
                margin-top: auto;
            }

            h2 {
                font-size: calc( var(--thermal-fs) * 1 );
                margin: 0;
                padding: 0;
            }

            .description {
                margin-top: calc( var(--thermal-gap) * .25 );
                font-size: calc( var(--thermal-fs) * 0.8 );
                color: var( --thermal-slate );
            }



            .header-folder-icon {
                display: block;
                width: 1.4em;
            }   

        }

        .counter-with-icon {
            font-size: .8em;
        }

    `];
	}
	render() {
		const name = this.folder.name ?? this.folder.slug;
		return lit.html`

            ${this.renderThumbnail()}

            <header>
                <div class="header-top">
                    <div class="header-top-text">
                        <h2>${name}</h2>
                        <div class="description">${this.folder.description}</div>
                    </div>
                    <div class="header-top-icons">

                        <thermal-icon icon="folder" variant="outline" class="header-folder-icon"></thermal-icon>
                        
                        ${this.renderCountWithIcon(this.folder.lrc_count, "image")}

                        ${this.renderCountWithIcon(this.subfoldersCount ?? 0, "folder")}

                        <connected-folder-selection-checkbox .folder=${this.folder}></connected-folder-selection-checkbox>

                    </div>
                </div>
                <div class="header-bottom" @click=${this.handleActionClick}>
                    <slot name="action"></slot>
                </div>
            </header>

        `;
	}
};
//#endregion
//#region src/components/folder/listing/ConnetcedFileList.ts
var ConnectedFileList = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.onFileClick = () => {};
		this.onChange = () => {};
		this.onFileDelete = () => {};
		this.icon = _labirthermal_webcomponents.icons.image.outline("icon");
		this.compact = false;
		this.showDiscussion = false;
		this.editableTags = false;
	}
	static {
		this.styles = lit.css`
        :host {
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);
            gap: 2em;
            position: relative;
            width: 100%;
        }
        :host([display-mode="asGrid"]) {
            grid-column: 2;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1em;
        
        }
        :host([display-mode="asTable"]) {
            grid-column: 2;
            display: table;
            border-spacing: 1em;
            margin: -1em;
        }
        `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFolderUpdates(this);
		this.content.subscribeToFilesUpdates(this);
		this.display.subscribeToDisplayCompact(this);
		this.display.subscribeToEditTags(this);
		this.display.subscribeToDisplayComments(this);
	}
	renderFile(file) {
		const callback = this.onFileClick !== void 0 ? () => this.onFileClick(file) : void 0;
		return lit.html`<connected-file-thumbnail
    .file=${file}
    .folder=${this.content.folder}
    .onFileDelete=${this.onFileDelete}
    .onFileClick=${callback}
    display-mode=${this.displayMode}
    compact=${this.compact ? "true" : "false"}
    show-discussion=${this.showDiscussion ? "true" : "false"}
    editable-tags=${this.editableTags ? "true" : "false"}
></connected-file-thumbnail>`;
	}
	render() {
		if (this.content.files === void 0 || this.content.files.length === 0) return lit.nothing;
		return lit.html`${this.content.files?.map((subfolder) => this.renderFile(subfolder))}`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileList.prototype, "onFileClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileList.prototype, "onChange", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileList.prototype, "onFileDelete", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedFileList.prototype, "compact", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "display-mode"
}), __decorateMetadata("design:type", Object)], ConnectedFileList.prototype, "displayMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false),
	attribute: "show-discussion"
}), __decorateMetadata("design:type", Boolean)], ConnectedFileList.prototype, "showDiscussion", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false),
	attribute: "editable-tags"
}), __decorateMetadata("design:type", Boolean)], ConnectedFileList.prototype, "editableTags", void 0);
//#endregion
//#region src/components/folder/listing/ConnectedSubfoldersGrid.ts
var ConnectedSubfoldersGrid = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.slug = "default_group";
		this.columnCount = 0;
		this.selectedFolders = [];
		this.onSelectionChange = () => {};
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		this.columnCount = Object.keys(this.content.grid?.header ?? {}).length;
		this.registry.onProcessingEnd.set(this.UUID, () => {
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.registry.onProcessingEnd.delete(this.UUID);
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		this.columnCount = Object.keys(this.content.grid?.header ?? {}).length;
	}
	renderHeader(header) {
		const items = Object.values(header);
		if (items.length === 0) return lit.nothing;
		return lit.html`<thead>
            ${items.map(this.renderHeaderCell.bind(this))}
        </thead>`;
	}
	renderHeaderCell(folder) {
		return lit.html`<th class="folder-header cell cell_header">
            <div
                class="cell-inner"
            >

                <thermal-icon icon="folder" variant="outline"></thermal-icon>

                <div>

                    <h2>${folder.name}</h2>
                    
                    ${folder.description ? lit.html`<p class="description small">${folder.description}</p>` : lit.nothing}

                </div>

                <div class="folder-header-buttons">

                    <connected-upload-dialog
                        .folder=${folder}
                        label=""
                        variant="default"
                        plain="true"
                        tooltip="Nahrát do složky '${folder.name}'"
                        .onSuccess=${() => {
			this.display.reloadCurrentState();
		}}
                    ></connected-upload-dialog>

                    <thermal-btn
                        tooltip="Zobrazit všech ${folder.lrc_count} souborů ve složce '${folder.name}'."
                        @click=${() => this.onFolderClick?.(folder)}
                        ?plain=${true}
                        icon="zoom"
                        iconStyle="micro"
                    ></thermal-btn>

                </div>
            </div>
        </th>`;
	}
	renderBody(body) {
		const items = Object.values(body);
		if (items.length === 0) return lit.nothing;
		return lit.html`<tbody>
            ${items.map(this.renderBodyRow.bind(this))}
        </tbody>`;
	}
	renderBodyRow(item) {
		const folders = Object.values(item.folders);
		return lit.html`

        <group-provider
            slug="${this.slug + item.label}"
            batch="true"
            autoclear="true"
            style="display: contents;"
        >

            ${this.renderBodyRowCellHeader(item.label)}

            <tr class="group-row__body">
                ${folders.map((folder) => this.renderBodyRowCellBody(folder))}
            </tr>

        </group-provider>
        `;
	}
	renderBodyRowCellHeader(label) {
		const groupSlug = this.slug + label;
		const minmax = this.registry.groups.value.find((g) => g.id === groupSlug)?.minmax.value;
		const tooltip = minmax ? [minmax.min.toFixed(2), minmax.max.toFixed(2)].join(" - ") + "  °C" : ";";
		const click = () => {
			if (minmax) this.registry.range.imposeRange({
				from: minmax.min,
				to: minmax.max
			});
		};
		const mouseenter = () => {
			if (this.registryController && minmax) this.registryController.setHighlight({
				from: minmax.min,
				to: minmax.max
			});
		};
		const mouseleave = () => {
			if (this.registryController) this.registryController.setHighlight(void 0);
		};
		return lit.html`<tr class="group-row__header">
    <td class="group-header cell" colspan="${this.columnCount}">
        <div class="group-separator"></div>
        <div class="cell-inner">

            <thermal-btn
                class="cell-button"
                tooltip=${tooltip}
                @click=${click.bind(this)}
                @mouseleave=${mouseleave.bind(this)}
                @mouseenter=${mouseenter.bind(this)}
            >${label}</thermal-btn>

            <div style="display: inline-block; text-align: left;">
                <group-download-dropdown></group-download-dropdown>
            </div>

        </div>
    </td>
</tr>`;
	}
	renderBodyRowCellBody(files) {
		if (!this.content.grid || files.length === 0) return lit.html`<td></td>`;
		const folder = this.content.grid.header[files[0].folder];
		return lit.html`<td class="folder-content cell">
    <div class="cell-inner">
        ${files.map((file) => this.renderBodyRowCellBodyFile(folder, file))}
    </div>
</td>`;
	}
	renderBodyRowCellBodyFile(folder, file) {
		return lit.html`
            <file-provider
                batch="true"
                autoclear="true"
                thermal="${file.url}"
                class="file-entry"
            >

                <header>

                    <div class="file-entry-info">
                        <h4>${_labirthermal_core.TimeFormat.human(file.timestamp)}</h4>
                        <p class="small">${file.label}</p>
                    </div>

                    <div class="file-entry-buttons">

                        <connected-file-tags
                            .inline=${true}
                            .file=${file}
                            .folder=${folder}
                            .editable=${this.display.editTags}
                            .onChange=${(file) => {
			this.log("tags changed");
			this.onFileEdit?.(file);
		}}
                            size="sm"
                        ></connected-file-tags>

                        <file-range-propagator
                            ?plain=${true}
                            icon="range"
                            iconStyle="outline"
                            size="md"
                            ?hide-label=${true}
                        ></file-range-propagator>

                        <connected-file-delete-dialog
                            .file=${file}
                            .folder=${folder}
                            size="md"
                            ?plain=${true}
                            .onDelete=${() => {
			this.display.reloadCurrentState();
		}}
                        ></connected-file-delete-dialog>
                        
                        <thermal-btn
                            ?plain=${true}
                            icon="zoom"
                            iconStyle="micro"
                            tooltip="Zobrazit detail tohoto souboru."
                            @click=${() => {
			this.onFileClick?.(folder, file);
		}}
                        >
    
                        </thermal-btn>

                    </div>
                </header>
                
                <file-canvas style="display: block;"></file-canvas>

                ${this.display.displayComments ? lit.html`<div class="comments">
                    <file-comments
                    .file=${file}
                    .folder=${folder}
                    .onChange=${(file) => {
			this.log("comments changed");
			this.onFileEdit?.(file);
		}}
                    ></file-comments>
                </div>` : lit.nothing}


            </file-provider>
        
        `;
	}
	static {
		this.styles = lit.css`

        :root {
            --cell-indent: .5em;
        }
    
        :host {

            --cell-indent: .5em;

            width: 100%;

            position: relative;

            font-size: var( --thermal-fs );
            color: var(--thermal-foreground);

            box-sizing: border-box;

            display: table;
            table-layout: fixed;

            

            & > thermal-poster {
                display: table-row;
                width: 100%;
            }

        }

        group-provider {
            display: contents;
        }

        tr, td, th {
            margin: 0;
            padding: 0;
            border: none;
            border-collapse: collapse;
            text-align: left;
            width: auto;
            box-sizing: border-box;
        }

        thead {
            position: sticky;
            top: 0px;
            z-index: 100;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        th,
        p {
            font-family: var(--thermal-font-family, sans-serif);
            font-size: var(--thermal-fs);    
            font-weight: normal;
            line-height: 1em;
            margin: 0;
            padding: 0;
            border: 0;
            text-align: left;
            box-sizing: border-box;
        }

        .cell-button {
        }

        .small {
            font-size: 0.8em;
            opacity: .5;
        }

        .cell,
        .cell-inner {
            box-sizing: border-box;
        }

        .cell {
        
        }

        .cell-inner {
            height: 100%;
        }

        
        .cell-indent {
            padding: var(--cell-indent);
        }

        .folder-header {
            padding: 0 var(--cell-indent);
        }

        .cell_header {

            > .cell-inner {
                display: grid;
                gap: .5em;
                grid-template-columns: 1.5em 1fr auto;
                grid-template-rows: auto;
                position: relative;
                padding: 1em;
                background: var(--thermal-background);
                border-radius: var(--thermal-radius);

                thermal-icon {
                    opacity: .5;
                }

                h2 {
                    font-weight: bold;
                }

                .description {
                    margin-top: .25em;
                }

                &::after {
                    content: "";
                    position: absolute;
                    width: 1em;
                    height: 1em;
                    background: var(--thermal-background);
                    bottom: -.5em;
                    transform: rotate(45deg);
                    left: 1.15em;
                }
            }

        }

        .group-header {

            text-align: center;
            position: relative;

            padding-top: 1em;
            padding-bottom: .5em;

            .cell-inner {

                position: relative;
                
                thermal-btn {
                    display: inline-block;
                }
                
            }

            

            .group-separator {
                position: absolute;
                height: 1.5em;
                width: 100%;
                left: 0px;
                bottom: 0px;

                border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;

                border-top: var(--thermal-border-width) var(--thermal-border-style)var(--thermal-slate);
                
                z-index: 0;
                
            }
        }

        .folder-header-buttons {
            display: flex;
            align-items: flex-start;
            gap: .25em;
        }

        .folder-content {

            .cell-inner {
                padding: 0 .5em;
            }
            
        }

        .file-entry {

            padding-bottom: 1em;
            display: block;

            &:last-child {
                padding-bottom: 0;
            }
        
            & > header {

                padding: .5em;
                box-sizing: border-box;

                width: 100%;

                border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
                background: var(--thermal-background);

                display: grid;
                grid-template-columns: 1fr auto;


                .file-entry-info {
                    display: flex;
                    gap: .5em;
                    align-items: center;
                    & > * {
                        display: inline-flex;
                    }
                }

                .file-entry-buttons {
                    display: flex;
                    align-items: center;
                    gap: .23em;
                }

            }

            .comments {
                background: var(--thermal-background);
                padding: .5em;
                box-sizing: border-box;
                border-radius: 0 0 var(--thermal-radius) var(--thermal-radius);
            }

            file-comments {
                background: var(--thermal-slate-light);

                padding: 1em;
                box-sizing: border-box;

                border-radius: var(--thermal-radius);

                height: 300px;
                
            }
        
        }
    
    `;
	}
	render() {
		if (this.content.grid === void 0) return lit.html`<thermal-poster message="Načítám mřížku"></thermal-poster>`;
		return [this.renderHeader(this.content.grid?.header ?? {}), this.renderBody(this.content.grid?.groups ?? [])];
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedSubfoldersGrid.prototype, "slug", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedSubfoldersGrid.prototype, "onFolderClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedSubfoldersGrid.prototype, "onFileClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedSubfoldersGrid.prototype, "onFileEdit", void 0);
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.registryControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], ConnectedSubfoldersGrid.prototype, "registryController", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ConnectedSubfoldersGrid.prototype, "columnCount", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Array)], ConnectedSubfoldersGrid.prototype, "selectedFolders", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedSubfoldersGrid.prototype, "onSelectionChange", void 0);
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: _labirthermal_webcomponents.registryObjectContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], ConnectedSubfoldersGrid.prototype, "registry", void 0);
//#endregion
//#region src/components/folder/listing/ConnectedSubfolderList.ts
var ConnectedFolderFileList = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.folderMode = "asGrid";
	}
	static {
		this.styles = lit.css`
        :host {
            color: var(--thermal-foreground);
            display: block;
            width: 100%;
        }

        :host( [folder-mode="asList"] ) {
            section {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1em;
                justify-content: start;
            }
        }

        :host( [folder-mode="asTable"] ) {
            section {
                display: table;
                width: 100%;
                border-collapse: collapse;
                height: 1px;
                border: 0;
            }
        }

        

        .list-label {

            font-size: calc( var(--thermal-fs) * .8);
            color: var(--thermal-slate);
            line-height: 1;
            margin: 0;
            padding: 0;
            font-weight: normal;
            padding-bottom: calc(var(--thermal-gap) * 0.5);
        
        }
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFolderUpdates(this);
		this.content.subscribeToSubfoldersUpdates(this);
	}
	renderSubfolder(info) {
		if (this.folderMode === "asTable") return lit.html`<connected-folder-row
                .folder=${info}
                @click=${() => this.onFolderClick && this.onFolderClick(info)}
            ></connected-folder-row>`;
		return lit.html`<connected-folder-thumbnail
            .folder=${info}
            .onClick=${() => this.onFolderClick && this.onFolderClick(info)}
        >
        </connected-folder-thumbnail>`;
	}
	render() {
		return lit.html`

        <h2 class="list-label">
            <span><strong>${this.content.subfolders?.length} složky</strong> ve složce <i>${this.content.folder?.name}</i>:</span>
        </h2>


        <section>
            ${this.content.subfolders?.map((subfolder) => this.renderSubfolder(subfolder))}
        </section>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFolderFileList.prototype, "onFolderClick", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "folder-mode"
}), __decorateMetadata("design:type", typeof FolderListDisplayMode === "undefined" ? Object : FolderListDisplayMode)], ConnectedFolderFileList.prototype, "folderMode", void 0);
//#endregion
//#region src/components/user/LoginFormNew.ts
var ConnectedLoginForm = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.isLoggingIn = false;
	}
	get mayLogIn() {
		return this.client.isClientConnected && this.valueIsNotEmpty(this.login) && this.valueIsNotEmpty(this.password) && this.login.length > 3 && this.password.length > 3;
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToLoadingChanges(this);
		this.client.subscribeToIdentityChanges(this);
	}
	valueIsNotEmpty(value) {
		return value !== void 0 && value.trim() !== "";
	}
	validateFieldInput(event, field) {
		const input = event.target;
		this[field] = input.value;
		this.requestUpdate();
	}
	handleKeyDown(event) {
		if (event.key === "Enter" && this.mayLogIn) {
			event.preventDefault();
			this.doLoginInternal();
		}
	}
	/** 
	* The main operation that performs the request. 
	* Shall never be triggered externally. 
	*/
	async doLoginInternal() {
		if (this.isLoggingIn) return;
		this.error = void 0;
		if (this.valueIsNotEmpty(this.login) === false || this.valueIsNotEmpty(this.password) === false) {
			this.error = "Login and password are required.";
			this.requestUpdate();
			return;
		}
		if (this.client === void 0) this.error = "Client is undefined.";
		this.isLoggingIn = true;
		const result = await this.client.api.routes.post.login(this.login ?? "", this.password ?? "")?.execute();
		this.isLoggingIn = false;
		if (result?.success === false) {
			this.error = result.message;
			this.requestUpdate();
			return;
		}
		this.onLoginSuccess?.(this.client.identity);
	}
	static {
		this.styles = lit.css`
    
        .login-form {
            
            display: flex;
            flex-direction: column;
            gap: calc( var( --thermal-gap ) * .5 );
            width: 100%;

            input {
            
                background: var( --thermal-background );
                color: var( --thermal-foreground );

                border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
                border-radius: var( --thermal-radius );

                box-sizing: border-box;
                padding: .5em;

                text-align: center;

            
            }

        }

        .login-error {
            color: red;
            text-align: center;
            font-size: calc( var( --thermal-fs ) * .8 );
        }

        thermal-btn {
            width: 100%;
        }

    `;
	}
	render() {
		return lit.html`
            <div class="login-form">

                ${this.prompt ? lit.html`<div class="login-prompt">${this.prompt}</div>` : lit.nothing}

                <input 
                    type="text" 
                    name="login" 
                    placeholder="Login" 
                    required 
                    @input=${(event) => this.validateFieldInput(event, "login")}
                    @keydown=${this.handleKeyDown}
                ></input>

                <input 
                    type="password" 
                    name="password" 
                    placeholder="${this.t("password")}" 
                    required 
                    @input=${(event) => this.validateFieldInput(event, "password")}
                    @keydown=${this.handleKeyDown}
                ></input>

                ${this.error ? lit.html`<div class="login-error">${this.error}</div>` : lit.nothing}

                <thermal-btn
                    @click=${() => this.doLoginInternal()}
                    ?disabled=${!this.mayLogIn}
                    variant=${this.mayLogIn ? "primary" : "background"}
                    tooltip=${(0, lit_directives_if_defined_js.ifDefined)(!this.mayLogIn ? "Vyplňte přihlašovací údaje" : void 0)}
                >
                    ${this.isLoggingIn ? this.t("login") + "..." : this.t("login")}
                </thermal-btn>
    
            </div>

            
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ConnectedLoginForm.prototype, "prompt", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedLoginForm.prototype, "error", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedLoginForm.prototype, "message", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedLoginForm.prototype, "isLoggingIn", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedLoginForm.prototype, "onLoginSuccess", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedLoginForm.prototype, "login", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedLoginForm.prototype, "password", void 0);
//#endregion
//#region src/components/user/ConnectedUserButton.ts
var ConnectedUserButton = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.disableLogging = false;
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		this.client.subscribeToLoadingChanges(this);
		this.client.api.auth.onIdentity.set(this.UUID, () => {
			this.message = void 0;
		});
	}
	static {
		this.styles = lit.css`

        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        .login-form {
            display: flex;
            gap: 1em;
            flex-wrap: wrap;
            width: 100%;
            box-sizing: border-box;
            justify-content: stretch;
        }

        input[type="text"],
        input[type="password"] {
            padding: 0.5em;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            box-sizing: border-box;
            flex: 1;
            min-width: 0;
        }

        .login-error {
            color: red;
            padding-top: .5em;
            font-size: .8em;
        }
    `;
	}
	async doLogout() {
		const result = await this.client?.api.routes.post.logout().execute();
		this.client?.api.auth.logout();
		return result && result.success;
	}
	async doLogin() {
		this.message = void 0;
		const contentSlot = ((this.shadowRoot?.querySelector("thermal-dialog"))?.shadowRoot)?.querySelector("slot[name=\"content\"]");
		if (contentSlot) {
			const contentDiv = contentSlot.assignedElements({ flatten: true }).find((el) => el.tagName === "DIV");
			if (contentDiv) {
				const loginInput = contentDiv.querySelector("input[name=\"login\"]");
				const passwordInput = contentDiv.querySelector("input[name=\"password\"]");
				if (loginInput && passwordInput) {
					const login = loginInput.value;
					const password = passwordInput.value;
					if (login && password) {
						const result = await this.client?.api.routes.post.login(login, password).execute();
						if (result && result.success) this.message = "Přihlášení proběhlo úspěšně";
						else this.message = "Přihlášení se nezdařilo";
						return result && result.success;
					}
				}
			}
		}
		return false;
	}
	async handleBeforeClose() {
		if (this.client.isLoggedIn) return await this.doLogout();
		return await this.doLogin();
	}
	handleKeyDown(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			const dialog = this.shadowRoot?.querySelector("thermal-dialog");
			if (dialog) dialog.closeFromTheOutside();
		}
	}
	renderLoginForm() {
		return lit.html`
        <div class="login-form">
            <input 
                type="text" 
                name="login" 
                placeholder="Login" 
                required
                @keydown=${this.handleKeyDown}
            ></input>
            <input 
                type="password" 
                name="password" 
                placeholder="${this.t("password")}" 
                required
                @keydown=${this.handleKeyDown}
            ></input>
        </div>
        ${this.message ? lit.html`<div class="login-error">${this.message}</div>` : lit.nothing}
        `;
	}
	renderUserLogoutNotice() {
		return lit.html`
            Opravdu se chcete odhlásit?
        `;
	}
	renderTriggerButton() {
		const buttonLabel = this.client.identity?.meta.name ?? this.client.identity?.meta.login ?? this.t("login");
		const variant = this.client.isLoggedIn ? "primary" : "default";
		return lit.html`<thermal-btn 
            slot="invoker" 
            variant=${variant} 
            icon="user" 
            iconStyle="micro"
        >
            ${buttonLabel}
        </thermal-btn>`;
	}
	renderFallbackButton() {
		if (this.client.isLoggedIn === false) return lit.nothing;
		const userName = this.client.identity?.meta.name ?? this.client.identity?.meta.login;
		if (userName !== void 0) return lit.nothing;
		return lit.html`<thermal-btn 
        slot="invoker" 
        variant="background" 
        disabled
        tooltip="Aktuálně přihlášený uživatel" 
        icon="user" 
        iconStyle="micro"
    >
        ${userName}
    </thermal-btn>`;
	}
	renderDialog() {
		const label = this.client.isLoggedIn ? this.t("logout") : this.t("login");
		const submitLabel = this.client.isLoggedIn ? this.t("logout") : this.t("login");
		const content = this.client.isLoggedIn === true ? this.renderUserLogoutNotice() : this.renderLoginForm();
		return lit.html`
            <thermal-dialog 
                label="${label}" 
                button="${submitLabel}" 
                .beforeClose=${this.handleBeforeClose.bind(this)}
            >

                ${this.renderTriggerButton()}

                <div slot="content">
                    ${content}
                </div>

            </thermal-dialog>
        `;
	}
	render() {
		if (this.disableLogging === true && this.client.isLoggedIn === false) return lit.nothing;
		else if (this.disableLogging === true && this.client.isLoggedIn === true) return this.renderFallbackButton();
		return this.renderDialog();
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedUserButton.prototype, "message", void 0);
__decorate([(0, lit_decorators_js.property)({
	reflect: true,
	attribute: "disable-logging",
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedUserButton.prototype, "disableLogging", void 0);
//#endregion
//#region src/components/ConnectedShareDialog.ts
var ConnectedShareDialog = class extends AbstractControlledConsumer {
	get _path() {
		switch (this._appState) {
			case 3:
			case 4: return this.content.file?.path;
			default: return;
		}
	}
	get _folder() {
		return this.content.folder;
	}
	get _file() {
		return this.content.file;
	}
	get _appState() {
		return this.display.appState;
	}
	get _folderListDisplayMode() {
		return this.display.folderListDisplayMode;
	}
	get _fileListDisplayMode() {
		return this.display.fileDisplayMode;
	}
	get _fileListDisplayCompact() {
		return this.display.fileDisplayCompact;
	}
	renderEntity(label, icon, prependArrow = false) {
		return lit.html`
        ${prependArrow ? lit.html`<thermal-icon icon="right" variant="micro" style="display: block; width: 1em;"></thermal-icon>` : lit.nothing}
        <div class="entity" title="${label}">
            <thermal-icon icon="${icon}" variant="micro"></thermal-icon>
            <span>${label}</span>
        </div>`;
	}
	renderLink() {
		const url = this.assambleUrl();
		return lit.html`<div class="server-link">

            <div class="server-link-content">
                ${url}
            </div>
            <thermal-btn
                icon="copy"
                iconStyle="mini"
                variant="foreground"
                ?plain=${true}
                @click=${() => {
			navigator.clipboard.writeText(url);
		}}
                tooltip="Zkopírovat odkaz do schránky"
            ></thermal-btn>

            <thermal-btn
                icon="link"
                iconStyle="micro"
                variant="primary"
                ?plain=${true}
                @click=${() => {
			window.open(url, "_blank");
		}}
                tooltip="Otevřít odkaz v novém okně"
            ></thermal-btn>

        </div>`;
	}
	static {
		this.styles = lit.css`
        :host {
            font-size: var( --thermal-fs );
            color: var( --thermal-foreground );
        }

        .entity-list {
            display: flex;
            align-items: center;
            gap: .5em;
            width: 100%;
        }

        .entity {
            display: flex;
            align-items: center;
            gap: 0.5em;
            padding: .5em;
            border-radius: var( --thermal-radius );

            background: var( --thermal-background );

            thermal-icon {
                display: inline-block;
                width: 1em;
            }
        }

        section {

            box-sizing: border-box;
            width: 100%;

            padding: 1.5em .5em .5em .5em;
            margin-top: 2em;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );

            position: relative;


            & > h3 {
            
               position: absolute;
               top: -1em;
               left: .5em;
               box-sizing: border-box;
               
               padding: .4em .5em;
               margin: 0;

               border-radius: var( --thermal-radius );
               border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );

               background: var( --thermal-slate-light );

               font-size: 1em;
               line-height: 1em;

            }

            .description {
                font-size: .8em;
                opacity: .5;
                margin-top: .5em;
            }

        }

        .server-link {

            display: flex;

            .server-link-content {
                flex-grow: 1;
                box-sizing: border-box;
                padding: .5em;

                background: var( --thermal-background );
                border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            }

            > thermal-btn {
                border-radius: 0;
                &:last-child {
                    border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
                }
            }
        
        }
    
    `;
	}
	assambleUrl() {
		const link = this.client.api.getPublicUrl();
		const segments = {};
		if (this.palette) segments["palette"] = this.palette;
		if (this.from !== void 0) segments["from"] = this.from.toString();
		if (this.to !== void 0) segments["to"] = this.to.toString();
		if (this._path) {
			segments["folder-path"] = this._path;
			if (this._appState === 3 && this._folderListDisplayMode && this._fileListDisplayMode && this._fileListDisplayCompact !== void 0) {
				segments["files-display"] = this._fileListDisplayMode;
				segments["folder-display"] = this._folderListDisplayMode;
				segments["files-compact"] = this._fileListDisplayCompact ? "true" : "false";
			}
			if (this._appState === 4 && this._file) segments["file-name"] = this._file.fileName;
		}
		return `${link}/?${new URLSearchParams(segments).toString()}`;
	}
	render() {
		if (!this.client || !this.client.api.isConnected() || !this._path || !this._appState || ![3, 4].includes(this._appState)) return lit.nothing;
		return lit.html`<thermal-dialog label="${(0, _labirthermal_webcomponents.t)("share")}">

            <thermal-btn slot="invoker" icon="share" iconStyle="mini" tooltip="Sdílet odkaz na tento obsah"></thermal-btn>

            <div slot="content">

                <section>

                    <h3>Co sdílíte</h3>

                    <div class="entity-list">
                        ${this._folder ? this.renderEntity(this._folder.name, "folder") : lit.nothing}
                        ${this._file ? this.renderEntity(this._file.fileName, "image", true) : lit.nothing}
                    </div>

                </section>

                <section>
                    <h3>Odkaz na server</h3>
                    ${this.renderLink()}
                    <div class="description">Odkaz vede na <strong>${this.client.serverInfo?.name}</strong>, kde tento obsah <strong>${this._folder?.protected ? "uvidí pouze uživatelé s přístupem" : "uvidí kdokoliv"}</strong>.</div>
                </section>

            </div>

        </thermal-dialog>`;
	}
};
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.managerPaletteContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], ConnectedShareDialog.prototype, "palette", void 0);
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.registryRangeFromContext,
	subscribe: true
}), __decorateMetadata("design:type", Number)], ConnectedShareDialog.prototype, "from", void 0);
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.registryRangeToContext,
	subscribe: true
}), __decorateMetadata("design:type", Number)], ConnectedShareDialog.prototype, "to", void 0);
//#endregion
//#region src/components/ConnectedBreadcrumb.ts
var ConnectedBreadcrumb = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.items = [];
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: flex;
            align-items: center;
            gap: 0.5em;

            color: var(--thermal-slate);
            font-size: calc( var(--thermal-fs) * 0.8 );
        }

        .item {
            --color: var( --thermal-slate );
            --color-hover: var( --thermal-foreground );
        }

        .interactive {
            --color: var( --thermal-slate-dark );
            --color-hover: var( --thermal-primary );
        }

        .current {
            --color: var( --thermal-slate-dark );
            --cursor: help;
            text-decoration: underline;
        }
    
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.refreshItems();
		this.display.onAppModeUpdate.set(this.UUID, () => {
			this.refreshItems();
		});
		this.content.onBreadcrumbUpdate.set(this.UUID, () => {
			this.refreshItems();
		});
		this.client.onIdentity.set(this.UUID, () => {
			this.refreshItems();
		});
	}
	update(changedProperties) {
		super.update(changedProperties);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.content.onBreadcrumbUpdate.delete(this.UUID);
		this.client.onIdentity.delete(this.UUID);
	}
	refreshItems() {
		this.items = this.calculateItems(this.content.breadcrumb || []);
	}
	calculateItems(breadcrumb, lockedLocation) {
		const items = [];
		items.push({
			icon: "wifi",
			iconStyle: "micro",
			label: this.client.serverInfo?.name || "Server"
		});
		if (this.client.identity) {
			const userItem = {
				icon: "user",
				iconStyle: "micro",
				label: this.client.identity.meta.name || this.client.identity.user || "User"
			};
			if (!lockedLocation) {
				userItem.tooltip = (0, _labirthermal_webcomponents.t)("overviewofyourfolders");
				userItem.onClick = () => {
					this.onUserClick?.();
				};
			}
			items.push(userItem);
		}
		if (lockedLocation) {
			const lockedLabel = breadcrumb.find((item) => item.path === lockedLocation)?.name || lockedLocation;
			items.push({
				icon: "lock",
				iconStyle: "micro",
				label: "",
				tooltip: `V tomto zobrazení procházíte pouze složku "${lockedLabel}".`
			});
		}
		if (this.display.appState !== 2) for (const item of breadcrumb) {
			if (item.type !== "folder") continue;
			if (lockedLocation !== void 0 && !item.path.includes(lockedLocation)) continue;
			const folderItem = {
				icon: "folder",
				iconStyle: "micro",
				label: item.name || "Folder",
				tooltip: item.path || "Folder",
				onClick: () => this.onFolderClick?.(item)
			};
			items.push(folderItem);
		}
		return items;
	}
	renderItem(item, index) {
		const isInteractive = item.onClick !== void 0 && index < this.items.length - 1;
		const classNames = {
			item: true,
			[item.icon]: true,
			current: index === this.items.length - 1,
			interactive: isInteractive
		};
		return lit.html`
        ${index > 0 ? lit.html`<span>/</span>` : lit.nothing}
        <thermal-btn 
            class="${(0, lit_directives_class_map_js.classMap)(classNames)}"
            @contextmenu=${(e) => {
			if (item.tooltip) {
				e.preventDefault();
				navigator.clipboard.writeText(item.tooltip);
			}
		}}
            @click=${() => {
			if (item.onClick) item.onClick();
		}}
            variant="text"
            icon="${item.icon}"
            iconStyle="${item.iconStyle}"
            interactive=${isInteractive ? "true" : "false"}
            tooltip=${item.tooltip ? item.tooltip : void 0}
        >
            ${item.label}
        </thermal-btn>`;
	}
	render() {
		return lit.html`${this.items.map(this.renderItem.bind(this))}`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedBreadcrumb.prototype, "onFolderClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedBreadcrumb.prototype, "onUserClick", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedBreadcrumb.prototype, "items", void 0);
//#endregion
//#region src/components/selection/ConnectedFolderSelectionCheckbox.ts
/** Connected folder selection checkbox component */
var ConnectedFolderSelectionCheckbox = class extends AbstractControlledConsumer {
	connectedCallback() {
		super.connectedCallback();
		this.selectionFolder.subscribeToSelectionChange(this);
	}
	renderCheckbox(isSelected) {
		return lit.html`<input 
            type="checkbox" 
            .checked=${isSelected} 
            @change=${(e) => {
			e.preventDefault();
			if (e.target.checked) this.selectionFolder.addToSelection(this.folder);
			else this.selectionFolder.removeFromSelection(this.folder);
		}}
        />`;
	}
	renderButton(isSelected) {
		return lit.html`<thermal-btn @click=${(isSelected ? () => this.selectionFolder.removeFromSelection(this.folder) : () => this.selectionFolder.addToSelection(this.folder)).bind(this)}>${isSelected ? "Odstranit" : "Přidat"}</thermal-btn>`;
	}
	static {
		this.styles = lit.css`
    
        :host {

            &:hover {
                cursor: pointer;
            }
        
        }

        input {
        
            accent-color: var( --thermal-primary );
            background-color: var( --thermal-slate-light );
            cursor: pointer;

            transition: all .2s ease-in-out;

            &:hover {

                box-shadow: var( --thermal-shadow );
            
            }
        
        }
    
    `;
	}
	render() {
		const isSelected = this.selectionFolder.folderIsSelected(this.folder);
		return this.renderCheckbox(isSelected);
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFolderSelectionCheckbox.prototype, "folder", void 0);
//#endregion
//#region src/components/selection/ConnectedFolderSelectionActions.ts
var ConnectedFolderSelectionActions = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.progress = 0;
		this.total = 0;
		this.dialogDeleteRef = (0, lit_directives_ref_js.createRef)();
		this.dialogSaveAnalysesRef = (0, lit_directives_ref_js.createRef)();
		this.dialogClearAnalysesRef = (0, lit_directives_ref_js.createRef)();
		this.dialogMoveRef = (0, lit_directives_ref_js.createRef)();
	}
	connectedCallback() {
		super.connectedCallback();
		this.selectionFolder.subscribeToSelectionChange(this);
		this.content.subscribeToFilesUpdates(this);
	}
	getCount() {
		return this.selectionFolder.array.length;
	}
	renderTrigger() {
		return lit.html`<span slot="invoker">${this.getCount()} vybraných</span>`;
	}
	renderOptionClear() {
		return lit.html`<thermal-btn 
            @click=${() => {
			this.selectionFolder.clearSelection();
		}}
            slot="option"
            icon="close"
            iconStyle="micro"
            align="left"
        >Zrušit výběr</thermal-btn>`;
	}
	renderOptionAll() {
		const allSelected = this.selectionFolder.array.length === this.content.files?.length;
		return lit.html`<thermal-btn
            @click=${allSelected ? void 0 : () => {
			if (this.content.subfolders) this.selectionFolder.addMultipleToSelection(this.content.subfolders);
		}}
            slot="option"
            ?disabled=${allSelected}
            icon="bigger"
            iconStyle="mini"
            align="left"
        >Vybrat všechny</thermal-btn>`;
	}
	renderOptionGrid() {
		return lit.html`<thermal-btn
            slot="option"
            @click=${() => {
			this.dialogDeleteRef.value?.setOpen();
		}}
            icon="grid"
            iconStyle="micro"
            align="left"
        >Zobrazit mřížku ze složek</thermal-btn>`;
	}
	renderDialogGrid() {
		const callback = async () => {
			this.progress = 0;
			this.total = this.selectionFolder.array.length;
			await this.selectionFolder.forEverySelectedAsync(async () => {
				this.progress++;
			});
			this.progress = 0;
			this.total = 0;
			this.dialogDeleteRef.value?.setClose();
			this.selectionFile.clearSelection();
			this.display.reloadCurrentState();
			return true;
		};
		let progress = lit.nothing;
		if (this.progress > 0) progress = lit.html`<div>
                <div slot="option">Mažu ${this.progress} z ${this.total} souborů...</div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${this.progress / this.total * 100}%"></div>
                </div>
            </div>`;
		return lit.html`<thermal-dialog
            label="Smazat vybrané soubory"
            ${(0, lit_directives_ref_js.ref)(this.dialogDeleteRef)}
        >
            

            <div slot="content">
            
                <p>Opravdu chcete trvale smazat ${this.selectionFolder.array.length} složek?</p>

                <ul>
                    ${this.selectionFolder.array.map((folder) => lit.html`<li>${folder.name}</li>`)}
                </ul>

                ${progress}
            
            </div>

            <thermal-btn @click=${callback} slot="button" variant="primary">Proveď</thermal-btn>

        </thermal-dialog>`;
	}
	renderOptionMove() {
		return lit.html`<thermal-btn
            slot="option"
            @click=${() => {
			this.log(this.dialogMoveRef.value);
			this.dialogMoveRef.value?.openDialogue();
		}}
            icon="move"
            iconStyle="mini"
            align="left"
        >Přesunout</thermal-btn>`;
	}
	renderDialogMove() {
		return lit.html`<connected-location-selector
            .asDialogue=${true}
            ${(0, lit_directives_ref_js.ref)(this.dialogMoveRef)}
            mode="folder"
            dialogTitle="Přesunout vybrané složky"
            operationLabel="Přesunout do"
            .onSelect=${async (path) => {
			await this.selectionFolder.forEverySelectedAsync(async (folder) => {
				await this.client.api.routes.post.moveFolder(folder.path, path).execute();
			});
			this.dialogMoveRef.value?.closeDialogue();
			this.display.navigateToFolderAndLoad(path);
		}}
        >
        </connected-location-selector>`;
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: flex;
            align-items: center;
            gap: .5em;
        }

        thermal-icon {
            width: 1em;
        }

        .progress {
            position: relative;
            width: 100%;
            height: 1em;
            background-color: var( --thermal-slate-dark );
            border-radius: var( --thermal-radius );
            overflow: hidden;
            border: 1px solid var( --thermal-slate-dark );
        }

        .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: var( --thermal-primary );
        }
    
    `;
	}
	renderDropdownSelection() {
		return lit.html`<thermal-dropdown
            variant="primary"
        >
            ${this.renderTrigger()}
            ${this.renderOptionClear()}
            ${this.renderOptionAll()}
        </thermal-dropdown>`;
	}
	renderArrow() {
		return lit.html`<thermal-icon icon="right" variant="micro"></thermal-icon>`;
	}
	renderDropdownActions() {
		return lit.html`<thermal-dropdown
            variant="foreground"
        >
            <span slot="invoker">Zvolte akci</span>
            ${this.renderOptionMove()}
            ${this.renderOptionGrid()}
        </thermal-dropdown>`;
	}
	renderDalogs() {
		return [this.renderDialogGrid(), this.renderDialogMove()];
	}
	render() {
		if (this.selectionFolder.array.length === 0) return lit.nothing;
		return [
			this.renderDropdownSelection(),
			this.renderArrow(),
			this.renderDropdownActions(),
			this.renderDalogs()
		];
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ConnectedFolderSelectionActions.prototype, "progress", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ConnectedFolderSelectionActions.prototype, "total", void 0);
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.groupObjectContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], ConnectedFolderSelectionActions.prototype, "group", void 0);
//#endregion
//#region src/components/selection/ConnectedFileSelectionCheckbox.ts
/** Connected file selection checkbox component */
var ConnectedFileSelectionCheckbox = class extends AbstractControlledConsumer {
	connectedCallback() {
		super.connectedCallback();
		this.selectionFile.subscribeToSelectionChange(this);
	}
	renderCheckbox(isSelected) {
		return lit.html`<input 
            type="checkbox" 
            .checked=${isSelected} 
            @change=${(e) => {
			if (e.target.checked) this.selectionFile.addToSelection(this.file);
			else this.selectionFile.removeFromSelection(this.file);
		}}
        />`;
	}
	renderButton(isSelected) {
		return lit.html`<thermal-btn @click=${(isSelected ? () => this.selectionFile.removeFromSelection(this.file) : () => this.selectionFile.addToSelection(this.file)).bind(this)}>${isSelected ? "Odstranit" : "Přidat"}</thermal-btn>`;
	}
	static {
		this.styles = lit.css`
    
        :host {

            &:hover {
                cursor: pointer;
            }
        
        }

        input {
        
            accent-color: var( --thermal-primary );
            background-color: var( --thermal-slate-light );
            cursor: pointer;
        
        }
    
    `;
	}
	render() {
		const isSelected = this.selectionFile.fileIsSelected(this.file);
		return this.renderCheckbox(isSelected);
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileSelectionCheckbox.prototype, "file", void 0);
//#endregion
//#region src/components/selection/ConnectedFileSelectionActions.ts
var ConnectedFileSelectionActions = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.progress = 0;
		this.total = 0;
		this.dialogDeleteRef = (0, lit_directives_ref_js.createRef)();
		this.dialogSaveAnalysesRef = (0, lit_directives_ref_js.createRef)();
		this.dialogClearAnalysesRef = (0, lit_directives_ref_js.createRef)();
		this.dialogMoveRef = (0, lit_directives_ref_js.createRef)();
	}
	connectedCallback() {
		super.connectedCallback();
		this.selectionFile.subscribeToSelectionChange(this);
		this.content.subscribeToFilesUpdates(this);
	}
	getCount() {
		return this.selectionFile.array.length;
	}
	renderTrigger() {
		return lit.html`<span slot="invoker">${this.getCount()} vybraných</span>`;
	}
	renderOptionClear() {
		return lit.html`<thermal-btn 
            @click=${() => {
			this.selectionFile.clearSelection();
		}}
            slot="option"
            icon="close"
            iconStyle="micro"
            align="left"
        >Zrušit výběr</thermal-btn>`;
	}
	renderOptionAll() {
		const allSelected = this.selectionFile.array.length === this.content.files?.length;
		return lit.html`<thermal-btn
            @click=${allSelected ? void 0 : () => {
			if (this.content.files) this.selectionFile.addMultipleToSelection(this.content.files);
		}}
            slot="option"
            ?disabled=${allSelected}
            icon="bigger"
            iconStyle="mini"
            align="left"
        >Vybrat všechny</thermal-btn>`;
	}
	renderOptionDelete() {
		return lit.html`<thermal-btn
            slot="option"
            @click=${() => {
			this.dialogDeleteRef.value?.setOpen();
		}}
            icon="trash"
            iconStyle="micro"
            align="left"
        >Trvale smazat ze serveru</thermal-btn>`;
	}
	renderDialogDelete() {
		const callback = async () => {
			this.progress = 0;
			this.total = this.selectionFile.array.length;
			await this.selectionFile.forEverySelectedAsync(async (file) => {
				await this.client.api.routes.post.deleteFile(file.path, file.fileName).execute();
				this.progress++;
			});
			this.progress = 0;
			this.total = 0;
			this.dialogDeleteRef.value?.setClose();
			this.selectionFile.clearSelection();
			this.display.reloadCurrentState();
			return true;
		};
		let progress = lit.nothing;
		if (this.progress > 0) progress = lit.html`<div>
                <div slot="option">Mažu ${this.progress} z ${this.total} souborů...</div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${this.progress / this.total * 100}%"></div>
                </div>
            </div>`;
		return lit.html`<thermal-dialog
            label="Smazat vybrané soubory"
            ${(0, lit_directives_ref_js.ref)(this.dialogDeleteRef)}
        >
            

            <div slot="content">
            
                <p>Opravdu chcete trvale smazat ${this.selectionFile.array.length} souborů?</p>

                <ul>
                    ${this.selectionFile.array.map((file) => lit.html`<li>${file.fileName}</li>`)}
                </ul>

                ${progress}
            
            </div>

            <thermal-btn @click=${callback} slot="button" variant="primary">Proveď</thermal-btn>

        </thermal-dialog>`;
	}
	renderOptionClearAnalyses() {
		return lit.html`<thermal-btn
            slot="option"
            @click=${() => {
			this.dialogClearAnalysesRef.value?.setOpen();
		}}
            icon="trash"
            iconStyle="micro"
            align="left"
        >Odstranit analýzy uložené na serveru</thermal-btn>`;
	}
	renderDialogClearAnalyses() {
		const callback = async () => {
			this.progress = 0;
			this.total = this.selectionFile.array.length;
			await this.selectionFile.forEverySelectedAsync(async (file) => {
				await this.client.api.routes.post.updateFile(file.path, file.fileName).clearAnalyses().execute();
				this.progress++;
			});
			this.progress = 0;
			this.total = 0;
			this.dialogClearAnalysesRef.value?.setClose();
			this.selectionFile.clearSelection();
			this.display.reloadCurrentState();
			return true;
		};
		let progress = lit.nothing;
		if (this.progress > 0) progress = lit.html`<div>
                <div slot="option">Mažu analýzy ${this.progress}. z ${this.total} souborů...</div>
                <div class="progress">
                    <div class="progress-bar" style="width: ${this.progress / this.total * 100}%"></div>
                </div>
            </div>`;
		return lit.html`<thermal-dialog
            label="Smazat analýzy u vybraných souborů"
            ${(0, lit_directives_ref_js.ref)(this.dialogClearAnalysesRef)}
        >

            <div slot="content">
            
                <p>Opravdu chcete trvale smazat analýzy u ${this.selectionFile.array.length} souborů?</p>

                <ul>
                    ${this.selectionFile.array.map((file) => lit.html`<li>${file.fileName}</li>`)}
                </ul>

                ${progress}
            
            </div>

            <thermal-btn @click=${callback} slot="button" variant="primary">Proveď</thermal-btn>

        </thermal-dialog>`;
	}
	renderOptionMove() {
		return lit.html`<thermal-btn
            slot="option"
            @click=${() => {
			this.log(this.dialogMoveRef.value);
			this.dialogMoveRef.value?.openDialogue();
		}}
            icon="move"
            iconStyle="mini"
            align="left"
        >Přesunout</thermal-btn>`;
	}
	renderDialogMove() {
		return lit.html`<connected-location-selector
            .asDialogue=${true}
            ${(0, lit_directives_ref_js.ref)(this.dialogMoveRef)}
            mode="file"
            dialogTitle="Přesunout vybrané soubory"
            operationLabel="Přesunout do"
            .onSelect=${async (path) => {
			await this.selectionFile.forEverySelectedAsync(async (file) => {
				const result = await this.client.api.routes.post.moveFile(file.path, file.fileName, path).execute();
				this.log(result);
				this.log(`Přesouvám ${file.fileName} z ${file.path} do ${path}. Výsledek: ${result.success}`);
			});
			this.dialogMoveRef.value?.closeDialogue();
			this.display.navigateToFolderAndLoad(path);
		}}
        >
        </connected-location-selector>`;
	}
	renderOptionDownload() {
		const handler = async () => {
			const instances = this.group?.getInstances();
			if (instances) {
				const files = [];
				this.selectionFile.forEverySelectedSync((info) => {
					const instance = instances.find((i) => i.thermalUrl === info.url);
					if (instance) {
						const blob = new Blob([instance.reader.buffer], { type: "application/octet-stream" });
						const file = new File([blob], info.fileName, { type: "application/octet-stream" });
						files.push(file);
					}
				});
				const fileName = `${this.content.folder?.name || "files"}_${[
					"selected",
					this.selectionFile.array.length,
					"files"
				].join("-")}.zip`;
				const link = document.createElement("a");
				link.download = fileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				link.remove();
			} else this.log("No files were found!");
		};
		return lit.html`<thermal-btn
            slot="option"
            @click=${handler.bind(this)}
            icon="download"
            iconStyle="micro"
            align="left"
        >Stáhnout jako ZIP</thermal-btn>`;
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: flex;
            align-items: center;
            gap: .5em;
        }

        thermal-icon {
            width: 1em;
        }

        .progress {
            position: relative;
            width: 100%;
            height: 1em;
            background-color: var( --thermal-slate-dark );
            border-radius: var( --thermal-radius );
            overflow: hidden;
            border: 1px solid var( --thermal-slate-dark );
        }

        .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: var( --thermal-primary );
        }
    
    `;
	}
	renderDropdownSelection() {
		return lit.html`<thermal-dropdown
            variant="primary"
        >
            ${this.renderTrigger()}
            ${this.renderOptionClear()}
            ${this.renderOptionAll()}
        </thermal-dropdown>`;
	}
	renderArrow() {
		return lit.html`<thermal-icon icon="right" variant="micro"></thermal-icon>`;
	}
	renderDropdownActions() {
		return lit.html`<thermal-dropdown
            variant="foreground"
        >
            <span slot="invoker">Zvolte akci</span>
            ${this.renderOptionDownload()}
            ${this.renderOptionMove()}
            ${this.renderOptionDelete()}
            ${this.renderOptionClearAnalyses()}
        </thermal-dropdown>`;
	}
	renderDalogs() {
		return [
			this.renderDialogDelete(),
			this.renderDialogClearAnalyses(),
			this.renderDialogMove()
		];
	}
	render() {
		if (this.selectionFile.getSelectedFiles().length === 0) return lit.nothing;
		return [
			this.renderDropdownSelection(),
			this.renderArrow(),
			this.renderDropdownActions(),
			this.renderDalogs()
		];
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ConnectedFileSelectionActions.prototype, "progress", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ConnectedFileSelectionActions.prototype, "total", void 0);
__decorate([(0, _lit_context.consume)({
	context: _labirthermal_webcomponents.groupObjectContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], ConnectedFileSelectionActions.prototype, "group", void 0);
//#endregion
//#region src/components/selection/move/ConnectedLocationSelector.ts
let LocationSelectorMode = /* @__PURE__ */ function(LocationSelectorMode) {
	LocationSelectorMode["FOLDER"] = "folder";
	LocationSelectorMode["FILE"] = "file";
	return LocationSelectorMode;
}({});
var ConnectedLocationSelector = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.dialogRef = (0, lit_directives_ref_js.createRef)();
		this.asDialogue = false;
		this.operationLabel = "Vybrat";
		this._loading = false;
	}
	get selectedFolderName() {
		return this._currentFolderInfo?.name;
	}
	get selectedFolderPath() {
		return this._currentFolderInfo?.path;
	}
	openDialogue() {
		if (this.asDialogue && this.dialogRef.value) this.dialogRef.value.setOpen();
	}
	closeDialogue() {
		if (this.asDialogue && this.dialogRef.value) this.dialogRef.value.setClose();
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		if (this.client.isLoggedIn) this._currentSubfolders = [...this.content.userFolders];
		this.content.onUserFoldersUpdate.add(this.UUID, (userFolders) => {
			this._userFolders = [...userFolders ?? []];
		});
	}
	async _onPathChange(newPath) {
		this._loading = true;
		const info = await this.client.api.routes.get.info(newPath).execute();
		if (info.data) {
			this._currentFolderInfo = info.data.folder;
			this._currentSubfolders = Object.values(info.data.subfolders);
			this._breadcrumb = info.data.breadcrumb;
		}
		this._loading = false;
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var( --thermal-fs );
            display: block;
        }

        .list {
        
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        
        }

        .list-item {
        
            display: flex;
            align-items: center;
            gap: 0.5em;
            box-sizing: border-box;
            background: var( --thermal-background );
            border-radius: var( --thermal-radius );

            .folder-name {
                flex-grow: 1;
                cursor: pointer;
                padding: .25em .5em;
            }

            thermal-btn {
                opacity: 0;
                transition: opacity .3s ease-in-out;
            }

            thermal-icon {
                width: 1em;
                height: 1em;
                display: inline-block;
            }

            &.selectable {
                .folder-name {
                    cursor: pointer;
                }
            }

            &.disabled {
                text-decoration: strikethrough;
                color: var( --thermal-slate );
            }

            &:hover,
            &:focus {
            
                thermal-btn {
                    opacity: 1;
                }
            
            }

        }

        .breadcrumb {

            display: flex;
            flex-wrap: wrap;
            gap: 1em;

            thermal-btn {

                position: relative;
            
                &:not(:last-child)::after {
                    content: "/";
                    position: absolute;
                    display: block;
                    width: 1em;
                    height: 100%;
                    right: -1em;
                    top: 0;
                    color: var( --thermal-slate );
                    pointer-events: none;
                }
            
            }
        }

        .content {
        
            display: flex;
            flex-direction: column;
            gap: 1em;
            width: 100%;
        
        }

        .poster {
        
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5em;
            padding: 1em;

            width: 100%;
            min-height: 200px;
            box-sizing: border-box;

            border: 1px dashed var( --thermal-slate );
            border-radius: var( --thermal-radius );

        }
    
    `;
	}
	renderBreadcrumbItemInternal(label, onClick, isLast, tooltip) {
		const style = {
			"pointer-events": isLast ? "none" : "auto",
			"font-weight": isLast ? "bold" : "normal"
		};
		return lit.html`<thermal-btn 
            variant="breadcrumb"
            tooltip=${(0, lit_directives_if_defined_js.ifDefined)(tooltip)}  
            @click=${onClick}
            style=${(0, lit_directives_style_map_js.styleMap)(style)}
        >
        ${label}</thermal-btn>`;
	}
	renderBreadcrumbItem(item, isLast = false) {
		if (item.type !== "folder") return lit.nothing;
		return this.renderBreadcrumbItemInternal(item.name, () => this._onPathChange(item.path), isLast, `Zobrazit obsah složky ${item.name}`);
	}
	renderBreadcrumb() {
		if (!this._breadcrumb && !this.client.isLoggedIn) return lit.nothing;
		const userItem = this.renderBreadcrumbItemInternal(this.client.identity?.meta.name ?? this.client.identity?.user ?? "User", () => {
			this._currentFolderInfo = void 0;
			this._currentSubfolders = this.content.userFolders;
			this._breadcrumb = void 0;
		}, false, "Zobrazit všechny Vaše složky");
		return lit.html`<div class="breadcrumb">
            ${userItem}
            ${(0, lit_directives_map_js.map)(this._breadcrumb, (item, index) => this.renderBreadcrumbItem(item, index === this._breadcrumb.length - 1))}
        </div>`;
	}
	renderBackButton() {
		if (this._currentSubfolders === void 0 || this._currentFolderInfo === void 0) return lit.nothing;
		const parentSegments = this._currentFolderInfo.path.split("/").slice(0, -1);
		if (parentSegments.length === 0) return lit.nothing;
		const parent = parentSegments.join("/");
		return lit.html`<thermal-btn 
            icon="back"
            iconStyle="micro"
            @click=${() => this._onPathChange(parent)}
        >${this.t("back")}</thermal-btn>`;
	}
	renderFolderSelector(folderInfo) {
		const classes = { "list-item": true };
		const disabled = this.mode === "folder" && folderInfo.may_have_files === true;
		if (disabled) classes.disabled = true;
		let actionButton = lit.nothing;
		const clickAction = () => {
			if (disabled) return;
			this._onPathChange(folderInfo.path);
		};
		const subselectButton = disabled ? lit.html`<thermal-btn 
            ?plain=${true}
            ?disabled=${true}
            variant="background"
            tooltip="Složka ''${folderInfo.name}'' je určena pro soubory"
        >Neplatné umístění</thermal-btn>` : lit.html`<thermal-btn
            icon="right"
            iconStyle="micro"
            ?plain=${true}
            variant="background"
            tooltip="Přejít do složky '${folderInfo.name}'"
            @click=${clickAction.bind(this)}
        ></thermal-btn>`;
		const name = this.getEllipsisName(folderInfo);
		if (this.mode === "folder" && !disabled) {
			actionButton = lit.html`<thermal-btn
                variant="primary"
                @click=${() => {
				this.onSelect?.(folderInfo.path);
			}}
            >${this.operationLabel} '${name}'</thermal-btn>`;
			classes.selectable = true;
		} else if (this.mode === "file" && this.folderIsValidForFiles(folderInfo)) {
			actionButton = lit.html`<thermal-btn
                variant="primary"
                @click=${() => {
				this.onSelect?.(folderInfo.path);
			}}
            >${this.operationLabel} '${name}'</thermal-btn>`;
			classes.selectable = true;
		}
		return lit.html`<div
            class=${(0, lit_directives_class_map_js.classMap)(classes)}
        >
            <span 
                @click=${clickAction.bind(this)}
                class="folder-name"
            >
                <thermal-icon icon="folder" variant="micro"></thermal-icon>
                ${folderInfo.name}
            </span>
            ${actionButton}
            ${subselectButton}
        </div>`;
	}
	folderIsValidForFiles(info) {
		if (!info) return false;
		return info.may_have_files === true && info.may_manage_files_in === true;
	}
	folderIsValidForFolders(info) {
		if (!info) return false;
		return info.may_have_files === false && info.may_manage_folders_in === true;
	}
	renderNoSubfolders() {
		const folderName = this._currentFolderInfo?.name;
		let label = lit.nothing;
		if (this.mode === "folder") label = this.folderIsValidForFolders(this._currentFolderInfo) ? lit.nothing : "Sem nelze složky přesunout - toto umístění je určeno pouze pro soubory, nikoliv pro složky";
		else if (this.mode === "file") label = this.folderIsValidForFiles(this._currentFolderInfo) ? lit.nothing : "Sem nelze soubory přesunout - toto umístění je určeno pouze pro složky, nikoliv pro soubory";
		const fileCount = this._currentFolderInfo?.lrc_count ?? 0;
		const fileCountHtml = fileCount > 0 ? lit.html`<div>${fileCount} soubor${fileCount === 1 ? "" : "ů"}</div>` : lit.nothing;
		return lit.html`<div class="poster">
        
            <div>Cílová složka:</div>
            <div><strong>${folderName}</strong></div>
            ${fileCountHtml}
            <div>${label}</div>
        
        </div>`;
	}
	renderFolderList() {
		const folders = this._currentSubfolders ? this._currentSubfolders : this._userFolders ?? [];
		if (folders.length === 0) return this.renderNoSubfolders();
		folders.sort((a, b) => a.name.localeCompare(b.name));
		const renderedFolders = (0, lit_directives_map_js.map)(folders, (f) => this.renderFolderSelector(f));
		return lit.html`<div class="list">
            ${renderedFolders}
        </div>`;
	}
	getEllipsisName(folderInfo) {
		if (folderInfo.name.length <= 20) return folderInfo.name;
		const first10chars = folderInfo.name.substring(0, 10);
		const ellipsis = " ... ";
		const lastChars = folderInfo.name.substring(folderInfo.name.length - 5);
		return first10chars + ellipsis + lastChars;
	}
	wrapInDialogue(content) {
		let actionButton = lit.nothing;
		const name = this._currentFolderInfo ? this.getEllipsisName(this._currentFolderInfo) : "kořenová úroveň";
		if (this.mode === "folder" && this.folderIsValidForFolders(this._currentFolderInfo)) actionButton = lit.html`<thermal-btn
                slot="button"
                variant="primary"
                @click=${() => {
			this.onSelect?.(this._currentFolderInfo.path);
		}}
            >${this.operationLabel} '${name}'</thermal-btn>`;
		else if (this.mode === "file" && this.folderIsValidForFiles(this._currentFolderInfo)) actionButton = lit.html`<thermal-btn
                slot="button"
                variant="primary"
                @click=${() => {
			this.onSelect?.(this._currentFolderInfo.path);
		}}
            >${this.operationLabel} '${name}'</thermal-btn>`;
		return lit.html`<thermal-dialog
            label=${this.dialogTitle ?? "Vyberte umístění"}
            ${(0, lit_directives_ref_js.ref)(this.dialogRef)}
        >
            <slot name="invoker" slot="invoker"></slot>
            
            <div slot="content" class="content">${content}</div>

            ${actionButton}
        
        </thermal-dialog>`;
	}
	render() {
		if (this.client.isLoggedIn === false) return lit.nothing;
		const content = this._loading ? lit.html`<thermal-spinner></thermal-spinner>` : [
			this.renderBreadcrumb(),
			this.renderBackButton(),
			this.renderFolderList()
		];
		if (this.asDialogue) return this.wrapInDialogue(content);
		return content;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Boolean }), __decorateMetadata("design:type", Boolean)], ConnectedLocationSelector.prototype, "asDialogue", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedLocationSelector.prototype, "dialogTitle", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", typeof LocationSelectorMode === "undefined" ? Object : LocationSelectorMode)], ConnectedLocationSelector.prototype, "mode", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], ConnectedLocationSelector.prototype, "onSelect", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedLocationSelector.prototype, "operationLabel", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedLocationSelector.prototype, "_loading", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], ConnectedLocationSelector.prototype, "_currentFolderInfo", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedLocationSelector.prototype, "_currentSubfolders", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedLocationSelector.prototype, "_userFolders", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedLocationSelector.prototype, "_breadcrumb", void 0);
//#endregion
//#region src/components/folder/crud/ConnectedFolderMoveDialog.ts
var ConnectedFolderMoveDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.selectionRef = (0, lit_directives_ref_js.createRef)();
	}
	renderTrigger() {
		return lit.html`<thermal-btn
            tooltip="Přesunout složku"
            slot="invoker"
            icon="move"
            iconStyle="mini"
        ></thermal-btn>`;
	}
	renderDialog() {
		const onSelect = async (path) => {
			if (this.folder || !this.selectionRef.value) {
				if ((await this.client.api.routes.post.moveFolder(this.folder.path, path).execute()).success) {
					this.selectionRef.value?.closeDialogue();
					await this.display.navigateToFolderAndLoad(path);
				}
			}
		};
		return lit.html`<connected-location-selector
            mode=${"folder"}
            .asDialogue=${true}
            operationLabel="Přesunout do"
            .onSelect=${onSelect}
            ${(0, lit_directives_ref_js.ref)(this.selectionRef)}
        >
            ${this.renderTrigger()}
        </connected-location-selector>`;
	}
	render() {
		return this.renderDialog();
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFolderMoveDialog.prototype, "folder", void 0);
//#endregion
//#region src/components/folder/crud/AbstractFolderDialog.ts
/** A base class for all dialogs related to folder CRUD operations. */
var AbstractFolderDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.closeLabel = "close";
		this.dialogLabel = "folder";
		this.dialogRef = (0, lit_directives_ref_js.createRef)();
	}
	close() {
		this.dialogRef.value?.setClose();
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }
    
    `;
	}
	render() {
		if (!this.shouldRenderDialog()) return lit.nothing;
		return lit.html`<thermal-dialog
    label=${(0, _labirthermal_webcomponents.t)(this.dialogLabel)}
    button=${(0, _labirthermal_webcomponents.t)(this.closeLabel)}
    .beforeClose=${() => this.beforeClose()}
    ${(0, lit_directives_ref_js.ref)(this.dialogRef)}
>
    <thermal-btn
        slot="invoker"
        icon=${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}
        iconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}
        variant=${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}
        size=${(0, lit_directives_if_defined_js.ifDefined)(this.size)}
        ?plain=${this.plain}
        ?disabled=${this.disabled}
        ?non-interactive=${!this.interactive}
        tooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.tooltip)}
    >
        ${this.label}
    </thermal-btn>
    <div class="content" slot="content">
        ${this.renderContent()}
    </div>
    ${this.renderButtons()}
</thermal-dialog>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], AbstractFolderDialog.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractFolderDialog.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractFolderDialog.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractFolderDialog.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractFolderDialog.prototype, "disabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractFolderDialog.prototype, "interactive", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "closeLabel", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AbstractFolderDialog.prototype, "dialogLabel", void 0);
//#endregion
//#region src/components/folder/crud/ConnectedFolderEditDialog.ts
var ConnectedFolderEditDialog = class extends AbstractFolderDialog {
	constructor(..._args) {
		super(..._args);
		this.closeLabel = "savechanges";
		this.dialogLabel = "editfolder";
		this.folderName = "";
		this.folderDescription = "";
		this.errorMessage = "";
	}
	static {
		this.styles = lit.css`

        :host {
            align-self: stretch;
        }

        input,
        label,
        textarea,
        .form-group,
        .content,        
        .error {
            box-sizing: border-box;
        }

        .form-group {
            margin-bottom: var(--thermal-gap);
        }

        label {
            display: block;
            margin-bottom: calc(var(--thermal-gap) * 0.5);
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
        }

        textarea {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
            font-family: inherit;
            resize: vertical;
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;
	}
	firstUpdated() {
		this.folderName = this.folder.name || this.folder.slug;
		this.folderDescription = this.folder.description || "";
	}
	async beforeClose() {
		if (!this.folderName.trim()) {
			this.errorMessage = "Název složky je povinný";
			return false;
		}
		if (!this.client) {
			this.errorMessage = "Klient není dostupný";
			return false;
		}
		this.errorMessage = "";
		const result = await this.client.api.routes.post.updateFolder(this.folder.path).setName(this.folderName.trim()).setDescription(this.folderDescription.trim()).execute();
		if (result.success) {
			if (this.onSuccess) this.onSuccess(result.data.result.info);
		} else this.errorMessage = result.message || "Nepodařilo se upravit složku";
		return result?.success;
	}
	handleTitleChange(event) {
		const target = event.target;
		this.folderName = target.value;
	}
	handleDescriptionChange(event) {
		const target = event.target;
		this.folderDescription = target.value;
	}
	renderContent() {
		return lit.html`<div class="form-group">
    <label for="folder-name">${this.t("name")}:</label>
    <input 
        type="text" 
        id="folder-name"
        .value=${this.folderName}
        @input=${this.handleTitleChange}
        placeholder="Zadejte název složky"
        required
    />
</div>
<div class="form-group">
    <label for="folder-description">${this.t("description")}:</label>
    <textarea 
        id="folder-description"
        .value=${this.folderDescription}
        @input=${this.handleDescriptionChange}
        placeholder="Zadejte popis složky (volitelné)"
        rows="3"
    ></textarea>
</div>
${this.errorMessage ? lit.html`<div class="error">${this.errorMessage}</div>` : ""}`;
	}
	renderButtons() {
		return lit.html`<thermal-btn
    @click=${() => this.close()}
    slot="button"    
>${this.t("back")}</thermal-btn>`;
	}
	shouldRenderDialog() {
		if (!this.client.isClientConnected || !this.client.identity || !this.client.isLoggedIn || !this.folder) return false;
		if (this.client.identity.meta.is_root) return true;
		return this.folder.may_manage_folders_in || this.folder.may_manage_files_in;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFolderEditDialog.prototype, "folderName", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFolderEditDialog.prototype, "folderDescription", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFolderEditDialog.prototype, "errorMessage", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFolderEditDialog.prototype, "onSuccess", void 0);
//#endregion
//#region src/components/folder/crud/ConnectedFolderDeleteDialog.ts
var ConnectedFolderDeleteDialog = class extends AbstractFolderDialog {
	constructor(..._args) {
		super(..._args);
		this.closeLabel = "deletefolder";
		this.dialogLabel = "deletefolder";
		this.errorMessage = "";
	}
	static {
		this.styles = lit.css`

        .warning {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            margin-bottom: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
        }

        .folder-info {
            background: var(--thermal-background);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin: calc(var(--thermal-gap) * 0.5) 0;
        }

        .folder-name {
            font-weight: bold;
            font-size: calc(var(--thermal-fs) * 1.1);
        }

        .folder-description {
            color: var(--thermal-slate);
            font-size: calc(var(--thermal-fs) * 0.9);
            margin-top: calc(var(--thermal-gap) * 0.25);
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;
	}
	async beforeClose() {
		this.errorMessage = "";
		const result = await this.client.api.routes.post.deleteFolder(this.folder.path).execute();
		if (result?.success) {
			if (this.onSuccess) this.onSuccess(this.folder);
		} else this.errorMessage = result?.message || "Nepodařilo se smazat složku";
		return result?.success;
	}
	shouldRenderDialog() {
		return true;
	}
	renderContent() {
		return lit.html`<div class="warning">
    <strong>Upozornění:</strong> Tato akce je nevratná. Složka a veškerý její obsah bude trvale smazán.
</div>
<p>Opravdu chcete smazat následující složku?</p>
<div class="folder-info">
<div class="folder-name">${this.folder.name || this.folder.slug}</div>
${this.folder.description ? lit.html`<div class="folder-description">${this.folder.description}</div>` : ""}
${this.folder.lrc_count > 0 ? lit.html`<div class="folder-description">Obsahuje ${this.folder.lrc_count} souborů</div>` : ""}
</div>
${this.errorMessage ? lit.html`<div class="error">${this.errorMessage}</div>` : ""}
</div>`;
	}
	renderButtons() {
		return lit.html`<thermal-btn
    @click=${() => this.close()}
    slot="button"    
>${this.t("back")}</thermal-btn>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFolderDeleteDialog.prototype, "onSuccess", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFolderDeleteDialog.prototype, "errorMessage", void 0);
//#endregion
//#region src/components/folder/crud/ConnectedFolderCreateDialog.ts
var ConnectedFolderCreateDialog = class extends AbstractFolderDialog {
	constructor(..._args) {
		super(..._args);
		this.closeLabel = "create";
		this.dialogLabel = "createfolder";
		this.folderName = "";
		this.folderDescription = "";
		this.errorMessage = "";
		this.mayHaveFiles = true;
	}
	static {
		this.styles = lit.css`

        .form-group {
            margin-bottom: var(--thermal-gap);
        }

        label {
            display: block;
            margin-bottom: calc(var(--thermal-gap) * 0.5);
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
        }

        textarea {
            width: 100%;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
            font-family: inherit;
            resize: vertical;
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;
	}
	async beforeClose() {
		if (!this.folderName.trim()) {
			this.errorMessage = "Název složky je povinný";
			return false;
		}
		this.errorMessage = "";
		const path = this.folder.path;
		const result = await this.client.api.routes.post.createFolder(path, this.folderName.trim()).setDescription(this.folderDescription.trim()).setMayHaveFiles(this.mayHaveFiles).execute();
		if (result?.success) {
			this.folderName = "";
			this.folderDescription = "";
			if (this.onSuccess) this.onSuccess(result.data.result.info);
		} else this.errorMessage = result?.message || "Nepodařilo se vytvořit složku";
		return result?.success;
	}
	handleInputChange(event) {
		const target = event.target;
		this.folderName = target.value;
	}
	handleDescriptionChange(event) {
		const target = event.target;
		this.folderDescription = target.value;
	}
	renderToggleButton(value, onClick, label, tooltip, icon, iconStyle) {
		return lit.html`<thermal-btn
    .tooltip=${tooltip}
    icon=${icon}
    iconStyle=${iconStyle}
    variant=${value ? "foreground" : "default"}
    @click=${onClick}
>${label}</thermal-btn>`;
	}
	renderContentMode() {
		if (this.client.isLoggedIn === false || this.content.folder?.may_manage_folders_in === false) return lit.nothing;
		return lit.html`<div class="form-group">
    <label for="folder-may-have-files">Určeno pro:</label>
    <div>
        ${this.renderToggleButton(!this.mayHaveFiles, () => this.mayHaveFiles = false, "Podsložky", "Tato složka bude moci obsahovat další podsložky", "folder", "micro")}
        ${this.renderToggleButton(this.mayHaveFiles, () => this.mayHaveFiles = true, "Soubory", "Tato složka bude moci obsahovat soubory", "image", "micro")}
    </div>
<div>`;
	}
	renderContent() {
		return lit.html`<div class="form-group">
    <label for="folder-name">Název složky:</label>
    <input 
        type="text" 
        id="folder-name"
        .value=${this.folderName}
        @input=${this.handleInputChange}
        placeholder="Zadejte název nové složky"
        required
    />
</div>
<div class="form-group">
    <label for="folder-description">Popis:</label>
    <textarea 
        id="folder-description"
        .value=${this.folderDescription}
        @input=${this.handleDescriptionChange}
        placeholder="Zadejte popis složky (volitelné)"
        rows="3"
    ></textarea>
</div>
${this.renderContentMode()}
${this.errorMessage ? lit.html`<div class="error">${this.errorMessage}</div>` : ""}`;
	}
	renderButtons() {
		return lit.html`<thermal-btn
        @click=${() => this.close()}
        slot="button"    
    >${this.t("back")}</thermal-btn>`;
	}
	shouldRenderDialog() {
		if (!this.client.isClientConnected || !this.client.identity || !this.client.isLoggedIn || !this.folder) return false;
		if (this.client.identity.meta.is_root && !this.folder.may_have_files === false) return true;
		return this.folder.may_manage_folders_in;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFolderCreateDialog.prototype, "folderName", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFolderCreateDialog.prototype, "folderDescription", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFolderCreateDialog.prototype, "errorMessage", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFolderCreateDialog.prototype, "onSuccess", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFolderCreateDialog.prototype, "mayHaveFiles", void 0);
//#endregion
//#region src/components/folder/crud/ConnectedFolderContentModeSwitch.ts
var ConnectedFolderContentModeSwitch = class extends AbstractControlledConsumer {
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFolderUpdates(this);
		this.content.subscribeToSubfoldersUpdates(this);
	}
	userMayEdit() {
		if (!this.content.folder) return false;
		return DirectiveHelpers.userMayEditFolder(this.client, this.content.folder);
	}
	folderIsEditable() {
		if (!this.content.folder) return false;
		return this.getFilesCount() === 0 && this.getSubfoldersCount() === 0;
	}
	renderCounts() {
		this.log("rendering counts", this.content.folder);
		if (!this.content.folder) return lit.nothing;
		return lit.html`Files: ${this.content.folder.lrc_count} Subfolders: ${this.content.subfolders.length}`;
	}
	getFilesCount() {
		if (!this.content.folder) return 0;
		return this.content.folder.lrc_count;
	}
	getSubfoldersCount() {
		if (!this.content.subfolders) return 0;
		return this.content.subfolders.length;
	}
	renderSlot(label, count, icon, iconStyle, variant, onClick) {
		return lit.html`<thermal-btn
            .icon=${icon}
            .iconStyle=${iconStyle}
            .tooltip=${this.t(label)}
            @click=${onClick}
            variant=${variant}
            ?plain=${true}
        >${count}x</thermal-btn>`;
	}
	async updateFolderMayHaveFiles(value) {
		this.log("updating", this.content.folder);
		if (!this.content.folder) return;
		const info = (await this.client.api.routes.post.updateFolder(this.content.folder.path).setMayHaveFiles(value).execute()).data?.result.info;
		if (info) {
			this.log("updated", info);
			this.content.updateFolderState(info);
			this.display.reloadCurrentState();
		}
	}
	renderFiles(interactive, active) {
		let callback = void 0;
		if (interactive && !active && this.userMayEdit()) callback = async () => {
			await this.updateFolderMayHaveFiles(true);
		};
		const variant = active ? "default" : "background";
		return this.renderSlot("foldermayhavefiles", this.getFilesCount(), "image", "micro", variant, callback);
	}
	renderSubfolders(interactive, active) {
		let callback = void 0;
		if (interactive && !active && this.userMayEdit()) callback = async () => {
			await this.updateFolderMayHaveFiles(false);
		};
		const variant = active ? "default" : "background";
		return this.renderSlot("foldermayhavesubfolders", this.getSubfoldersCount(), "folder", "micro", variant, callback);
	}
	renderSwitch() {
		if (!this.content.folder) return lit.nothing;
		const result = [];
		if (this.folderIsEditable() && this.userMayEdit()) {
			const mayHaveFiles = this.content.folder.may_have_files ?? false;
			result.push(this.renderSubfolders(true, !mayHaveFiles));
			result.push(this.renderFiles(true, mayHaveFiles));
		} else if (this.getFilesCount() > 0) return this.renderFiles(false, true);
		else return this.renderSubfolders(false, true);
		return result;
	}
	static {
		this.styles = lit.css`
    
    :host {
    
        display: flex;
        background: var(--thermal-background);

        border: 1px solid var( --thermal-slate );
        border-radius: var( --thermal-radius );

        gap: .5em;
    
    }
    
    `;
	}
	render() {
		return this.renderSwitch();
	}
};
//#endregion
//#region src/components/file/ConnectedFileThumbnail.ts
var ConnectedFileThumbnail = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.instanceRef = (0, lit_directives_ref_js.createRef)();
		this.onFileClick = () => {};
		this.onFileDelete = () => {};
		this.compact = false;
		this.displayMode = "asGrid";
		this.showDiscussion = false;
		this.editableTags = false;
		this.hasDisplayedAnalysis = false;
		this.icon = _labirthermal_webcomponents.icons.image.outline("icon");
	}
	get fileObject() {
		return this.instanceRef.value?.file;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		this.content.subscribeToFilesUpdates(this);
		this.client.subscribeToIdentityChanges(this);
		this.content.subscribeToFilesUpdates(this);
		this.hydrate();
		if (this.instanceRef.value) this.instanceRef.value.fileController.onSuccess.set(this.UUID, () => {
			this.hydrate();
		});
	}
	hydrate() {
		if (this.fileObject) {
			this.hasDisplayedAnalysis = this.fileObject.analysis.value.length > 0;
			this.fileObject.analysis.addListener(this.UUID, (analyses) => {
				this.hasDisplayedAnalysis = analyses.length > 0;
			});
		}
	}
	dehydrate() {
		this.fileObject?.analysis.removeListener(this.UUID);
	}
	updated(changedProperties) {
		if (changedProperties.has("compact")) {
			if (this.compact) {
				this.classList.add("compact");
				this.classList.remove("detailed");
			} else {
				this.classList.remove("compact");
				this.classList.add("detailed");
			}
		}
	}
	connectedCallback() {
		super.connectedCallback();
		this.hydrate();
		this.display.subscribeToDisplayComments(this);
		this.display.subscribeToEditTags(this);
		this.content.subscribeToFileUpdates(this);
		this.content.subscribeToFilesUpdates(this);
		this.content.subscribeToFolderUpdates(this);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.dehydrate();
	}
	renderTime() {
		const time = this.file.timestamp ? _labirthermal_core.TimeFormat.human(this.file.timestamp) : void 0;
		if (!time) return lit.nothing;
		return lit.html`<div class="header_text_time" @click=${() => this.onFileClick(this.file)}>
    ${time}
</div>`;
	}
	renderLabel() {
		if (!this.file.label) return lit.nothing;
		return lit.html`<h2><span>${this.file.label}</span></h2>`;
	}
	renderDescription() {
		if (!this.file.description) return lit.nothing;
		return lit.html`<p class="description">${this.file.description}</p>`;
	}
	renderSelectBox() {
		if (this.client.isLoggedIn === false || !this.content.folder?.may_manage_files_in || this.content.files && this.content.files.length <= 1) return lit.nothing;
		return lit.html`<connected-file-selection-checkbox 
            .file=${this.file}
        ></connected-file-selection-checkbox>`;
	}
	renderActionDetail() {
		const variant = this.compact ? "default" : "primary";
		return lit.html`<thermal-btn 
            variant=${variant}
            size="${this.displayMode === "asTable" ? "md" : "sm"}"
            @click=${() => this.onFileClick(this.file)}
        >${(0, _labirthermal_webcomponents.t)("detail").toLowerCase()}</thermal-btn>`;
	}
	renderActionEdit() {
		if (!this.folder.may_manage_files_in) return lit.nothing;
		const variant = this.compact && this.displayMode === "asGrid" ? "default" : "background";
		return lit.html`<connected-file-edit-dialog
            .file=${this.file}
            .folder=${this.folder}
            label=""
            plain="true"
            variant=${variant}
            size="sm"
        ></connected-file-edit-dialog>`;
	}
	renderActionComments() {
		if (this.file.comments.length > 0 || this.client.isLoggedIn && this.folder.may_manage_files_in) {
			const variant = this.compact && this.displayMode === "asGrid" ? "default" : "background";
			return lit.html`<thermal-dialog
                label="${(0, _labirthermal_webcomponents.t)("comments")}"
            >
                <thermal-btn 
                    slot="invoker"
                    size="sm"
                    variant=${variant}
                    icon="comment"
                    iconStyle="micro"
                    ?plain=${true}
                    badge=${(0, lit_directives_if_defined_js.ifDefined)(this.file.comments.length > 0 ? "red" : void 0)}
                ></thermal-btn>
                <div slot="content">
                    <connected-file-comments
                        .file=${this.file}
                        .folder=${this.folder}
                        style="height: 400px; width: 400px;"
                    ></connected-file-comments>
                </div>
            </thermal-dialog>`;
		}
		return lit.nothing;
	}
	renderActionDelete() {
		if (!this.folder.may_manage_files_in) return lit.nothing;
		const variant = this.compact && this.displayMode === "asGrid" ? "default" : "background";
		return lit.html`<connected-file-delete-dialog 
            .file=${this.file}
            .folder=${this.folder}
            .onDelete=${this.onFileDelete}
            label=""
            plain="true"
            variant=${variant}
            size="sm"
        ></connected-file-delete-dialog>`;
	}
	renderNumAnalyses() {
		if (!this.file.analyses || this.file.analyses.length === 0) return lit.nothing;
		return lit.html`<span class="header_actions_num-analyses">
        ${this.file.analyses.length} analýzy
    </span>`;
	}
	restoreAnalyses() {
		const instance = this.instanceRef.value?.file;
		if (!instance) return;
		this.file.analyses.forEach((analysis) => {
			instance.slots.createAnalysisFromSerialized(analysis)?.setSelected();
		});
	}
	renderAnalyses() {
		let content = lit.nothing;
		if (this.displayMode === "asGrid") content = lit.html`<file-analysis-table mode="compact"></file-analysis-table>`;
		else if (this.displayMode === "asTable") {
			const hasStoredAnalyses = this.file.analyses.length > 0;
			let restoreLabel = void 0;
			if (hasStoredAnalyses) restoreLabel = `Načíst uložené analýzy (${this.file.analyses.length})`;
			content = lit.html`<div class="analyses-inner">
                
                <file-analysis-complex ?hide-hint=${true}>
                    ${hasStoredAnalyses ? lit.html`<thermal-btn 
                        @click=${this.restoreAnalyses.bind(this)}
                        size="md"
                        variant="primary"
                        icon="restore"
                        iconStyle="micro"
                    >
                        ${restoreLabel}
                    </thermal-btn>` : lit.nothing}
                </file-analysis-complex>

                ${this.hasDisplayedAnalysis ? lit.html`<aside>

                        <connected-file-analysis-buttons .info=${this.file} .enableCopyToAll=${this.content.files && this.content.files.length > 0}></connected-file-analysis-buttons>

                </aside>` : lit.nothing}

            </div>`;
		}
		return lit.html`<div class="analyses">${content}</div>`;
	}
	static {
		this.styles = lit.css`
        :host {
            display: block;
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
            height: 100%; /* Přidáno pro výšku */
        }

        file-provider {
            display: contents;
        }

        p.description {
            margin: 0; padding: 0;
        }

        file-canvas {
            display: block;
            flex-grow: 1; /* Přidáno pro vyplnění výšky */
            min-height: 0; /* Důležité pro správné zkracování */
        }

        .header_actions_num-analyses {
            font-size: .6em;
            color: var(--thermal-slate);
        }

        h2 {
            margin: 0;
            padding: 0;
            font-size: 1em;
            line-height: 1.2;
        }

        .header_text {

            h2,
            .header_text_time {
                transition: color 0.2s ease-in-out;
                cursor: pointer;
            }
        }

        :host([display-mode="asGrid"][compact="true"]) {

            file-edit-dialog,
            file-comments-dialog,
            file-delete-dialog,
            .header_icon,
            .header_actions_num-analyses,
            p.description {
                display: none;
            }

            header {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                align-items: center;
                flex-wrap: nowrap;
                margin-top: .5em;
            }

            .header_text {
                flex-grow: 1;
                display: flex;
                align-items: center;
                gap: .5em;
                min-width: 0;

            }

            .header_actions {
                flex-shrink: 0;
                display: flex;
                align-items: center;
                gap: .25em;
                margin-left: auto; /* Zarovnání doprava */
            }

            .header_text_time {
                white-space: nowrap;
                flex-shrink: 0;
            }

            h2 {
                min-width: 0;
                flex-shrink: 1;
                overflow: hidden;
                font-weight: normal;
                color: var(--thermal-slate);
            }

            h2 span {
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            connected-file-tags {
                margin-left: auto; /* Tagy vždy doprava */
            }
        }

        :host([display-mode="asGrid"][compact="false"]) {

            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: 0 0 var(--thermal-radius) var(--thermal-radius);
            overflow: hidden;

            display: flex;
            flex-direction: column;

            position: relative;

            p.description {
                display: none;
                margin: 0; padding: 0;
            }

            file-canvas {
                min-height: 0;
                display: block;
            }

            header {
                width: 100%;
                box-sizing: border-box;
                min-height: 60px;
                height: auto;
                background: var(--thermal-background);
                padding: .5em;
                display: grid;
                grid-template-columns: 1fr 1.2em;
                grid-template-rows: 1fr 1em;
                gap: calc(var(--thermal-gap) * 0.5);
                align-self: stretch;
                flex-grow: 1;
            }

            .header_text {
                grid-column: 1;
                grid-row: 1;
                display: flex;
                flex-direction: column;
                gap: .25em;
                align-self: stretch;
                justify-self: stretch;
            }

            .header_icon {
                grid-column: 2;
                grid-row: 1;
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                color: var(--thermal-slate);
            }

            .header_actions {
                grid-column: 1 / -1;
                grid-row: 2;
                display: flex;
                gap: .25em;
                align-items: center;
                height: 1em;
                justify-content: flex-end; /* Zarovnání doprava */
            }

            .header_text_time {
                font-size: .8em;
                color: var(--thermal-slate-dark);
            }

            .file-comments {
                background: var(--thermal-background);
                padding: .5em;
                width: 100%;
                box-sizing: border-box;
                file-comments {
                    border-radius: var(--thermal-radius);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                    background: var(--thermal-slate-light);
                    padding: .5em;
                }
            }

            connected-file-tags {
                margin-left: auto; /* Tagy vždy doprava */
            }

            connected-file-selection-checkbox {
                position: absolute;
                bottom: .25em;
                left: .25em;
            }

        }

        :host([display-mode="asTable"]) {
            display: table-row;
            vertical-align: top;
            border-bottom: .5em var(--thermal-border-style)transparent;

            file-provider {
                display: contents;
            }

            main {
                width: 500px;
            }

            main,
            header,
            .analyses,
            .file-comments {
                display: table-cell;
                vertical-align: top;
            }

            header {
                background: var(--thermal-background);
                border-radius: var(--thermal-radius);
                box-sizing: border-box;
                padding: 1em;
                height: 100%;
                position: relative;
                padding-bottom: 2em;
                min-width: 220px;
            }

            file-canvas {
                min-width: 300px;
            }

            .header_text {
                display: flex;
                flex-direction: column;
                gap: 1em;
                min-height: fit-content;
            }

            .header_icon {
                display: none;
            }

            .header_actions {
                display: flex;
                gap: .25em;
                align-items: center;
                vertical-align: bottom;
                position: absolute;
                bottom: 1em;
                left: 1em;
                right: 1em;
                flex-wrap: wrap;
            }

            p.description {
                font-size: .8em;
                color: var(--thermal-slate);
            }

            .file-comments {
                display: block;
                height: 100%;
                width: 300px;
            }

            connected-file-tags {
                margin-left: auto; /* Tagy vždy doprava */
            }

            .analyses {

                padding: .5em;
                border-radius: var(--thermal-radius);
                background: var(--thermal-background);

                .analyses-inner {
                    height: 100%;
                    width: 100%;

                    file-analysis-complex {
                        flex-grow: 1;
                        align-self: stretch;
                        display: block;
                    }

                    aside {
                        display: flex;
                        gap: .5em;
                        width: 100%;
                    }

                }

                file-analysis-complex {
                    background: var(--thermal-background);
                }

            }

        }`;
	}
	render() {
		const visibleUrl = this.file.visual ? this.file.visual : void 0;
		return lit.html`<file-provider
    thermal=${this.file.url}
    visible=${(0, lit_directives_if_defined_js.ifDefined)(visibleUrl)}
    batch="true"
    autoclear="true"
    role="article"
    autoHighlight="true"
    ${(0, lit_directives_ref_js.ref)(this.instanceRef)}
>

    <main>
        <file-canvas></file-canvas>
        <file-timeline hasplaybutton="false"></file-timeline>
    </main>

    <header>

    <div class="header_text">

        ${this.renderSelectBox()}

        ${this.renderTime()}

        ${this.renderLabel()}

        ${this.renderDescription()}

    </div>

    <div class="header_icon">
        ${this.i(this.icon)}
    </div>

    <div class="header_actions">

        ${this.renderActionDetail()}

        <file-range-propagator 
            variant="${this.compact ? "default" : "background"}"
            .plain="true"
            size="${this.displayMode === "asTable" ? "md" : "sm"}"
        ></file-range-propagator>

        ${this.renderActionEdit()}

        ${!this.showDiscussion ? this.renderActionComments() : lit.nothing}

        ${this.renderActionDelete()}

        ${this.renderNumAnalyses()}

        <connected-file-tags
            .file=${this.file}
            .folder=${this.folder}
            inline="true"
            .editable="${this.editableTags}"
            size="sm"
        ></connected-file-tags>
    </div>

    </header>

        ${this.renderAnalyses()}

        ${this.showDiscussion === true ? lit.html`<div class="file-comments">
                <connected-file-comments
                    .file=${this.file}
                    .folder=${this.folder}
                    style="height: 300px;"
                ></connected-file-comments>
            </div>` : lit.nothing}
</file-provider>`;
	}
};
__decorate([
	(0, _lit_context.consume)({
		context: _labirthermal_webcomponents.groupObjectContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], ConnectedFileThumbnail.prototype, "group", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileThumbnail.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileThumbnail.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileThumbnail.prototype, "onFileClick", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileThumbnail.prototype, "onFileDelete", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedFileThumbnail.prototype, "compact", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "display-mode"
}), __decorateMetadata("design:type", typeof FileListDisplayMode === "undefined" ? Object : FileListDisplayMode)], ConnectedFileThumbnail.prototype, "displayMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false),
	attribute: "show-discussion"
}), __decorateMetadata("design:type", Boolean)], ConnectedFileThumbnail.prototype, "showDiscussion", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false),
	attribute: "editable-tags"
}), __decorateMetadata("design:type", Boolean)], ConnectedFileThumbnail.prototype, "editableTags", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFileThumbnail.prototype, "hasDisplayedAnalysis", void 0);
//#endregion
//#region src/components/file/ConnectedFileTags.ts
var ConnectedFileTags = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.editable = false;
		this.onChange = () => {};
		this.check = _labirthermal_webcomponents.icons.check.micro("icon");
	}
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFilesUpdates(this);
	}
	async handleTagClick(slug) {
		if (!this.editable) return;
		if (this.client) {
			const request = this.client.api.routes.post.updateFile(this.folder.path, this.file.fileName);
			if (this.hasTag(slug)) request?.removeTag(slug);
			else request?.addTag(slug);
			const result = await request.execute();
			if (result.success) this.content.updateFileState(result.data.file);
		}
	}
	hasTag(slug) {
		return this.file.tags.includes(slug);
	}
	getContrastColor(backgroundColor) {
		let hex = backgroundColor.replace("#", "");
		if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
		const r = parseInt(hex.substr(0, 2), 16);
		const g = parseInt(hex.substr(2, 2), 16);
		const b = parseInt(hex.substr(4, 2), 16);
		return (r * 299 + g * 587 + b * 114) / 1e3 > 128 ? "#000000" : "#FFFFFF";
	}
	renderTagButton(slug, tag) {
		const has = this.hasTag(slug);
		const backgroundColor = has ? tag.color || "var(--thermal-slate-light)" : this.inline ? "var(--thermal-slate-light)" : "var(--thermal-background)";
		const textColor = has ? tag.color ? this.getContrastColor(tag.color) : "inherit" : "var(--thermal-slate)";
		const iconInvert = has && tag.color && this.getContrastColor(tag.color) === "#FFFFFF" ? 1 : 0;
		const handleKeydown = (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				this.handleTagClick(slug);
			}
		};
		return lit.html`<button
            class="tag-button ${has ? "has" : ""}"
            tabindex="${this.editable ? "0" : "-1"}"
            @click=${() => this.handleTagClick(slug)}
            @keydown=${handleKeydown}
        >
            <div class="tag-button-content" style="background-color: ${backgroundColor}; color: ${textColor}; --icon-invert: ${iconInvert};">
                ${has ? this.i(this.check) : lit.nothing}
                <span>${tag.name}</span>
            </div>
        </button>`;
	}
	static {
		this.styles = lit.css`

        :host {
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs);

            display: flex;
            flex-wrap: wrap;
            gap: 1em;
            flex-direction: column;
            align-items: flex-start;
        }

        /* Inline layout - tags side by side */
        :host([inline]) {
            flex-direction: row;
            gap: .5em;
        }

        :host([inline]) .tag-group {
            flex-direction: row;
            gap: .5em;
        }

        :host([inline]) .tag-list {
            flex-direction: row;
            gap: .5em;
        }

        .tag-group {
            display: flex;
            flex-direction: column;
            gap: .5em;
            align-items: flex-start;
        }

        .tag-group-label {
            font-size: .8em;
            color: var(--thermal-slate-dark);
            margin-bottom: .25em;
        }

        /* Hide labels in inline mode */
        :host([inline]) .tag-group-label {
            display: none;
        }

        .tag-list {
            display: flex;
            flex-wrap: wrap;
            gap: .5em;
            flex-direction: column;
            align-items: flex-start;
        }
    
        .tag-button {
            border: 0;
            cursor: default;
            background: transparent;
            padding: 0;
            transition: all .2s ease-in-out;
            outline: none;
        }

        .tag-button:focus,
        .tag-button:focus-visible {
            outline: 2px var(--thermal-border-style)var(--thermal-primary, #007bff);
            outline-offset: 2px;
        }

        .tag-button-content {
            border-radius: 0 var(--thermal-radius) var(--thermal-radius) 0;
            padding: .5em 1em .5em 2em;
            display: flex;
            align-items: center;
            gap: .5em;
            position: relative;

            /* Simulace trojúhelníka s hladce zakulaceným hrotem */
            clip-path: polygon(1.5em 0%, 100% 0%, 100% 100%, 1.5em 100%, 0.4em 65%, 0.3em 55%, 0.3em 45%, 0.4em 35%);

            transition: all .2s ease-in-out;
        }

        /* Editable styling */
        :host([editable="true"]) .tag-button {
            cursor: pointer;
        }

        :host([editable="true"]) .tag-button:hover  {
            filter: drop-shadow(0 0 3px var(--thermal-slate));
        }

        .tag-button-content::before {
            content: '';
            position: absolute;
            left: 1em;
            top: 50%;
            transform: translateY(-50%);
            width: .5em;
            height: .5em;
            background: var(--thermal-slate-light);
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
        }

        /* Small size styling */
        :host([size="sm"]) .tag-button-content {
            padding: .25em .5em .25em 1em;
            font-size: .7em;
            clip-path: polygon(1em 0%, 100% 0%, 100% 100%, 1em 100%, 0.2em 65%, 0.15em 55%, 0.15em 45%, 0.2em 35%);
        }

        /* Hide dot and checkbox in small size */
        :host([size="sm"]) .tag-button-content::before {
            display: none;
        }

        :host([size="sm"]) .tag-button-content .icon {
            display: none;
        }

        .tag-button:not(.has):hover .tag-button-content {
            color: var(--thermal-foreground) !important;
        }

        .tag-button-content .icon {
            width: 1em;
            height: 1em;
            filter: brightness(0) invert(var(--icon-invert, 0));
        }
    
    `;
	}
	render() {
		const allTags = {
			...this.folder.parent_tags,
			...this.folder.own_tags
		};
		const assignedTags = Object.entries(allTags).filter(([slug]) => this.hasTag(slug));
		const unassignedTags = Object.entries(allTags).filter(([slug]) => !this.hasTag(slug));
		return lit.html`

            ${assignedTags.length > 0 ? lit.html`
                <div class="tag-group">
                    <div class="tag-group-label">${(0, _labirthermal_webcomponents.t)("assignedtags")}</div>
                    <div class="tag-list">
                        ${assignedTags.map(([slug, info]) => this.renderTagButton(slug, info))}
                    </div>
                </div>
            ` : ""}

            ${unassignedTags.length > 0 && this.editable ? lit.html`
                <div class="tag-group">
                    <div class="tag-group-label">${(0, _labirthermal_webcomponents.t)("availabletags")}</div>
                    <div class="tag-list">
                        ${unassignedTags.map(([slug, info]) => this.renderTagButton(slug, info))}
                    </div>
                </div>
            ` : ""}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ConnectedFileTags.prototype, "editable", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ConnectedFileTags.prototype, "inline", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], ConnectedFileTags.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileTags.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileTags.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileTags.prototype, "onChange", void 0);
//#endregion
//#region src/components/file/ConnectedFileMoveDialog.ts
var ConnectedFileMoveDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.dialogRef = (0, lit_directives_ref_js.createRef)();
	}
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFileUpdates(this);
	}
	render() {
		return lit.html`<connected-location-selector
            .asDialogue=${true}
            ${(0, lit_directives_ref_js.ref)(this.dialogRef)}
            .mode=${"file"}
            dialogTitle="Přesunout soubor"
            operationLabel="Přesunout do"
            .onSelect=${async (path) => {
			if (!this.file) return lit.nothing;
			await this.client.api.routes.post.moveFile(this.file.path, this.file.fileName, path).execute();
			this.dialogRef.value?.closeDialogue();
			this.display.navigateToFolderAndLoad(path);
		}}
        >
            <thermal-btn
                slot="invoker"
                icon="move"
                iconStyle="mini"
                tooltip="Přesunout"
            ></thermal-btn>
        </connected-location-selector>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileMoveDialog.prototype, "file", void 0);
//#endregion
//#region src/components/file/ConnectedFileHeader.ts
var ConnectedFileHeader = class extends AbstractControlledConsumer {
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFileUpdates(this);
		this.content.subscribeToFolderUpdates(this);
		this.client.subscribeToIdentityChanges(this);
	}
	static {
		this.styles = lit.css`
:host {
    display: flex;
    flex-wrap: no-wrap;
    gap: .5em;

    color: var(--thermal-foreground);
    font-size: var(--thermal-fs);
}

.part {

    display: block;
    background: var(--thermal-background);
    color: var(--thermal-foreground);
    border-radius: var(--thermal-radius);
    padding: var(--thermal-gap);
    box-sizing: border-box;
}

h1 {
    font-size: 1em;
    margin: 0;
    padding: 0;
    margin-bottom: .5em;
}


section {
    display: grid !important;
    grid-template-columns: 2em 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--thermal-gap);
    flex-grow: 1;
}

thermal-icon {
    grid-row: 1;
    grid-column: 1;
    width: 2em;
    display: block;
    color: var(--thermal-slate);
}

.time-info {
    grid-row: 1;
    grid-column: 2;
}

.label-info {
    grid-row: 1;
    grid-column: 3;
}

.colophon {
    grid-row: 1;
    grid-column: 4;
    text-align: right;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    gap: .3em;

    thermal-btn {
        opacity: .5;
        transition: opacity .3s ease-in-out;
        cursor: help !important;

        &:hover,
        &:focus {
            opacity: 1;
        }
    }

}

.actions {
    grid-row: 2;
    grid-column: 1 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
}

.actions:not(:has(*)) {
    display: none;
}

/* Fallback for browsers without :has() support */
.actions:empty {
    display: none;
}

.small {
    font-size: calc(var(--thermal-fs) * 0.8);
}

.slate {
    color: var(--thermal-slate);
}

.slate-dark {
    color: var(--thermal-slate-dark);
}

.slate-light {
    color: var(--thermal-slate-light);
}

`;
	}
	renderColophon() {
		if (this.content.file === void 0) return lit.nothing;
		const uploaded = _labirthermal_core.TimeFormat.human(this.content.file.uploaded);
		return lit.html`<div class="colophon small slate">
    <thermal-btn 
        variant="foreground"
        tooltip="Čas nahrání souboru"
        icon="upload"
        iconStyle="micro"
        interactive="false"
    >${uploaded}</thermal-btn>

    ${this.content.file.uploadedby ? lit.html`<thermal-btn 
                variant="foreground"
                tooltip="Nahráno uživatelem"
                icon="user"
                iconStyle="micro"
                ?non-interactive=${true}
            >${this.content.file.uploadedby.name}</thermal-btn>` : lit.nothing}
</div>`;
	}
	renderUpButton() {
		if (!this.content.folder) return lit.nothing;
		return lit.html`<thermal-btn 
    variant="background" 
    @click=${() => {
			if (this.content.folder !== void 0) this.display.navigateToFolderAndLoad(this.content.folder.path);
		}} 
    icon="close" 
    iconStyle="outline" 
    size="xl"
    tooltip="Zpět do složky '${this.content.folder.name}'."
></thermal-btn>`;
	}
	render() {
		if (this.content.file === void 0) return lit.nothing;
		const time = _labirthermal_core.TimeFormat.human(this.content.file.timestamp);
		return lit.html`

${this.renderUpButton()}

<section class="part">

    <thermal-icon icon="image" variant="outline"></thermal-icon>

    <div class="time-info">
        <h1>${time}</h1>
        <div class="small slate">${this.content.file.fileName}</div>
    </div>

    <div class="label-info">
        ${this.content.file.label ? lit.html`<h1>${this.content.file.label}</h1>` : lit.nothing}
        ${this.content.file.description ? lit.html`<div class="small slate">${this.content.file.description}</div>` : lit.nothing}
    </div>

    ${this.renderColophon()}
                
    <div class="actions">
        <slot></slot>
    </div>
</section>`;
	}
};
//#endregion
//#region src/components/file/ConnectedFileEditDialog.ts
var ConnectedFileEditDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.label = "Upravit soubor";
		this.size = "sm";
		this.fileLabel = "";
		this.fileDescription = "";
		this.errorMessage = "";
	}
	static {
		this.styles = lit.css`
        .content {
        }

        .form-group {
            margin-bottom: var(--thermal-gap);
        }

        label {
            display: block;
            margin-bottom: calc(var(--thermal-gap) * 0.5);
            font-weight: bold;
        }

        input {
            width: 100%;
            box-sizing: border-box;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
        }

        textarea {
            width: 100%;
            box-sizing: border-box;
            padding: calc(var(--thermal-gap) * 0.5);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            font-size: var(--thermal-fs);
            font-family: inherit;
            resize: vertical;
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;
	}
	firstUpdated() {
		this.fileLabel = this.file.label || "";
		this.fileDescription = this.file.description || "";
	}
	async handleSubmit() {
		this.errorMessage = "";
		const result = await this.client.api.routes.post.updateFile(this.file.path, this.file.fileName.trim()).setLabel(this.fileLabel.trim()).setDescription(this.fileDescription.trim()).execute();
		if (result.success) this.content.updateFileState(result.data.file);
		else this.errorMessage = result.message || "Nepodařilo se upravit soubor";
		return result.success;
	}
	handleLabelChange(event) {
		const target = event.target;
		this.fileLabel = target.value;
	}
	handleDescriptionChange(event) {
		const target = event.target;
		this.fileDescription = target.value;
	}
	render() {
		const label = (0, _labirthermal_webcomponents.t)("editfile");
		return lit.html`
            <thermal-dialog
                label=${label}
                .beforeClose=${() => this.handleSubmit()}
                button="Uložit změny"
            >
                <slot name="invoker" slot="invoker">
                    <thermal-btn 
                        variant=${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}
                        size=${(0, lit_directives_if_defined_js.ifDefined)(this.size)}
                        plain=${(0, lit_directives_if_defined_js.ifDefined)(this.plain)}
                        icon="edit" iconStyle="micro"
                        tooltip=${label}
                    >${this.label}</thermal-btn>
                </slot>

                <div class="content" slot="content">
                    <div class="form-group">
                        <label for="file-label">Label:</label>
                        <input 
                            type="text" 
                            id="file-label"
                            .value=${this.fileLabel}
                            @input=${this.handleLabelChange}
                            placeholder="Zadejte label souboru (volitelné)"
                        />
                    </div>
                    <div class="form-group">
                        <label for="file-description">Popis:</label>
                        <textarea 
                            id="file-description"
                            .value=${this.fileDescription}
                            @input=${this.handleDescriptionChange}
                            placeholder="Zadejte popis souboru (volitelné)"
                            rows="3"
                        ></textarea>
                    </div>
                    ${this.errorMessage ? lit.html`<div class="error">${this.errorMessage}</div>` : ""}
                </div>

            </thermal-dialog>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFileEditDialog.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: false
}), __decorateMetadata("design:type", Object)], ConnectedFileEditDialog.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], ConnectedFileEditDialog.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", Boolean)], ConnectedFileEditDialog.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileEditDialog.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileEditDialog.prototype, "fileLabel", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileEditDialog.prototype, "fileDescription", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileEditDialog.prototype, "errorMessage", void 0);
//#endregion
//#region src/components/file/ConnectedFileDeleteDialog.ts
var ConnectedFileDeleteDialog = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.showLabel = false;
		this.label = (0, _labirthermal_webcomponents.t)("deletefile");
		this.size = "sm";
		this.plain = false;
		this.onDelete = () => {};
		this.isOpen = false;
		this.isDeleting = false;
	}
	static {
		this.styles = lit.css`
        .content {
            padding: var(--thermal-gap);
        }

        .warning {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: var(--thermal-gap);
            margin-bottom: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
        }

        .file-info {
            background: var(--thermal-background);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin: calc(var(--thermal-gap) * 0.5) 0;
        }

        .file-name {
            font-weight: bold;
            font-size: calc(var(--thermal-fs) * 1.1);
        }

        .file-description {
            color: var(--thermal-slate);
            font-size: calc(var(--thermal-fs) * 0.9);
            margin-top: calc(var(--thermal-gap) * 0.25);
        }

        .error {
            background: var(--thermal-danger-light, #fee);
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-danger, #f00);
            border-radius: var(--thermal-radius);
            padding: calc(var(--thermal-gap) * 0.5);
            margin-top: var(--thermal-gap);
            color: var(--thermal-danger-dark, #800);
            font-size: calc(var(--thermal-fs) * 0.9);
        }
    `;
	}
	async handleDelete() {
		if (!this.client || this.isDeleting) return false;
		this.error = void 0;
		try {
			await this.content.fetchDeleteFile(this.folder.path, this.file.fileName);
			await this.display.reloadCurrentState();
			return true;
		} catch (error) {
			this.error = "Došlo k neočekávané chybě při mazání souboru." + (error instanceof Error ? error.message : String(error));
		}
		return false;
	}
	mayDelete() {
		return !!(this.folder && (this.folder.may_manage_files_in || this.folder.may_manage_folders_in));
	}
	render() {
		if (!this.mayDelete()) return lit.nothing;
		const label = (0, _labirthermal_webcomponents.t)("deletefile");
		return lit.html`

            <thermal-dialog
                label=${label}
                button=${label}
                .beforeClose=${async () => {
			this.error = void 0;
			return await this.handleDelete();
		}}
            >

                <thermal-btn
                    slot="invoker"
                    variant=${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}
                    size=${(0, lit_directives_if_defined_js.ifDefined)(this.size)}
                    ?plain=${this.plain}
                    icon="trash"
                    iconStyle="micro"
                    tooltip=${label}
                >
                    ${this.showLabel ? label : lit.nothing}
                </thermal-btn>

                <div slot="content" class="dialog-content">
                    
                    <div class="warning">
                        <strong>Pozor!</strong> Tato akce je nevratná.
                    </div>
                    
                    <p>
                        Opravdu chcete smazat soubor <strong>${this.file.fileName}</strong>?
                        ${this.file.label ? lit.html`<br>(<em>${this.file.label}</em>)` : lit.nothing}
                    </p>

                    ${this.error ? lit.html`<div class="error">${this.error}</div>` : lit.nothing}

                </div>
            </thermal-dialog>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	converter: (0, _labirthermal_webcomponents.booleanConverter)(false)
}), __decorateMetadata("design:type", Boolean)], ConnectedFileDeleteDialog.prototype, "showLabel", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ConnectedFileDeleteDialog.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: false
}), __decorateMetadata("design:type", Object)], ConnectedFileDeleteDialog.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], ConnectedFileDeleteDialog.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", Boolean)], ConnectedFileDeleteDialog.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileDeleteDialog.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileDeleteDialog.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileDeleteDialog.prototype, "onDelete", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFileDeleteDialog.prototype, "isOpen", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFileDeleteDialog.prototype, "isDeleting", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileDeleteDialog.prototype, "error", void 0);
//#endregion
//#region src/components/file/comments/ConnectedFileComments.ts
var ConnectedFileComments = class extends AbstractControlledConsumer {
	static {
		this.styles = lit.css`
    
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            font-size: var(--thermal-fs);
        }

        .list {
            display: flex;
            flex-direction: column;
            gap: .25em;
            flex: 1;
            min-height: 100px;
            overflow-y: auto;
            padding: .25em 0;
        }

        .form-container {
            flex-shrink: 0;
            margin-top: .25em;
        }

        .placeholder {

            height: 100%;
            padding: .5em;

            display: flex;
            justify-content: center;
            align-items: center;

            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);

            font-size: .8em;
            color: var(--thermal-slate);

            &.tiny {
            
                height: 40px;
                text-align: center;

            
            }


        }
    
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		this.content.subscribeToFileUpdates(this);
		this.content.subscribeToFilesUpdates(this);
	}
	firstUpdated() {
		setTimeout(() => this.scrollToBottom(), 0);
	}
	updated() {
		this.scrollToBottom();
	}
	scrollToBottom() {
		const listElement = this.shadowRoot?.querySelector(".list");
		if (listElement) listElement.scrollTo({
			top: listElement.scrollHeight,
			behavior: "smooth"
		});
	}
	render() {
		return lit.html`

            <div class="list">
                ${this.file.comments && this.file.comments.length > 0 ? this.file.comments.map((comment) => lit.html`
                        <connected-file-comment
                            .comment=${comment}
                            .file=${this.file}
                            .folder=${this.folder}
                        ></connected-file-comment>
                    `) : lit.html`<div class="placeholder">
                    <span>${(0, _labirthermal_webcomponents.t)("nocomments")}</span>
                </div>`}
            </div>
            
            ${this.folder && this.folder.may_manage_files_in ? lit.html`
                    <div class="form-container">
                        <connected-file-comment-form 
                            .file=${this.file} 
                            .folder=${this.folder} 
                            .onChange=${() => {
			this.requestUpdate();
			setTimeout(() => this.scrollToBottom(), 0);
		}}>
                        </connected-file-comment-form>
                    </div>
                    ` : lit.nothing}

            ${this.folder && !this.folder.may_manage_files_in ? lit.html`<div class="placeholder  tiny"><span>Nemáte oprávnění komentovat tento soubor</span></div>` : lit.nothing}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileComments.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileComments.prototype, "folder", void 0);
//#endregion
//#region src/components/file/comments/ConnectedFileComment.ts
var ConnectedFileComment = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.onChange = () => {};
		this.isEditing = false;
	}
	static {
		this.styles = lit.css`
    
        :host {

            padding: .5em;
            display: block;

            font-size: var( --thermal-fs );

            background: var(--thermal-background);

            opacity: 0.7;

            border-radius: var(--thermal-radius);
            width: calc( 100% - 1em );
            max-width: calc( 100% - 1em );
            align-self: flex-end;

            box-sizing: border-box;
        }

        :host(.my-comment) {
            opacity: 1;
            align-self: flex-start;
        }

        header {
            display: flex;
            gap: calc(var(--thermal-gap) * 0.5);
            justify-content: space-between;


            margin-bottom: .3em;
            width: 100%;
            
            font-size: calc(var(--thermal-fs) * 0.7);
            color: var( --thermal-slate );
            

            > div {
                flex-grow: 1;

                span {
                    display: block;
                }

                div {

                }

            }


            aside {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                gap: .2em;
            }

        }

        main {

            font-size: calc(var(--thermal-fs) * 0.8);
        
            p {
                margin: 0;
                padding: 0;
            }
        
        }
    
    `;
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		this.content.subscribeToFileUpdates(this);
		this.content.subscribeToFilesUpdates(this);
		this.content.subscribeToFolderUpdates(this);
	}
	async handleDelete() {
		if (this.client) {
			const result = await this.client.api.routes.post.fileDeleteComment(this.folder.path, this.file.fileName, this.comment.timestamp).execute();
			if (result.success) this.content.updateFileState(result.data.file);
			else this.error = result.message;
		}
	}
	mayManage() {
		if (this.folder && (this.folder.may_manage_files_in || this.folder.may_manage_folders_in) && this.comment && this.client && this.client.api.auth.getIdentity()?.meta.login === this.comment.by.login) return true;
		return false;
	}
	render() {
		if (!this.file || !this.comment || !this.folder) return lit.nothing;
		const time = _labirthermal_core.TimeFormat.human(this.comment.timestamp);
		if (this.client?.identity?.meta.login === this.comment.by.login) this.classList.add("my-comment");
		else this.classList.remove("my-comment");
		return lit.html`
            <header>

                <div>
                    <span>${time}</span>
                    <div>${this.comment.by.name}</div>
                </div>

            ${this.mayManage() ? lit.html`
                
                <aside>
                    <thermal-btn 
                        @click=${() => {
			this.isEditing = !this.isEditing;
			this.requestUpdate();
		}}
                        size="sm"
                        variant="${this.isEditing ? "foreground" : "default"}"
                        icon="${this.isEditing ? "close" : "edit"}"
                        iconStyle="micro"
                        ?plain=${true}
                    ></thermal-btn>

                    <thermal-btn 
                        @click=${() => this.handleDelete()} 
                        icon="trash" iconStyle="micro"
                        size="sm"
                        variant="default"
                        ?plain=${true}
                    ></thermal-btn>

                </aside>
            ` : lit.nothing}
            </header>

            <main>
            ${this.isEditing ? lit.html`
                <connected-file-comment-form
                    .comment=${this.comment}
                    .file=${this.file}
                    .folder=${this.folder}
                    .onChange=${(file) => {
			this.isEditing = false;
			this.onChange?.(file);
		}}
                ></connected-file-comment-form>
                ` : lit.html`<p>${this.comment.message}</p>`}
            </main>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileComment.prototype, "comment", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileComment.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileComment.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileComment.prototype, "onChange", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileComment.prototype, "error", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFileComment.prototype, "isEditing", void 0);
//#endregion
//#region src/components/file/analysis/ConnectedFileAnalysisButtons.ts
var ConnectedFileAnalysisButtons = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.tooltip = "Uložit analýzy na server.";
		this.icon = "save";
		this.iconStyle = "micro";
		this.enableCopyToAll = false;
		this.analyses = [];
		this.hasChanged = false;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.file) this.onInstanceCreated(this.file);
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("file") && this.file) this.onInstanceCreated(this.file);
	}
	onInstanceCreated(instance) {
		if (instance) {
			if (instance.analysis) {
				this.getCurrentAnalysisState(instance);
				const listener = () => {
					this.hasChanged = true;
					this.getCurrentAnalysisState(instance);
				};
				instance.analysis.layers.onAnySerializableChange.set(this.UUID, listener.bind(this));
				instance.analysis.layers.onAdd.set(this.UUID, listener.bind(this));
				instance.analysis.layers.onRemove.set(this.UUID, listener.bind(this));
				instance.slots.onAnySlotChanged.set(this.UUID, listener.bind(this));
			}
		} else this.log("Soubor neexistuje!");
	}
	getCurrentAnalysisState(instance) {
		const analyses = [];
		instance.analysis.value.forEach((analysis) => {
			analyses.push(analysis.toSerialized());
		});
		this.analyses = analyses;
		this.requestUpdate();
		return analyses;
	}
	renderCopyToAllButton() {
		if (!this.file || this.content.files && this.content.files.length <= 1) return lit.nothing;
		return lit.html`<thermal-btn
            tooltip="Zkopírovat analýzy do všech souborů ve složce"
            @click=${() => {
			if (!this.file) return;
			this.file.group.analysisSync.copyAllSlotsToAllInstances(this.file);
		}}
            icon="link"
            iconStyle="micro"
        ></thermal-btn>`;
	}
	renderDeleteButton() {
		const disabled = this.analyses.length === 0 ? "true" : "false";
		return lit.html`<thermal-btn
            tooltip="Odstranit všechny analýzy ze všech souborů ve složce"
            disabled=${disabled}
            @click=${() => {
			if (!this.file) return;
			this.file.analysis.layers.removeAllAnalyses();
		}}
            icon="trash"
            iconStyle="micro"
        ></thermal-btn>`;
	}
	renderServerSaveButton() {
		let callback = void 0;
		let disabled = "true";
		if (this.hasChanged) {
			disabled = "false";
			callback = async () => {
				const request = this.client.api.routes.post.updateFile(this.info.path, this.info.fileName);
				request.clearAnalyses();
				for (const analysis of this.analyses) request.addAnalysis(analysis);
				const result = await request.execute();
				if (result.success && result.data) {
					this.content.updateFileState(result.data.file);
					this.analyses = this.getCurrentAnalysisState(this.file);
					this.hasChanged = false;
				}
			};
		}
		return lit.html`<thermal-btn
            tooltip="Uložit současný stav analýz na server"
            disabled=${disabled}
            @click=${callback}
            icon="save"
            iconStyle="micro"
        ></thermal-btn>`;
	}
	renderServerRestoreButton() {
		let callback = void 0;
		let disabled = "true";
		if (this.hasChanged && this.info.analyses.length > 0) {
			disabled = "false";
			callback = async () => {
				this.file?.analysis.layers.removeAllAnalyses();
				for (const analysis of this.info.analyses) {
					this.log(analysis);
					(this.file?.slots.createAnalysisFromSerialized(analysis))?.setSelected(false, true);
					this.analyses = this.getCurrentAnalysisState(this.file);
					this.hasChanged = false;
				}
			};
		}
		return lit.html`<thermal-btn
            tooltip="Obnovit analýzy ze serveru"
            disabled=${disabled}
            @click=${callback}
            icon="restore"
            iconStyle="micro"
        ></thermal-btn>`;
	}
	renderServerDeleteButton() {
		let callback = void 0;
		let disabled = "true";
		if (this.analyses.length > 0 && this.info.analyses.length > 0) {
			disabled = "false";
			callback = async () => {
				const request = this.client.api.routes.post.updateFile(this.info.path, this.info.fileName);
				request.clearAnalyses();
				const result = await request.execute();
				if (result.success && result.data) {
					this.content.updateFileState(result.data.file);
					this.analyses = this.getCurrentAnalysisState(this.file);
					this.hasChanged = true;
				}
			};
		}
		return lit.html`<thermal-btn
            tooltip="Smazat všechny analýzy uložené na serveru"
            disabled=${disabled}
            @click=${callback}
            icon="trash"
            iconStyle="micro"
        ></thermal-btn>`;
	}
	renderDisplaySlot() {
		const items = [];
		if (this.enableCopyToAll) items.push(this.renderCopyToAllButton());
		items.push(this.renderDeleteButton());
		return slotOrNothing("display", items);
	}
	renderServerSlot() {
		return slotOrNothing("server", [
			this.renderServerSaveButton(),
			this.renderServerRestoreButton(),
			this.renderServerDeleteButton()
		]);
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: flex;
            gap: 1em;
        }

    `;
	}
	render() {
		return [this.renderDisplaySlot(), this.renderServerSlot()];
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileAnalysisButtons.prototype, "info", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Boolean }), __decorateMetadata("design:type", Boolean)], ConnectedFileAnalysisButtons.prototype, "enableCopyToAll", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ConnectedFileAnalysisButtons.prototype, "analyses", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ConnectedFileAnalysisButtons.prototype, "hasChanged", void 0);
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: _labirthermal_webcomponents.fileContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], ConnectedFileAnalysisButtons.prototype, "file", void 0);
//#endregion
//#region src/components/configuration/AbstractConfigElement.ts
var AbstractConfigElement = class extends AbstractControlledConsumer {
	static {
		this.styles = lit.css`
    
        :host {
        
            display: flex;
            color: var(--thermal-foreground);
            cursor: pointer;
            align-items: center;
            gap: .25em;
            font-size: var(--thermal-fs);
        
        }

        thermal-dropdown thermal-btn {
            display: block;
        }

        .radio {

            display: flex;
            align-items: center;
            gap: .25em;

            cursor: pointer;

            input,
            span {
                display: block;
            }

            span {
                font-size: .8em;
            }
        }
    
    `;
	}
	renderToggle(label, checked, onChange) {
		return lit.html`<thermal-radio
            type="checkbox"
            .checked=${checked}
            .onChange=${(value) => {
			onChange(value);
		}}
        >${label}</thermal-radio>`;
	}
	renderToggleButton(active, onClick, icon, label, tooltip) {
		return lit.html`
            <thermal-btn
                variant="${active ? "foreground" : "default"}"
                @click=${() => onClick()}
                icon=${(0, lit_directives_if_defined_js.ifDefined)(icon)}
                iconStyle="micro"
                tooltip=${(0, lit_directives_if_defined_js.ifDefined)(tooltip)}
                size="md"
            ></thermal-btn>
        `;
	}
};
//#endregion
//#region src/components/configuration/ConnectedConfigSubfolderMode.ts
var ConnectedConfigSubfolderMode = class extends AbstractConfigElement {
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToSubfoldersUpdates(this);
		this.display.subscribeToFolderDisplayMode(this);
	}
	render() {
		const items = [this.renderToggleButton(this.display.folderListDisplayMode === "asList", () => this.display.setFolderListDisplayMode("asList"), "folder", "micro", "Seznam složek"), this.renderToggleButton(this.display.folderListDisplayMode === "asTable", () => this.display.setFolderListDisplayMode("asTable"), "list", "solid", "Tabulka složek")];
		if (this.display.canHaveGrid(this.content.subfolders)) items.push(this.renderToggleButton(this.display.folderListDisplayMode === "asGrid", () => this.display.setFolderListDisplayMode("asGrid"), "grid", "solid", "Mřížka složek"));
		return items;
	}
};
//#endregion
//#region src/components/configuration/ConnectedConfigFileDisplayMode.ts
var ConnectedConfigFileMode = class extends AbstractConfigElement {
	connectedCallback() {
		super.connectedCallback();
		this.content.subscribeToFilesUpdates(this);
		this.display.subscribeToFileDisplayMode(this);
	}
	render() {
		const items = [this.renderToggleButton(this.display.fileDisplayMode === "asTable", () => this.display.setFileListDisplayMode("asTable"), "list", "solid", "Tabulka souborů"), this.renderToggleButton(this.display.fileDisplayMode === "asGrid", () => this.display.setFileListDisplayMode("asGrid"), "grid", "solid", "Mřížka souborů")];
		if (this.display.fileDisplayMode === "asGrid") {
			const compact = this.renderToggle("Kompaktní zobrazení", this.display.fileDisplayCompact, (value) => this.display.setFilesCompact(value));
			items.push(compact);
		}
		return items;
	}
};
//#endregion
//#region src/components/configuration/ConnectedConfigFileContentMode.ts
var ConnectedConfigFileContentMode = class extends AbstractConfigElement {
	connectedCallback() {
		super.connectedCallback();
		this.display.subscribeToEditTags(this);
		this.display.subscribeToDisplayComments(this);
	}
	render() {
		return [this.renderToggle("Edit tags", this.display.editTags, (value) => this.display.setEditTags(value)), this.renderToggle("Display Comments", this.display.displayComments, (value) => this.display.setDisplayComments(value))];
	}
};
//#endregion
//#region src/components/file/comments/ControlledFileCommentForm.ts
var ConnectedFileCommentForm = class extends AbstractControlledConsumer {
	constructor(..._args) {
		super(..._args);
		this.onChange = () => {};
		this.message = "";
	}
	connectedCallback() {
		super.connectedCallback();
		this.client.subscribeToIdentityChanges(this);
		this.content.subscribeToFileUpdates(this);
		this.content.subscribeToFilesUpdates(this);
	}
	updated(changedProperties) {
		if (changedProperties.has("comment") && this.comment && !this.message) this.message = this.comment.message;
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var( --thermal-fs );
        }


        main {
            display: flex;
            flex-direction: column;
            gap: .25em;
        }

        textarea {
            min-height: 40px;
            padding: .5em;
            resize: vertical;

            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);

            font-family: inherit;
            font-size: calc(var(--thermal-fs) * 0.8);

            color: var(--thermal-foreground);
            background: var(--thermal-background);
            
        }

        .form-actions {
            display: flex;
            justify-content: flex-end;
        }

        .small {
            font-size: calc(var(--thermal-fs) * 0.8);
        }

        .slate {
            color: var(--thermal-slate);
        }
    
    `;
	}
	async handleSubmit(event) {
		event.preventDefault();
		if (this.client && this.message.trim().length >= 3) {
			if (!this.comment) {
				const result = await this.client.api.routes.post.fileAddComment(this.folder.path, this.file.fileName, this.message.trim()).execute();
				if (result.success) {
					this.message = "";
					this.error = void 0;
					this.onChange?.(result.data.file);
					this.content.updateFileState(result.data.file);
				} else this.error = result.message;
			} else {
				const result = await this.client.api.routes.post.fileUpdateComment(this.folder.path, this.file.fileName, this.comment.timestamp, this.message.trim()).execute();
				if (result.success) {
					this.message = "";
					this.error = void 0;
					this.content.updateFileState(result.data.file);
					this.onChange?.(result.data.file);
				} else this.error = result.message;
			}
		}
	}
	handleMessageChange(event) {
		const target = event.target;
		this.message = target.value;
	}
	handleKeyDown(event) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			if (this.message.trim().length >= 3) this.handleSubmit(event);
		}
	}
	mayManage() {
		if (this.folder && (this.folder.may_manage_files_in || this.folder.may_manage_folders_in)) return true;
		return false;
	}
	render() {
		if (!this.client || !this.file || !this.folder) return lit.nothing;
		const canSubmit = this.message.trim().length >= 3;
		const label = !!this.comment ? (0, _labirthermal_webcomponents.t)("editcomment") : (0, _labirthermal_webcomponents.t)("addcomment");
		return lit.html`
            <form >
                <main>
                    <textarea 
                        placeholder=${label}
                        .value=${this.message}
                        @input=${this.handleMessageChange}
                        @keydown=${this.handleKeyDown}
                        required
                    ></textarea>
                    
                    ${this.error ? lit.html`<div class="error">${this.error}</div>` : lit.nothing}
                    
                    <div class="form-actions">
                        <thermal-btn 
                            variant="primary" 
                            size="sm"
                            type="submit"
                            ?disabled=${!canSubmit}
                            @click=${this.handleSubmit}
                        >
                            ${label}
                        </thermal-btn>

                    </div>
                </main>
            </form>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileCommentForm.prototype, "comment", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileCommentForm.prototype, "file", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ConnectedFileCommentForm.prototype, "folder", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ConnectedFileCommentForm.prototype, "onChange", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileCommentForm.prototype, "error", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ConnectedFileCommentForm.prototype, "message", void 0);
/** 
* All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
* @see {@link defineAllWebcomponents}
*/
const elementsAll = {
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
};
const isLabirthermalWebcomponent = (tag) => {
	return tag in elementsAll;
};
//#endregion
exports.elementsAll = elementsAll;
exports.isLabirthermalWebcomponent = isLabirthermalWebcomponent;

//# sourceMappingURL=index.export.cjs.map