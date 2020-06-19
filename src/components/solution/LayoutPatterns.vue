<template>
  <div>
    <strong>切割方案:</strong>
    <div class="row">
      <div class="col-2">所需材料:</div>
      <div class="col-2">{{ requiredStocks }}</div>
    </div>
    <div class="row">
      <div class="col-2">余料总长:</div>
      <div class="col-2">{{ round(materialWaste, 2) || '' }}</div>
      <div class="col-2">切割损耗:</div>
      <div class="col-2">{{ round(cutWaste, 2) || '' }}</div>
      <div class="col-2">损耗合计:</div>
      <div class="col-2">{{ totalWaste }}{{ totalWastePercentage }}</div>
    </div>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th class="text-nowrap">次数</th>
          <th class="text-nowrap">切割方法</th>
          <th class="text-nowrap">余料</th>
          <th class="text-nowrap">切割损耗</th>
          <th class="text-nowrap">损耗合计</th>
        </tr>
      </thead>
      <tbody>
        <LayoutPattern
          v-for="(item, index) in layoutPatterns"
          :key="index"
          :stockLength="stockLength"
          :layoutPattern="item"
        />
      </tbody>
    </table>
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
      return `(${round((totalWaste / requiredStocks / stockLength) * 100, 2)}%)`;
    },
  },
  methods: {
    round,
  },
  components: { LayoutPattern },
};
</script>
