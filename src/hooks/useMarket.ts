import { IState } from "@/types/State.interface";
import { ICoin } from "@/types/Market.interface";
import { IMessage } from "@/types/Service.interface";
import { Ref, toRef } from "@vue/reactivity";
import { useStore } from "vuex";

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
      saveCoins();
    } catch (error) {
      messageViewer.value?.show(String(error));
    }
  };

  const addCoin = (coin: ICoin): void => {
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
      saveCoins();
    } catch (error) {
      messageViewer.value?.show(String(error));
    }
  };

  const updateMarketData = async (): Promise<void> => {
    await store
      .dispatch("market/fetchMarketData")
      .then()
      .catch((error) => {
        messageViewer.value?.show(String(error));
      });
  };

  const updateMarketDataTOP = async (): Promise<void> => {
    await store
      .dispatch("market/fetchMarketDataTOP")
      .then()
      .catch((error) => {
        messageViewer.value?.show(String(error));
      });
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
    updateMarketDataTOP,
    updateCurrency,
    addCoin,
    removeCoin,
    sortCoins,
    isSearching,
  };
}
