import { useEffect } from 'react';

import * as THREE from 'three';

import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // part 0 - comment out template code
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // part 1 - typeface.json font loader
    const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('three.js', {
          size: 20,
          height: 4,
          font: droidFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -45;
        textMesh.position.y = 0;
        test.scene.add(textMesh);
      }
    );

    // part 2 - true type font loader
    const ttfLoader = new TTFLoader();
    ttfLoader.load('fonts/jet_brains_mono_regular.ttf', (json) => {
      // First parse the font.
      const jetBrainsFont = fontLoader.parse(json);
      // Use parsed font as normal.
      const textGeometry = new TextGeometry('hello world', {
        height: 2,
        size: 10,
        font: jetBrainsFont,
      });
      const textMaterial = new THREE.MeshNormalMaterial();
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -46;
      textMesh.position.y = -10;
      // test.scene.add(textMesh);
    });
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
