export const useCookieConsentStore = defineStore(
  "cookie_consent",
  () => {
    const hasConsent = ref(false);

    function setConsent(consent: boolean) {
      hasConsent.value = consent;
    }
    return { hasConsent, setConsent };
  },
  { persist: true }
);
