<template>
  <div class="Chapter2">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "viewsChapter2",
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.Chapter2 {
  height: 100%;
  width: 100%;
}

</style>

