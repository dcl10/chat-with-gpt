import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  exists,
  BaseDirectory,
  readTextFile,
} from "@tauri-apps/api/fs";
import { AppSettings } from "@/lib/types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

async function getSettings(): Promise<AppSettings> {
  if (
    await exists("chat-with-gpt-settings.json", {
      dir: BaseDirectory.AppConfig,
    })
  ) {
    let jsonString = await readTextFile("chat-with-gpt-settings.json", {
      dir: BaseDirectory.AppConfig,
    });
    let settings: AppSettings = JSON.parse(jsonString);
    return settings;
  }
  return { apiKey: undefined, model: undefined };
}

export { cn, getSettings }