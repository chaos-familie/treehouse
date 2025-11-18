<template>
  <TresPerspectiveCamera :position="cameraPosition" :look-at="[0, 0, 0]" />
  <primitive
    :position="[0, 0.35, 0]"
    v-if="state"
    :object="state?.scene"
    ref="calendarRef"
  />
  <TresAmbientLight :position="[6, 0, 0]" :intensity="3.5" />
</template>

<script lang="ts" setup>
import { useGLTF } from "@tresjs/cientos";
import { useTresContext } from "@tresjs/core";
import * as THREE from "three";
import { ref } from "vue";
import { useMouse, useWindowSize } from "@vueuse/core";

const { state, isLoading } = useGLTF("/AdventCalendar/Calendar.glb");
const calendarRef = ref<THREE.Object3D>();

const target = new THREE.Object3D();

const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const intersectionPlane = new THREE.Plane();
const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const cameraPosition = ref<THREE.Vector3>(new THREE.Vector3(6, 0, 0));

const multiplicator = 0.65;

const { sizes, camera, scene } = useTresContext();
const { onBeforeRender } = useLoop();
const { x, y } = useMouse();
const windowSize = useWindowSize();

watch(windowSize.width, setCameraPosition);

function setCameraPosition() {
  if (windowSize.width.value < 900) {
    cameraPosition.value = new THREE.Vector3(8, 0, 0);
  } else {
    cameraPosition.value = new THREE.Vector3(6, 0, 0);
  }
}

setCameraPosition();

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
    (-intersectionPoint.y + 5.75) * multiplicator,
    (intersectionPoint.z + 0.5) * multiplicator
  );
}

onBeforeRender(() => {
  if (!calendarRef.value) return;

  const object = calendarRef.value;

  object.lookAt(target.position);
  object.rotateY(-1.35);
});

watch(isLoading, () => {
  const video = document.createElement("video");

  video.playsInline = true;
  video.loop = true;
  video.crossOrigin = "anonymous";
  video.src =
    "https://cms.chaos-familie.de/assets/0c815ad5-d890-4bf9-a7ff-69cc9c2e6442";

  video.play().catch((error) => {
    console.error("Video Playback Error:", error);
  });

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

  state.value?.scene.traverse((node) => {
    if (node.type != "Mesh") return;

    const mesh = node as THREE.Mesh;
    const material = mesh.material as THREE.MeshStandardMaterial;

    material.toneMapped = false;
    material.map = texture;
    material.needsUpdate = true;
  });
});
</script>
