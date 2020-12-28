// This snow effect is based on Codepen:
// https://codepen.io/bsehovac/pen/GPwXxq
//
// Original author of the Codepen:
// https://github.com/bsehovac
//
// To enable it on any page insert the following snippet to your HTML:
// <script type="text/javascript">
//   var snowConfig = {
//     color: [1, 0.5, 1],
//   };
// </script>
// <script type="text/javascript" src="https://storage.yandexcloud.net/slaylines/uploads/snowflakes.min.1.0.0.js" defer></script>

class SnowProgram {
  constructor($container, config) {
    const { density, depth, count, gravity, speed, color, opacity } = config || {};

    this.density = density || 1 / 90;
    this.depth = depth || 80;
    this.count = count || 7000;
    this.gravity = gravity || 100;
    this.speed = speed || 1 / 5000;
    this.color = color || [1, 1, 1];
    this.opacity = opacity || 0.2;

    this.SNOWFLAKE =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGAGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTUtMDctMDNUMTg6NTk6MjIrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmIzMzBlMWI0LTk5ZDctNGU2NS05MGQ2LTNmYjFiYmE2ZTE0MCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjAyNThjNzMxLTQ4ZjQtYTA0MS1hNGFkLTQ4MTA2MTVjY2FlYSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjJjY2VkMTUyLTRjNzAtNDFlZC1hMzcyLWRlOWY4NjgyZTcwMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MmNjZWQxNTItNGM3MC00MWVkLWEzNzItZGU5Zjg2ODJlNzAxIiBzdEV2dDp3aGVuPSIyMDE1LTA3LTAzVDE4OjU5OjIyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YjMzMGUxYjQtOTlkNy00ZTY1LTkwZDYtM2ZiMWJiYTZlMTQwIiBzdEV2dDp3aGVuPSIyMDE5LTAxLTEyVDE1OjE0OjQwKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz50mbqsAAAToElEQVR4nOVbW49dR5X+VlXtc2v3Ne52N6bTTnAc0u02GRJQwEhYQkJ5QhmhPPOUl0iBB/4AP4JfMA95IEIaJEYiQhlesCZMEE1iGxJHIjK21XbSwX1xd5+zd9Va87BrVdfefWwI4xEaUVJpn7PPPnVqfbUu31pVh0QE/8zN/KMn8I9uTl+8+uqrAAARgYgghIBer4dnnnkGAPDFL34RANDr9eiJJ55AVVUgIhhjwMwYDAbY3Nyk8+fPP/DHdnd3ZWtr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';

    this.VERTEX_SOURCE = `
      precision highp float;

      attribute vec4 a_position;
      attribute vec4 a_color;
      attribute vec3 a_rotation;
      attribute vec3 a_speed;
      attribute float a_size;

      uniform float u_time;
      uniform mat4 u_projection;
      uniform vec3 u_worldSize;
      uniform float u_gravity;
      uniform float u_wind;

      varying vec4 v_color;
      varying float v_rotation;

      void main() {
        v_color = a_color;
        v_rotation = a_rotation.x + u_time * a_rotation.y;

        vec3 pos = a_position.xyz;

        pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;
        pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;

        pos.x += sin(u_time * a_speed.z) * a_rotation.z;
        pos.z += cos(u_time * a_speed.z) * a_rotation.z;

        gl_Position = u_projection * vec4(pos.xyz, a_position.w);
        gl_PointSize = (a_size / gl_Position.w) * 100.0;
      }
    `;

    this.FRAGMENT_SOURCE = `
      precision highp float;

      uniform sampler2D u_texture;

      varying vec4 v_color;
      varying float v_rotation;

      void main() {
        vec2 rotated = vec2(
          cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,
          cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5
        );

        vec4 snowflake = texture2D(u_texture, rotated);

        gl_FragColor = vec4(snowflake.rgb * v_color.xyz, snowflake.a * v_color.a);
      }
    `;

    this.INITIAL_BUFFERS = () => ({
      position: { size: 3, value: [] },
      color: { size: 4, value: [] },
      size: { size: 1, value: [] },
      rotation: { size: 3, value: [] },
      speed: { size: 3, value: [] },
    });

    this.INITIAL_UNIFORMS = () => ({
      time: { type: 'float', value: 0 },
      worldSize: { type: 'vec3', value: [0, 0, 0] },
      gravity: { type: 'float', value: this.gravity },
      wind: { type: 'float', value: 0 },
      projection: {
        type: 'mat4',
        value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      },
    });

    this.UNIFORM_SETTERS = {
      int: 'uniform1i',
      float: 'uniform1f',
      vec2: 'uniform2fv',
      vec3: 'uniform3fv',
      vec4: 'uniform4fv',
      mat2: 'uniformMatrix2fv',
      mat3: 'uniformMatrix3fv',
      mat4: 'uniformMatrix4fv',
    };

    this.CANVAS_STYLE = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'transparent',
      'z-index': -1,
    };

    this.CAMERA = {
      fov: 60,
      near: 1,
      far: 10000,
      aspect: 1,
      z: 100,
    };

    this.WIND = {
      current: 0,
      force: 0.1,
      target: 0.1,
      min: 0.1,
      max: 0.25,
      easing: 0.005,
    };

    this.init($container);
  }

  init($container) {
    const $canvas = this.initCanvas();
    const gl = $canvas.getContext('webgl', { antialias: true });

    $container.append($canvas);

    this.$canvas = $canvas;
    this.gl = gl;
    this.program = this.initProgram();
    this.buffers = this.initBuffers();
    this.uniforms = this.initUniforms();
    this.texture = this.initTexture();
    this.camera = this.initCamera();
    this.wind = this.initWind();

    this.resize = this.resize.bind(this);
    this.update = this.update.bind(this);
  }

  initCanvas() {
    const $canvas = document.createElement('canvas');

    Object.assign($canvas.style, this.CANVAS_STYLE);

    return $canvas;
  }

  initCamera() {
    return { ...this.CAMERA };
  }

  initWind() {
    return { ...this.WIND };
  }

  initShader(type, source) {
    const { gl } = this;
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    return shader;
  }

  initProgram() {
    const { gl } = this;
    const vertex = this.initShader(gl.VERTEX_SHADER, this.VERTEX_SOURCE);
    const fragment = this.initShader(gl.FRAGMENT_SHADER, this.FRAGMENT_SOURCE);
    const program = gl.createProgram();

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);

    return program;
  }

  initBuffers() {
    const { gl, program } = this;
    const buffers = this.INITIAL_BUFFERS();

    Object.entries(buffers).forEach(([name, buffer]) => {
      buffer.location = gl.getAttribLocation(program, `a_${name}`);
      buffer.ref = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer.ref);
      gl.enableVertexAttribArray(buffer.location);
      gl.vertexAttribPointer(
        buffer.location,
        buffer.size,
        gl.FLOAT,
        false,
        0,
        0
      );
    });

    return buffers;
  }

  updateBuffers() {
    const { gl, buffers } = this;

    Object.keys(buffers).forEach((name) => {
      this.setBuffer(name);
    });
  }

  setBuffer(name, value) {
    const { gl, buffers } = this;
    const buffer = buffers[name];

    buffer.value = new Float32Array(value || buffer.value);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.ref);
    gl.bufferData(gl.ARRAY_BUFFER, buffer.value, gl.STATIC_DRAW);
  }

  initUniforms() {
    const { gl, program } = this;
    const uniforms = this.INITIAL_UNIFORMS();

    Object.entries(uniforms).forEach(([name, uniform]) => {
      uniform.location = gl.getUniformLocation(program, `u_${name}`);
    });

    return uniforms;
  }

  updateUniforms() {
    const { gl, uniforms } = this;

    Object.keys(uniforms).forEach((name) => {
      this.setUniform(name);
    });
  }

  setUniform(name, value) {
    const { gl, uniforms } = this;
    const uniform = uniforms[name];
    const setter = this.UNIFORM_SETTERS[uniform.type];
    const isMatrix = /^mat[2-4]$/i.test(uniform.type);

    uniform.value = value || uniform.value;

    if (isMatrix) {
      gl[setter](uniform.location, false, uniform.value);
    } else {
      gl[setter](uniform.location, uniform.value);
    }
  }

  initTexture() {
    const { gl } = this;
    const texture = gl.createTexture();
    const image = new Image();

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    );

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    image.src = this.SNOWFLAKE;

    return texture;
  }

  initSnowflakes(vw, vh, dpi) {
    const position = [];
    const color = [];
    const size = [];
    const rotation = [];
    const speed = [];

    const height = 1 / this.density;
    const width = (vw / vh) * height;
    const depth = this.depth;
    const count = this.count;
    const length = (vw / vh) * count;

    for (let i = 0; i < length; ++i) {
      position.push(
        -width + Math.random() * width * 2,
        -height + Math.random() * height * 2,
        Math.random() * depth * 2
      );

      speed.push(1 + Math.random(), 1 + Math.random(), Math.random() * 10);

      rotation.push(
        Math.random() * 2 * Math.PI,
        Math.random() * 20,
        Math.random() * 10
      );

      color.push(...this.color, 0.1 + Math.random() * this.opacity);
      size.push((5 * Math.random() * 5 * vh * dpi) / 1000);
    }

    return {
      width,
      height,
      depth,
      position,
      color,
      size,
      rotation,
      speed,
    };
  }

  setProjection(aspect) {
    const { camera } = this;

    camera.aspect = aspect;

    const fovRad = (camera.fov * Math.PI) / 180;
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fovRad);
    const rangeInv = 1.0 / (camera.near - camera.far);

    const m0 = f / camera.aspect;
    const m5 = f;
    const m10 = (camera.near + camera.far) * rangeInv;
    const m11 = -1;
    const m14 = camera.near * camera.far * rangeInv * 2 + camera.z;
    const m15 = camera.z;

    return [m0, 0, 0, 0, 0, m5, 0, 0, 0, 0, m10, m11, 0, 0, m14, m15];
  }

  render() {
    const { gl } = this;

    gl.enable(gl.BLEND);
    gl.enable(gl.CULL_FACE);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.disable(gl.DEPTH_TEST);

    this.updateBuffers();
    this.updateUniforms();
    this.resize();

    this.time = {
      start: window.performance.now(),
      previous: window.performance.now(),
    };

    window.requestAnimationFrame(this.update);
  }

  resize() {
    const { $canvas, gl } = this;
    const vw = $canvas.offsetWidth;
    const vh = $canvas.offsetHeight;
    const aspect = vw / vh;
    const dpi = window.devicePixelRatio;

    const {
      width,
      height,
      depth,
      position,
      color,
      size,
      rotation,
      speed,
    } = this.initSnowflakes(vw, vh, dpi);

    $canvas.width = vw * dpi;
    $canvas.height = vh * dpi;

    gl.viewport(0, 0, vw * dpi, vh * dpi);
    gl.clearColor(0, 0, 0, 0);

    this.setUniform('projection', this.setProjection(aspect));
    this.setUniform('worldSize', [width, height, depth]);

    this.setBuffer('position', position);
    this.setBuffer('color', color);
    this.setBuffer('rotation', rotation);
    this.setBuffer('size', size);
    this.setBuffer('speed', speed);
  }

  update(timestamp) {
    const { gl, buffers, wind } = this;
    const elapsed = (timestamp - this.time.start) * this.speed;
    const delta = timestamp - this.time.previous;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(
      gl.POINTS,
      0,
      buffers.position.value.length / buffers.position.size
    );

    if (Math.random() > 0.995) {
      wind.target =
        (wind.min + Math.random() * (wind.max - wind.min)) *
        (Math.random() > 0.5 ? -1 : 1);
    }

    wind.force += (wind.target - wind.force) * wind.easing;
    wind.current += wind.force * (delta * 0.2);

    this.setUniform('wind', wind.current);
    this.setUniform('time', elapsed);

    this.time.previous = timestamp;

    window.requestAnimationFrame(this.update);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SnowProgram(document.body, window.snowConfig).render();
});
