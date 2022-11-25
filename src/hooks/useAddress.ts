import { IState } from "@/types/State.interface";
import { IAddress } from "@/types/Address.interface";
import { IMessage } from "@//types/Service.interface";
import { Ref, toRef } from "@vue/reactivity";
import { useStore } from "vuex";

export function useAddress(messageViewer: Ref<IMessage | null>) {
  const store = useStore();
  const state: IState = store.state;

  const addresses: IAddress[] = state.address.addresses;
  const isAddressLoading = toRef(state.address, "isLoading");

  const loadAddress = async (text: string): Promise<void> => {
    if (text)
      await store
        .dispatch("address/fetchAddressBalance", text)
        .then()
        .catch((error) => {
          messageViewer.value?.show(String(error));
        });
  };

  return { addresses, isAddressLoading, loadAddress };
}
