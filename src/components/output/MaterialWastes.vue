<template>
  <div>
    <strong>{{ $t('materialWasteDetail') }}:</strong>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>{{ $t('length') }}</th>
          <th>{{ $t('quantity') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in materialWastes" :key="index">
          <td>{{ round(item.length, 2) }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { round } from '../../utils';

export default {
  computed: {
    ...mapGetters('output', ['data']),
    materialWastes: function() {
      const {
        data: { layoutPatterns },
      } = this;
      if (!Array.isArray(layoutPatterns)) {
        return [];
      }

      const result = [];
      layoutPatterns.forEach(({ repetition, materialWaste }) => {
        if (materialWaste <= 0) {
          return;
        }
        const entry = result.find((entry) => entry.length === materialWaste);
        if (entry) {
          entry.quantity += repetition;
        } else {
          result.push({ length: materialWaste, quantity: repetition });
        }
      });
      result.sort((a, b) => b.length - a.length);
      return result;
    },
  },
  methods: {
    round,
  },
};
</script>
