/** What kind of change occured with the given analysis? */

export enum AnalysisSerializableChangeType {
    /** The analysis was added */
    ADD = 0,
    /** The analysis was removed */
    REMOVE = 1,
    /** The analysis was resized or moved */
    RESIZEMOVE = 2,
    /** Other properties of the analysis were changed */
    PROPERTIESCHANGE = 3,
    /** Graph visibility changes */
    GRAPH = 4
}
