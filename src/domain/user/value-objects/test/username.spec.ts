import { Username } from "@/domain/user/value-objects/username.js";
import { InvalidUsernameError } from "@/domain/user/errors/invalid-username-error.js";

describe("Create Username", () => {
  test("it should be able to validate the username", () => {
    const value = "test_123";
    
    const username = new Username(value);

    expect(username.getValue).toBe("test_123");
  });

  test("it should not be possible to create a short username", () => {
    const value = "ab";

    expect(() => {
      new Username(value);
    }).toThrow(InvalidUsernameError);
  });

  test("it should not be possible to create a username with invalid characters.", () => {
    const value = "Test.123@#$";

    expect(() => {
      new Username(value);
    }).toThrow(InvalidUsernameError);
  });

});
