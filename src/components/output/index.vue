<template>
  <div class="flex-grow-1 overflow-auto p-2 pl-lg-0">
    <Orders />
    <LayoutPatterns />
    <MaterialWastes />
    <div class="sticky-top text-center d-print-none">
      <button type="button" class="btn btn-lg btn-link" onclick="window.print()">
        {{ $t('print') }}
      </button>
    </div>
  </div>
</template>

<script>
import Orders from './Orders';
import LayoutPatterns from './LayoutPatterns';
import MaterialWastes from './MaterialWastes';

export default {
  components: {
    Orders,
    LayoutPatterns,
    MaterialWastes,
  },
};
</script>
