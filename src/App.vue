<template>
  <div id="app">
    <router-view v-if="isReloadAlive"/>
  </div>
</template>

<script>
  export default {
    provide() {
      return {
        reload: this.reload
      };
    },
    data() {
      return{
        isReloadAlive: true
      }
    },
    methods: {
      reload() {
        this.isReloadAlive = false;
        this.$nextTick(function() {
          this.isReloadAlive = true;
        });
      }
    }
  };
</script>

<style lang="less">
</style>
