import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";
import { ILogger, IBlockWebService, IMarketWebService } from "@/types/Service.interface";
import { BlockCypherWebService } from "@/utils/web/BlockCypher";
import { CoinGeckoWebService } from "@/utils/web/CoinGecko";
import { SimpleLogger } from "@/utils/logger";

container.register<IBlockWebService>(TYPES.BLOCK_WEB_SERVICE, {
  useClass: BlockCypherWebService,
});

container.register<IMarketWebService>(TYPES.MARKET_WEB_SERVICE, {
  useClass: CoinGeckoWebService,
});

container.register<ILogger>(TYPES.LOGGER, {
  useClass: SimpleLogger,
});

export { container };
