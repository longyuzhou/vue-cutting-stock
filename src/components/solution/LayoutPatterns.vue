<template>
  <div>
    <strong>切割方案:</strong>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100 w-sm-50">
        <span class="p-1">所需材料:</span>
        <span class="p-1">{{ requiredStocks }}</span>
      </div>
      <div class="w-100 w-sm-50">
        <span class="p-1">余料总长:</span>
        <span class="p-1">{{ defaultValue(round(materialWaste, 2), '') }}</span>
      </div>
    </div>
    <div class="d-flex flex-column flex-sm-row">
      <div class="w-100 w-sm-50">
        <span class="p-1">切割损耗:</span>
        <span class="p-1">{{ defaultValue(round(cutWaste, 2), '') }}</span>
      </div>
      <div class="w-100 w-sm-50">
        <span class="p-1">损耗合计:</span>
        <span class="p-1">
          {{ defaultValue(round(totalWaste, 2), '') }}
          {{ totalWastePercentage }}
        </span>
      </div>
    </div>
    <ul class="list-group mb-3">
      <LayoutPattern
        v-for="(item, index) in layoutPatterns"
        :key="index"
        :stockLength="stockLength"
        :layoutPattern="item"
      />
    </ul>
  </div>
</template>

<script>
import { round } from '../../utils/';

import LayoutPattern from './LayoutPattern';

export default {
  name: 'LayoutPatterns',
  props: ['stockLength', 'orders', 'layoutPatterns'],
  computed: {
    requiredStocks: function() {
      const { layoutPatterns } = this;
      if (!Array.isArray(layoutPatterns)) {
        return '';
      }
      return layoutPatterns.reduce((acc, curr) => acc + curr.repetition, 0);
    },
    totalParts: function() {
      const { orders } = this;
      if (!Array.isArray(orders)) {
        return '';
      }
      return orders.reduce((prev, curr) => prev + curr.count, 0);
    },
    totalPartsLength: function() {
      const { orders } = this;
      if (!Array.isArray(orders)) {
        return '';
      }
      return orders.reduce((prev, curr) => prev + curr.length * curr.count, 0);
    },
    materialWaste: function() {
      const { layoutPatterns } = this;
      if (!Array.isArray(layoutPatterns)) {
        return '';
      }
      return layoutPatterns.reduce((acc, curr) => acc + curr.materialWaste * curr.repetition, 0);
    },
    cutWaste: function() {
      const { layoutPatterns } = this;
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
      const { totalWaste, requiredStocks, stockLength } = this;
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
