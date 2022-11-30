import { IState } from "@/types/State.interface";
import { ICoin } from "@/types/Market.interface";
import { IMessage } from "@/types/Service.interface";
import { Ref, toRef, ref } from "@vue/reactivity";
import { useStore } from "vuex";

const categories = new Map();
categories.set("Favs", "fetchMarketData");
categories.set("Top", "fetchMarketDataTOP");
categories.set("nft", "fetchMarketDataNFT");
categories.set("dex", "fetchMarketDataDEX");
categories.set("cex", "fetchMarketDataCEX");
categories.set("defi", "fetchMarketDataDEFI");
categories.set("fan", "fetchMarketDataFAN");
categories.set("gaming", "fetchMarketDataGAME");
const arrayNavLink = [...categories.keys()];
const activeNavLink = ref(arrayNavLink[0]);
const isEditable = ref(true);

export function useMarket(messageViewer: Ref<IMessage | null>) {
  const store = useStore();
  const state: IState = store.state;

  const coins: ICoin[] = state.market.coins;
  const currency = toRef(state.market, "vsCurrency");
  const isSearching = toRef(state.market, "isSearching");

  const currencyList: string[] = state.market.currencyList;

  const coinsFound: ICoin[] = state.market.coinsFound;

  const loadSearchCoins = async (text: string): Promise<void> => {
    if (text)
      await store
        .dispatch("market/fetchSearchCoins", text)
        .then()
        .catch((error) => {
          messageViewer.value?.show(String(error));
        });
  };

  const sortCoins = (field: string, ascending = false): void => {
    try {
      store.commit("market/sortCoins", { field, ascending });
      isEditable.value && saveCoins();
    } catch (error) {
      messageViewer.value?.show(String(error));
    }
  };

  const addCoin = (coin: ICoin): void => {
    isEditable.value &&
      store
        .dispatch("market/addCoin", Object.assign({}, coin))
        .then(saveCoins)
        .then(updateMarketData)
        .catch((error) => {
          messageViewer.value?.show(String(error));
        });
  };

  const loadCoins = (): void => {
    store.commit("market/loadCoinsFromLocalStorage");
  };

  const saveCoins = (): void => {
    store.commit("market/saveCoinsToLocalStorage");
  };

  const updateCurrency = (currency_new: string): void => {
    store.commit("market/setCurrency", currency_new);
  };

  const removeCoin = (coin: ICoin): void => {
    try {
      store.commit("market/removeCoin", coin);
      isEditable.value && saveCoins();
    } catch (error) {
      messageViewer.value?.show(String(error));
    }
  };

  const updateMarketData = async (): Promise<void> => {
    const updateMethod = categories.get(activeNavLink.value);
    await store
      .dispatch(`market/${updateMethod}`)
      .then()
      .catch((error) => {
        messageViewer.value?.show(String(error));
      });
  };

  const updateActiveNavLink = async (selectedLink: string) => {
    activeNavLink.value = selectedLink;
    isEditable.value = activeNavLink.value === arrayNavLink[0];
    if (isEditable.value) loadCoins();
    updateMarketData();
  };

  return {
    coins,
    coinsFound,
    currency,
    currencyList,
    loadSearchCoins,
    loadCoins,
    saveCoins,
    updateMarketData,
    updateCurrency,
    addCoin,
    removeCoin,
    sortCoins,
    isSearching,
    activeNavLink,
    arrayNavLink,
    updateActiveNavLink,
    isEditable,
  };
}
