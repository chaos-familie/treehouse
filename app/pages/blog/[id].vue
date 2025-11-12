<style>
.img {
  border-radius: 12px;
}

.link {
  font-weight: bold;
  color: var(--ui-primary);
  text-decoration: underline;
}
</style>

<template>
  <LoadingComponent v-if="isLoading" />
  <Transition>
    <div v-if="!isLoading">
      <NuxtImg
        format="webp"
        :src="openerImage?.filename_disk!"
        provider="directus"
        v-slot="{ src, isLoaded, imgAttrs }"
        :custom="true"
        style="object-fit: contain; max-height: 40vh"
        class="self-center w-full"
      >
        <TransitionGroup :duration="2000" persisted>
          <img v-if="isLoaded" v-bind="imgAttrs" :src="src" />

          <BlurHashCanvas
            :hash="openerImage!.blurhash"
            :width="openerImage!.width ?? 0"
            :height="openerImage!.height ?? 0"
            v-else
          />
        </TransitionGroup>
      </NuxtImg>

      <h1>{{ data!.title }}</h1>
      <div v-html="html"></div>

      <UCard variant="subtle" style="margin-top: 30px">
        <div class="grid grid-cols-2 items-center">
          <div class="flex flex-col gap-4">
            <div class="flex flex-row gap-1">
              <p class="self-center">Von</p>
              <p class="self-center" style="font-weight: bold">
                {{ author?.first_name }}
              </p>
              <UAvatar
                :alt="author?.first_name ?? ''"
                :src="String(author?.avatar ?? '')"
                class="self-center"
                style="margin-left: 5px"
              />
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <p class="self-end">
              <b>Zuletzt Bearbeitet: </b> {{ last_edited }}
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import BlurHashCanvas from "@/components/BlurHashCanvas.vue";
import {
  Directus,
  type BlogScheme,
  type CustomDirectusFile,
  type DirectusRestError,
} from "~/directus";
import { readFile, readItem, readUser, type DirectusUser } from "@directus/sdk";
import { ref } from "vue";

const route = useRoute();
const isLoading = ref(true);
const data = ref<BlogScheme>();
const html = ref("");
const author = ref<DirectusUser>();
const last_edited = ref<string>("");
const openerImage = ref<CustomDirectusFile>();

async function init() {
  try {
    data.value = await Directus.request<BlogScheme>(
      readItem("blog", Number(route.params["id"]))
    );

    openerImage.value = await Directus.request<CustomDirectusFile>(
      readFile(data.value.opener_image)
    );

    author.value = await Directus.request<DirectusUser>(
      readUser(data.value.user_created, { fields: ["first_name", "avatar"] })
    );

    html.value = data!.value.post;

    html.value = html.value
      .replace(/<img/g, '<img class="img"')
      .replace(/<a/g, '<a class="link"');

    const updated = new Date(data.value.date_updated ?? "");
    const created = new Date(data.value.date_created ?? "");

    const f = new Intl.DateTimeFormat("de", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      timeZone: "Europe/Berlin",
      timeZoneName: "short",
    });

    if (data.value.date_updated && updated > created) {
      last_edited.value = f.format(updated);
    } else {
      last_edited.value = f.format(created);
    }

    isLoading.value = false;
  } catch (err) {
    const error = err as DirectusRestError;

    console.error(error);
  }
}

init();
</script>
