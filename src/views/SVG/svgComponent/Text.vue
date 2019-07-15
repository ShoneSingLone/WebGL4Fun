<template>
  <svg style="width:100%;height:100%;background:white" viewBox="0 0 1000 1000">
    <g v-for="(index) in 10" :key="index">
      <use xlink:href="#gridLine-horizon" :y="(index)*100" />
      <use xlink:href="#gridLine-vertical" :x="index*100" />
    </g>
    <defs>
      <linearGradient id="plain">
        <stop offset="0" style="stop-color:#fc0" />
        <stop offset="33.3%" style="stop-color:#c69" />
        <stop offset="100%" style="stop-color:#6c9" />
      </linearGradient>
      <linearGradient id="plain2" xlink:href="#plain" x1="0" y1="0" x2="0.1" y2="0.9" />
    </defs>
    <text x="100" y="100" style="font-size:100;fill:url(#plain)">axg</text>
    <text x="400" y="100" style="font-size:100;">axg</text>
    <text x="100" y="300" style="font-size:100;fill:url(#plain)">axg</text>
    <text x="200" y="200" style="font-size:100;fill:url(#plain2)">axg</text>
    <text x="400" y="200" style="font-size:100;fill:url(#plain)">axg</text>
    <text x="400" y="200" style="font-size:100;fill:url(#plain)">axg</text>
    <text x="400" y="300" style="font-size:100;fill:url(#plain);text-anchor:start">axg</text>
    <text x="400" y="400" style="font-size:100;fill:url(#plain);text-anchor:middle">axg</text>
    <text x="400" y="500" style="font-size:100;fill:url(#plain);text-anchor:end">axg</text>
    <path d="M400 500 1000 500 1000 700 400 700 z" style="stroke:black;stroke-width:2;fill:white;" />
    <text
      x="400"
      y="600"
      style="font-size:100;fill:url(#plain);text-anchor:start"
      textLength="600"
      lengthAdjust="spacingAndGlyphs"
    >
      <tspan dy="20">axg</tspan>1
      <tspan dy="60">axg</tspan>2
      <tspan dy="-80">bxg</tspan>3
    </text>
    <path d="M400 800 800 900 800 700 400 700 z" style="stroke:black;stroke-width:2;fill:white;" />
    <text
      x="400"
      y="800"
      style="font-size:100;fill:url(#plain);text-anchor:start"
      textLength="400"
      lengthAdjust="spacingAndGlyphs"
    >
      a
      <tspan>xg axg bxg</tspan>
    </text>
    <text x="400" y="600">
      Two words
      <tspan style="font-size: 10pt;">(normal length)</tspan>
    </text>
    <text x="400" y="660" textLength="100" lengthAdjust>
      Two words
      <tspan dy="20">axg</tspan>1
    </text>
  </svg>
</template> 

<script>
export default {
  name: "Text",
  mounted() {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log("handleClick");
    }
  }
};
</script> <style lang="scss" scoped>
</style>