import { sha256 } from "js-sha256";

export default class TokenForge {
  /**
   * @param {string[]} uuids
   */
  constructor(uuids) {
    if (!Array.isArray(uuids) || uuids.length !== 2) {
      throw new Error("The uuids param must be an array of 2 elements");
    }

    this._sortedUuids = [...uuids];
    this._sortedUuids.sort();
  }

  /**
   * Produces a SHA256 hash by concatenating the 2 uuids
   *
   * @returns {string}
   */
  craft() {
    return sha256(this._sortedUuids.join(""));
  }
}
