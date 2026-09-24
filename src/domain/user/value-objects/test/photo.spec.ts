import { Photo } from "@/domain/user/value-objects/photo.js";
import { InvalidPhotoError } from "@/domain/user/errors/invalid-photo-error.js";

describe("Create Photo", () => {
  test("it should be able to validate the photo", () => {
    const value = "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png";
    
    const photo = Photo.create(value);

    expect(photo.value).toBe("avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.png");
  });

  test("it must not be able to other formats photo key", () => {
    const value = "avatars/f81d4fae-7dec-11d0-a765-00a0c91e6bf6.gif";

    expect(() => {
      Photo.create(value);
    }).toThrow(InvalidPhotoError);
  });
});
