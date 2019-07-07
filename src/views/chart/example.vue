<template>
  <div class="example1">
    asdfsafsaasdfasdfasdfasf
  </div>
</template>

 <script>
export default {
  name: "viewsChapter2Example1",
  mounted() {
    const originalText = "Hey dude, how is it going?";
    let wordOnlyText = "";
    for (let i = 0; i < originalText.length; ++i) {
      const letter = originalText[i];
      const asciiCode = letter.charCodeAt();

      if (
        (asciiCode >= 65 && asciiCode <= 90) ||
        (asciiCode >= 97 && asciiCode <= 122) ||
        asciiCode === 32
      ) {
        wordOnlyText += letter;
      }
    }

    console.log(wordOnlyText); //=> "Hey dude how is it going"
  },
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script> <style lang="scss" scoped>
</style>