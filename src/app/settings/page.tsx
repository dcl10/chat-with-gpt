"use client";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import {
  exists,
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";

type AppSettings = {
  apiKey?: string;
};

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
  return { apiKey: undefined };
}

export default function SettingsPage() {
  // Set up app window
  const [appWindow, setAppWindow] = useState<WebviewWindow>();
  const [appSettings, setAppSettings] = useState<AppSettings>({
    apiKey: undefined,
  });
  async function setupAppWindow() {
    const appWindow = (await import("@tauri-apps/api/window")).appWindow;
    setAppWindow(appWindow);
  }

  // Set up app config dir
  const [configDir, setConfigDir] = useState<string>("");
  async function setupConfigDir() {
    const appConfigDir = (await import("@tauri-apps/api/path")).appConfigDir;
    let configDir = await appConfigDir();
    setConfigDir(configDir);
  }

  useEffect(() => {
    setupAppWindow();
    getSettings().then((settings) => setAppSettings(settings));
    setupConfigDir();
  }, []);

  function handleAPIKeyChange(newValue: string): void {
    setAppSettings((prev) => ({ ...prev, apiKey: newValue }));
  }

  async function saveSettings(settings: AppSettings): Promise<void> {
    let contents = JSON.stringify(settings);

    await writeTextFile("chat-with-gpt-settings.json", contents, {
      dir: BaseDirectory.AppConfig,
    });
  }

  return (
    <div className="sm:p-5 lg:p-20 space-y-2 flex flex-col">
      <h1 className="text-3xl font-semibold pb-4">Settings</h1>
      <div className="inline space-x-2">
        <label className="text-semibold" htmlFor="api-key">
          API key:&nbsp;
        </label>
        <input
          id="api-key"
          type="text"
          placeholder={
            appSettings.apiKey ? appSettings.apiKey : "API key here..."
          }
          className="bg-transparent border-2 dark:border-white rounded-md"
          onChange={(event) => handleAPIKeyChange(event.target.value)}
        />
        <button
          className="rounded-md text-blue-200 border-blue-200 border-2 min-w-20"
          onClick={() => saveSettings(appSettings)}
        >
          Save
        </button>
      </div>
    </div>
  );
}
