import utils from '../../utils';

const state = {
  material: 600,
  losses: 0.1,
  orders: [
    { length: 100, count: 10 },
    { length: 190, count: 10 },
    { length: 300, count: 10 },
  ],
  solution: '',
};

const getters = {
  material: (state) => state.material,
  losses: (state) => state.losses,
  orders: (state) => state.orders,
  solution: (state) => state.solution,
};

const actions = {
  setMaterial: ({ commit }, val) => commit('setMaterial', val),
  setLosses: ({ commit }, val) => commit('setLosses', val),
  addOrder: ({ commit }, order) => commit('addOrder', order),
  removeOrder: ({ commit }, length) => commit('removeOrder', length),
  findSolution: ({ commit }, { material, losses, orders }) => {
    const solution = utils.cut_and_print(material, losses, orders);
    commit('updateSolution', solution);
  },
};

const mutations = {
  setMaterial: (state, val) => (state.material = val),
  setLosses: (state, val) => (state.losses = val),
  addOrder: (state, val) => {
    const idx = state.orders.findIndex((x) => x.length === val.length);
    let order = null;
    if (idx > -1) {
      order = state.orders[idx];
      state.orders.splice(idx, 1);
      order.count += val.count;
    } else {
      order = val;
    }
    state.orders.unshift(order);
  },
  removeOrder: (state, length) => {
    const idx = state.orders.findIndex((x) => x.length === length);
    state.orders.splice(idx, 1);
  },
  updateSolution: (state, solution) => {
    state.solution = solution;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
