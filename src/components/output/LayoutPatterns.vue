<template>
  <div>
    <strong>{{ $t('layoutPatterns') }}:</strong>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100">
        <span class="p-1">{{ $t('requiredStocks') }}:</span>
        <span class="p-1">{{ requiredStocks }}</span>
      </div>
      <div class="w-100">
        <span class="p-1">{{ $t('materialWaste') }}:</span>
        <span class="p-1">{{ defaultValue(round(materialWaste, 2), '') }}</span>
      </div>
    </div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100">
        <span class="p-1">{{ $t('cutWaste') }}:</span>
        <span class="p-1">{{ defaultValue(round(cutWaste, 2), '') }}</span>
      </div>
      <div class="w-100">
        <span class="p-1">{{ $t('totalWaste') }}:</span>
        <span class="p-1">
          {{ defaultValue(round(totalWaste, 2), '') }}
          {{ totalWastePercentage }}
        </span>
      </div>
    </div>
    <table class="table table-striped table-bordered">
      <LayoutPattern
        v-for="(item, index) in data.layoutPatterns"
        :key="index"
        :stockLength="data.stockLength"
        :layoutPattern="item"
      />
    </table>
  </div>
</template>

<script>
import { round } from '../../utils/';

import LayoutPattern from './LayoutPattern';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('output', ['data']),
    requiredStocks: function() {
      const {
        data: { layoutPatterns },
      } = this;
      if (!Array.isArray(layoutPatterns)) {
        return '';
      }
      return layoutPatterns.reduce((acc, curr) => acc + curr.repetition, 0);
    },
    materialWaste: function() {
      const {
        data: { layoutPatterns },
      } = this;
      if (!Array.isArray(layoutPatterns)) {
        return '';
      }
      return layoutPatterns.reduce((acc, curr) => acc + curr.materialWaste * curr.repetition, 0);
    },
    cutWaste: function() {
      const {
        data: { layoutPatterns },
      } = this;
      if (!Array.isArray(layoutPatterns)) {
        return '';
      }
      return layoutPatterns.reduce((acc, curr) => acc + curr.cutWaste * curr.repetition, 0);
    },
    totalWaste: function() {
      const { materialWaste, cutWaste } = this;
      return materialWaste + cutWaste;
    },
    totalWastePercentage: function() {
      const {
        totalWaste,
        requiredStocks,
        data: { stockLength },
      } = this;
      if (
        typeof totalWaste !== 'number' ||
        isNaN(totalWaste) ||
        typeof requiredStocks !== 'number' ||
        isNaN(requiredStocks) ||
        typeof stockLength !== 'number' ||
        isNaN(stockLength)
      ) {
        return '';
      }
      return `(${round((totalWaste / requiredStocks / stockLength || 0) * 100, 2)}%)`;
    },
  },
  methods: {
    round,
    defaultValue: function(value, orElse) {
      if (typeof value === 'undefined' || isNaN(value)) {
        return orElse;
      }
      return value;
    },
  },
  components: { LayoutPattern },
};
</script>
