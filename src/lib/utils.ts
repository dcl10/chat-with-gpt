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

export { cn }