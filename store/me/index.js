import { v4 as uuidv4 } from "uuid";

const SET_UUID = "SET_UUID";

export const state = () => ({
  uuid: null,
});

export const getters = {};

export const mutations = {
  [SET_UUID](state, value) {
    state.uuid = value;
  },
};

export const actions = {
  renewUuid({ commit }) {
    const uuid = uuidv4();

    commit(SET_UUID, uuid);

    return uuid;
  },
};
