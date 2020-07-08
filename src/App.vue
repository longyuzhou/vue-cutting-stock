<template>
  <div id="app" class="vh-100 d-lg-flex d-flex-column">
    <div class="input d-flex flex-column p-2 d-print-none">
      <Input @submit="submit" />
    </div>

    <div class="d-flex flex-column flex-grow-1">
      <Output />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Input from './components/input';
import Output from './components/output';
import { solve } from './utils';

export default {
  components: {
    Input,
    Output,
  },
  methods: {
    ...mapActions('output', ['setData']),
    submit({ stockLength, kerf, orders }) {
      const { setData } = this;
      setData(solve(stockLength, kerf, orders));
    },
  },
};
</script>

<style scoped>
@media (min-width: 992px) {
  .input {
    width: 350px;
  }
}
</style>
