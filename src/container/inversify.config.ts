import { Container } from "inversify";
import { TYPES } from "./types";
import { BlockCypherWebService } from "@/utils/web/BlockCypher";
import { IWebService } from "@/types/Service.interface";

const myContainer = new Container();
myContainer.bind<IWebService>(TYPES.WEB_SERVICE).to(BlockCypherWebService);

export { myContainer };
