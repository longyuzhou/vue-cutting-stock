<template>
  <div class="list-group">
    <Order
      v-for="order in orders"
      :key="order.length"
      :order="order"
      @removeOrder="onRemoveOrder"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Order from './Order';

export default {
  name: 'Orders',
  computed: mapGetters(['orders']),
  methods: {
    ...mapActions(['removeOrder']),
    onRemoveOrder(length) {
      this.removeOrder(length);
    },
  },
  components: {
    Order,
  },
};
</script>

<style scoped></style>
