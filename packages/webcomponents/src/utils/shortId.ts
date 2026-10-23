/**
 * Generation of short, collision-free identifiers used instead of full-length UUIDs.
 *
 * The identifiers are only ever used at runtime (as map keys, DOM ids and log prefixes),
 * they are never persisted nor shared between pages. Therefore a short random string
 * is sufficient - and uniqueness within the current document is guaranteed by keeping
 * a registry of all identifiers issued so far.
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@ntc.zcu.cz>
 */

/** Alphabet used for the generated identifiers. Lowercase letters and digits only, so that the ids are safe to use in DOM ids, CSS selectors and slugs. */
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

/** Default length of a generated identifier. 8 characters of the 36-letter alphabet give ~2.8e12 combinations. */
const DEFAULT_LENGTH = 8;

/** All identifiers issued within the current document. Guarantees that no two identifiers ever collide. */
const issuedIds = new Set<string>();

/** Fill the given array with random values, preferring the Web Crypto API and falling back to `Math.random`. */
const fillRandom = (buffer: Uint8Array): Uint8Array => {
    const cryptoObject = typeof globalThis !== "undefined"
        ? globalThis.crypto
        : undefined;

    if (cryptoObject && typeof cryptoObject.getRandomValues === "function") {
        cryptoObject.getRandomValues(buffer);
        return buffer;
    }

    for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
    }

    return buffer;
};

/** Generate a random string of the given length using the {@link ALPHABET}. */
const randomString = (length: number): string => {
    const buffer = fillRandom(new Uint8Array(length));
    let result = "";
    for (let i = 0; i < length; i++) {
        result += ALPHABET[buffer[i] % ALPHABET.length];
    }
    return result;
};

/**
 * Generate a short identifier that is guaranteed to be unique within the current document.
 *
 * Should the random value happen to be taken already, a new one is generated. After
 * a few unsuccessful attempts the identifier is lengthened, so that the function
 * always terminates even when an extreme number of identifiers is in use.
 *
 * @param length The requested number of characters. Defaults to 8.
 * @returns A unique lowercase alphanumeric identifier.
 */
export const generateShortId = (
    length: number = DEFAULT_LENGTH
): string => {

    const safeLength = Math.max(1, Math.floor(length));

    let currentLength = safeLength;
    let attempts = 0;

    while (true) {

        const candidate = randomString(currentLength);

        if (!issuedIds.has(candidate)) {
            issuedIds.add(candidate);
            return candidate;
        }

        attempts++;

        if (attempts % 5 === 0) {
            currentLength++;
        }
    }
};
