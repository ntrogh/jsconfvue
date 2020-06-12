import axios from 'axios';
import API from '../config';
import { parseList } from './action-utils';
import { GET_STATS } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    stats: [],
  },
  mutations: {
    [GET_STATS](state, stats) {
      state.stats = stats;
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getStatsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/stats`);
        const stats = parseList(response);
        commit(GET_STATS, stats);
        return stats;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    stats: (state) => state.stats,
  },
};
