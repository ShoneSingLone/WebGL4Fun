<template style="display:none">
  <div class="elastic">
    <svg class="bg" width="560" height="320">
      <defs>
        <filter id="shadow" x="0" y="0" width="100%" height="100%" filterUnits="userSpaceOnUse">
          <feOffset dx="4" dy="5" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood flood-opacity="0.8" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <path :d="dPath" stroke="rgba(30, 90, 150, 0.78)" fill="#fff" />
      <path :d="qPathUp" stroke="rgba(30, 90, 150, 0.78)" fill="none" filter="url(#shadow)" />
      <path :d="qPathDown" stroke="rgba(30, 90, 150, 0.78)" fill="none" filter="url(#shadow)" />
      <path :d="areaPath" stroke="rgba(30, 90, 150, 0.78)" fill="gray" />
    </svg>
    <div class="div-container">
      someting others
      <button @click="switchState">switchState</button>
    </div>
  </div>
</template>

<script>
import dynamics from "dynamics.js";
export default {
  name: "Corner",
  data() {
    return {
      isOpen: false,
      dragging: false,
      // quadratic bezier control point
      c: {
        x: 160,
        y: 160
      },
      // record drag start point
      start: {
        x: 0,
        y: 0
      },
      aPoint: {
        x: 560,
        y: 0
      },
      bPoint: {
        x: 560,
        y: 0
      },
      cPoint: {
        x: 500,
        y: 0
      }
    };
  },

  computed: {
    dPath() {
      return `
      M0 0 
      L${this.aPoint.x} ${this.aPoint.y}
      L${this.bPoint.x} ${this.bPoint.y}
      L560 320
      L0 320
      Z
      `;
    },
    qPathUp() {
      return `
      M${this.bPoint.x} ${this.bPoint.y} 
      Q${(this.aPoint.x + this.bPoint.x) / 2} ${(this.aPoint.y +
        this.bPoint.y) /
        2} 
      ${this.cPoint.x} ${this.cPoint.y}
      `;
    },
    qPathDown() {
      return `
      M${this.aPoint.x} ${this.aPoint.y} 
      Q${(this.aPoint.x + this.bPoint.x) / 2} ${(this.aPoint.y +
        this.bPoint.y) /
        2} 
      ${this.cPoint.x} ${this.cPoint.y}
      `;
    },
    areaPath() {
      return `
      M${this.aPoint.x} ${this.aPoint.y}
      L${this.bPoint.x} ${this.bPoint.y}
      Q${(this.aPoint.x + this.bPoint.x) / 2} ${(this.aPoint.y +
        this.bPoint.y) /
        2} 
      ${this.cPoint.x} ${this.cPoint.y}
      Q${(this.aPoint.x + this.bPoint.x) / 2} ${(this.aPoint.y +
        this.bPoint.y) /
        2} 
      ${this.aPoint.x} ${this.aPoint.y} 
      Z
      `;
    },
    backPath() {
      return `
      M${this.aPoint.x} ${this.aPoint.y}
      L560 0
      L${this.bPoint.x} ${this.bPoint.y}
      Z
      `;
    },
    contentPosition() {
      const dy = this.c.y - 160;
      const dampen = dy > 0 ? 2 : 4;
      return {
        transform: `translate3d(0,${dy / dampen}px,0)`
      };
    }
  },

  methods: {
    switchState() {
      const aStart = {
          x: 400,
          y: 0
        },
        bStart = {
          x: 560,
          y: 60
        },
        cStart = {
          x: 500,
          y: 80
        },
        allEnd = {
          x: 560,
          y: 0
        };
      let dynamicOptions = {
        type: dynamics.spring,
        duration: 4000,
        friction: 280
      };

      if (this.isOpen) {
        this.isOpen = false;
        dynamics.animate(this.aPoint, allEnd, dynamicOptions);
        dynamics.animate(this.bPoint, allEnd, dynamicOptions);
        dynamics.animate(this.cPoint, allEnd, dynamicOptions);
      } else {
        this.isOpen = true;
        dynamics.animate(this.aPoint, aStart, dynamicOptions);
        dynamics.animate(this.bPoint, bStart, dynamicOptions);
        dynamics.animate(this.cPoint, cStart, dynamicOptions);
      }
    }
  }
};
</script>
<style>
.elastic {
  background-color: #fff;
  background: url(https://cn.vuejs.org/images/logo.png) center center/6%;
  width: 560px;
  height: 320px;
  overflow: hidden;
  margin: 30px auto;
  position: relative;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 300;
  user-select: none;
}

h1 {
  font-weight: 300;
  font-size: 1.8em;
  margin-top: 0;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.header,
.div-container {
  position: relative;
  z-index: 1;
  padding: 30px;
  box-sizing: border-box;
}
</style>