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
    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // part 1 - typeface.json font loader
    const fontLoader = new FontLoader();
    fontLoader.load(
      'node_modules/three/examples/fonts/droid/droid_serif_regular.typeface.json',
      (droidFont) => {
        const textGeometry = new TextGeometry('hello world', {
          height: 2,
          size: 10,
          font: droidFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -36;
        textMesh.position.y = 5;
        test.scene.add(textMesh);
      }
    );

    // part 2 - true type font loader
    const ttfLoader = new TTFLoader();
    ttfLoader.load(
      // 'node_modules/three/examples/fonts/ttf/kenpixel.ttf',
      'node_modules/three/examples/fonts/ttf/kenpixel.ttf',
      (json) => {
        // First parse the font.
        const kenpixelFont = fontLoader.parse(json);
        // Use parsed font as normal.
        const textGeometry = new TextGeometry('hello world', {
          height: 2,
          size: 10,
          font: kenpixelFont,
        });
        const textMaterial = new THREE.MeshNormalMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = -50;
        textMesh.position.y = -15;
        test.scene.add(textMesh);
      }
    );
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
