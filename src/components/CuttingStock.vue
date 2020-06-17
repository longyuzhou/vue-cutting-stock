<template>
  <div class="h-100 d-flex flex-row">
    <form
      class="h-100 d-flex flex-column d-print-none"
      style="width: 360px; padding: 10px"
      @submit="onSubmit"
    >
      <div class="form-group was-validated">
        <label>材料长度</label>
        <input
          type="number"
          class="form-control"
          required
          min="0"
          step="any"
          v-model.number="material"
        />
      </div>
      <div class="form-group was-validated">
        <label>切割损耗</label>
        <input type="number" class="form-control" min="0" step="any" v-model.number="losses" />
      </div>
      <div class="form-group">
        <label>订单</label>
        <AddOrder />
      </div>
      <div class="form-group flex-grow-1 overflow-auto">
        <Orders />
      </div>
      <div>
        <input type="submit" class="btn btn-primary btn-block" value="计算" />
      </div>
    </form>
    <div class="screen-flex-grow-1 screen-overflow-auto">
      <Solution />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Orders from '../components/Orders';
import AddOrder from './AddOrder';
import Solution from './Solution';
import { error, StringBuffer } from '../utils';

export default {
  name: 'CuttingStock',
  computed: {
    material: {
      get() {
        return this.$store.state.cuttingStock.material;
      },
      set(val) {
        if (typeof val !== 'number') {
          val = null;
        }
        this.setMaterial(val);
      },
    },
    losses: {
      get() {
        return this.$store.state.cuttingStock.losses;
      },
      set(val) {
        if (typeof val !== 'number') {
          val = 0;
        }
        this.setLosses(val);
      },
    },
    ...mapGetters(['orders']),
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const { material, losses, orders } = this;
      if (typeof material !== 'number' || material <= 0) {
        error('材料长度输入不正确');
        return;
      }
      if (typeof losses !== 'number' || losses < 0) {
        error('切割损耗输入不正确');
        return;
      }
      if (material <= losses) {
        error(`材料长度(${material})应大于切割损耗(${losses})`);
        return;
      }
      const invalidOrders = orders.filter((order) => order.length > material);
      if (invalidOrders.length > 0) {
        const sb = new StringBuffer();
        sb.append('尺寸(')
          .append(invalidOrders.map((order) => order.length).join(', '))
          .append(')不得大于材料长度(')
          .append(material)
          .append(')');
        error(sb.toString());
        return;
      }
      this.solve({ material, losses, orders });
    },
    ...mapActions(['setMaterial', 'setLosses', 'solve']),
  },
  components: {
    Orders,
    AddOrder,
    Solution,
  },
};
</script>

<style scoped>
@font-face {
  font-family: sarasa-gothic;
  src: url(../assets/sarasa-mono-sc-regular.ttf) format('opentype');
}
textarea {
  font-family: sarasa-gothic;
  background-color: white;
  font-size: 17px;
  line-height: 18px;
}
@media screen {
  .screen-flex-grow-1 {
    flex-grow: 1 !important;
  }
  .screen-overflow-auto {
    overflow: auto;
  }
}
</style>
