import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const axesHelper = new THREE.AxesHelper(16);
    test.scene.add(axesHelper);

    // part 1 - boilerplate code
    // const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);
    // const boxMaterial = new THREE.MeshStandardMaterial({
    //   color: 0xff0000,
    //   wireframe: true,
    // });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // refactor glsl shader code
    // const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);
    // const boxMaterial = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: `
    //   void main()	{
    //     vec4 result;
    //     result = vec4(position.x, position.y, position.z, 1.0);
    //     gl_Position = projectionMatrix
    //       * modelViewMatrix
    //       * result;
    //   }
    //   `,
    //   fragmentShader: `
    //   // varying vec3 pos;
    //   void main() {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //   }
    //   `,
    // });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // define uniform data
    const uniformData = {
      u_time: {
        type: 'f',
        value: test.clock.getElapsedTime(),
      },
    };
    const render = () => {
      uniformData.u_time.value = test.clock.getElapsedTime();
      window.requestAnimationFrame(render);
    };
    render();

    // glsl shader with uniform variables
    // const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);
    // const boxMaterial = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   uniforms: uniformData,
    //   vertexShader: `
    //   uniform float u_time;

    //   void main()	{
    //     vec4 result;

    //     // re-write boiler plate code with shader
    //     // result = vec4(position.x, position.y, position.z, 1.0);
    //     // result = vec4(position.x, position.y + sin(u_time), position.z, 1.0);

    //     // convert box into a 2D sine wave plane
    //     // result = vec4(position.x, sin(position.z), position.z, 1.0);
    //     // result = vec4(position.x, sin(position.z + u_time), position.z, 1.0);

    //     // change the 2D sine wave plane into a wavy box
    //     // result = vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
    //     // result = vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);

    //     // change how wavy the box is by updating frequency
    //     // result = vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
    //     // result = vec4(position.x, sin((position.z)/4.0 + u_time) + position.y, position.z, 1.0);

    //     // change the amplitude of the box's waves
    //     // result = vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
    //     result = vec4(position.x, 4.0*sin(position.z/4.0 + u_time) + position.y, position.z, 1.0);

    //     gl_Position = projectionMatrix
    //       * modelViewMatrix
    //       * result;
    //   }
    //   `,
    //   fragmentShader: `
    //   uniform float u_time;
    //   void main() {
    //     // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     // gl_FragColor = vec4(sin(u_time), 0.0, 0.0, 1.0);
    //     gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
    //   }
    //   `,
    // });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // varying variables
    const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);
    const boxMaterial = new THREE.ShaderMaterial({
      wireframe: true,
      uniforms: uniformData,
      vertexShader: `
      varying vec3 pos;
      uniform float u_time;

      void main()	{
        vec4 result;
        pos = position;

        result = vec4(
          position.x,
          4.0*sin(position.z/4.0 + u_time) + position.y,
          position.z,
          1.0
        );

        gl_Position = projectionMatrix
          * modelViewMatrix
          * result;
      }
      `,
      fragmentShader: `
      varying vec3 pos;
      uniform float u_time;
      void main() {
        if (pos.x >= 0.0) {
          // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
          gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
        } else {
          // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
          gl_FragColor = vec4(0.0, abs(cos(u_time)), 0.0, 1.0);
        }
      }
      `,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
