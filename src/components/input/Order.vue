<template>
  <div class="list-group-item d-flex justify-content-between align-items-center">
    <b-icon icon="check" font-scale="2" class="text-success" :class="{ 'd-none': !valid }" />
    <b-icon icon="exclamation" font-scale="2" class="text-danger" :class="{ 'd-none': valid }" />
    <span class="flex-grow-1 ml-1">{{ order.length }} &times; {{ order.quantity }}</span>
    <button class="btn btn-outline-danger" @click="removeOrder(order)">
      {{ $t('remove') }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['order'],
  computed: {
    ...mapGetters('input', ['stockLength']),
    valid() {
      const { stockLength } = this;
      const { length } = this.order;
      return typeof length === 'number' && 0 < length && length <= stockLength;
    },
  },
  methods: {
    ...mapActions('input', ['removeOrder']),
  },
};
</script>
