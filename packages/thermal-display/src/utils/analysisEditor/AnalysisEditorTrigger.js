import {
    Button
} from '@wordpress/components';

export const AnalysisEditorTrigger = ({
    setOpen
}) => {
    return <Button
        variant="secondary"
        size="compact"
        onClick={() => setOpen(true)}
    >Analyses</Button>
}