<template>
  <div class="container">
    <div class="sticky-top text-right d-print-none">
      <button type="button" class="btn btn-light" @click="saveAsPdf">打印</button>
    </div>
    <div class="title">订单:</div>
    <table class="table">
      <thead>
        <tr>
          <th>长度</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in solution.orders" :key="order.length">
          <td>{{ order.length }}</td>
          <td>{{ order.count }}</td>
        </tr>
      </tbody>
    </table>
    <div class="title">切割方案:</div>
    <div class="row">
      <div class="col-2">所需材料:</div>
      <div class="col-2">{{ solution.requiredStocks }}</div>
    </div>
    <div class="row">
      <div class="col-2">余料总长:</div>
      <div class="col-2">{{ solution.materialWaste }}</div>
      <div class="col-2">切割损耗:</div>
      <div class="col-2">{{ solution.cutWaste }}</div>
      <div class="col-2">损耗合计:</div>
      <div class="col-2">
        {{ solution.totalWaste }} {{ displayPercentage(totalWastePercentage) }}
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>次数</th>
          <th>切割方法</th>
          <th>余料</th>
          <th>切割损耗</th>
          <th>损耗合计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pattern in solution.layoutPatterns" :key="pattern._key">
          <td>{{ pattern.repetition }}</td>
          <td>
            <span v-for="cut in pattern.cuts" :key="cut.length">
              {{ cut.length }}&times;{{ cut.count }}
            </span>
          </td>
          <td>{{ pattern.materialWaste }}</td>
          <td>{{ pattern.cutWaste }}</td>
          <td>
            {{ pattern.totalWaste }}
            {{ displayPercentage(pattern.totalWastePercentage) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="title">余料详情:</div>
    <table class="table">
      <thead>
        <tr>
          <th>长度</th>
          <th>数量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="detail in solution.materialWasteDetails" :key="detail._key">
          <td>{{ detail.length }}</td>
          <td>{{ detail.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { round } from '../utils';

export default {
  name: 'Solution',
  computed: {
    ...mapGetters(['solution']),
    totalPartsLengthPercentage: function() {
      const { totalPartsLength, requiredStocks, stockLength } = this.solution;
      return round((totalPartsLength / requiredStocks / stockLength) * 100, 2);
    },
    totalWastePercentage: function() {
      const { totalWaste, requiredStocks, stockLength } = this.solution;
      return round((totalWaste / requiredStocks / stockLength) * 100, 2);
    },
  },
  methods: {
    displayPercentage(x) {
      if (typeof x !== 'number' || isNaN(x)) {
        return '';
      }

      return `(${x} %)`;
    },
    saveAsPdf() {
      window.print();
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 10px;
  font-family: 'Microsoft YaHei';
  font-size: 18px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>
