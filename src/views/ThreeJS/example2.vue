<template>
  <div class="example2">
    <div ref="container" class="container" style="position:relative;">
      <el-button
        style="position:absolute;top:0;right:0;"
        @click.stop="toggleFullScreen"
      >{{animaing?"退出全屏":"全屏"}}</el-button>
    </div>
  </div>
</template>

<script>
import loadJS from "@ventose/utils-loadjs";
import $ from "jquery";
export default {
  name: "viewsChapter2Example2",
  async mounted() {
    try {
      await loadJS([
        ["three", "./js/three.js"],
        ["stats", "./js/stats.min.js"],
        ["data-gui", "./js/dat.gui.min.js"],
        ["jquery", "./js/jquery.js"]
      ]);
      this.initRenderer();
      this.initScene();
      this.initCamera();
      this.initLight();
      this.initMesh();
      this.initStats();
      this.initDataGUI();
      this.addMouseHandler();
      setTimeout(this.run.bind(this), 17);
      this.animate();
    } catch (error) {
      console.log("error", error);
    }
  },
  data() {
    return {
      container: null,
      animating: false,
      renderer: null,
      stats: null,
      gui: null,
      scene: null,
      camera: null,
      cube: null,
      controls: {
        positionX: 0,
        positionY: 0,
        positionZ: 0
      }
    };
  },
  methods: {
    /* 初始化渲染器 */
    initRenderer() {
      this.container = this.$refs.container;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(
        this.container.offsetWidth,
        this.container.offsetHeight
      );
      this.container.appendChild(this.renderer.domElement);
    },
    /* 初始化场景 */
    initScene() {
      this.scene = new THREE.Scene();
    },
    //初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.container.offsetWidth / this.container.offsetHeight,
        1,
        4000
      );
      this.camera.position.set(0, 0, 4);
    },
    initLight() {
      const light = new THREE.DirectionalLight(0xffffff, 1.5);
      light.position.set(0, 0, 1);
      this.scene.add(light);
    },
    //创建模型
    initMesh() {
      const mapUrl = "./img/2.1.jpg";
      /* https://threejs.org/docs/#api/zh/loaders/TextureLoader */
      const map = new THREE.TextureLoader().load(mapUrl);
      // Now, create a Phong material to show shading; pass in the map
      const material = new THREE.MeshPhongMaterial({ map: map });
      // Create the cube geometry
      const geometry = new THREE.CubeGeometry(1, 1, 1);
      // And put the geometry and material together into a mesh
      this.cube = new THREE.Mesh(geometry, material);
      // Turn it toward the scene, or we won't see the cube shape!
      this.cube.rotation.x = Math.PI / 5;
      this.cube.rotation.y = Math.PI / 5;
      // Add the cube to our scene
      this.scene.add(this.cube);
    },
    //运行动画
    run() {
      // Render the scene
      // Spin the cube for next frame
      this.cube.rotation.x += 0.01; //每帧网格模型的沿x轴旋转0.01弧度
      this.cube.rotation.y += 0.02; //每帧网格模型的沿y轴旋转0.02弧度
      //更新性能检测框
      this.stats.update();
      //渲染界面
      this.renderer.render(this.scene, this.camera);
    },
    animate() {
      requestAnimationFrame(this.animate); //循环调用函数
      if (this.animating) {
        this.run();
      }
    },
    /* 性能检测框 */
    initStats() {
      const { Stats } = window;
      this.stats = new Stats();
      this.$refs.container.appendChild(this.stats.dom);
    },
    initDataGUI() {
      const updatePosition = () => {
        this.cube.position.set(
          this.controls.positionX,
          this.controls.positionY,
          this.controls.positionZ
        );
      };
      const { dat } = window;
      const controls = {
        positionX: "#cccccc", //css样式
        positionY: [0, 255, 255], //RGB格式
        positionZ: [0, 255, 255, 0.6] //RGBA格式
      };

      var gui = new dat.GUI();
      this.gui = new dat.GUI();
      gui.addColor(controls, "positionX").name("x轴");
      gui.addColor(controls, "positionY").name("y轴");
      gui.addColor(controls, "positionZ").name("z轴");
      this.gui
        .add(this.controls, "positionX", -1, 1)
        .name("x轴")
        .onChange(updatePosition);
      this.gui
        .add(this.controls, "positionY", -1, 1)
        .name("y轴")
        .onChange(updatePosition);
      this.gui
        .add(this.controls, "positionZ", -1, 1)
        .name("z轴")
        .onChange(updatePosition);
    },
    addMouseHandler() {
      $(this.container).on("click", this.onMouseUp);
    },
    onMouseUp(event) {
      event.preventDefault();
      this.animating = !this.animating;
    },
    toggleFullScreen() {
      if (this.animating) {
        this.container.requestFullscreen();
      } else {
        window.document.exitFullscreen();
      }
    }
  }
};
</script>

<style lang="scss" src="./threejs.scss">
</style>


