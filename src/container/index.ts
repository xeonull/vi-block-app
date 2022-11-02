import { container } from "./container.config";
import { TYPES } from "./types";
import { IBlockWebService, IMarketWebService, ILogger } from "@/types/Service.interface";

export const BlockWebService: IBlockWebService = container.resolve<IBlockWebService>(TYPES.BLOCK_WEB_SERVICE);
export const MarketWebService: IMarketWebService = container.resolve<IMarketWebService>(TYPES.MARKET_WEB_SERVICE);
export const Logger: ILogger = container.resolve<ILogger>(TYPES.LOGGER);
