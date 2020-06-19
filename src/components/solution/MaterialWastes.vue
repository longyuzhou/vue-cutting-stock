<template>
  <div>
    <strong>余料详情:</strong>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>长度</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in materialWastes" :key="index">
          <td>{{ item.length }}</td>
          <td>{{ item.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MaterialWastes',
  props: ['layoutPatterns'],
  computed: {
    materialWastes: function() {
      const { layoutPatterns } = this;
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
          entry.count += repetition;
        } else {
          result.push({ length: materialWaste, count: repetition });
        }
      });
      result.sort((a, b) => b.length - a.length);
      return result;
    },
  },
};
</script>
