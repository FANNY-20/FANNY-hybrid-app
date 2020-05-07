const SEND_TOKENS_REQUEST = "SEND_TOKENS_REQUEST";
const SEND_TOKENS_SUCCESS = "SEND_TOKENS_SUCCESS";
const SEND_TOKENS_FAIL = "SEND_TOKENS_FAIL";

export const state = () => ({
  isSendingTokens: false,
});

export const getters = {};

export const mutations = {
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
