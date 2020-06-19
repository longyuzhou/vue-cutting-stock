<template>
  <tr>
    <td class="text-nowrap">{{ layoutPattern.repetition }}</td>
    <td>
      <span v-for="(cut, index) in layoutPattern.cuts" :key="index" class="p-1">
        {{ cut.length }}&times;{{ cut.count }}
      </span>
    </td>
    <td class="text-nowrap">{{ round(layoutPattern.materialWaste, 2) }}</td>
    <td class="text-nowrap">{{ round(layoutPattern.cutWaste, 2) }}</td>
    <td class="text-nowrap">
      {{ totalWaste }}
      {{ totalWastePercentage }}
    </td>
  </tr>
</template>

<script>
import { round } from '../../utils';

export default {
  name: 'LayoutPattern',
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
