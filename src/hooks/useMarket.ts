import { IState } from "@/types/State.interface";
import { ICoin } from "@/types/Market.interface";
import { IMessage } from "@/types/Service.interface";
import { Ref, computed } from "@vue/reactivity";
import { useStore } from "vuex";

export function useMarket(messageViewer: Ref<IMessage | null>) {
  const store = useStore();
  const state: IState = store.state;

  const coins = computed((): ICoin[] => state.market.coins);
  const currency = computed((): string => state.market.vsCurrency);

  const currencyList = state.market.currencyList;

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

  const addCoin = (coin: ICoin): void => {
    store
      .dispatch("market/addCoin", coin)
      .then(saveCoins)
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

  const removeCoin = (coin: ICoin): void => {
    try {
      store.commit("market/removeCoin", coin);
      saveCoins();
    } catch (error) {
      messageViewer.value?.show(String(error));
    }
  };

  const updateCurrency = (currency_new: string): void => {
    store.commit("market/setCurrency", currency_new);
  };

  const updateMarketData = async (): Promise<void> => {
    await store
      .dispatch("market/fetchMarketData")
      .then()
      .catch((error) => {
        messageViewer.value?.show(String(error));
      });
  };

  return { coins, coinsFound, currency, currencyList, loadSearchCoins, loadCoins, saveCoins, updateMarketData, updateCurrency, addCoin, removeCoin };
}
