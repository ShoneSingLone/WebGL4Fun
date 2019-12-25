<template style="display:none">
  <div class="elastic" @click="switchState">
    <svg class="bg" width="560" height="320">
      <text x="280" y="160" style="text-anchor:middle">{{headerPath}}</text>
      <path :d="dPath" stroke="rgba(30, 90, 150, 0.78)" fill="none" />
      <path :d="qPathUp" stroke="rgba(30, 90, 150, 0.78)" fill="none" />
      <path :d="qPathDown" stroke="rgba(30, 90, 150, 0.78)" fill="none" />
      <circle cx="280" cy="160" r="2" stroke="red" />
    </svg>
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content" :style="contentPosition">
      <slot name="content">
        <pre>
          {{JSON.stringify(c,null,2)}}
        </pre>
        <p></p>
      </slot>
    </div>
  </div>
</template>

<script>
import dynamics from "dynamics.js";
export default {
  name: "Corner",
  data() {
    return {
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
        y: 60
      }
    };
  },

  computed: {
    isOpen: true,
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
    headerPath() {
      console.log(JSON.stringify(this.c, null, 2));
      return `M0,0 L560,0 560,160 Q${this.c.x},${this.c.y} 0,160`;
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

      if (this.switchState.isOpen) {
        this.switchState.isOpen = false;
        dynamics.animate(this.aPoint, allEnd, {
          type: dynamics.spring,
          duration: 4000,
          friction: 280
        });
        dynamics.animate(this.bPoint, allEnd, {
          type: dynamics.spring,
          duration: 3000,
          friction: 280
        });
        dynamics.animate(this.cPoint, allEnd, {
          type: dynamics.spring,
          duration: 3000,
          friction: 280
        });
      } else {
        this.switchState.isOpen = true;
        dynamics.animate(this.aPoint, aStart, {
          type: dynamics.spring,
          duration: 3000,
          friction: 280
        });
        dynamics.animate(this.bPoint, bStart, {
          type: dynamics.spring,
          duration: 4000,
          friction: 280
        });
        dynamics.animate(this.cPoint, cStart, {
          type: dynamics.spring,
          duration: 4000,
          friction: 280
        });
      }
    },
    startDrag(e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      this.dragging = true;
      this.start.x = e.pageX;
      this.start.y = e.pageY;
    },
    onDrag(e) {
      e = e.changedTouches ? e.changedTouches[0] : e;
      if (this.dragging) {
        this.c.x = 160 + (e.pageX - this.start.x);
        // dampen vertical drag by a factor
        const dy = e.pageY - this.start.y;
        const dampen = dy > 0 ? 1.5 : 4;
        this.c.y = 160 + dy / dampen;
      }
    },
    stopDrag() {
      if (this.dragging) {
        this.dragging = false;
        dynamics.animate(
          this.c,
          {
            x: 280,
            y: 160
          },
          {
            type: dynamics.spring,
            duration: 700,
            friction: 280
          }
        );
      }
    }
  }
};
</script>
<style>
.elastic {
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
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
.content {
  position: relative;
  z-index: 1;
  padding: 30px;
  box-sizing: border-box;
}

.header {
  color: #fff;
  height: 160px;

  a {
    color: #fff;
  }
}

.content {
  color: #333;
  line-height: 1.5em;

  a {
    color: #3f51b5;
  }
}
</style>