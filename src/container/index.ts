import { container } from "./container.config";
import { TYPES } from "./types";
import { IWebService } from "@/types/Service.interface";

export const WebService: IWebService = container.resolve<IWebService>(TYPES.WEB_SERVICE);
