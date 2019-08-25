import Vue from 'vue';
import Vuex from 'vuex';
import gql from 'graphql-tag';

import GraphQLClient from './utils/graphql';
import {
  GET_LINEUP,
  UPDATE_PLAYER,
  LOGIN_PLAYER
} from './utils/queries';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lineup: {},
    change: false,
    user: {},
    client: null,
    token: null
  },
  mutations: {
    setActiveUser(state, {client, token, user}) {
      state.client = client;
      state.token = token;
      state.user = user;
    },
    setLineup(state, lineup) {
      state.lineup = lineup
    },
    toggleStatus(state:any, {dayIndex, playerIndex}) {
      let curr = state.lineup.players[playerIndex].doodle[dayIndex]
      let newValue = curr === 2 ? 0 : ++curr;
      if (!state.change)
        state.change = true
      Vue.set(state.lineup.players[playerIndex].doodle, dayIndex, newValue);
    },
    updateDoodle_SUCCESS(state) {
      state.change = false;
    }
  },
  actions: {
    async loginPlayer({commit, state}, token) {
      const client = new GraphQLClient(token);
      const response = await client.requester.query({
        query: LOGIN_PLAYER
      })
      await commit('setActiveUser', {client, token, user: response.data.playerLogin})
      await this.dispatch('getLineup');
    },
    async getLineup({commit, state}) {
      const response = await state.client.requester.query({
        query: GET_LINEUP,
        variables: {
          id: '5cd7f8ee388c5fc85e0eee7e'
        }
      });
      commit('setLineup', response.data.lineupById)
    },
    async updateDoodle({commit, state}:any, playerId) {
      const player = state.lineup.players.find((p:any) => p._id === playerId)
      try {
        const response = await state.client.requester.mutate({
          mutation: UPDATE_PLAYER,
          variables: {
            record: {
              _id: playerId,
              doodle: player.doodle
            }
          }
        })
        commit('updateDoodle_SUCCESS')
      } catch(e) {
        console.log(e)
      }
    },
    toggleStatus({commit}, {dayIndex, playerIndex}) {
      
      commit('toggleStatus', {dayIndex, playerIndex})
    },
  },
});
