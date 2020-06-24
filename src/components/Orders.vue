<template>
  <div class="flex-lg-grow-1 overflow-auto">
    <div class="list-group">
      <Order v-for="order in orders" :key="order.length" :order="order" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Order from './Order';

export default {
  name: 'Orders',
  computed: mapGetters(['orders']),
  components: {
    Order,
  },
};
</script>
