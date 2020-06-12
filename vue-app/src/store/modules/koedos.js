import axios from 'axios';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import {
  GET_KOEDOS,
  ADD_KOEDO,
  DELETE_KOEDO,
  UPDATE_KOEDO,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    koedos: [],
  },
  mutations: {
    [ADD_KOEDO](state, koedo) {
      state.koedos.unshift(koedo);
    },
    [UPDATE_KOEDO](state, koedo) {
      const index = state.koedos.findIndex((v) => v.id === koedo.id);
      state.koedos.splice(index, 1, koedo);
      state.koedos = [...state.koedos];
    },
    [GET_KOEDOS](state, koedos) {
      state.koedos = koedos;
    },
    [DELETE_KOEDO](state, koedo) {
      state.koedos = [...state.koedos.filter((p) => p.id !== koedo.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getKoedosAction({ commit }) {
      try {
        const response = await axios.get(`${API}/koedos`);
        const koedos = parseList(response);
        commit(GET_KOEDOS, koedos);
        return koedos;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async deleteKoedoAction({ commit }, koedo) {
      try {
        const response = await axios.delete(`${API}/koedos/${koedo.id}`);
        parseItem(response, 200);
        commit(DELETE_KOEDO, koedo);
        return null;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async updateKoedoAction({ commit }, koedo) {
      try {
        const response = await axios.put(
          `${API}/koedos/${koedo.id}`,
          koedo,
        );
        const updatedkoedo = parseItem(response, 200);
        commit(UPDATE_KOEDO, updatedkoedo);
        return updatedkoedo;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async addKoedoAction({ commit }, koedo) {
      try {
        const response = await axios.post(`${API}/koedos`, koedo);
        const addedKoedo = parseItem(response, 201);
        commit(ADD_KOEDO, addedKoedo);
        return addedKoedo;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    koedos: (state) => state.koedos,
  },
};
