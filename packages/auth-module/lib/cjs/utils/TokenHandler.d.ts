export default class TokenHandler {
    static registerToken(token: string): void;
    static unregisterToken(): void;
    static getTokenFromCookies(): string | undefined;
}
