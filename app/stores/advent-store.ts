export const useAdventStore = defineStore("display_data", () => {
  const data = ref<{
    text?: string;
    image?: string;
    yt_link?: string;
    video?: string;
    member?: string;
  }>({});
  const isOpen = ref(false);

  function setData(newData: any) {
    data.value = newData;
  }

  function setOpen(open: boolean) {
    isOpen.value = open;
  }

  return { data, isOpen, setData, setOpen };
});
