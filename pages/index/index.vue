<script>
  import { mapState, mapActions } from "vuex";
  import { Plugins } from "@capacitor/core";
  import _intersection from "lodash.intersection";
  import TokenExchanger from "@/utils/token-exchanger";
  import TermsOfUse from "@/components/terms-of-use";

  const { Storage } = Plugins;

  export default {
    components: {
      TermsOfUse,
    },
    data() {
      return {
        isGeolocationStarted: false,
        isTermsOfUseDialogOpen: false,
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
            this.$toast.warning("Il semblerait que vous ayez été exposé", {
              timeout: 4000,
            });
          } else {
            this.$toast.success("Vous ne semblez pas avoir été exposé", {
              timeout: 4000,
            });
          }
        } catch(e) {
          this.$toast.error("Une erreur est survenue, merci de réessayer plus tard...");
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

          this.$toast.success("Votre déclaration a bien été prise en compte", {
            timeout: 4000,
          });
        } catch(e) {
          this.$toast.error("Une erreur est survenue, merci de réessayer plus tard...");
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

    <v-dialog v-model="isTermsOfUseDialogOpen">
      <template v-slot:activator="{ on }">
        <v-btn
          class="tou-button"
          color="primary"
          text
          large
          v-on="on"
        >
          Lire les CGU
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          Conditions générales d'utilisation
        </v-card-title>

        <v-card-text>
          <terms-of-use />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            text
            @click="isTermsOfUseDialogOpen = false"
          >
            Fermer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

    .cta-button:first-child,
    .tou-button {
      margin-top: auto;
    }

    .cta-button + .cta-button {
      margin-top: $_gutter;
    }
  }
</style>
