export interface Encrypter {
  encrypt(payload: Record<string, unknown>): Promise<string>;
  decrypt(token: string): Promise<Record<string, unknown>>;
}