import { assert } from "chai";
import { v4 as uuidv4 } from "uuid";
import TokenForge from "./token-forge";

describe("TokenForge", () => {
  it("should return a sha256 hex value when passing 2 valid uuids", () => {
    const forge = new TokenForge([
      uuidv4(),
      uuidv4(),
    ]);

    const token = forge.craft();

    assert.match(token, /^[a-f0-9]{64}$/);
  });

  it("should return the same sha256 hex value, no matter what the order of uuids is", () => {
    const uuid1 = uuidv4();
    const uuid2 = uuidv4();

    const forge1 = new TokenForge([uuid1, uuid2]);
    const forge2 = new TokenForge([uuid2, uuid1]);

    const token1 = forge1.craft();
    const token2 = forge2.craft();

    assert(token1, token2);
  });
});
