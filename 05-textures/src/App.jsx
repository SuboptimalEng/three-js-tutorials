import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    const uvTexture = new THREE.TextureLoader().load('./assets/uv.png');
    const crateTexture = new THREE.TextureLoader().load('./assets/crate.png');
    const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpeg');
    const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg');

    spaceTexture.wrapS = THREE.RepeatWrapping;
    spaceTexture.wrapT = THREE.RepeatWrapping;
    spaceTexture.repeat.set(2, 2);
    test.scene.background = spaceTexture;

    // const groundGeometry = new THREE.BoxGeometry(200, 2, 200);
    // const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    // groundMesh.receiveShadow = true;
    // groundMesh.position.y = -16;
    // test.scene.add(groundMesh);

    // const ge0 = new THREE.BoxGeometry(7, 7, 7);
    // const me0 = new THREE.MeshStandardMaterial({ color: 0xfafafa });
    // const boxMe0 = new THREE.Mesh(ge0, me0);
    // boxMe0.position.x = -16;
    // boxMe0.position.y = -6;
    // test.scene.add(boxMe0);

    const ge1 = new THREE.BoxGeometry(7, 7, 7);
    const me1 = new THREE.MeshStandardMaterial({ map: uvTexture });
    const boxMe1 = new THREE.Mesh(ge1, me1);
    boxMe1.position.x = -9;
    boxMe1.position.y = -5;
    test.scene.add(boxMe1);

    const ge2 = new THREE.BoxGeometry(7, 7, 7);
    const me2 = new THREE.MeshStandardMaterial({ map: crateTexture });
    const boxMe2 = new THREE.Mesh(ge2, me2);
    boxMe2.position.x = 0;
    boxMe2.position.y = -5;
    test.scene.add(boxMe2);

    const ge3 = new THREE.BoxGeometry(7, 7, 7);
    const me3 = new THREE.MeshStandardMaterial({ map: earthTexture });
    const boxMe3 = new THREE.Mesh(ge3, me3);
    boxMe3.position.x = 9;
    boxMe3.position.y = -5;
    test.scene.add(boxMe3);

    // const ge4 = new THREE.SphereGeometry(4);
    // const me4 = new THREE.MeshStandardMaterial({ color: 0xfafafa });
    // const sphereMe4 = new THREE.Mesh(ge4, me4);
    // sphereMe4.castShadow = true;
    // sphereMe4.position.x = -16;
    // sphereMe4.position.y = 6;
    // test.scene.add(sphereMe4);

    const ge5 = new THREE.SphereGeometry(4);
    const me5 = new THREE.MeshStandardMaterial({ map: uvTexture });
    const sphereMe5 = new THREE.Mesh(ge5, me5);
    sphereMe5.position.x = -9;
    sphereMe5.position.y = 5;
    test.scene.add(sphereMe5);

    const ge6 = new THREE.SphereGeometry(4);
    const me6 = new THREE.MeshStandardMaterial({ map: crateTexture });
    const sphereMe6 = new THREE.Mesh(ge6, me6);
    sphereMe6.position.x = 0;
    sphereMe6.position.y = 5;
    test.scene.add(sphereMe6);

    const ge7 = new THREE.SphereGeometry(4);
    const me7 = new THREE.MeshStandardMaterial({ map: earthTexture });
    const sphereMe7 = new THREE.Mesh(ge7, me7);
    sphereMe7.position.x = 9;
    sphereMe7.position.y = 5;
    test.scene.add(sphereMe7);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
