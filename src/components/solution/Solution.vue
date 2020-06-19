<template>
  <div class="container-fluid pt-2">
    <div class="sticky-top text-right d-print-none" style="height: 0px">
      <button type="button" class="btn btn-info mt-1" @click="print">
        打印
      </button>
    </div>
    <Orders :stockLength="solution.stockLength" :kerf="solution.kerf" :orders="solution.orders" />
    <LayoutPatterns
      :stockLength="solution.stockLength"
      :orders="solution.orders"
      :layoutPatterns="solution.layoutPatterns"
    />
    <MaterialWastes :layoutPatterns="solution.layoutPatterns" />
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
