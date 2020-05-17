<template>
  <a class="list-group-item d-flex justify-content-between align-items-center">
    {{ order.length }} &times; {{ order.count }}
    <button class="btn btn-danger" @click="$emit('removeOrder', order.length)">移除</button>
  </a>
</template>

<script>
export default {
  name: 'Order',
  props: ['order'],
};
</script>

<style scoped></style>
