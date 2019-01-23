<template>
  <div id="Chapter2">
    <router-link to="/Chapter2/example1">example1</router-link>|
    <router-link to="/Chapter2/example1">example1</router-link>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "viewsChapter1",
  mounted() {
    var canvas = document.getElementById("webglcanvas");
    var gl = this.initWebGL(canvas);
    this.initViewport(gl, canvas);
    this.initMatrices();
    var square = this.createSquare(gl);
    this.initShader(gl);
    this.draw(gl, square);
  },
  data() {
    return {
      projectionMatrix: {},
      modelViewMatrix: {},
      vertexShaderSource:
        "    attribute vec3 vertexPos;\n" +
        "    uniform mat4 modelViewMatrix;\n" +
        "    uniform mat4 projectionMatrix;\n" +
        "    void main(void) {\n" +
        "		// Return the transformed and projected vertex value\n" +
        "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
        "            vec4(vertexPos, 1.0);\n" +
        "    }\n",
      fragmentShaderSource:
        "    void main(void) {\n" +
        "    // Return the pixel color: always output white\n" +
        "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n" +
        "}\n",
      shaderProgram: {},
      shaderVertexPositionAttribute: {},
      shaderProjectionMatrixUniform: {},
      shaderModelViewMatrixUniform: {}
    };
  },
  methods: {
    initWebGL(canvas) {
      var gl;
      try {
        gl = canvas.getContext("experimental-webgl");
      } catch (e) {
        var msg = "Error creating WebGL Context!: " + e.toString();
        alert(msg);
        throw Error(msg);
      }
      return gl;
    },
    initViewport(gl, canvas) {
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    initMatrices() {
      // The transform matrix for the square - translate back in Z for the camera
      (this.modelViewMatrix = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        -3.333,
        1
      ])),
        // The projection matrix (for a 45 degree field of view)
        (this.projectionMatrix = new Float32Array([
          2.41421,
          0,
          0,
          0,
          0,
          2.41421,
          0,
          0,
          0,
          0,
          -1.002002,
          -1,
          0,
          0,
          -0.2002002,
          0
        ]));
    },
    createSquare(gl) {
      var vertexBuffer;
      vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      var verts = [
        0.5,
        0.5,
        0.0,
        -0.5,
        0.5,
        0.0,
        0.5,
        -0.5,
        0.0,
        -0.5,
        -0.5,
        0.0
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
      var square = {
        buffer: vertexBuffer,
        vertSize: 3,
        nVerts: 4,
        primtype: gl.TRIANGLE_STRIP
      };
      return square;
    },
    createShader(gl, str, type) {
      var shader;
      if (type == "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
      } else if (type == "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
      } else {
        return null;
      }
      gl.shaderSource(shader, str);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    },
    initShader(gl) {
      // load and compile the fragment and vertex shader
      //var fragmentShader = getShader(gl, "fragmentShader");
      //var vertexShader = getShader(gl, "vertexShader");
      var fragmentShader = this.createShader(
        gl,
        this.fragmentShaderSource,
        "fragment"
      );
      var vertexShader = this.createShader(
        gl,
        this.vertexShaderSource,
        "vertex"
      );
      // link them together into a new program
      this.shaderProgram = gl.createProgram();
      gl.attachShader(this.shaderProgram, vertexShader);
      gl.attachShader(this.shaderProgram, fragmentShader);
      gl.linkProgram(this.shaderProgram);
      // get pointers to the shader params
      this.shaderVertexPositionAttribute = gl.getAttribLocation(
        this.shaderProgram,
        "vertexPos"
      );
      gl.enableVertexAttribArray(this.shaderVertexPositionAttribute);

      this.shaderProjectionMatrixUniform = gl.getUniformLocation(
        this.shaderProgram,
        "projectionMatrix"
      );
      this.shaderModelViewMatrixUniform = gl.getUniformLocation(
        this.shaderProgram,
        "modelViewMatrix"
      );

      if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
      }
    },
    draw(gl, obj) {
      // clear the background (with black)
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      // set the vertex buffer to be drawn
      gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
      // set the shader to use
      gl.useProgram(this.shaderProgram);
      // connect up the shader parameters: vertex position and projection/model matrices
      gl.vertexAttribPointer(
        this.shaderVertexPositionAttribute,
        obj.vertSize,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.uniformMatrix4fv(
        this.shaderProjectionMatrixUniform,
        false,
        this.projectionMatrix
      );
      gl.uniformMatrix4fv(
        this.shaderModelViewMatrixUniform,
        false,
        this.modelViewMatrix
      );
      // draw the object
    }
  }
};
</script>
