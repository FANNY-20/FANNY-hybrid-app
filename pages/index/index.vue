<script>
  export default {
    methods: {
      onActivateTrackingButtonClick() {
        // TODO
      },
      onAskForExposureButtonClick() {
        // TODO
      },
      onDeclareDiseaseButtonClick() {
        // TODO
      },
    },
  };
</script>

<template>
  <div class="p-index">
    <v-btn
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
