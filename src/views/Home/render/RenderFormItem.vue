
<script>
import merge from "lodash/merge";
import kebabCase from "lodash/kebabCase";
import forIn from "lodash/forIn";
const { Vue } = window;
if (!Vue) alert("强行依赖全局Vue，但是在 window 中未找到");
function OnObj(options) {
  forIn(options, (fn, fnName) => {
    const regExp = new RegExp(`^handle(.*)$`);
    const res = fnName.match(regExp);
    if (res && res.length === 2) {
      const eventName = kebabCase(res[1]);
      this[eventName] = fn;
    }
  });
}

export default {
  functional: true,
  props: {
    options: {
      type: Object,
      required: require
    }
  },
  render: function(createElement, context) {
    let {
      data,
      props: { options }
    } = context;
    /* https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象 */
    data = merge(data, { attrs: options });
    data.on = data.on || {};
    data.on = merge(data.on, new OnObj(options));
    function appropriateListComponent() {
      const _component = Vue.component(options._type);
      if (options._type) return _component;
      alert(`获取组件${options._type}失败`);
      return Vue.component({});
    }
    return createElement(appropriateListComponent(), data, context.children);
  }
};
</script>
<style lang="scss">
</style>