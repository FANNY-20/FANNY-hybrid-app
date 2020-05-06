import TokenForge from "./token-forge";
import Peer from "peerjs";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

const TYPE_PRIVATE_UUID = "PRIVATE_UUID";
const TYPE_TOKEN = "TOKEN";
const TYPE_ACK = "ACK";

export default class TokenExchanger {
  /**
   * @param {string} publicUuid
   * @param {string} privateUuid
   */
  constructor(publicUuid, privateUuid) {
    this._privateUuid = privateUuid;

    const peerOptions = {
      host: process.env.PEER_SERVER_HOST,
      port: process.env.PEER_SERVER_PORT,
    };

    if (process.env.PEER_SERVER_KEY) {
      peerOptions.key = process.env.PEER_SERVER_KEY;
    }

    this._peer = new Peer(publicUuid, peerOptions);
    this._peer.on("connection", (conn) => {
      conn.on("open", () => {
        conn.on("data", (data) => {
          this._onReceiveData(conn, data);
        });
      });
    });
  }

  /**
   * Destroy all underlying peer connections
   */
  destroy() {
    this._peer.destroy();
  }

  /**
   * Initiate a token exchange with a remote peer
   *
   * @param {string} receiverPublicUuid
   */
  proceed(receiverPublicUuid) {
    const conn = this._peer.connect(receiverPublicUuid);

    conn.on("open", () => {
      conn.on("data", (data) => {
        this._onReceiveData(conn, data);
      });

      // Step 1: send privateUuid
      conn.send({
        type: TYPE_PRIVATE_UUID,
        payload: this._privateUuid,
      });
    });
  }

  _onReceiveData(conn, data) {
    if (data && data.type) {
      switch (data.type) {
        case TYPE_PRIVATE_UUID:
          this._onReceivePrivateUuidFromPeer(conn, data.payload);
          break;
        case TYPE_TOKEN:
          this._onReceiveTokenFromPeer(conn, data.payload);
          break;
        case TYPE_ACK:
          this._onReceiveAcknowledgmentFromPeer(conn, data.payload);
          break;
        default:
          conn.close();
      }
    }
  }

  _onReceivePrivateUuidFromPeer(conn, privateUuid) {
    // Craft a fresh token using our both privateUuids
    const tokenForge = new TokenForge([this._privateUuid, privateUuid]);
    const token = tokenForge.craft();

    // Step 2: send token
    conn.send({
      type: TYPE_TOKEN,
      payload: token,
    });
  }

  async _onReceiveTokenFromPeer(conn, token) {
    // TODO: remove log
    console.log("Received token from peer", token);

    if (/^[0-9a-f]{64}$/.test(token)) {
      // Should be "1" or undefined
      const tokenExists = await Storage.get({
        key: token,
      });

      if (!tokenExists) {
        Storage.set({
          key: token,
          value: "1",
        });
      }

      // Step 3: send acknowledgment
      conn.send({
        type: TYPE_ACK,
        payload: {
          ack: !tokenExists,
          token,
        },
      });
    } else {
      conn.close();
    }
  }

  _onReceiveAcknowledgmentFromPeer(conn, { ack, token }) {
    // TODO: remove log
    console.log("Received acknowledgment from peer", ack, token);

    if (ack) {
      Storage.set({
        key: token,
        value: "1",
      });
    }

    // Step 4: close connection, exchange is successful
    conn.close();
  }
}
