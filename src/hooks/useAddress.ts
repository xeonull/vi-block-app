import { IState } from "@/types/State.interface";
import { IAddress } from "@/types/Address.interface";
import { IToast } from "@//types/Service.interface";
import { Ref } from "@vue/reactivity";
import { useStore } from "vuex";

export function useAddress(toast: Ref<IToast | null>) {
  const store = useStore();
  const state: IState = store.state;

  const addresses: IAddress[] = state.address.addresses;
  const isAddressLoading: boolean = state.address.isLoading;

  const loadAddress = async (text: string): Promise<void> => {
    if (text)
      await store
        .dispatch("address/fetchAddressBalance", text)
        .then()
        .catch((error) => {
          toast.value?.show(String(error));
        });
  };

  return { addresses, isAddressLoading, loadAddress };
}
