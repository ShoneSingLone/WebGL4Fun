<template>
  <div class="threejs-example" ref="wrapper"></div>
</template>

<script>
export default {
  name: "threejs-example1",
  beforeCreate() {},
  mounted() {
    this.init1();
  },
  data() {
    return {};
  },
  methods: {
    init1() {
      let renderer = new THREE.WebGLRenderer();
      renderer.setSize(400, 300);
      renderer.setClearColor(0x000000);
      this.$refs.wrapper.appendChild(renderer.domElement);
      // scene
      let scene = new THREE.Scene();
      // camera
      let camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
      camera.position.set(0, 0, 5);
      scene.add(camera);
      // a cube in the scene
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 1, 3),
        new THREE.MeshBasicMaterial({
          color: 0xff0000
        })
      );
      scene.add(cube);
      // render
      renderer.render(scene, camera);
    }
  }
};
</script>

<style lang="scss" src="./threejs.scss">
</style>

