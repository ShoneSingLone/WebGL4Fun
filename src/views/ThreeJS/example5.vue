<template>
  <div class="threejs-example" ref="example">
    <div class="position-button">
      <el-button @click="initCube">cube</el-button>
      <el-button @click="initPlane">plane</el-button>
      <el-button @click="initSphere">Sphere</el-button>
      <el-button @click="initCircle">Circle</el-button>
      <el-button @click="initCylinder">Cylinder</el-button>
      <el-button @click="initTetrahedron">Tetrahedron</el-button>
      <el-button @click="initOctahedron">Octahedron</el-button>
      <el-button @click="initIcosahedron">Icosahedron</el-button>
      <el-button @click="initTorus">Torus</el-button>
      <el-button @click="initTorusKnot">TorusKnot</el-button>
      <el-button @click="initText">Text</el-button>
      <el-button @click="initCustom">Custom</el-button>
    </div>
    <div class="position-input">
      <el-input-number size="mini" v-model="cameraPosition.X" :step="0.1"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Y" :step="0.1"></el-input-number>
      <el-input-number size="mini" v-model="cameraPosition.Z" :step="0.1"></el-input-number>
    </div>
    <div class="top-wrapper" ref="wrapper"></div>
  </div>
</template>

<script>
function getFontFromLoder(fontpath) {
  return new Promise((resolve, reject) => {
    var loader = new THREE.FontLoader();
    /* https://threejs.org/docs/index.html#api/en/loaders/FontLoader */
    loader.load(
      fontpath,
      function(font) {
        resolve(font);
      } /* onProgress callback */,
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      /* onError callback */
      function(err) {
        reject(err);
      }
    );
  });
}

export default {
  name: "threejs-example1",
  mounted() {
    this.initCube();
  },
  data() {
    return {
      renderer: {},
      camera: {},
      scene: {},
      cameraPosition: {
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
      /* this.camera.lookAt(new THREE.Vector3(0, 0, 0)); */
      this.scene.add(this.camera);
    },
    initCube() {
      this.initBase();
      var cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 2, 3),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initPlane() {
      this.initBase();
      var cube = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 2, 3, 3),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initSphere() {
      this.initBase();
      var cube = new THREE.Mesh(
        new THREE.SphereGeometry(
          1,
          40,
          40,
          0,
          Math.PI / 3,
          0,
          Math.PI / 3
        ) /* new THREE.SphereGeometry(Math.PI * 2, 2, 3, 3), */,
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initCircle() {
      this.initBase();
      var cube = new THREE.Mesh(
        new THREE.CircleGeometry(2, 40, 0, (Math.PI * 2) / 2),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initCylinder() {
      this.initBase();
      /* THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded) */
      var cube = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 2, 40),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initTetrahedron() {
      this.initBase();
      /* THREE.TetrahedronGeometry(radius, detail)       */
      var cube = new THREE.Mesh(
        new THREE.TetrahedronGeometry(1),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initOctahedron() {
      this.initBase();
      /* THREE.OctahedronGeometry(radius, detail) */
      var cube = new THREE.Mesh(
        new THREE.OctahedronGeometry(1),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initIcosahedron() {
      this.initBase();
      /* THREE.IcosahedronGeometry(radius, detail) */ var cube = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initTorus() {
      this.initBase();
      /* THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc) */ var cube = new THREE.Mesh(
        new THREE.TorusGeometry(3, 1, 40, 40, (Math.PI * 2) / 6),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initTorusKnot() {
      this.initBase();
      /* THREE.TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale) */
      var cube = new THREE.Mesh(
        new THREE.TorusKnotGeometry(2, 0.5, 32, 8),
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    initCustom() {
      this.initBase();
      /* 初始化几何形状 */
      var geometry = new THREE.Geometry();

      /* 设置顶点位置 */
      /* 顶部4顶点 */
      geometry.vertices.push(new THREE.Vector3(-1, 2, -1));
      geometry.vertices.push(new THREE.Vector3(1, 2, -1));
      geometry.vertices.push(new THREE.Vector3(1, 2, 1));
      geometry.vertices.push(new THREE.Vector3(-1, 2, 1));
      /* 底部4顶点 */
      geometry.vertices.push(new THREE.Vector3(-2, 0, -2));
      geometry.vertices.push(new THREE.Vector3(2, 0, -2));
      geometry.vertices.push(new THREE.Vector3(2, 0, 2));
      geometry.vertices.push(new THREE.Vector3(-2, 0, 2));

      /* vertices的下标就是 Face的第一个参数
       * @@THREE.Face4 has been removed. A THREE.Face3 will be created instead.'
       * @@https://threejs.org/docs/index.html#api/en/core/Face3
       */

      /* 设置顶点连接情况 */
      /* 顶面 */
      geometry.faces.push(new THREE.Face3(0, 1, 2, 3));
      /* 底面 */
      geometry.faces.push(new THREE.Face3(4, 5, 6, 7));
      /* 四个侧面 */
      geometry.faces.push(new THREE.Face3(0, 1, 5, 4));
      geometry.faces.push(new THREE.Face3(1, 2, 6, 5));
      geometry.faces.push(new THREE.Face3(2, 3, 7, 6));
      geometry.faces.push(new THREE.Face3(3, 0, 4, 7));

      var cube = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
          color: 0x8bc34a,
          wireframe: true
        })
      );
      this.scene.add(cube);
      /* render */
      this.renderer.render(this.scene, this.camera);
    },
    async initText() {
      try {
        this.initBase();
        /* THREE.TextGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale) */
        console.time("THREE.fontCollection.font");
        THREE.fontCollection.font =
          THREE.fontCollection.font ||
          (await getFontFromLoder(
            "css/fonts/source_han_sans_cnNormal_Regular.json"
          ));
        console.timeEnd("THREE.fontCollection.font");
        var geometry = new THREE.TextGeometry("使用外部font", {
          font: THREE.fontCollection.font,
          size: 1,
          height: 1
        });
        var cube = new THREE.Mesh(
          geometry,
          new THREE.MeshBasicMaterial({
            color: 0x8bc34a,
            wireframe: true
          })
        );
        this.scene.add(cube);
        /* render */
        this.renderer.render(this.scene, this.camera);
      } catch (error) {
        console.log(error);
      }
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
    }
  }
};
</script>
<style lang="scss" src="./threejs.scss">
</style>
