import "reflect-metadata";
import { container } from "tsyringe";
import { TYPES } from "./types";
import { BlockCypherWebService } from "@/utils/web/BlockCypher";
import { IWebService } from "@/types/Service.interface";

container.register<IWebService>(TYPES.WEB_SERVICE, {
  useClass: BlockCypherWebService,
});

export { container };
