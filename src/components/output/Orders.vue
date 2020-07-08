<template>
  <div>
    <strong>{{ $t('orders') }}</strong>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('stockLength') }}:</span>
        <span class="p-1">{{ data.stockLength }}</span>
      </div>
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('kerf') }}:</span>
        <span class="p-1">{{ data.kerf }}</span>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>{{ $t('length') }}</th>
          <th>{{ $t('quantity') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.length">
          <td>{{ order.length }}</td>
          <td>{{ order.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('output', ['data']),
    orders: function() {
      const {
        data: { orders },
      } = this;

      if (Array.isArray(orders)) {
        orders.sort((a, b) => b.length - a.length);
      }
      return orders;
    },
  },
};
</script>
