<template>
  <div>
    {{ id }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.productId;
  },
};
</script>
