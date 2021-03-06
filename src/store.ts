import Vue from 'vue';
import Vuex from 'vuex';

import GraphQLClient from './utils/graphql';
import {
  GET_LINEUP,
  UPDATE_PLAYER,
  LOGIN_PLAYER,
} from './utils/queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineup: {},
    change: false,
    user: {},
    client: null,
    token: null,
    error: null,
  },
  mutations: {
    setActiveUser(state, { client, token, user, lineup }) {
      state.client = client;
      state.token = token;
      state.user = {
        ...user,
        lineup: lineup._id,
      };
      state.lineup = lineup;
    },
    setLineup(state, lineup) {
      state.lineup = lineup;
    },
    toggleStatus(state:any, { dayIndex, playerIndex }) {
      const curr = state.lineup.players[playerIndex].doodle[dayIndex];
      const newValue = curr === 2 ? 0 : curr + 1;
      if (!state.change) {
        state.change = true;
      }
      Vue.set(state.lineup.players[playerIndex].doodle, dayIndex, newValue);
    },
    updateDoodle_SUCCESS(state) {
      state.change = false;
    },
    updateDefaultAvailability_SUCCESS(state, user) {
      state.user = {
        ...state.user,
        defaultAvailability: user.defaultAvailability,
      };
    },
    displayError(state, e) {
      state.user = {};
      state.lineup = {};
      state.error = e;
      console.error(e);
    },
  },
  actions: {
    async loginPlayer({ commit, state }, token) {
      try {
        const client = new GraphQLClient(token);
        const response = await client.requester.query({
          query: LOGIN_PLAYER,
        });
        const { lineup, ...user } = response.data.playerLogin;
        lineup.players.splice(user.displayOrder - 1, 0, user);
        lineup.players = lineup.players.filter(Boolean);
        commit('setActiveUser', { client, token, user, lineup });
        // await this.dispatch('getLineup');
      } catch (e) {
        commit('displayError', e);
      }
    },
    async getLineup({ commit, state }:any) {
      try {
        const response = await state.client.requester.query({
          query: GET_LINEUP,
          variables: {
            id: '5cd7f8ee388c5fc85e0eee7e',
          },
        });
        commit('setLineup', response.data.lineupById);
      } catch (e) {
        commit('displayError', e);
      }
    },
    async updateDoodle({ commit, state }:any) {
      try {
        const player = state.lineup.players.find((p:any) => p._id === state.user._id);
        const response = await state.client.requester.mutate({
          mutation: UPDATE_PLAYER,
          variables: {
            record: {
              _id: player._id,
              doodle: player.doodle,
            },
          },
        });
        commit('updateDoodle_SUCCESS');
      } catch (e) {
        commit('displayError', e);
      }
    },
    async changeDefaultAvailability({ commit, state }:any) {
      try {
        const curr = state.user.defaultAvailability;
        const newValue = curr === 2 ? 0 : curr + 1;
        const response = await state.client.requester.mutate({
          mutation: UPDATE_PLAYER,
          variables: {
            record: {
              _id: state.user._id,
              defaultAvailability: newValue,
            },
          },
        });
        commit('updateDefaultAvailability_SUCCESS', response.data.playerUpdateById.record);
      } catch (e) {
        commit('displayError', e);
      }
    },
    toggleStatus({ commit }, { dayIndex, playerIndex }) {
      commit('toggleStatus', { dayIndex, playerIndex });
    },
  },
});
