<template>
  <div class="flex-grow-1 overflow-auto p-2 pl-lg-0">
    <Orders :stockLength="solution.stockLength" :kerf="solution.kerf" :orders="solution.orders" />
    <LayoutPatterns
      :stockLength="solution.stockLength"
      :orders="solution.orders"
      :layoutPatterns="solution.layoutPatterns"
    />
    <MaterialWastes :layoutPatterns="solution.layoutPatterns" />
    <div class="text-center d-print-none">
      <button type="button" class="btn btn-lg btn-link" @click="print">
        打印
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Orders from './Orders';
import LayoutPatterns from './LayoutPatterns';
import MaterialWastes from './MaterialWastes';

export default {
  name: 'Solution',
  computed: {
    ...mapGetters(['solution']),
  },
  methods: {
    print() {
      window.print();
    },
  },
  components: {
    Orders,
    LayoutPatterns,
    MaterialWastes,
  },
};
</script>
