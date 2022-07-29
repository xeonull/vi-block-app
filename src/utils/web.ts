import axios, { AxiosError } from "axios";
import { IStatus, IBlock } from "@/types/Blocks.interface";

export async function fetchMainBlock(): Promise<IStatus> {
  const response = await axios.get(`https://api.blockcypher.com/v1/btc/main`);
  return response.data;
}

/* Get Block by Hash or Number */
export async function fetchBlockByCode(hash: string | number): Promise<IBlock> {
  try {
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/blocks/${hash}`);
    return response.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError) throw Error(e.response?.data.error);
    else throw e;
  }
}
