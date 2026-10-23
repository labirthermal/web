import { useEffect } from '@wordpress/element';
import { createLibScriptElement, documentHasLibScriptElement } from './libScriptElement';


/**
 * Make sure the external library is loaded whenever any instance of this component is being edited
 */
export const useRegisterIframeScript = () => {

    useEffect(() => {

        const allIframes = document.querySelectorAll("iframe");

        for (let i = 0; i < allIframes.length; i++) {

            const iframe = allIframes[i];

            if (iframe.name === "editor-canvas") {

                const doc = iframe.contentWindow.document;

                if (!documentHasLibScriptElement(doc)) {

                    const script = createLibScriptElement(doc);

                    doc.head.appendChild(script);

                }

            }

        }

    }, []);

}