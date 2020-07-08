<template>
  <div class="h-100 d-flex flex-column">
    <StockLengthInput />
    <KerfInput />
    <Orders />
    <b-button block variant="primary" @click="submit">
      {{ $t('solve') }}
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import StockLengthInput from './StockLengthInput';
import KerfInput from './KerfInput';
import Orders from './Orders';

export default {
  components: {
    StockLengthInput,
    KerfInput,
    Orders,
  },
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
};
</script>
