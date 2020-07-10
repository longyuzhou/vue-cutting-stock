const state = {
  stockLength: 600,
  kerf: 0.1,
  orders: [
    { length: 100, quantity: 10 },
    { length: 190, quantity: 10 },
    { length: 300, quantity: 10 },
  ],
};

const getters = {
  stockLength: (state) => state.stockLength,
  kerf: (state) => state.kerf,
  orders: (state) => state.orders,
};

const actions = {
  setStockLength: ({ commit }, val) => commit('setStockLength', val),
  setKerf: ({ commit }, val) => commit('setKerf', val),
  addOrder: ({ commit }, order) => commit('addOrder', order),
  removeOrder: ({ commit }, order) => commit('removeOrder', order),
};

const mutations = {
  setStockLength: (state, val) => (state.stockLength = val),
  setKerf: (state, val) => (state.kerf = val),
  addOrder: (state, val) => {
    const idx = state.orders.findIndex((x) => x.length === val.length);
    let order = null;
    if (idx > -1) {
      order = state.orders[idx];
      state.orders.splice(idx, 1);
      order.quantity += val.quantity;
    } else {
      order = val;
    }
    state.orders.unshift(order);
  },
  removeOrder: (state, { length }) => {
    const idx = state.orders.findIndex((x) => x.length === length);
    state.orders.splice(idx, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
