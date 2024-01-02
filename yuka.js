import * as YUKA from "yuka";
import * as THREE from "three";
import ThreeSetup from "./script";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const threesetup = new ThreeSetup();

// const geometry = new THREE.BoxGeometry(5,5);
// const material = new THREE.MeshStandardMaterial({color:'red'});
// const box = new THREE.Mesh(geometry,material);

threesetup.camera.position.set(0, 20, 0);
threesetup.camera.lookAt(threesetup.scene.position);

var geometry = new THREE.ConeGeometry(0.1, 0.5, 8);
var material = new THREE.MeshNormalMaterial();
var cone = new THREE.Mesh(geometry, material);
cone.matrixAutoUpdate = false;
threesetup.addObject(cone);

cone.rotateX(Math.PI * 0.5);
cone.scale.set(20,20,20)
// cone.rotateZ(Math.PI * 0.5);

const vehicle = new YUKA.Vehicle();
vehicle.setRenderComponent(cone, sync);

function sync(entity, renderComponent) {
  renderComponent.matrix.copy(entity.worldMatrix);
}

const path = new YUKA.Path();
path.add(new YUKA.Vector3(-4, 0, 4));
path.add(new YUKA.Vector3(-6, 0, 0));
path.add(new YUKA.Vector3(-4, 0, -4));
path.add(new YUKA.Vector3(0, 0, 0));
path.add(new YUKA.Vector3(4, 0, -4));
path.add(new YUKA.Vector3(6, 0, 0));
path.add(new YUKA.Vector3(4, 0, 4));
path.add(new YUKA.Vector3(0, 0, 6));

path.loop = true;

vehicle.position.copy(path.current());
const followpath = new YUKA.FollowPathBehavior(path, 0.5);
vehicle.steering.add(followpath);

const entitymanager = new YUKA.EntityManager();

entitymanager.add(vehicle);

const position = [];
for (let i = 0; i < path._waypoints.length; i++) {
  const waypoint = path._waypoints[i];
  position.push(waypoint.x, waypoint.y, waypoint.z);
}

const linegeometry = new THREE.BufferGeometry();
linegeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(position, 3)
);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xfffffff });
const lines = new THREE.LineLoop(linegeometry, lineMaterial);
threesetup.addObject(lines);

const time = new YUKA.Time();

const orbit = new OrbitControls(
  threesetup.camera,
  threesetup.renderer.domElement
);
orbit.update();

function animate1() {
  const delta = time.update().getDelta();
  entitymanager.update(delta);
}

threesetup.renderer.setAnimationLoop(animate1);

// threesetup.cameraz(-50)
threesetup.basiclight();
// threesetup.addObject(box)

threesetup.animate();
