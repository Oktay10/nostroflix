<template>

</template>

<script>
export default {
  created() {
    this.destroyToken();
    this.$router.push({ name: 'home' });
  }
}
</script>