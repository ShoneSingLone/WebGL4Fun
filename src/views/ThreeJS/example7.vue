<template>
  <div class="threejs-example" ref="example">
    <div class="position-button">
      <el-button @click="initSphere">MeshBasicMaterial</el-button>
    </div>
    <div class="position-input">
      <el-input-number size="mini" v-model="cameraPosition.X" :step="0.1"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Y" :step="0.1"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Z" :step="0.1"></el-input-number>
    </div>
    <div class="mesh-position-input">
      <el-input-number size="mini" v-model="meshPosition.X" :step="0.01"></el-input-number>
      <el-input-number size="mini" v-model="meshPosition.Y" :step="0.01"></el-input-number>
      <el-input-number size="mini" v-model="meshPosition.Z" :step="0.01"></el-input-number>
    </div>
    <div class="top-wrapper" ref="wrapper"></div>
  </div>
</template>

<script>
export default {
  name: "threejs-example1",
  mounted() {
    this.initSphere();
  },
  data() {
    return {
      renderer: {},
      mesh: {},
      camera: {},
      scene: {},
      cameraPosition: {
        X: 0,
        Y: 0,
        Z: 10
      },
      meshPosition: {
        X: 0,
        Y: 0,
        Z: 10
      }
    };
  },
  methods: {
    initBase() {
      let wrapperEle = this.$refs.example;
      let rect = wrapperEle.getBoundingClientRect();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(rect.width, rect.height);
      this.renderer.setClearColor(0x000000);
      this.$refs.wrapper.innerHTML = "";
      this.$refs.wrapper.appendChild(this.renderer.domElement);
      /* scene */
      this.scene = new THREE.Scene();
      /* camera */
      /* (right-left):(top-bottom) = width:height */
      this.camera = new THREE.PerspectiveCamera(
        45,
        rect.width / rect.height,
        1,
        100
      );

      this.camera.position.set(
        this.cameraPosition.X,
        this.cameraPosition.Y,
        this.cameraPosition.Z
      );
      /* 盯着原点看 */
      // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.scene.add(this.camera);

      var light = new THREE.DirectionalLight(0xffffff, 1.5);
      light.position.set(0, 0, 100);
      this.scene.add(light);
    },
    initSphere() {
      this.initBase();
      this.mesh = new THREE.Mesh(
        new THREE.SphereGeometry(
          1,
          40,
          40,
          0,
          Math.PI * 2,
          0,
          Math.PI * 2
        ) /* new THREE.SphereGeometry(Math.PI * 2, 2, 3, 3), */,
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          specular: 0xffff00,
          shininess: 100
        })
      );

      this.mesh.position.set(
        this.meshPosition.X,
        this.meshPosition.Y,
        this.meshPosition.Z
      );
      this.scene.add(this.mesh);
      /* render */
      this.renderer.render(this.scene, this.camera);
    }
  },
  watch: {
    cameraPosition: {
      deep: true,
      handler: function() {
        this.camera.position.set(
          this.cameraPosition.X,
          this.cameraPosition.Y,
          this.cameraPosition.Z
        );
        this.renderer.render(this.scene, this.camera);
      }
    },
    meshPosition: {
      deep: true,
      handler: function() {
        debugger;
        this.mesh.position = { ...this.meshPosition };
        this.renderer.render(this.scene, this.camera);
      }
    }
  }
};
</script>
<style lang="scss" src="./threejs.scss">
</style>
