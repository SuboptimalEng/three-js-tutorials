import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // part 0 - add axis helper
    const axisHelper = new THREE.AxesHelper(8);
    test.scene.add(axisHelper);

    // part 1 - boilerplate code
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh1 = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh1.position.x = -4;
    test.scene.add(boxMesh1);
    const boxMesh2 = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh2.position.x = 4;
    test.scene.add(boxMesh2);

    const animate = () => {
      const elapsedTime = test.clock.getElapsedTime();
      boxMesh1.position.x = 4 * Math.cos(elapsedTime);
      boxMesh1.position.y = 4 * Math.sin(elapsedTime);
      boxMesh2.position.x = -4 * Math.cos(elapsedTime);
      boxMesh2.position.y = -4 * Math.sin(elapsedTime);
      window.requestAnimationFrame(animate);
    };
    animate();

    // part 2 - group example

    // part 3 - solar system example
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
