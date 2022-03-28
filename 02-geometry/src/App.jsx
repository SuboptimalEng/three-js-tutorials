import { useEffect } from 'react';

import * as THREE from 'three';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // PART 1
    // Adding geometries to a three.js scene.
    // const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // boxMesh.position.x = -1;
    // test.scene.add(boxMesh);

    // const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 16);
    // const cylinderMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    // cylinderMesh.position.x = 1;
    // test.scene.add(cylinderMesh);

    // const torusGeometry = new THREE.TorusGeometry(0.5, 0.25, 20, 20);
    // const torusMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // test.scene.add(torusMesh);

    // PART 2
    // Why add width/height segments for a geometry?
    // function vertexShader() {
    //   return `
    //       varying float z;
    //       uniform float u_time;
    //       void main() {
    //         z = (cos(position.y + u_time) + sin(position.x + u_time)) / 4.0;
    //         gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z + position.z, 1.0);
    //       }
    //     `;
    // }
    // function fragmentShader() {
    //   return `
    //       void main() {
    //         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //       }
    //     `;
    // }
    // const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
    // const material = new THREE.ShaderMaterial({
    //   uniforms: test.uniforms,
    //   fragmentShader: fragmentShader(),
    //   vertexShader: vertexShader(),
    //   wireframe: true,
    // });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.x = Math.PI / 2;
    // test.scene.add(mesh);

    // PART 3
    // Showcase "hidden" geometries.
    const roundedBoxGeometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
    const roundedBoxMaterial = new THREE.MeshNormalMaterial({
      wireframe: true,
    });
    const roundedBoxMesh = new THREE.Mesh(
      roundedBoxGeometry,
      roundedBoxMaterial
    );
    roundedBoxMesh.position.x = -1;
    test.scene.add(roundedBoxMesh);

    const teapotGeometry = new TeapotGeometry(0.5, 8);
    const teapotMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
    teapotMesh.position.x = 1;
    test.scene.add(teapotMesh);

    // const animate = () => {
    //   boxMesh.rotateX(0.001);
    //   boxMesh.rotateY(0.001);
    //   window.requestAnimationFrame(animate);
    // };
    // animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
