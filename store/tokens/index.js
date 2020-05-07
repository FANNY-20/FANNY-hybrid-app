const FETCH_TOKENS_REQUEST = "FETCH_TOKENS_REQUEST";
const FETCH_TOKENS_SUCCESS = "FETCH_TOKENS_SUCCESS";
const FETCH_TOKENS_FAIL = "FETCH_TOKENS_FAIL";

const SEND_TOKENS_REQUEST = "SEND_TOKENS_REQUEST";
const SEND_TOKENS_SUCCESS = "SEND_TOKENS_SUCCESS";
const SEND_TOKENS_FAIL = "SEND_TOKENS_FAIL";

export const state = () => ({
  isFetchingTokens: false,
  isSendingTokens: false,
});

export const getters = {};

export const mutations = {
  [FETCH_TOKENS_REQUEST](state) {
    state.isFetchingTokens = true;
  },
  [FETCH_TOKENS_SUCCESS](state) {
    state.isFetchingTokens = false;
  },
  [FETCH_TOKENS_FAIL](state) {
    state.isFetchingTokens = false;
  },
  [SEND_TOKENS_REQUEST](state) {
    state.isSendingTokens = true;
  },
  [SEND_TOKENS_SUCCESS](state) {
    state.isSendingTokens = false;
  },
  [SEND_TOKENS_FAIL](state) {
    state.isSendingTokens = false;
  },
};

export const actions = {
  async fetchTokens({ commit }) {
    commit(FETCH_TOKENS_REQUEST);

    try {
      const { data } = await this.$axios.$get("tokens", {
        progress: false,
      });

      commit(FETCH_TOKENS_SUCCESS);

      return data;
    } catch(e) {
      commit(FETCH_TOKENS_FAIL);

      throw e;
    }
  },
  async sendTokens({ commit }, { tokens }) {
    commit(SEND_TOKENS_REQUEST);

    const body = {
      tokens,
    };

    try {
      await this.$axios.post("tokens", body, {
        progress: false,
      });

      commit(SEND_TOKENS_SUCCESS);
    } catch(e) {
      commit(SEND_TOKENS_FAIL);

      throw e;
    }
  },
};
