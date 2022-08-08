import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";
import { ILogger, IWebService } from "@/types/Service.interface";
import { BlockCypherWebService } from "@/utils/web/BlockCypher";
import { SimpleLogger } from "@/utils/logger";

container.register<IWebService>(TYPES.WEB_SERVICE, {
  useClass: BlockCypherWebService,
});

container.register<ILogger>(TYPES.LOGGER, {
  useClass: SimpleLogger,
});

export { container };
