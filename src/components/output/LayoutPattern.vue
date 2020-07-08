<template>
  <div class="list-group-item">
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('repetition') }}:</span>
        <span class="p-1">{{ layoutPattern.repetition }}</span>
      </div>
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('materialWaste') }}:</span>
        <span class="p-1">{{ round(layoutPattern.materialWaste, 2) }}</span>
      </div>
    </div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('cutWaste') }}:</span>
        <span class="p-1">{{ round(layoutPattern.cutWaste, 2) }}</span>
      </div>
      <div class="w-100 w-sm-50">
        <span class="p-1">{{ $t('totalWaste') }}:</span>
        <span class="p-1">{{ totalWaste }} {{ totalWastePercentage }}</span>
      </div>
    </div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100">
        <span class="p-1">{{ $t('cuts') }}:</span>
        <span v-for="(cut, index) in layoutPattern.cuts" :key="index" class="p-1">
          {{ cut.length }}&times;{{ cut.count }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { round } from '../../utils';

export default {
  props: ['stockLength', 'layoutPattern'],
  computed: {
    totalWaste: function() {
      const { materialWaste, cutWaste } = this.layoutPattern;
      if (
        typeof materialWaste !== 'number' ||
        isNaN(materialWaste) ||
        typeof cutWaste !== 'number' ||
        isNaN(cutWaste)
      ) {
        return '';
      }
      return materialWaste + cutWaste;
    },
    totalWastePercentage: function() {
      const { stockLength, totalWaste } = this;
      if (
        typeof stockLength !== 'number' ||
        isNaN(stockLength) ||
        typeof totalWaste !== 'number' ||
        isNaN(totalWaste)
      ) {
        return '';
      }
      return `(${round((totalWaste / stockLength) * 100, 2)}%)`;
    },
  },
  methods: {
    round,
  },
};
</script>
