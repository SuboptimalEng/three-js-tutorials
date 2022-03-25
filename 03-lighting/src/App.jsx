import { useEffect } from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // initialize gui
    const gui = new GUI();

    // set up ground
    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    test.scene.add(groundMesh);

    // set up box meshes
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.position.x = -2;
    test.scene.add(boxMesh1);

    const bg2 = new THREE.BoxGeometry(1, 1, 1);
    const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh2 = new THREE.Mesh(bg2, bm2);
    boxMesh2.castShadow = true;
    boxMesh2.position.x = 0;
    test.scene.add(boxMesh2);

    const bg3 = new THREE.BoxGeometry(1, 1, 1);
    const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 2;
    test.scene.add(boxMesh3);

    // set up ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    test.scene.add(al);

    // set up ambient light settings
    const alFolder = gui.addFolder('ambient light');
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, 'intensity', 0, 1, 0.25);
    alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open();

    // setup directional light + helper
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    dl.position.set(0, 2, 0);
    test.scene.add(dl);
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    test.scene.add(dlHelper);

    // set up directional light settings
    const dlSettings = {
      visible: true,
      color: dl.color.getHex(),
    };
    const dlFolder = gui.addFolder('directional light');
    dlFolder.add(dlSettings, 'visible').onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, 'intensity', 0, 1, 0.25);
    dlFolder.add(dl.position, 'y', 1, 4, 0.5);
    dlFolder.add(dl, 'castShadow');
    dlFolder
      .addColor(dlSettings, 'color')
      .onChange((value) => dl.color.set(value));
    dlFolder.open();

    // set up spot light + helper
    const sl = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 8, 0);
    sl.position.set(0, 2, 2);
    test.scene.add(sl);
    const slHelper = new THREE.SpotLightHelper(sl);
    test.scene.add(slHelper);

    const slSettings = {
      visible: true,
      color: sl.color.getHex(),
    };
    const slFolder = gui.addFolder('spot light');
    slFolder.add(slSettings, 'visible').onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, 'intensity', 0, 4);
    slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2);
    slFolder.add(sl, 'castShadow');
    slFolder
      .addColor(slSettings, 'color')
      .onChange((value) => sl.color.set(value));
    slFolder.open();

    // spotLight.castShadow = true;
    // spotLight.position.set(0, 1, 0);
    // test.scene.add(spotLight);
    // test.scene.add(spotLightHelper);
    // const spot = gui.addFolder('spotlight');
    // spot.add(spotLight, 'intensity', 0, 1);
    // spot.open();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
