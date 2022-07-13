import axios from "axios";
import { TStatus, TBlock } from "./../types/blocks";

export async function fetchMainBlock(): Promise<TStatus> {
  const response = await axios.get(`https://api.blockcypher.com/v1/btc/main`);
  return response.data;
}

export async function fetchParticularBlock(hash: string): Promise<TBlock> {
  const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/blocks/${hash}`);
  return response.data;
}
