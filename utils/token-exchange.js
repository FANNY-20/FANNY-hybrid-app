import TokenForge from "./token-forge";

export default class TokenExchange {
  constructor(initiatorUuid, receiverUuid, peer) {
    this._initiatorUuid = initiatorUuid;
    this._receiverUuid = receiverUuid;
    this._peer = peer;
  }

  async proceed() {
    const tokenForge = new TokenForge([this._initiatorUuid, this._receiverUuid]);
    const token = tokenForge.craft();
    const conn = this._peer.connect(this._receiverUuid);

    conn.on("open", () => {
      conn.on("data", (data) => {
        if (data && data.status === "success" && data.token === token) {
          // TODO: store token locally
          console.log("Exchange acknowledgment", data);
        }

        conn.close();
      });

      conn.send(token);
    });
  }
}
