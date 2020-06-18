<template>
  <form @submit="onSubmit">
    <input
      type="number"
      class="form-control"
      step="any"
      placeholder="尺寸"
      v-model.number="length"
    />
    <input type="number" class="form-control" min="1" placeholder="数量" v-model.number="count" />
    <input type="submit" class="btn btn-primary" value="添加" />
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

<style scoped>
form {
  display: grid;
  grid-template-columns: auto 100px 70px;
  grid-gap: 10px;
}
</style>
