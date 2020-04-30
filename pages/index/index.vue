<script>
  import { mapState, mapActions } from "vuex";

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

          return;
        }

        if (!newVal && oldVal) {
          this.$geolocation.stop();
        }
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
