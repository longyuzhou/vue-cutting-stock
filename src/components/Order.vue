<template>
  <a class="list-group-item d-flex justify-content-between align-items-center">
    {{ order.length }} &times; {{ order.count }}
    <button class="btn btn-outline-danger" @click="removeOrder(order.length)">移除</button>
  </a>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Order',
  props: ['order'],
  methods: {
    ...mapActions(['removeOrder']),
  },
};
</script>
