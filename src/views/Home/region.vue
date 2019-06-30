<template>
  <div class="region">
    
    <v-region
      @values="regionChange"
      :ui="true"
      :city-picker="true"
      :selected="selected"
      :search="true"
      :town="true"
    ></v-region>
  </div>
</template>

<script>
import Vue from "vue";
import vRegion from "v-region";
Vue.use(vRegion);

export default {
  created() {},
  data() {
    return {
      selected: ["110000", "130200", "140100"]
    };
  },
  components: {},
  methods: {
    regionChange(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" >
</style>
