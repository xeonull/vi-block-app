import { IState } from "@/types/State.interface";
import { IBlock } from "@/types/Blocks.interface";
import { IToast } from "@//types/Service.interface";
import { Ref, ref } from "vue";
import { useStore } from "vuex";

export function useBlock(toast: Ref<IToast | null>): any {
  const store = useStore();
  const state: IState = store.state;

  const blocks: IBlock[] = state.block.blocks;
  const isBlockLoading: boolean = state.block.isBlockLoading;

  const loadNextBlock = (): void => {
    store
      .dispatch("block/fetchNextBlock")
      .then()
      .catch((error) => {
        toast.value?.show(String(error));
      });
  };

  const loadSearchBlock = async (text: string): Promise<void> => {
    await store
      .dispatch("block/fetchSearchBlock", text)
      .then()
      .catch((error) => {
        toast.value?.show(String(error));
      });
  };

  return { blocks, isBlockLoading, loadNextBlock, loadSearchBlock };
}

