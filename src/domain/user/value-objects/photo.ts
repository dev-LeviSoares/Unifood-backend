import { InvalidPhotoError } from "../errors/invalid-photo-error.js";

export class Photo {
  private constructor(private readonly key: string) {}

  static create(key: string): Photo {
    const PHOTO_KEY = /^(avatars|products)\/[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$/;

    const normalized = key.trim();

    if (!PHOTO_KEY.test(normalized)) {
      throw new InvalidPhotoError("Foto inválida.");
    }

    return new Photo(normalized);
  }

  get value(): string {
    return this.key;
  }
}