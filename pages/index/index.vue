<script>
  import { mapState, mapActions } from "vuex";
  import TokenExchanger from "@/utils/token-exchanger";

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
