<script>
  import { mapState, mapActions } from "vuex";
  import { Plugins } from "@capacitor/core";
  import _intersection from "lodash.intersection";
  import TokenExchanger from "@/utils/token-exchanger";

  const { Storage } = Plugins;

  export default {
    data() {
      return {
        isGeolocationStarted: false,
      };
    },
    computed: {
      ...mapState("me", [
        "publicUuid",
        "privateUuid",
      ]),
      ...mapState("tokens", [
        "isFetchingTokens",
        "isSendingTokens",
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
      publicUuid(newVal) {
        this.reinitTokenExchanger(newVal, this.privateUuid);
      },
    },
    methods: {
      ...mapActions("me", [
        "renewUuids",
      ]),
      ...mapActions("geolocation", [
        "sendGeolocation",
      ]),
      ...mapActions("tokens", [
        "fetchTokens",
        "sendTokens",
      ]),
      async trySendGeolocation({ latitude, longitude }) {
        try {
          const exposedPublicUuids = await this.sendGeolocation({
            publicUuid: this.publicUuid,
            latitude,
            longitude,
          });

          for (const exposedPublicUuid of exposedPublicUuids) {
            this.tokenExchanger.proceed(exposedPublicUuid.uuid);
          }
        } catch(e) {
          // Noop
        }
      },
      initGeolocation() {
        this.$geolocation.addLocationListener(({ latitude, longitude }) => {
          this.trySendGeolocation({ latitude, longitude });
        });
      },
      reinitTokenExchanger(publicUuid, privateUuid) {
        if (this.tokenExchanger) {
          this.tokenExchanger.destroy();
        }

        this.tokenExchanger = new TokenExchanger(publicUuid, privateUuid);
      },
      async askForExposure() {
        try {
          const remoteTokens = (await this.fetchTokens()).map(t => t.token);
          const { keys } = await Storage.keys();
          const localTokens = keys.filter(k => /^[a-f0-9]{64}$/.test(k));
          const commonTokens = _intersection(localTokens, remoteTokens);

          if (commonTokens.length > 0) {
            // TODO: toast exposed
            console.log("EXPOSED");
          } else {
            // TODO: toast not exposed
            console.log("NOT EXPOSED");
          }
        } catch(e) {
          // TODO: toast error
        }
      },
      async declareDisease() {
        // Gathering tokens from storage
        const { keys } = await Storage.keys();
        const tokens = keys.filter(k => /^[a-f0-9]{64}$/.test(k));

        try {
          await this.sendTokens({
            tokens,
          });

          // Clear tokens from storage
          for(const token of tokens) {
            Storage.remove({
              key: token,
            });
          }

          // TODO: toast OK
        } catch(e) {
          // TODO: toast NOK
        }
      },
      onActivateTrackingButtonClick() {
        this.isGeolocationStarted = true;
      },
      onDeactivateTrackingButtonClick() {
        this.isGeolocationStarted = false;
      },
      onAskForExposureButtonClick() {
        this.askForExposure();
      },
      onDeclareDiseaseButtonClick() {
        this.declareDisease();
      },
    },
    created() {
      this.tokenExchanger = null;

      this.renewUuids();
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
      :loading="isFetchingTokens"
      @click="onAskForExposureButtonClick"
    >
      Ai-je été exposé ?
    </v-btn>

    <v-btn
      class="cta-button"
      color="red white--text"
      x-large
      :loading="isSendingTokens"
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
