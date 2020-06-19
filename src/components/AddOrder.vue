<template>
  <form class="d-flex flex-row" @submit="onSubmit">
    <input
      type="number"
      class="form-control mr-2"
      step="any"
      placeholder="尺寸"
      v-model.number="length"
    />
    <input
      type="number"
      class="form-control mr-2"
      style="width: 100px"
      min="1"
      placeholder="数量"
      v-model.number="count"
    />
    <input type="submit" class="btn btn-outline-primary" value="添加" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { error } from '../utils';

export default {
  name: 'AddOrder',
  data() {
    return {
      length: null,
      count: 1,
    };
  },
  computed: mapGetters(['stockLength']),
  methods: {
    ...mapActions(['addOrder']),
    onSubmit(e) {
      e.preventDefault();
      const { length, count, stockLength } = this;
      if (typeof length !== 'number' || length <= 0) {
        error('尺寸输入不正确');
        return;
      }
      if (length > stockLength) {
        error(`尺寸(${length})不得大于材料长度(${stockLength})`);
        return;
      }
      if (typeof count !== 'number' || count <= 0) {
        error('数量输入不正确');
        return;
      }
      this.addOrder({ length, count });
      this.length = null;
      this.count = 1;
      e.target[0].focus();
    },
  },
};
</script>
