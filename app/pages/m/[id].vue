<style scoped>
img,
canvas {
  border-radius: 12px;
}
</style>

<template>
  <LoadingComponent v-if="isLoading && !notFound" />

  <div v-else-if="notFound">
    <div class="flex flex-col gap-2 min-w-full text-center">
      <h1>Mitglied nicht Gefunden!</h1>
      <p>¯\_(ツ)_/¯</p>
    </div>
  </div>

  <div v-else>
    <div class="flex flex-col gap-8">
      <UCard variant="subtle">
        <template #header>
          <h3 style="margin: 0">Allgemeine Infos</h3>
        </template>

        <div class="flex flex-row gap-4 justify-self-center">
          <NuxtImg
            v-if="data!.picture"
            :src="data!.picture"
            style="border-radius: 100%; height: 128px"
            format="webp"
            :height="128"
            :width="128"
          />
          <UAvatar
            :alt="data!.display_name"
            style="width: 128px; height: 128px"
            size="2xl"
            v-else
          />

          <div class="flex flex-col gap-4">
            <h1>{{ data!.display_name }}</h1>
            <p style="margin-top: -30px; max-width: 400px">
              {{ data!.short_description }}
            </p>

            <div class="flex md:flex-row flex-col gap-2">
              <UBadge v-for="tag of data!.tags" :key="tag" variant="soft">{{
                tag
              }}</UBadge>
              <UBadge
                v-if="data!.gender === 0"
                variant="soft"
                color="secondary"
                icon="material-symbols:male"
              >
                Männlich
              </UBadge>
              <UBadge
                v-if="data!.gender === 1"
                variant="soft"
                color="error"
                icon="material-symbols:female"
              >
                Weiblich
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>

      <UCard variant="subtle" v-if="data!.description">
        <template #header>
          <h3 style="margin: 0">Beschreibung</h3>
        </template>

        <div v-html="data!.description"></div>
      </UCard>

      <UCard variant="subtle" v-if="data!.links && data!.links.length >= 1">
        <template #header>
          <h3 style="margin: 0">Social Media</h3>
        </template>

        <div
          class="flex md:flex-row flex-col gap-4 justify-self-center md:max-w-fit w-full"
        >
          <div v-for="link of data!.links">
            <UButton
              v-if="link.type === 'youtube'"
              :key="link.url"
              leading-icon="fa7-brands:youtube"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="error"
              block
            >
              YouTube
            </UButton>
            <UButton
              v-if="link.type === 'twitter'"
              :key="link.url"
              icon="fa7-brands:x-twitter"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="secondary"
              block
            >
              Twitter / X
            </UButton>
            <UButton
              v-if="link.type === 'twitch'"
              :key="link.url"
              icon="fa7-brands:twitch"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="neutral"
              block
            >
              Twitch
            </UButton>
            <UButton
              v-if="link.type === 'tiktok'"
              :key="link.url"
              icon="fa7-brands:tiktok"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="neutral"
              block
            >
              TikTok
            </UButton>
            <UButton
              v-if="link.type === 'instagram'"
              :key="link.url"
              icon="fa7-brands:instagram"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="primary"
              block
            >
              Instagram
            </UButton>
            <UButton
              v-if="link.type === 'discord'"
              :key="link.url"
              icon="fa7-brands:discord"
              variant="subtle"
              :href="link.url"
              target="_blank"
              color="secondary"
              block
            >
              Discord Server
            </UButton>
          </div>
        </div>
      </UCard>

      <UCard variant="subtle" v-if="relations && relations!.length >= 1">
        <template #header>
          <h3 style="margin: 0">Familien Beziehungen</h3>
        </template>

        <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          <div v-for="member of relations">
            <UPageCard
              v-if="member.relation_type === 'parent'"
              :title="member.relation.display_name"
              :description="member.gender! === 0 ? 'Vater' : (member.gender! === -1 ? 'Elternteil' : 'Mutter')"
              spotlight
              spotlight-color="warning"
              :to="'/m/' + member.relation.key"
            />
            <UPageCard
              v-if="member.relation_type === 'sibling'"
              :title="member.relation.display_name"
              :description="member.gender! === 0 ? 'Bruder' : (member.gender! === -1 ? 'Schwester / Bruder' : 'Schwester')"
              spotlight
              spotlight-color="secondary"
              :to="'/m/' + member.relation.key"
            />
            <UPageCard
              v-if="member.relation_type === 'married'"
              :title="member.relation.display_name"
              :description="member.gender! === 0 ? 'Verlobter' : (member.gender! === -1 ? 'Verheiratet' : 'Verlobte')"
              spotlight
              spotlight-color="error"
              :to="'/m/' + member.relation.key"
            />
            <UPageCard
              v-if="member.relation_type === 'child'"
              :title="member.relation.display_name"
              :description="member.gender! === 0 ? 'Sohn' : (member.gender! === -1 ? 'Kind' : 'Tochter')"
              spotlight
              spotlight-color="neutral"
              :to="'/m/' + member.relation.key"
            />
          </div>
        </div>
      </UCard>

      <UCard variant="subtle" v-if="data?.gallery && data?.gallery.length >= 1">
        <template #header>
          <h3 style="margin: 0">Galerie</h3>
        </template>

        <UCarousel
          :arrows="showArrows"
          dots
          v-slot="{ item }"
          :items="data.resolved_gallery"
          :ui="{
            item: 'max-w-fit self-center',
          }"
          class="mx-auto w-fit"
          style="margin: 0 30px 30px 30px"
          loop
          :autoplay="{ delay: 2000 }"
        >
          <NuxtImg
            format="webp"
            :src="item.src"
            :height="item.height >= 1600 ? 1600 : item.height"
            provider="directus"
            v-slot="{ src, isLoaded, imgAttrs }"
            :custom="true"
          >
            <TransitionGroup :duration="2000" persisted>
              <img
                v-if="isLoaded"
                v-bind="imgAttrs"
                :src="src"
                class="max-h-72 rounded-lg"
              />

              <BlurHashCanvas
                :hash="item.blurhash"
                :width="item.width"
                :height="item.height"
                class="max-h-72 rounded-lg"
                v-else
              />
            </TransitionGroup>
          </NuxtImg>
        </UCarousel>
      </UCard>

      <UCard variant="subtle" v-if="false">
        <template #header>
          <h3 style="margin: 0">Statistiken</h3>
        </template>

        <b>WIP</b>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoadingComponent from "@/components/LoadingComponent.vue";
import { readFile, readItem, readItems } from "@directus/sdk";
import { useWindowSize } from "@vueuse/core";
import {
  Directus,
  type CustomDirectusFile,
  type Member,
  type Relations,
} from "~/directus";

const showArrows = ref(false);
const notFound = ref(false);
const isLoading = ref(true);
const data = ref<Member>();
const relations = ref<Relations>();

const route = useRoute();

const { width, height } = useWindowSize();

watch([width, height], checkScreenSize);

function checkScreenSize() {
  showArrows.value = width.value! >= 1024;
}

checkScreenSize();

async function init() {
  const key = route.params.id as string;

  try {
    data.value = await Directus.request<Member>(readItem("members", key));
  } catch (err) {}

  if (!data.value) {
    notFound.value = true;
    return;
  }

  relations.value = data.value!.relations ?? [];

  for (const relation of relations.value) {
    const member = await Directus.request<Member>(
      readItem("members", relation.relation.key, {
        fields: ["display_name", "gender"],
      })
    );
    relation.relation.display_name = member.display_name;
    relation.gender = member.gender;
  }

  const childs = await Directus.request<Member[]>(
    readItems("members", {
      filter: {
        id: {
          _neq: data.value!.id,
        },
      },
      fields: ["id", "display_name", "relations", "gender"],
    })
  );

  for (const child of childs) {
    if (!child.relations) continue;

    for (const rela of child.relations) {
      if (rela.relation_type != "parent") continue;
      if (rela.relation.key != data.value.id) continue;

      relations.value.push({
        relation_type: "child",
        gender: child.gender,
        relation: { display_name: child.display_name, key: child.id },
      });
    }
  }

  relations.value = relations.value.filter(
    (value, index, self) =>
      index === self.findIndex((obj) => obj.relation.key === value.relation.key)
  );

  data.value.resolved_gallery = [];

  for (const gallery_id of data.value.gallery ?? []) {
    const gallery = await Directus.request<{
      id: number;
      directus_files_id: string;
    }>(
      readItem("members_files", gallery_id, {
        fields: ["id", "directus_files_id"],
      })
    );
    const file = await Directus.request<CustomDirectusFile>(
      readFile(gallery.directus_files_id, {
        fields: ["id", "blurhash", "width", "height"],
      })
    );

    data.value.resolved_gallery.push({
      blurhash: file.blurhash,
      src: file.id,
      width: file.width ?? 0,
      height: file.height ?? 0,
    });
  }

  isLoading.value = false;
}

init();
</script>
