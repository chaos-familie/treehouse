<template>
  <UApp>
    <UModal
      title="Wir respektieren Ihre Privatsphäre zum Teil"
      v-if="showCookieBanner"
      default-open
      :dismissible="false"
      :close="false"
    >
      <template #body>
        <div class="flex flex-col gap-4">
          <p>
            Wir nutzen Cookies und ähnliche Technologien (zusammenfassend
            "Cookies"), um Ihnen ein optimales Webseiten-Erlebnis zu bieten,
            Inhalte zu personalisieren und die Zugriffe auf unsere Website zu
            analysieren.
          </p>
          <p>
            Hierbei verarbeiten wir auch Daten auf Ihrem Endgerät. Dies tun wir,
            um die Funktionsfähigkeit der Website sicherzustellen (technisch
            notwendige Cookies) sowie mit Ihrer Einwilligung für Analysezwecke
            und Marketing. Durch Klicken auf „Alle akzeptieren“ stimmen Sie der
            Verwendung aller Cookies zu.
          </p>
          <p>
            Unter „Individuelle Einstellungen“ können Sie eine detaillierte
            Auswahl treffen und Ihre Einwilligung jederzeit mit Wirkung für die
            Zukunft widerrufen. Technisch notwendige Cookies werden auch bei der
            Auswahl „Nur notwendige akzeptieren“ gesetzt.
          </p>
          <p>
            Weitere Informationen finden Sie in unserer
            <a class="link" href="/legal/privacy" target="_blank"
              >Datenschutzerklärung</a
            >
            und im
            <a class="link" href="/legal/impress" target="_blank">Impressum</a>.
          </p>

          <div class="flex flex-row gap-4">
            <UButton @click="showCookieBanner = true">Alle akzeptieren</UButton>
            <UButton @click="showCookieBanner = true" color="secondary"
              >Individuelle Einstellungen</UButton
            >
          </div>
        </div>
      </template>
    </UModal>

    <UContainer class="gap-4 flex flex-col justify-between" v-else>
      <MenuBarComponent />

      <NuxtPage style="margin-top: 80px" />

      <FooterComponent />
    </UContainer>
  </UApp>
</template>

<script lang="ts" setup>
const router = useRouter();
const showCookieBanner = ref(false);

router.afterEach((from, to) => {
  //pageCheck();
});

function pageCheck() {
  if (router.currentRoute.value.path.startsWith("/legal")) {
    showCookieBanner.value = false;
  } else {
    showCookieBanner.value = true;
  }
}

//pageCheck();
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  margin-left: 5px;
}
</style>
