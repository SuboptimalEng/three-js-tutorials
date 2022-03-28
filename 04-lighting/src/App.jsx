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

    // main group
    const mainGroup = new THREE.Group();
    mainGroup.position.y = 0.5;
    test.scene.add(mainGroup);

    // normal box
    // const bg0 = new THREE.BoxGeometry(1, 1, 1);
    // const bm0 = new THREE.MeshNormalMaterial();
    // const boxMesh0 = new THREE.Mesh(bg0, bm0);
    // test.scene.add(boxMesh0);

    // set up ground
    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    mainGroup.add(groundMesh);

    // set up torus for youtube thumbnail
    // const bg1 = new THREE.TorusGeometry(1.5, 0.75, 64, 64);
    // const bm1 = new THREE.MeshNormalMaterial({ color: 0xff0000 });
    // const boxMesh1 = new THREE.Mesh(bg1, bm1);
    // boxMesh1.castShadow = true;
    // boxMesh1.position.y = 1;
    // boxMesh1.position.z = 1;
    // boxMesh1.rotation.x = -Math.PI / 3;
    // mainGroup.add(boxMesh1);

    // set up red box mesh
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.position.x = -2;
    mainGroup.add(boxMesh1);

    // set up green box mesh
    const bg2 = new THREE.BoxGeometry(1, 1, 1);
    const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh2 = new THREE.Mesh(bg2, bm2);
    boxMesh2.castShadow = true;
    boxMesh2.position.x = 0;
    mainGroup.add(boxMesh2);

    // set up blue box mesh
    const bg3 = new THREE.BoxGeometry(1, 1, 1);
    const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 2;
    mainGroup.add(boxMesh3);

    // set up ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    mainGroup.add(al);

    // set up ambient light gui
    const alFolder = gui.addFolder('ambient light');
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, 'visible');
    alFolder.add(al, 'intensity', 0, 1, 0.1);
    alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open();

    // setup directional light + helper
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    // use this for YouTube thumbnail
    dl.position.set(0, 2, 2);
    // dl.position.set(0, 2, 0);
    dl.castShadow = true;
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    mainGroup.add(dl);
    // mainGroup.add(dlHelper);

    // set up directional light gui
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
    const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
    sl.position.set(0, 2, 2);
    const slHelper = new THREE.SpotLightHelper(sl);
    mainGroup.add(sl, slHelper);

    // set up spot light gui
    const slSettings = {
      visible: true,
    };
    const slFolder = gui.addFolder('spot light');
    slFolder.add(slSettings, 'visible').onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, 'intensity', 0, 4, 0.5);
    slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
    slFolder.add(sl, 'castShadow');
    slFolder.open();

    const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
    pl.position.set(2, 2, 2);
    const plHelper = new THREE.PointLightHelper(pl, 0.5);
    mainGroup.add(pl, plHelper);

    // set up point light gui
    const plSettings = {
      visible: true,
      color: pl.color.getHex(),
    };
    const plFolder = gui.addFolder('point light');
    plFolder.add(plSettings, 'visible').onChange((value) => {
      pl.visible = value;
      plHelper.visible = value;
    });
    plFolder.add(pl, 'intensity', 0, 2, 0.25);
    plFolder.add(pl.position, 'x', -2, 4, 0.5);
    plFolder.add(pl.position, 'y', -2, 4, 0.5);
    plFolder.add(pl.position, 'z', -2, 4, 0.5);
    plFolder.add(pl, 'castShadow');
    plFolder
      .addColor(plSettings, 'color')
      .onChange((value) => pl.color.set(value));
    plFolder.open();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
