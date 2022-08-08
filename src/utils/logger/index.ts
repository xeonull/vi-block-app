import { ILogger } from "@/types/Service.interface";
import { injectable } from "tsyringe";

@injectable()
export class SimpleLogger implements ILogger {
  log(message: string, level?: "info" | "warn" | "error"): void {
    /* webpack will remove follwoing code in production mode */
    if (process.env.NODE_ENV !== "production") {
      if (level === "error") {
        console.error(`[SimpleLogger]:${message}`);
      } else if (level === "warn") {
        console.warn(`[SimpleLogger]:${message}`);
      } else {
        console.log(`[SimpleLogger]:${message}`);
      }
    }
  }
}
