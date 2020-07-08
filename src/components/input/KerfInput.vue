<template>
  <div class="form-group was-validated">
    <label>{{ $t('kerf') }}</label>
    <input
      type="number"
      class="form-control"
      required
      min="0"
      :max="stockLength"
      step="any"
      v-model.number="value"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('input', ['stockLength', 'kerf']),
    value: {
      get() {
        const { kerf } = this;
        return kerf;
      },
      set(value) {
        const { setKerf } = this;
        setKerf(value);
      },
    },
  },
  methods: mapActions('input', ['setKerf']),
};
</script>
