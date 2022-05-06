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
    const boxGeometry = new THREE.BoxGeometry(16, 4, 16, 16, 4, 16);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    // basic glsl shaders
    // const boxGeometry = new THREE.BoxGeometry(16, 8, 16, 16, 8, 16);
    // const boxMaterial = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: `
    //   void main()	{
    //     // // re-write boiler plate code with shader
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, position.y, position.z, 1.0);
    //     // // convert box into sine wave
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z), position.z, 1.0);
    //     // // make the box wavy
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
    //     // // change how wavy the box by updating frequency
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
    //     // // change the amplitude of the box's waves
    //     gl_Position = projectionMatrix
    //       * modelViewMatrix
    //       * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
    //   }
    //   `,
    //   fragmentShader: `
    //   varying vec3 pos;
    //   void main() {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     // // change the color of the box to green
    //     // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    //   }
    //   `,
    // });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // varying variable
    // const boxGeometry = new THREE.BoxGeometry(16, 8, 16, 16, 8, 16);
    // const boxMaterial = new THREE.ShaderMaterial({
    //   wireframe: true,
    //   vertexShader: `
    //   varying vec3 pos;
    //   void main()	{
    //     pos = position;
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, position.y, position.z, 1.0);
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z), position.z, 1.0);
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
    //     // gl_Position = projectionMatrix
    //     //   * modelViewMatrix
    //     //   * vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
    //     gl_Position = projectionMatrix
    //       * modelViewMatrix
    //       * vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
    //   }
    //   `,
    //   fragmentShader: `
    //   varying vec3 pos;
    //   void main() {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    //     // if (pos.x >= 0.0) {
    //     //   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     // } else {
    //     //   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    //     // }
    //   }
    //   `,
    // });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
