import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import { IWebService } from "@/types/Service.interface";

export const WebService: IWebService = myContainer.get<IWebService>(TYPES.WEB_SERVICE);
