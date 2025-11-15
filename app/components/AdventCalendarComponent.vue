<template>
  <TresPerspectiveCamera :position="[5, 0, 0]" :look-at="[0, 0, 0]" />
  <primitive
    :position="[0, 0, 0]"
    v-if="state"
    :object="state?.scene"
    ref="calendarRef"
  />
  <TresAmbientLight :position="[5, 0, 0]" :intensity="1.1" />
</template>

<script lang="ts" setup>
import { useGLTF } from "@tresjs/cientos";
import { useTresContext } from "@tresjs/core";
import * as THREE from "three";
import { ref } from "vue";
import { useMouse } from "@vueuse/core";

const { state } = useGLTF("/AdventCalendar/Calendar.glb");
const calendarRef = ref<THREE.Object3D>();

const target = new THREE.Object3D();

const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const intersectionPlane = new THREE.Plane();
const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const multiplicator = 0.65;

const { sizes, camera, scene } = useTresContext();
const { onBeforeRender } = useLoop();
const { x, y } = useMouse();

watch([x, y], () => {
  setMousePosition(
    new PointerEvent("pointermove", { clientX: x.value, clientY: y.value })
  );
});

function setMousePosition(event: PointerEvent) {
  mousePosition.x = (event.clientX / sizes.width.value) * 2 - 1;
  mousePosition.y = (event.clientY / sizes.height.value) * 2 + 1;

  planeNormal.copy(camera.activeCamera.value.position).normalize();
  intersectionPlane.setFromNormalAndCoplanarPoint(
    planeNormal,
    scene.value.position
  );

  raycaster.setFromCamera(mousePosition, camera.activeCamera.value);
  raycaster.ray.intersectPlane(intersectionPlane, intersectionPoint);

  target.position.set(
    2,
    (-intersectionPoint.y + 4.5) * multiplicator,
    (intersectionPoint.z + 0.15) * multiplicator
  );
}

onBeforeRender(() => {
  if (!calendarRef.value) return;

  const object = calendarRef.value;

  object.lookAt(target.position);
  object.rotateY(-1.5);
});
</script>
