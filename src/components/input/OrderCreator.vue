<template>
  <div class="form-group was-validated">
    <label>{{ $t('orders') }}</label>
    <form class="d-flex flex-row" @submit="submit">
      <input
        type="number"
        class="form-control mr-2"
        :placeholder="$t('length')"
        :required="required"
        min="0"
        step="any"
        :max="stockLength"
        v-model.number="length"
      />

      <input
        type="number"
        class="form-control mr-2"
        :placeholder="$t('quantity')"
        :required="required"
        min="1"
        v-model.number="quantity"
      />

      <input type="submit" class="btn btn-outline-primary" :value="$t('add')" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      length: '',
      quantity: '',
    };
  },
  computed: {
    ...mapGetters('input', ['stockLength']),
    required: function() {
      const { length, quantity } = this;
      return length !== '' || quantity !== '';
    },
  },
  methods: {
    ...mapActions('input', ['addOrder']),
    submit: function(e) {
      e.preventDefault();

      const { length, quantity, addOrder } = this;
      if (
        typeof length !== 'number' ||
        length <= 0 ||
        typeof quantity !== 'number' ||
        quantity <= 0
      ) {
        return;
      }
      addOrder({ length, quantity });

      this.length = '';
      this.quantity = '';
      e.target[0].focus();
    },
  },
};
</script>
