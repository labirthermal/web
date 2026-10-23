
const mode = window.matchMedia( "(prefers-color-scheme: dark)" );

export const DARK_MODE_CLASS = "thermal-dark-mode";

const activateDrkMode = () => {
    document.body.classList.add( DARK_MODE_CLASS );
}
const deactivateDarkMode = () => {
    document.body.classList.remove( DARK_MODE_CLASS );
}

export const initialiseMode = () => {

    if ( mode.matches ) {
        activateDrkMode();
    }

    const handler = ( event: MediaQueryListEvent ) => {
        if ( event.matches ) {
            activateDrkMode();
        } else {
            deactivateDarkMode();
        }
    }


    mode.addEventListener( "change", handler );
    mode.addListener( handler );

}