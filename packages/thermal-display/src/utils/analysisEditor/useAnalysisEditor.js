import { useState } from '@wordpress/element';

/** Store the analysis editor state */
export const useAnalysisEditor = () => {

    const [open, setOpen] = useState(false);

    return {
        open,
        setOpen
    };

}