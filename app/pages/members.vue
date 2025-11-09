<template>
  <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4 max-h-fit">
    <UPageCard
      v-for="mem in members"
      :key="mem.id"
      :description="mem.short_description"
      orientation="horizontal"
      spotlight
      spotlight-color="primary"
      :to="'/m/' + mem.id"
      variant="subtle"
    >
      <template #title>
        <p>{{ mem.display_name }}</p>
      </template>

      <template #footer>
        <div class="flex flex-row gap-2">
          <UBadge v-for="tag of mem.tags" :key="tag" variant="soft">{{
            tag
          }}</UBadge>
        </div>
      </template>

      <template #header>
        <div class="md:hidden">
          <NuxtImg
            v-if="mem.picture"
            :src="mem.picture"
            style="border-radius: 100%; width: 64px"
            format="webp"
            :width="80"
            :height="80"
          />
          <UAvatar
            :alt="mem.display_name"
            style="width: 80px; height: 80px"
            v-else
          /></div
      ></template>

      <div class="hidden md:block justify-self-end">
        <NuxtImg
          v-if="mem.picture"
          :src="mem.picture"
          style="border-radius: 100%"
          format="webp"
          :width="80"
          :height="80"
        />
        <UAvatar
          :alt="mem.display_name"
          style="width: 80px; height: 80px"
          v-else
        />
      </div>
    </UPageCard>
  </div>
</template>

<script lang="ts" setup>
import { readItems } from "@directus/sdk";
import { Directus } from "~/directus";

interface Member {
  id: string;
  display_name: string;
  short_description: string;
  picture: string;
  tags: string[];
}

const members = ref<Member[]>([]);

async function init() {
  members.value = await Directus.request<Member[]>(
    readItems("members", {
      sort: "display_name",
      fields: ["id", "display_name", "picture", "short_description", "tags"],
    })
  );
}

init();
</script>
