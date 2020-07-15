<template>
  <div id="app" class="vh-100 d-lg-flex d-flex-column">
    <div class="input p-2 d-print-none">
      <Input @submit="submit" />
    </div>

    <div class="flex-grow-1 overflow-auto">
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
