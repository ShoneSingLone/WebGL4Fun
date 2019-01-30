<template>
  <div class="threejs-example">
    <div class="top-wrapper" ref="wrapper"></div>
    <div class="position-input">
      <el-input-number size="mini" v-model="cameraPosition.X" :step="0.01"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Y" :step="0.01"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Z" :step="0.01"></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  name: "threejs-example1",
  mounted() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(400, 300);
    this.renderer.setClearColor(0x000000);
    this.$refs.wrapper.appendChild(this.renderer.domElement);
    // scene
    this.scene = new THREE.Scene();
    // camera
    /* (right-left):(top-bottom) = width:height */
    this.camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
    this.camera.position.set(
      this.cameraPosition.X,
      this.cameraPosition.Y,
      this.cameraPosition.Z
    );
    /* 盯着原点看 */
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene.add(this.camera);

    // a cube in the scene
    var cube = new THREE.Mesh(
      new THREE.CubeGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x7593f5,
        wireframe: true
      })
    );
    this.scene.add(cube);
    // render
    this.renderer.render(this.scene, this.camera);
  },
  data() {
    return {
      renderer: {},
      camera: {},
      scene: {},
      cameraPosition: {
        X: 0,
        Y: 0,
        Z: 5
      }
    };
  },
  methods: {},
  watch: {
    cameraPosition: {
      deep: true,
      handler: function(value) {
        this.camera.position.set(
          this.cameraPosition.X,
          this.cameraPosition.Y,
          this.cameraPosition.Z
        );
        this.renderer.render(this.scene, this.camera);
      }
    }
  }
};
</script>
<style lang="scss" src="./threejs.scss">
</style>

