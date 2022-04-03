import { useEffect } from 'react';

import * as THREE from 'three';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // Part 0
    // const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // // Part 1
    // const spaceTexture = new THREE.TextureLoader().load('./assets/space.jpeg');
    // spaceTexture.wrapS = THREE.RepeatWrapping;
    // spaceTexture.wrapT = THREE.RepeatWrapping;
    // spaceTexture.repeat.set(2, 2);
    // test.scene.background = spaceTexture;

    // // Part 2
    const uvTexture = new THREE.TextureLoader().load('./assets/uv.png');
    const crateTexture = new THREE.TextureLoader().load('./assets/crate.png');
    const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpeg');
    const brickTexture = new THREE.TextureLoader().load('./assets/brick.jpeg');

    // Thumbnail
    // const tgeo = new THREE.BoxGeometry(15, 15, 15);
    // const tmat = new THREE.MeshStandardMaterial({
    //   map: crateTexture,
    // });
    // const tmesh = new THREE.Mesh(tgeo, tmat);
    // tmesh.rotation.y = Math.PI / 4;
    // tmesh.rotation.x = Math.PI / 8;
    // test.scene.add(tmesh);

    // Part 1.5
    const ge0 = new THREE.BoxGeometry(7, 7, 7);
    const me0 = new THREE.MeshStandardMaterial({
      map: uvTexture,
    });
    const boxMe0 = new THREE.Mesh(ge0, me0);
    boxMe0.position.x = -9;
    boxMe0.position.y = -5;
    test.scene.add(boxMe0);

    const ge1 = new THREE.BoxGeometry(7, 7, 7);
    const me1 = new THREE.MeshStandardMaterial({
      map: crateTexture,
    });
    const boxMe1 = new THREE.Mesh(ge1, me1);
    boxMe1.position.x = 0;
    boxMe1.position.y = -5;
    test.scene.add(boxMe1);

    const ge2 = new THREE.BoxGeometry(7, 7, 7);
    const me2 = new THREE.MeshStandardMaterial({
      // map: earthTexture,
      map: brickTexture,
    });
    const boxMe2 = new THREE.Mesh(ge2, me2);
    boxMe2.position.x = 9;
    boxMe2.position.y = -5;
    test.scene.add(boxMe2);

    const ge3 = new THREE.SphereGeometry(4);
    const me3 = new THREE.MeshStandardMaterial({
      map: uvTexture,
    });
    const sphereMe3 = new THREE.Mesh(ge3, me3);
    sphereMe3.position.x = -9;
    sphereMe3.position.y = 5;
    test.scene.add(sphereMe3);

    const ge4 = new THREE.SphereGeometry(4);
    const me4 = new THREE.MeshStandardMaterial({
      map: crateTexture,
    });
    const sphereMe4 = new THREE.Mesh(ge4, me4);
    sphereMe4.position.x = 0;
    sphereMe4.position.y = 5;
    sphereMe4.rotation.y = -Math.PI / 2;
    test.scene.add(sphereMe4);

    const ge5 = new THREE.SphereGeometry(4);
    const me5 = new THREE.MeshStandardMaterial({
      // map: earthTexture,
      map: brickTexture,
    });
    const sphereMe5 = new THREE.Mesh(ge5, me5);
    sphereMe5.position.x = 9;
    sphereMe5.position.y = 5;
    test.scene.add(sphereMe5);
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
