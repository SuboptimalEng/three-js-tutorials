import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // part 0 - add axis helper
    const axesHelper = new THREE.AxesHelper(16);
    test.scene.add(axesHelper);

    // part 1 - boilerplate code
    const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      wireframe: true,
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
