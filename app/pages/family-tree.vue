<template>
  <div class="overflow-hidden rounded-xl h-full" ref="mouseWindow">
    <div ref="treeMain" style="scale: 1" class="w-fit h-fit">
      <NuxtImg
        src="09c98409-b00d-468e-b7ac-fc5c7e242a7e"
        style="
          border-radius: 100%;
          border-width: 4px;
          border-style: solid;
          border-color: red;
        "
        :width="64"
      >
      </NuxtImg>
    </div>
  </div>
</template>

<script lang="ts" setup>
const treeMain = ref<HTMLElement | null>(null);
const mouseWindow = ref<HTMLElement | null>(null);

watch(mouseWindow, () => {
  mouseWindow.value!.addEventListener("wheel", onScroll);
  mouseWindow.value!.addEventListener("mousedown", onMouseDown);
  mouseWindow.value!.addEventListener("mouseup", onMouseUp);
});

function onScroll(event: WheelEvent) {
  event.preventDefault();

  const currentScale = Number(treeMain.value!.style.scale);

  let newScale: number;

  if (event.deltaY > 0) {
    newScale = currentScale - 0.05;
  } else {
    newScale = currentScale + 0.05;
  }

  if (newScale >= 0.1 && newScale <= 5) {
    treeMain.value!.style.scale = String(newScale);
  }
}

let isMoving = ref(false);

function onMouseUp(event: MouseEvent) {
  if (event.button === 1) {
    isMoving.value = false;
    treeMain.value!.style.cursor = `default`;
  }
}

function onMouseDown(event: MouseEvent) {
  if (event.button === 1) {
    isMoving.value = true;
    treeMain.value!.style.cursor = `grabbing`;
  }
}

watch(isMoving, (newValue) => {
  if (newValue) {
    mouseWindow.value!.addEventListener("mousemove", onMouseMove);
  } else {
    mouseWindow.value!.removeEventListener("mousemove", onMouseMove);
  }
});

function onMouseMove(event: MouseEvent) {
  if (!treeMain.value || !mouseWindow.value) {
    return;
  }

  const currentScale = Number(treeMain.value.style.scale) || 1;

  const treeMainRect = treeMain.value.getBoundingClientRect();
  const mouseWindowRect = mouseWindow.value.getBoundingClientRect();

  const dx = event.clientX - mouseWindowRect.left - treeMainRect.width / 2;
  const dy = event.clientY - mouseWindowRect.top - treeMainRect.height / 2;

  const scaledDx = dx / currentScale;
  const scaledDy = dy / currentScale;

  treeMain.value.style.transform = `translate(${scaledDx}px, ${scaledDy}px)`;
}
</script>
