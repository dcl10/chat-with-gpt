"use client";
import { WebviewWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import BackButton from "@/components/ui/back-button";
import { AppSettings } from "@/lib/types";
import { getSettings } from "@/lib/utils";

function EditAPIKey({
  handleAPIKeyChange,
  saveSettings,
  setEditable,
}: {
  handleAPIKeyChange: any;
  saveSettings: any;
  setEditable: any;
}) {
  return (
    <div className="inline space-x-2">
      <label className="text-semibold" htmlFor="api-key">
        API key:&nbsp;
      </label>
      <input
        id="api-key"
        type="text"
        placeholder="API key here..."
        className="bg-transparent border-2 dark:border-white rounded-md"
        onChange={(event) => handleAPIKeyChange(event.target.value)}
      />
      <button
        className="rounded-md text-blue-200 border-blue-200 border-2 min-w-20"
        onClick={saveSettings}
      >
        Save
      </button>
      <button
        className="rounded-md text-white border-white border-2 min-w-20"
        onClick={setEditable}
      >
        Cancel
      </button>
    </div>
  );
}

function APIKeySet({ onSetEditable }: { onSetEditable: any }) {
  return (
    <div className="inline-flex space-x-2">
      <p>API key is set.</p>
      <button
        className="rounded-md text-red-400 border-red-400 border-2 min-w-20"
        onClick={onSetEditable}
      >
        Edit
      </button>
    </div>
  );
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

  // Set up API key editability
  const [isEditable, setIsEditable] = useState<boolean>();

  useEffect(() => {
    setupAppWindow();
    getSettings().then((settings) => {
      setAppSettings(settings);
      settings.apiKey ? setIsEditable(false) : setIsEditable(true);
    });
  }, []);

  function handleAPIKeyChange(newValue: string): void {
    setAppSettings((prev) => ({ ...prev, apiKey: newValue }));
  }

  async function saveSettings(settings: AppSettings): Promise<void> {
    let contents = JSON.stringify(settings);

    await writeTextFile("chat-with-gpt-settings.json", contents, {
      dir: BaseDirectory.AppConfig,
    });

    setIsEditable(false);
  }

  return (
    <div className="sm:p-5 lg:p-20 space-y-2 flex flex-col">
      <BackButton onClick={() => (window.location.pathname = "/")} />
      <h1 className="text-3xl font-semibold pb-4">Settings</h1>
      {isEditable ? (
        <EditAPIKey
          handleAPIKeyChange={handleAPIKeyChange}
          saveSettings={() => saveSettings(appSettings)}
          setEditable={() => setIsEditable(false)}
        />
      ) : (
        <APIKeySet onSetEditable={() => setIsEditable(true)} />
      )}
    </div>
  );
}
