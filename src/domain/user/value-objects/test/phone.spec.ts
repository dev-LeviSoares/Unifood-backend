import { Phone } from "@/domain/user/value-objects/phone.js";
import { InvalidPhoneError } from "@/domain/user/errors/invalid-phone-error.js";

describe("Create Phone", () => {
  test("it should be able to validate the phone", () => {
    const value = "(11)91111-1111";
    
    const phone = new Phone(value);

    expect(phone.getValue()).toBe("11911111111");
  });

  test("It should be possible format a phone", () => {
    const value = "(11)91111-1111";
    
    const phone = new Phone(value);

    const phoneFormatted = phone.format()

    expect(phone.getValue()).toBe("11911111111")
    expect(phoneFormatted).toBe("(11) 91111-1111")
  });
});
