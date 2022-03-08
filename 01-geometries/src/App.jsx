import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const threeGroup = new THREE.Group();
    test.scene.add(threeGroup);

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = -1;
    threeGroup.add(boxMesh);

    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
    const cylinderMaterial = new THREE.MeshNormalMaterial();
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.x = 1;
    threeGroup.add(cylinderMesh);

    const animate = () => {
      // boxMesh.rotateX(0.001);
      // boxMesh.rotateY(0.001);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
