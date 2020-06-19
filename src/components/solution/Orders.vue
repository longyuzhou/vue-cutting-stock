<template>
  <div>
    <strong>订单</strong>
    <div class="row">
      <div class="col-2">材料长度:</div>
      <div class="col-2">{{ stockLength }}</div>
      <div class="col-2">切割损耗:</div>
      <div class="col-2">{{ kerf }}</div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>长度</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedOrders" :key="item.length">
          <td>{{ item.length }}</td>
          <td>{{ item.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  props: ['stockLength', 'kerf', 'orders'],
  computed: {
    sortedOrders: function() {
      const { orders } = this;
      if (Array.isArray(orders)) {
        orders.sort((a, b) => b.length - a.length);
      }
      return orders;
    },
  },
};
</script>
