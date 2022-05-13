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
    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    // part 2 - load textures
    const sunTexture = new THREE.TextureLoader().load('./assets/sun.jpeg');
    const moonTexture = new THREE.TextureLoader().load('./assets/moon.jpeg');
    const earthTexture = new THREE.TextureLoader().load('./assets/earth.jpeg');

    // part 2 - set up initial scene with sun + earth
    // const sunGeometry = new THREE.SphereGeometry(4);
    // const sunMaterial = new THREE.MeshStandardMaterial({
    //   map: sunTexture,
    // });
    // const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    // test.scene.add(sunMesh);

    // const earthGeometry = new THREE.SphereGeometry(2);
    // const earthMaterial = new THREE.MeshStandardMaterial({
    //   map: earthTexture,
    // });
    // const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    // earthMesh.position.x = 12;
    // test.scene.add(earthMesh);

    // part 2.1 - start rotating the earth around the sun
    // const animate = () => {
    //   test.scene.rotation.y += 0.005;
    //   window.requestAnimationFrame(animate);
    // };
    // animate();

    // part 2.2 - rotate earth around the sun by updating position
    // const animate = () => {
    //   const t = test.clock.getElapsedTime();
    //   earthMesh.position.x = 12 * Math.cos(t / 2);
    //   earthMesh.position.z = -12 * Math.sin(t / 2);
    //   window.requestAnimationFrame(animate);
    // };
    // animate();

    // part 2.3 - add day night cycle to earth
    // const animate = () => {
    //   const t = test.clock.getElapsedTime();
    //   earthMesh.position.x = 12 * Math.cos(t / 2);
    //   earthMesh.position.z = -12 * Math.sin(t / 2);
    //   earthMesh.rotation.y = t;
    //   window.requestAnimationFrame(animate);
    // };
    // animate();

    // part 2.4 - what about the moon?
    // pretty complicated, eh?

    // part 3 - refactor initial sun + earth scene groups
    const solarSystemGroup = new THREE.Group();
    const earthOrbit = new THREE.Group();

    const sunGeometry = new THREE.SphereGeometry(4);
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    solarSystemGroup.add(sunMesh);
    test.scene.add(solarSystemGroup);

    const earthGeometry = new THREE.SphereGeometry(2);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMesh.position.x = 12;
    earthOrbit.add(earthMesh);
    test.scene.add(earthOrbit);

    // part 3.1 - start rotating the earth around the sun
    // const animate = () => {
    //   earthOrbit.rotation.y += 0.005;
    //   window.requestAnimationFrame(animate);
    // };
    // animate();

    // part 3.2 - add the moon to the earth orbit
    const moonOrbit = new THREE.Group();
    const moonGeometry = new THREE.SphereGeometry(1);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonOrbit.add(moonMesh);
    moonOrbit.position.x = 12;
    moonMesh.position.x = 4;
    earthOrbit.add(moonOrbit);

    // part 3.3 - animate earth rotation and moon rotation
    const animate = () => {
      earthOrbit.rotation.y += 0.005;
      moonOrbit.rotation.y += 0.05;
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
