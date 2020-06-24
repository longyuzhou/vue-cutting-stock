<template>
  <div class="h-100 d-flex flex-column flex-lg-row">
    <div class="input d-flex flex-column flex-lg-grow p-2 d-print-none">
      <div class="form-group was-validated">
        <label>材料长度</label>
        <input
          type="number"
          class="form-control"
          required
          min="0"
          step="any"
          v-model.number="stockLength"
        />
      </div>
      <div class="form-group was-validated">
        <label>切割损耗</label>
        <input type="number" class="form-control" min="0" step="any" v-model.number="kerf" />
      </div>
      <div class="form-group">
        <label>订单</label>
        <AddOrder />
      </div>
      <Orders />
      <div :class="orders.length > 0 ? 'mt-3' : ''" />
      <button class="btn btn-primary btn-block" @click="onSolve">
        计算
      </button>
    </div>
    <div class="output d-flex flex-column flex-grow-1">
      <Solution />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { error, StringBuffer } from '../utils';

import AddOrder from '../components/AddOrder';
import Orders from '../components/Orders';
import Solution from './solution/Solution';

export default {
  name: 'CuttingStock',
  computed: {
    ...mapGetters(['orders']),
    stockLength: {
      get() {
        return this.$store.state.cuttingStock.stockLength;
      },
      set(val) {
        if (typeof val !== 'number') {
          val = null;
        }
        this.setStockLength(val);
      },
    },
    kerf: {
      get() {
        return this.$store.state.cuttingStock.kerf;
      },
      set(val) {
        if (typeof val !== 'number') {
          val = 0;
        }
        this.setKerf(val);
      },
    },
  },
  methods: {
    ...mapActions(['setStockLength', 'setKerf', 'solve']),
    onSolve() {
      const { stockLength, kerf, orders } = this;
      if (typeof stockLength !== 'number' || stockLength <= 0) {
        error('材料长度输入不正确');
        return;
      }
      if (typeof kerf !== 'number' || kerf < 0) {
        error('切割损耗输入不正确');
        return;
      }
      if (stockLength <= kerf) {
        error(`材料长度(${stockLength})应大于切割损耗(${kerf})`);
        return;
      }
      const invalidOrders = orders.filter((order) => order.length > stockLength);
      if (invalidOrders.length > 0) {
        const sb = new StringBuffer();
        sb.append('尺寸(')
          .append(invalidOrders.map((order) => order.length).join(', '))
          .append(')不得大于材料长度(')
          .append(stockLength)
          .append(')');
        error(sb.toString());
        return;
      }
      this.solve({ stockLength, kerf, orders });
    },
  },
  components: {
    AddOrder,
    Orders,
    Solution,
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .input {
    width: 350px;
  }
}
</style>
