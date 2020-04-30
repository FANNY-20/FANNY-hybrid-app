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
   * @returns {Promise<string>}
   */
  async craft() {
    const encoder = new TextEncoder();
    const concatenatedUuidsData = encoder.encode(this._sortedUuids.join(""));
    const hashBuffer = await crypto.subtle.digest("SHA-256", concatenatedUuidsData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }
}
