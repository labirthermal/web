import { useCallback, useEffect, useMemo, useState } from '@wordpress/element';

const parseString = ( value ) => {
	if ( ! value ) {
		return {};
	}

	return Object.fromEntries(
		value
			.split( ';' )
			.map( ( record ) => {
				const file = {};

				record.split( '|' ).forEach( ( segment ) => {
					const separatorIndex = segment.indexOf( '~' );
					if ( separatorIndex < 0 ) {
						return;
					}

					const key = segment.slice( 0, separatorIndex ).trim();
					const entryValue = segment
						.slice( separatorIndex + 1 )
						.trim();
					if ( key && entryValue ) {
						file[ key ] = entryValue;
					}
				} );

				return file.thermal ? [ file.thermal, file ] : undefined;
			} )
			.filter( Boolean )
	);
};

const serializeFiles = ( files ) => {
	const records = Object.values( files )
		.map( ( file ) => {
			if ( ! file.thermal ) {
				return undefined;
			}

			return [
				`thermal~${ file.thermal }`,
				file.visible && `visible~${ file.visible }`,
				file.label && `label~${ file.label }`,
			]
				.filter( Boolean )
				.join( '|' );
		} )
		.filter( Boolean );

	return records.length > 0 ? records.join( ';' ) : undefined;
};

export const useFiles = ( initialValue ) => {
	const [ files, setFiles ] = useState( () => parseString( initialValue ) );

	useEffect( () => {
		setFiles( parseString( initialValue ) );
	}, [ initialValue ] );

	const parsed = useMemo( () => serializeFiles( files ), [ files ] );

	const syncUrls = useCallback( ( urls ) => {
		setFiles( ( previousFiles ) =>
			Object.fromEntries(
				urls
					.filter(
						( url ) => typeof url === 'string' && url.length > 0
					)
					.map( ( url ) => [
						url,
						previousFiles[ url ] ?? { thermal: url },
					] )
			)
		);
	}, [] );

	const removeFile = useCallback( ( url ) => {
		setFiles( ( previousFiles ) => {
			const remainingFiles = { ...previousFiles };
			delete remainingFiles[ url ];
			return remainingFiles;
		} );
	}, [] );

	const updateFile = useCallback( ( url, changes ) => {
		setFiles( ( previousFiles ) => {
			const file = previousFiles[ url ];
			if ( ! file ) {
				return previousFiles;
			}

			return {
				...previousFiles,
				[ url ]: { ...file, ...changes },
			};
		} );
	}, [] );

	const updateFileLabel = useCallback(
		( url, label ) => {
			updateFile( url, { label } );
		},
		[ updateFile ]
	);

	const updateFileVisible = useCallback(
		( url, visible ) => {
			updateFile( url, { visible } );
		},
		[ updateFile ]
	);

	return {
		files,
		parsed,
		removeFile,
		syncUrls,
		updateFileLabel,
		updateFileVisible,
	};
};
