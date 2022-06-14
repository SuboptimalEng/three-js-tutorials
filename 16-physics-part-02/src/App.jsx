import { useEffect } from 'react';

import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // part 0 - add axis helper
    const axesHelper = new THREE.AxesHelper(8);
    test.scene.add(axesHelper);

    // note - code is from the cannon-es documentation
    // set up world physics with a few objects
    const physicsWorld = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
    });

    // create a ground body with a static plane
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      // infinte geometric plane
      shape: new CANNON.Plane(),
    });
    // rotate ground body by 90 degrees
    groundBody.quaternion.setFromEuler(-Math.PI / 2, Math.PI / 16, 0);
    physicsWorld.addBody(groundBody);

    // create a sphere and set it at y=10
    const radius = 1;
    const sphereBody = new CANNON.Body({
      mass: 5,
      shape: new CANNON.Sphere(radius),
    });
    sphereBody.position.set(0, 7, 0);
    physicsWorld.addBody(sphereBody);

    // add a box object
    const boxBody = new CANNON.Body({
      mass: 5,
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
    });
    boxBody.position.set(0.2, 10, 0);
    physicsWorld.addBody(boxBody);

    // bind cannon debugger to the three.js scene + physics world
    const cannonDebugger = new CannonDebugger(test.scene, physicsWorld, {});

    // combine the three.js game world with the physics world
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshNormalMaterial();
    const sphereMesh = new THREE.Mesh(geometry, material);
    test.scene.add(sphereMesh);

    // combine the three.js game world with the physics world
    const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    test.scene.add(boxMesh);

    const animate = () => {
      physicsWorld.fixedStep();
      cannonDebugger.update();
      boxMesh.position.copy(boxBody.position);
      boxMesh.quaternion.copy(boxBody.quaternion);
      sphereMesh.position.copy(sphereBody.position);
      sphereMesh.quaternion.copy(sphereBody.quaternion);
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
