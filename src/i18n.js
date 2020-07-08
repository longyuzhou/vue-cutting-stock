import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: {
    stockLength: 'Stock length',
    kerf: 'Kerf',
    length: 'Length',
    quantity: 'Quantity',
    add: 'Add',
    remove: 'Remove',
    solve: 'Solve',
    print: 'Print',
    solution: 'Solution',
    orders: 'Orders',
    requiredStocks: 'Required stocks',
    materialWaste: 'Material waste',
    cutWaste: 'Cut waste',
    totalWaste: 'Total waste',
    repetition: 'Repetition',
    layoutPatterns: 'Layout patterns',
    materialWasteDetail: 'Material waste details',
    cuts: 'Cuts',
  },
  zh: {
    stockLength: '材料长度',
    kerf: '切割损耗',
    length: '长度',
    quantity: '数量',
    add: '添加',
    remove: '移除',
    solve: '计算',
    print: '打印',
    orders: '订单',
    requiredStocks: '所需材料',
    materialWaste: '余料',
    cutWaste: '切割损耗',
    totalWaste: '损耗合计',
    repetition: '次数',
    layoutPatterns: '切割方案',
    materialWasteDetail: '余料详情',
    cuts: '切割方案',
  },
};

export default new VueI18n({
  locale: 'zh',
  messages,
});
