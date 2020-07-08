<template>
  <div
    class="d-flex flex-column flex-lg-grow-1 overflow-hidden"
    :class="{ 'mb-3': orders.length > 0 }"
  >
    <OrderCreator />

    <ul class="list-group overflow-auto">
      <Order v-for="order in orders" :key="order.length" :order="order" />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import OrderCreator from './OrderCreator';
import Order from './Order';

export default {
  computed: mapGetters('input', ['orders']),
  components: {
    OrderCreator,
    Order,
  },
};
</script>
