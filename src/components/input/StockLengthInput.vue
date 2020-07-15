<template>
  <div class="form-group was-validated">
    <label>{{ $t('stockLength') }}</label>
    <input type="number" class="form-control" required min="0" step="any" v-model.number="value" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('input', ['stockLength']),
    value: {
      get() {
        const { stockLength } = this;
        return stockLength;
      },
      set(value) {
        const { setStockLength } = this;
        setStockLength(value);
      },
    },
  },
  methods: mapActions('input', ['setStockLength']),
};
</script>
