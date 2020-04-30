<script>
  import { mapState, mapActions } from "vuex";
  import Peer from "peerjs";

  export default {
    data() {
      return {
        isGeolocationStarted: false,
      };
    },
    computed: {
      ...mapState("me", [
        "uuid",
      ]),
    },
    watch: {
      isGeolocationStarted(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.$geolocation.start();
        } else if (!newVal && oldVal) {
          this.$geolocation.stop();
        }
      },
      uuid(newVal) {
        this.initPeer(newVal);
      },
    },
    methods: {
      ...mapActions("me", [
        "renewUuid",
      ]),
      ...mapActions("geolocation", [
        "sendGeolocation",
      ]),
      async trySendGeolocation({ latitude, longitude }) {
        try {
          // TODO: handle response data
          await this.sendGeolocation({
            uuid: this.uuid,
            latitude,
            longitude,
          });
        } catch(e) {
          // TODO: handle error
          console.error("Error caught !\n", e);
        }
      },
      initGeolocation() {
        this.$geolocation.addLocationListener(({ latitude, longitude }) => {
          this.trySendGeolocation({ latitude, longitude });
        });
      },
      initPeer(peerId) {
        if(this.peer) {
          this.peer.destroy();
        }

        const peerOptions = {
          host: process.env.PEER_SERVER_HOST,
          port: process.env.PEER_SERVER_PORT,
        };

        if (process.env.PEER_SERVER_KEY) {
          peerOptions.key = process.env.PEER_SERVER_KEY;
        }

        this.peer = new Peer(peerId, peerOptions);

        this.peer.on("connection", (conn) => {
          conn.on("open", () => this.onPeerConnectionOpen(conn));
        });
      },
      onPeerConnectionOpen(conn) {
        // TODO
        conn.send("Hello World");
      },
      onActivateTrackingButtonClick() {
        this.isGeolocationStarted = true;
      },
      onDeactivateTrackingButtonClick() {
        this.isGeolocationStarted = false;
      },
      onAskForExposureButtonClick() {
        // TODO
      },
      onDeclareDiseaseButtonClick() {
        // TODO
      },
    },
    created() {
      this.peer = null;

      this.renewUuid();
      this.initGeolocation();
    },
  };
</script>

<template>
  <div class="p-index">
    <v-btn
      v-if="isGeolocationStarted"
      class="cta-button"
      color="blue white--text"
      x-large
      @click="onDeactivateTrackingButtonClick"
    >
      <v-icon left>
        mdi-crosshairs
      </v-icon>

      Désactiver le suivi
    </v-btn>

    <v-btn
      v-else
      class="cta-button"
      color="blue white--text"
      x-large
      @click="onActivateTrackingButtonClick"
    >
      <v-icon left>
        mdi-crosshairs-gps
      </v-icon>

      Activer le suivi
    </v-btn>

    <v-btn
      class="cta-button"
      color="orange white--text"
      x-large
      @click="onAskForExposureButtonClick"
    >
      Ai-je été exposé ?
    </v-btn>

    <v-btn
      class="cta-button"
      color="red white--text"
      x-large
      @click="onDeclareDiseaseButtonClick"
    >
      Je me déclare porteur !
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
  .p-index {
    $_gutter: 12px;

    height: 100%;
    padding: $_gutter;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .cta-button + .cta-button {
      margin-top: $_gutter;
    }
  }
</style>
