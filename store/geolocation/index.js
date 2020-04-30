const SEND_GEOLOCATION_REQUEST = "SEND_GEOLOCATION_REQUEST";
const SEND_GEOLOCATION_SUCCESS = "SEND_GEOLOCATION_SUCCESS";
const SEND_GEOLOCATION_FAIL = "SEND_GEOLOCATION_FAIL";

export const state = () => ({
  isSendingGeolocation: false,
});

export const getters = {};

export const mutations = {
  [SEND_GEOLOCATION_REQUEST](state) {
    state.isSendingGeolocation = true;
  },
  [SEND_GEOLOCATION_SUCCESS](state) {
    state.isSendingGeolocation = false;
  },
  [SEND_GEOLOCATION_FAIL](state) {
    state.isSendingGeolocation = false;
  },
};

export const actions = {
  async sendGeolocation({ commit }, { uuid, latitude, longitude }) {
    commit(SEND_GEOLOCATION_REQUEST);

    const body = {
      uuid,
      lat: latitude,
      lon: longitude,
    };

    try {
      // TODO: set route
      const { data } = await this.$axios.$post("", body);

      commit(SEND_GEOLOCATION_SUCCESS);

      return data;
    } catch(e) {
      commit(SEND_GEOLOCATION_FAIL);

      throw e;
    }
  },
};
