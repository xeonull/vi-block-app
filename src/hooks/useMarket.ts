import { IState } from "@/types/State.interface";
import { ICoin } from "@/types/Market.interface";
import { IToast } from "@//types/Service.interface";
import { Ref } from "@vue/reactivity";
import { useStore } from "vuex";

export function useMarket(toast: Ref<IToast | null>) {
  const store = useStore();
  const state: IState = store.state;

  const coins: ICoin[] = state.market.coins;
  const coinsFound: ICoin[] = state.market.coins_found;

  const loadSearchCoins = async (text: string): Promise<void> => {
    if (text)
      await store
        .dispatch("market/fetchSearchCoins", text)
        .then()
        .catch((error) => {
          toast.value?.show(String(error));
        });
  };

  return { coins, coinsFound, loadSearchCoins };
}
