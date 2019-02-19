<template>
  <div id="list-demo" class="demo">
    <button v-on:click="transitionChange('add')">Add</button>
    <button v-on:click="transitionChange('remove')">Remove</button>
    <button v-on:click="transitionChange('shuffle')">Shuffle</button>
    <h2>删除的元素在active期间，如果仍然占据文档流的位置，下一个元素在其消失后再移动过来。要达到平滑过渡效果，使用position:absolute将其移出文档流。</h2>
    <transition-group :name="transitionName" tag="ul">
      <li v-for="item in items" v-bind:key="item" class="list">{{ item }}</li>
    </transition-group>

    <div id="staggered-list-demo">
      <input v-model="query">
      <transition-group
        name="staggered-fade"
        tag="ul"
        v-bind:css="false"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
        <li
          v-for="(item, index) in computedList"
          v-bind:key="item.msg"
          v-bind:data-index="index"
        >{{ item.msg }}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "viewsChapter2Example1",
  mounted() {},
  data() {
    let nextNum = 75;
    let items = [...new Array(nextNum)].map((v, i) => i + 1);
    return {
      items,
      nextNum,
      transitionName: "list"
    };
  },
  methods: {
    randomIndex: function() {
      return Math.floor(Math.random() * this.items.length);
    },
    transitionChange(name) {
      try {
        let action = {
          add: () => {
            this.items.splice(this.randomIndex(), 0, ++this.nextNum);
          },
          remove: () => {
            this.items.splice(this.randomIndex(), 1);
          },
          shuffle: () => {
            this.items = _.shuffle(this.items);
          }
        };
        action[name] && action[name]();
      } catch (error) {
        debugger;
      }
    }
  }
};
</script>


<style lang="scss" >
$list-duration: 1s;
ul {
  margin: 16px auto;
  max-width: 546px;
  display: flex;
  flex-flow: row wrap;

  li {
    display: block;
    flex-basis: 32px;
    outline: 1px solid #07182b;
    margin: 2px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

$list-duration: 1s;

.list {
  &-move {
    transition: all $list-duration;
    outline: 1px solid #c9d2dd;
  }
  &-leave {
    opacity: 1;
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  &-leave-active {
    position: absolute;
    transition: all $list-duration;
  }

  &-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  &-enter-to {
    opacity: 1;
  }
  /* leave之后再enter delay duration时长 */
  &-enter-active {
    transition: all $list-duration;
  }
}
</style>


