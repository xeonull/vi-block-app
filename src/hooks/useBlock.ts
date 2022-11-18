import { IState } from "@/types/State.interface";
import { IBlock } from "@/types/Block.interface";
import { IMessage } from "@//types/Service.interface";
import { Ref } from "@vue/reactivity";
import { useStore } from "vuex";

export function useBlock(messageViewer: Ref<IMessage | null>) {
  const store = useStore();
  const state: IState = store.state;

  const blocks: IBlock[] = state.block.blocks;
  const isBlockLoading: boolean = state.block.isBlockLoading;

  const loadNextBlock = (): void => {
    store
      .dispatch("block/fetchNextBlock")
      .then()
      .catch((error) => {
        messageViewer.value?.show(String(error));
      });
  };

  const loadSearchBlock = async (text: string): Promise<void> => {
    if (text)
      await store
        .dispatch("block/fetchSearchBlock", text)
        .then()
        .catch((error) => {
          messageViewer.value?.show(String(error));
        });
  };

  return { blocks, isBlockLoading, loadNextBlock, loadSearchBlock };
}
