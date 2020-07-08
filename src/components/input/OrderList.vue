<template>
  <div class="list-group flex-grow-1 overflow-auto" :class="{ 'mb-3': orders.length > 0 }">
    <Order v-for="order in orders" :key="order.length" :order="order" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Order from './Order';

export default {
  computed: mapGetters('input', ['orders']),
  components: {
    Order,
  },
};
</script>
