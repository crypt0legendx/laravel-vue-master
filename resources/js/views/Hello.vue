<template>
  <div>
    <p>Hello World!</p>
    <el-switch
      v-model="value1"
      active-text="Pay by month"
      inactive-text="Pay by year"
    >
    </el-switch>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: true,
      value2: true,
    };
  },
};
</script>