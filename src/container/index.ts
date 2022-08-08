import { container } from "./container.config";
import { TYPES } from "./types";
import { IWebService, ILogger } from "@/types/Service.interface";

export const WebService: IWebService = container.resolve<IWebService>(TYPES.WEB_SERVICE);
export const Logger: ILogger = container.resolve<ILogger>(TYPES.LOGGER);
