/** Converts a duration property indicated as string to millis and back */
export const durationConverter = {
    fromAttribute: (value: string | null): number | undefined => {

        if (value) {
            const parts = value.split(':').map(Number);

            if (parts.some(isNaN)) return undefined;

            if (parts.length === 3) {
                // Formát MM:SS:MS
                const [minutes, seconds, milliseconds] = parts;
                return minutes * 60000 + seconds * 1000 + milliseconds;
            } else if (parts.length === 4) {
                // Formát HH:MM:SS:MS
                const [hours, minutes, seconds, milliseconds] = parts;
                return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
            }
        }

        return undefined;
    },
    toAttribute: (value: number | undefined): string | undefined => {

        if (value !== undefined) {
            const hours = Math.floor(value / 3600000);
            const minutes = Math.floor((value % 3600000) / 60000);
            const seconds = Math.floor((value % 60000) / 1000);
            const milliseconds = value % 1000;

            const formattedSeconds = String(seconds).padStart(2, '0'); // 00-59
            const formattedMilliseconds = String(milliseconds).padStart(3, '0'); // 000-999

            if (hours > 0) {
                return `${hours}:${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
            }

            return `${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
        }

        return undefined;
    }
}