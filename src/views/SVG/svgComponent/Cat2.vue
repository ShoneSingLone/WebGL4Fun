<template>
  <div>
    <svg width="300px" height="100px" viewBox="0 0 300 100">
      <text x="20" y="30">
        Two words
        <tspan style="font-size: 10pt;">(normal length)</tspan>
      </text>
      <text x="20" y="60" textLength="300" lengthAdjust>Two words</text>
    </svg>
    <svg width="100%" viewBox="0 0 1920 1080">
      <rect x="0" y="0" width="20" height="15" strok="green" transform="scale(2) translate(30,20)" />
      <rect x="0" y="0" width="20" height="15" strok="red" transform="translate(30,20) scale(2)" />
    </svg>
    <svg
      viewBox="0 0 140 140"
      id="svg15"
      width="140"
      height="140"
      version="1.1"
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      sodipodi:docname="svgdemo.svg"
    >
      <rect id="rect2" width="2" height="0" x="128" y="44" fill="rgb(255, 255, 255)" />
      <text
        id="text4"
        x="43.5"
        y="32.6"
        font-size="24"
        style="stoke:black"
        textLength="76"
        transform="matrix(1,0,0,1,0,0)"
      >GuaGua</text>
      <g id="whiskers">
        <line id="line6" x1="70" x2="140" y1="70" y2="100" stroke-width="2" style="stroke:green" />
        <line id="line6" x1="70" x2="140" y1="70" y2="70" stroke-width="2" style="stroke:green" />
      </g>
      <use id="use9" transform="scale(-1,1) translate(-120)" xlink:href="#whiskers" />
      <polyline
        id="polyline11"
        points="99 90, 89 50, 69 90, 49 50, 29 90"
        style="fill:none;stroke:#008000;stroke-width:1"
        transform="translate(-9.5,-13.1)"
      />
      <g id="tooth">
        <path
          id="path13"
          stroke-width
          d="M 89.2 103.6 h -10 a 5 10 0 0 0 10 0"
          style="fill:#fff;stroke:#000"
          inkscape:connector-curvature="0"
        />
      </g>
      <use id="use2" transform="translate(10)" xlink:href="#tooth" />
      <use
        id="use9-1"
        width="100%"
        height="100%"
        x="0"
        y="0"
        transform="translate(-40,33.1) "
        xlink:href="#whiskers"
      />
    </svg>

    <svg width="200px" height="200px" viewBox="0 0 200 200">
      <circle cx="25" cy="25" r="25" style="stroke:black;fill:none;" />
      <rect x="100" y="5" width="30" height="80" style="stroke:blue;fill:none;" />
      <cat />
      <svg
        x="100px"
        y="5px"
        width="30px"
        height="80px"
        viewBox="0 0 60 160"
        preserveAspectRatio="xMinYMin meet"
      >
        <circle cx="25" cy="25" r="25" style="stroke:black;fill:none;" />
        <cat />
      </svg>
    </svg>
  </div>
</template> 

<script>
export default {
  name: "Cat2",
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