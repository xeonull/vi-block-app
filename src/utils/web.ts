import axios from "axios";
import { TStatus, TBlock } from "./../types/blocks";

export async function fetchMainBlock(): Promise<TStatus> {
  const response = await axios.get(`https://api.blockcypher.com/v1/btc/main`);
  return response.data;
}

/* Get Block by Hash or Number */
export async function fetchBlockByCode(hash: string | number): Promise<TBlock> {
  try {
    const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/blocks/${hash}`);
    return response.data;
  } catch (e: any) {
    throw Error(e.response.data.error);
  }
}
