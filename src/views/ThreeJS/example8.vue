<template>
  <div class="example2">
    <div class="show">
      <div>{{cube&&cube.position&&cube.position.z}}</div>
      <div>count:{{count}}</div>
      <div>step:{{step}}</div>
    </div>
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
export default {
  name: "viewsChapter2Example8",
  mounted() {
    // Grab our container div
    var container = this.$refs.container;
    // Create the Three.js renderer, add it to our div
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(this.renderer.domElement);
    // Create a new Three.js scene
    this.scene = new THREE.Scene();
    // Put in a camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      1,
      4000
    );
    this.camera.position.set(0, 0, 4);

    // Create a directional light to show off the object
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0, 1);
    this.scene.add(light);
    // Create a shaded, texture-mapped cube and add it to the scene
    // First, create the texture map
    var mapUrl = "./img/2.1.jpg";
    /* https://threejs.org/docs/#api/zh/loaders/TextureLoader */
    var map = new THREE.TextureLoader().load(mapUrl);
    // Now, create a Phong material to show shading; pass in the map
    var material = new THREE.MeshPhongMaterial({ map: map });
    // Create the cube geometry
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    // And put the geometry and material together into a mesh
    this.cube = new THREE.Mesh(geometry, material);
    // Turn it toward the scene, or we won't see the cube shape!
    this.cube.position.x = -2;
    this.cube.rotation.x = (Math.PI * 2) / 8;
    this.cube.rotation.y = (Math.PI * 2) / 8;
    // Add the cube to our scene
    this.scene.add(this.cube);
    // Add a mouse up handler to toggle the animation
    this.addMouseHandler();
    // Run our render loop
    this.run();
  },
  data() {
    return {
      animating: false,
      renderer: null,
      scene: null,
      camera: null,
      cube: null,
      count: 0,
      step: 0.01
    };
  },
  methods: {
    run() {
      // Render the scene
      this.renderer.render(this.scene, this.camera);
      // Spin the cube for next frame
      if (this.animating) {
        this.count += this.step;
        this.cube.rotation.y = this.count;
        this.cube.rotation.x = this.count;
        this.cube.rotation.z = this.count;
        if (this.count > 10) {
          this.step = -0.01;
        } else if (this.count < -10) {
          this.step = 0.01;
        }
      }
      // Ask for another frame
      requestAnimationFrame(this.run);
    },
    addMouseHandler() {
      var dom = this.renderer.domElement;
      dom.addEventListener("mouseup", this.onMouseUp, false);
    },
    onMouseUp(event) {
      event.preventDefault();
      this.animating = !this.animating;
    }
  }
};
</script>

<style lang="scss" src="./threejs.scss">
</style>
<style lang="scss" scoped>
.show {
  text-align: left;
}
</style>



