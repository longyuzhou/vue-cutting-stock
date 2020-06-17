import { range, firstFitDecreasing, same_array, round } from '../../utils';

const state = {
  material: 600,
  losses: 0.1,
  orders: [
    { length: 100, count: 10 },
    { length: 150, count: 10 },
    { length: 190, count: 10 },
    { length: 200, count: 10 },
    { length: 250, count: 10 },
    { length: 300, count: 10 },
    { length: 350, count: 10 },
    { length: 400, count: 10 },
    { length: 450, count: 10 },
    { length: 500, count: 10 },
    { length: 550, count: 10 },
  ],
  solution: {},
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

  solve: ({ commit }, { material, losses, orders }) => {
    // 订单二维数组转一维
    const detail = orders.reduce((p, c) => {
      range(c.count).forEach(() => p.push(c.length));
      return p;
    }, []);

    // 调用材料分割算法
    const patterns = [];
    firstFitDecreasing(material, losses, detail).forEach((solution) => {
      // 如果切割方案相同，则合并计数
      const item = patterns.find((item) => same_array(solution, item.solution));
      if (item) {
        item.count++;
      } else {
        patterns.push({ solution: solution, count: 1 });
      }
    });

    const solution = {
      orders: [],
      requiredStocks: 0,
      totalParts: 0,
      totalPartsLength: 0,
      materialWaste: 0,
      cutWaste: 0,
      totalWaste: 0,
      stockLength: material,
      kerf: losses,
      layoutPatterns: [],
    };

    orders.forEach((order) => {
      solution.orders.push({ ...order });
      solution.totalParts += order.count;
      solution.totalPartsLength += order.length * order.count;
    });

    const scale = 2;

    const materialWasteDetails = new Map();

    patterns.forEach((pattern, idx) => {
      solution.requiredStocks += pattern.count;

      let totalParts = pattern.solution.length;
      let totalPartsLength = 0;
      const cuts = [];
      pattern.solution.forEach((x) => {
        totalPartsLength += x;
        const cut = cuts.find((y) => x == y.length);
        if (cut) {
          cut.count++;
        } else {
          cuts.push({ length: x, count: 1 });
        }
      });

      let materialWaste = Math.max(material - totalPartsLength - totalParts * losses, 0);
      solution.materialWaste += materialWaste * pattern.count;
      materialWaste = round(materialWaste, scale);
      if (materialWaste > 0) {
        materialWasteDetails.set(
          materialWaste,
          (materialWasteDetails.get(materialWaste) || 0) + pattern.count
        );
      }

      let cutWaste = (totalParts - 1) * losses;
      cutWaste += Math.min(material - totalPartsLength - (totalParts - 1) * losses, losses);
      solution.cutWaste += cutWaste * pattern.count;

      const totalWaste = materialWaste + cutWaste;
      const totalWastePercentage = (totalWaste / material) * 100;
      solution.layoutPatterns.push({
        _key: idx,
        repetition: pattern.count,
        cuts: cuts,
        materialWaste: materialWaste,
        cutWaste: round(cutWaste, scale),
        totalWaste: round(totalWaste, scale),
        totalWastePercentage: round(totalWastePercentage, scale),
      });
    });

    solution.totalWaste = round(solution.materialWaste + solution.cutWaste, scale);
    solution.materialWaste = round(solution.materialWaste, scale);
    solution.cutWaste = round(solution.cutWaste, scale);
    solution.materialWasteDetails = [];
    materialWasteDetails.forEach((v, k) =>
      solution.materialWasteDetails.push({ length: k, count: v })
    );
    solution.materialWasteDetails.sort((a, b) => b.length - a.length);

    commit('setSolution', solution);
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
