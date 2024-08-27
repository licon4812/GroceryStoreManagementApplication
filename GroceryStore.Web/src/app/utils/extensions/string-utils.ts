export class StringUtils {
    // quick and dirty is null or empty check on the token (not null and not just whitespace)
    static isNullOrEmpty(value: string | null | undefined): boolean {
        return !value || value.trim().length === 0;
    }
}