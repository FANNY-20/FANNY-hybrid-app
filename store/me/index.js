import { v4 as uuidv4 } from "uuid";

const SET_PUBLIC_UUID = "SET_PUBLIC_UUID";
const SET_PRIVATE_UUID = "SET_PRIVATE_UUID";

export const state = () => ({
  publicUuid: null, // Shareable with server and peers
  privateUuid: null, // Shareable with peers only
});

export const getters = {};

export const mutations = {
  [SET_PUBLIC_UUID](state, value) {
    state.publicUuid = value;
  },
  [SET_PRIVATE_UUID](state, value) {
    state.privateUuid = value;
  },
};

export const actions = {
  renewUuids({ commit }) {
    const publicUuid = uuidv4();
    const privateUuid = uuidv4();

    commit(SET_PUBLIC_UUID, publicUuid);
    commit(SET_PRIVATE_UUID, privateUuid);

    return {
      publicUuid,
      privateUuid,
    };
  },
};
