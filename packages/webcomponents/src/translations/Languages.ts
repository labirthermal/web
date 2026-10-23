/**
 * Keys of all translation keys.
 * 
 * In the comment is the englis version. Use only the keys in any t() function.
 */
export enum T {

    moreoptions = "moreoptions",

    loading = "loading",
    config = "config",
    temperature = "temperature",

    upload = "upload",
    uploadafile = "uploadafile",
    selectfile = "selectfile",
    addfiles = "addfiles",
    clear = "clear",
    dragorselectfile = "dragorselectfile",

    share = "share",
    fileloadingerror = "fileloadingerror",
    embedhint = "embedhint",
    embedlibrary = "embedlibrary",
    embedcomponent = "embedcomponent",
    copy = "copy",
    create = "create",

    remotefoldersbrowseraddfolderhint = "remotefoldersbrowseraddfolderhint",

    file = "file",

    layout_simple = "layout_simple",
    layout_advanced = "layout_advanced",
    layout_nogui = "layout_nogui",
    layout_lesson = "layout_lesson",

    /** Next */
    next = "next",
    /** Previous */
    prev = "prev",
    /** Back */
    back = "back",
    
    /** Close */
    close = "close",
    open = "open",

    detail = "detail",

    showeverything = "showeverything",

    palette = "palette",

    /** Description */
    description = "description",
    /** Author */
    author = "author",
    /** License */
    license = "license",
    /** Recorded at */
    recordedat = "recordedat",

    /** Display settings */
    displaysettings = "displaysettings",

    /** File rendering */
    filerendering = "filerendering",

    /** Pixelated */
    pixelated = "pixelated",

    /** Smooth */
    smooth = "smooth",

    /** 'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are. */
    filerenderinghint = "filerenderinghint",

    /** Adjust time scale */
    adjusttimescale = "adjusttimescale",

    automaticrange = "automaticrange",
    fullrange = "fullrange",

    /** Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max). */
    adjusttimescalehint = "adjusttimescalehint",

    /** Select colour palette of thermal display. */
    colourpalettehint = "colourpalettehint",

    /** Palette {name} */
    palettename = "palettename",


    /** File info */
    fileinfo = "fileinfo",
    /** IR file name */
    thermalfilename = "thermalfilename",
    /** IR file URL */
    thermalfileurl = "thermalfileurl",
    /** Download the IR file */
    thermalfiledownload = "thermalfiledownload",
    /** Visible file name */
    visiblefilename = "visiblefilename",
    /** Visible file URL */
    visiblefileurl = "visiblefileurl",
    /** Download visible file */
    visiblefiledownload = "visiblefiledownload",

    togglevisibleimage = "togglevisibleimage",

    /** Time */
    time = "time",
    /** Duration */
    duration = "duration",
    /** Resolution */
    resolution = "resolution",
    /** Bytesize */
    bytesize = "bytesize",
    /** Minimal temperature */
    minimaltemperature = "minimaltemperature",
    /** Maximal temperature */
    maximaltemperature = "maximaltemperature",

    /** File type */
    filetype = "filetype",
    /** Type */
    type = "type",
    /** Supported devices */
    supporteddevices = "supporteddevices",

    numfiles = "numfiles",



    download = "download",
    downloadoriginalfiles = "downloadoriginalfiles",
    downloadoriginalfileshint = "downloadoriginalfileshint",
    downloadoriginalfile = "downloadoriginalfile",
    exportcurrentframeaspng = "exportcurrentframeaspng",
    convertentiresequencetovideo = "convertentiresequencetovideo",
    pngofindividualimages = "pngofindividualimages",
    pngofindividualimageshint = "pngofindividualimageshint",
    pngofentiregroup = "pngofentiregroup",
    pngofentiregrouphint = "pngofentiregrouphint",
    csvofanalysisdata = "csvofanalysisdata",
    csvofanalysisdatahint = "csvofanalysisdatahint",
    exportimagewidth = "exportimagewidth",
    exportimagefontsize = "exportimagefontsize",
    exportgroupname = "exportgroupname",
    exportfilenames = "exportfilenames",
    numberofcolumns = "numberofcolumns",
    exportdimensions = "exportdimensions",
    exportgroup = "exportgroup",
    thermalscale = "thermalscale",
    thermalrange = "thermalrange",
    filedate = "filedate",

    folder = "folder",
    folders = "folders",

    showingfolder = "showingfolder",
    showingfolders = "showingfolders",
    and = "and",
    or = "or",
    doyouwanttoadd = "doyouwanttoadd",
    youmayalsoadd = "youmayalsoadd",

    range = "range",
    info = "info",
    note = "note",

    group = "group",
    donotgroup = "donotgroup",
    groupby = "groupby",

    groupped = "groupped",

    bydays = "bydays",
    byhours = "byhours",
    byweeks = "byweeks",
    bymonths = "bymonths",
    byyears = "byyears",

    play = "play",
    pause = "pause",
    stop = "stop",
    date = "date",
    frame = "frame",
    playbackspeed = "playbackspeed",
    graphlines = "graphlines",
    straightlines = "straightlines",
    smoothlines = "smoothlines",
    graphlineshint = "graphlineshint",
    reload = "reload",

    analysis = "analysis",
    analyses = "analyses",
    avg = "avg",
    min = "min",
    max = "max",
    size = "size",
    edit = "edit",
    editsth = "editsth",
    remove = "remove",
    addpoint = "addpoint",
    addrectangle = "addrectangle",
    addellipsis = "addellipsis",
    analysishint = "analysishint",
    graph = "graph",
    graphhint1 = "graphhint1",
    graphhint2 = "graphhint2",

    rectangle = "rectangle",
    ellipsis = "ellipsis",
    point = "point",
    name = "name",
    color = "color",
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom",
    columns = "columns",

    fromto = "fromto",
    downloadgraphdataascsv = "downloadgraphdataascsv",


    apparenttemperature = "apparenttemperature",
    airtemperature = "airtemperature",
    relativeairhumidity = "relativeairhumidity",
    windspeed = "windspeed",
    inpercent = "inpercent",
    apparenttemperatureverbose = "apparenttemperatureverbose",
    youfeelwarmer = "youfeelwarmer",
    youfeelcolder = "youfeelcolder",
    apparenttemperaturehint = "apparenttemperaturehint",

    analysissync = "analysissync",

    /** Inspect tool */
    inspecttemperatures = "inspecttemperatures",
    usemousetoinspecttemperaturevalues = "usemousetoinspecttemperaturevalues",

    /**  Edit analysis tool */
    editanalysis = "editanalysis",
    dragcornersofselectedanalysis = "dragcornersofselectedanalysis",

    /** Add point tool */
    addpointanalysis = "addpointanalysis",
    clickandaddpoint = "clickandaddpoint",

    /** Add rectangle tool */
    addrectangleanalysis = "addrectangleanalysis",
    clickandaddrectangle = "clickandaddrectangle",

    /** Add ellipsis tool */
    addellipsisanalysis = "addellipsisanalysis",
    clickandaddellipsis = "clickandaddellipsis",



    /** Tutorial */
    tutorial = "tutorial",
    /** Colour Palette */
    colourpalette = "colourpalette",
    /** Use the dropdown to change the palette */
    palettehint = "palettehint",

    remotefoldersbrowser = "remotefoldersbrowser",



    /** Server */
    server = "server",
    networklog = "networklog",
    editfile = "editfile",
    editfolder = "editfolder",
    editcomment = "editcomment",
    user = "user",
    griddisplay = "griddisplay",
    tabledisplay = "tabledisplay",
    deletefile = "deletefile",
    deletefolder = "deletefolder",
    comments = "comments",
    deletecomment = "deletecomment",
    savecomment = "savecomment",
    addcomment = "addcomment",
    nocomments = "nocomments",
    savechanges = "savechanges",
    uploadfile = "uploadfile",
    compactview = "compactview",
    showdiscussion = "showdiscussion",
    edittags = "edittags",
    assignedtags = "assignedtags",
    availabletags = "availabletags",
    connectioninformation = "connectioninformation",
    serverurl = "serverurl",
    servername = "servername",
    login = "login",
    logout = "logout",
    logoutmessage = "logoutmessage",
    loginerror = "logineerror",
    password = "password",
    accessibletologgedinusers = "accessibletologgedinusers",


    display = "display",
    content = "content",
    syncanalyses = "syncanalyses",
    overviewofyourfolders = "overviewofyourfolders",
    uploadedby = "uploadedby",
    uploadeddat = "uploadeddat",
    createfolder = "createfolder",
    subfolder = "subfolder",
    createsubfolder = "createsubfolder",
    delete = "delete",

    export = "export",
    
    exportcontent = "exportcontent",
    histogram = "histogram",
    timeline = "timeline",
    
    exportwidth = "exportwidth",
    exportmargin = "exportmargin",
    exportgap = "exportgap",
    exportgrahpheight = "exportgrahpheight",
    imagecompression = "imagecompression",
    videoquality = "videoquality",
    exportvideo = "exportvideo",
    exportpng = "exportpng",

    exportrecordingframes = "exportrecordingframes",
    exportencodingfile = "exportencodingfile",

    exportdonotclosewindowhint = "exportdonotclosewindowhint",

    theme = "theme",
    light = "light",
    dark = "dark",

    foldermayhavefiles = "foldermayhavefiles",
    foldermayhavesubfolders = "foldermayhavesubfolders",

}

export default {
    T: T
}

export type Translation = {
    [K in keyof typeof T]: string
}

type LangDefinition = {
    code: string,
    name: string,
    flag: string,
    disabled?: true
}

export const languages: LangDefinition[] = [
    
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
    },
    
];

export const languagesObject = Object.fromEntries( languages.map( l => [l.code, l] ) );