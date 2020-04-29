<script>
  export default {
    data() {
      return {
        isGeolocationStarted: false,
      };
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
      initGeolocation() {
        this.$geolocation.addLocationListener(({ latitude, longitude }) => {
          // TODO
          console.log(latitude, longitude);
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
      this.initGeolocation();
    },
  };
</script>

<template>
  <div class="p-index">
    <v-btn
      v-if="isGeolocationStarted"
      class="ma-2"
      color="blue white--text"
      block
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
      class="ma-2"
      color="blue white--text"
      block
      x-large
      @click="onActivateTrackingButtonClick"
    >
      <v-icon left>
        mdi-crosshairs-gps
      </v-icon>

      Activer le suivi
    </v-btn>

    <v-btn
      class="ma-2"
      color="orange white--text"
      block
      x-large
      @click="onAskForExposureButtonClick"
    >
      Ai-je été exposé ?
    </v-btn>

    <v-btn
      class="ma-2"
      color="red white--text"
      block
      x-large
      @click="onDeclareDiseaseButtonClick"
    >
      Je me déclare porteur !
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
  .p-index {

  }
</style>
