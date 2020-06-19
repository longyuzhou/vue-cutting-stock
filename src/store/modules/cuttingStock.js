import { range, firstFitDecreasing, arrayEqualsIgnoreOrder, countOccurrences } from '../../utils';

const state = {
  stockLength: 600,
  kerf: 0.1,
  orders: [
    { length: 100, count: 10 },
    { length: 190, count: 10 },
    { length: 300, count: 10 },
  ],
  solution: {},
};

const getters = {
  stockLength: (state) => state.stockLength,
  kerf: (state) => state.kerf,
  orders: (state) => state.orders,
  solution: (state) => state.solution,
};

const actions = {
  setStockLength: ({ commit }, val) => commit('setStockLength', val),
  setKerf: ({ commit }, val) => commit('setKerf', val),
  addOrder: ({ commit }, order) => commit('addOrder', order),
  removeOrder: ({ commit }, length) => commit('removeOrder', length),
  solve: ({ commit }, { stockLength, kerf, orders }) => {
    const patterns = countOccurrences(
      firstFitDecreasing(
        stockLength,
        kerf,
        orders.reduce((p, c) => {
          range(c.count).forEach(() => p.push(c.length));
          return p;
        }, [])
      ),
      arrayEqualsIgnoreOrder
    ).map((item) => ({ cuts: item.item, repetition: item.count }));

    commit('setSolution', {
      stockLength,
      kerf,
      orders: orders.map((order) => ({ ...order })),
      layoutPatterns: patterns.map(({ repetition, cuts }) => {
        const totalParts = cuts.length;
        const totalPartsLength = cuts.reduce((prev, curr) => prev + curr, 0);
        const materialWaste = Math.max(stockLength - totalPartsLength - totalParts * kerf, 0);

        let cutWaste = (totalParts - 1) * kerf;
        cutWaste += Math.min(stockLength - totalPartsLength - cutWaste, kerf);

        return {
          repetition: repetition,
          cuts: countOccurrences(cuts).map((entry) => ({
            length: entry.item,
            count: entry.count,
          })),
          materialWaste: materialWaste,
          cutWaste: cutWaste,
        };
      }),
    });
  },
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
  setSolution: (state, solution) => {
    state.solution = solution;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
