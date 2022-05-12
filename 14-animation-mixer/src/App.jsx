import { useEffect } from 'react';

import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

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
    const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    const fbxLoader = new FBXLoader();

    fbxLoader.load('./assets/dancing.fbx', (model) => {
      model.scale.set(0.1, 0.1, 0.1);
      test.scene.add(model);
    });
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
