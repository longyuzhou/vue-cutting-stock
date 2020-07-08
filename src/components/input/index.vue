<template>
  <div class="h-100 d-flex flex-column">
    <StockLengthInput />
    <KerfInput />
    <OrderCreator />
    <OrderList />
    <button class="btn btn-block btn-primary" @click="submit">
      {{ $t('solve') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StockLengthInput from './StockLengthInput';
import KerfInput from './KerfInput';
import OrderCreator from './OrderCreator';
import OrderList from './OrderList';

export default {
  computed: mapGetters('input', ['stockLength', 'kerf', 'orders']),
  methods: {
    submit() {
      const { checkForm } = this;
      if (!checkForm()) {
        return;
      }

      const { stockLength, kerf, orders } = this;
      this.$emit('submit', { stockLength, kerf, orders });
    },
    checkForm() {
      const { stockLength, kerf, orders } = this;
      if (typeof stockLength !== 'number' || stockLength <= 0) {
        return false;
      }
      if (typeof kerf !== 'number' || kerf < 0 || kerf > stockLength) {
        return false;
      }
      if (!Array.isArray(orders)) {
        return false;
      }
      for (let i = 0; i < orders.length; i++) {
        const { length } = orders[i];
        if (typeof length !== 'number' || length <= 0 || length > stockLength) {
          return false;
        }
      }

      return true;
    },
  },
  components: {
    StockLengthInput,
    KerfInput,
    OrderCreator,
    OrderList,
  },
};
</script>
