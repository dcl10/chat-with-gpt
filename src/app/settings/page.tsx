"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { AppSettings } from "@/lib/types";
import { Label, Select, Button } from "flowbite-react";
import { MODEL_CHOICES } from "@/lib/constants";
import { CheckIcon } from "@heroicons/react/24/outline";
import TitleBar from "@/components/ui/title-bar";
import { Toast } from "flowbite-react";

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
    <div className="inline-flex space-x-2 items-center">
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
      <Button
        color={"blue"}
        onClick={saveSettings}
      >
        Save
      </Button>
      <Button
        color={"light"}
        onClick={setEditable}
      >
        Cancel
      </Button>
    </div>
  );
}

function EditModel({
  choices,
  saveSettings,
  handleModelChange,
  selected,
}: {
  choices: string[];
  saveSettings: any;
  handleModelChange: any;
  selected: string;
}) {
  return (
    <div className="inline-flex space-x-2 items-center">
      <Label htmlFor="models" value="ChatGPT model:" color="light" />
      <Select
        id="models"
        onChange={(event) => handleModelChange(event.target.value)}
        value={selected}
      >
        {choices.map((value, index) => (
          <option key={index.toString()} value={value}>
            {value}
          </option>
        ))}
      </Select>
      <Button color={"blue"} onClick={saveSettings}>
        Save
      </Button>
    </div>
  );
}

function APIKeySet({ onSetEditable }: { onSetEditable: any }) {
  return (
    <div className="inline-flex space-x-2 items-center">
      <p>API key is set.</p>
      <Button
        color={"failure"}
        onClick={onSetEditable}
      >
        Edit
      </Button>
    </div>
  );
}

function Saved() {
  return (
    <Toast className="bg-transparent border-0 shadow-none">
      <div className="flex space-x-2 items-center justify-center">
        <CheckIcon className="size-8 text-green-600" />
        <p className="light:text-black dark:text-white">Saved!</p>
      </div>
    </Toast>
  );
}

export default function SettingsPage() {
  const [appSettings, setAppSettings] = useState<AppSettings>({
    apiKey: "",
    model: "",
  });

  const [isEditable, setIsEditable] = useState<boolean>();
  const [showSaved, setShowSaved] = useState<boolean>(() => false);

  useEffect(() => {
    invoke<AppSettings>("get_settings").then((settings) => {
      setAppSettings(settings);
      settings.apiKey ? setIsEditable(false) : setIsEditable(true);
    });
  }, []);

  function handleAPIKeyChange(newValue: string): void {
    setAppSettings((prev) => ({ ...prev, apiKey: newValue }));
  }

  function handleModelChange(newValue: string): void {
    setAppSettings((prev) => ({ ...prev, model: newValue }));
  }

  async function saveSettings(settings: AppSettings): Promise<void> {
    setShowSaved((prev) => !prev);
    await invoke("set_settings", { newSettings: settings });
    setIsEditable(false);
    setTimeout(() => setShowSaved((prev) => !prev), 2000);
  }

  return (
    <div className="sm:p-5 lg:p-20 space-y-2">
      <TitleBar title={"Settings"} />
      <div className="pt-20"></div>
      <div className="space-y-2 flex flex-col">
        {isEditable ? (
          <EditAPIKey
            handleAPIKeyChange={handleAPIKeyChange}
            saveSettings={() => saveSettings(appSettings)}
            setEditable={() => setIsEditable(false)}
          />
        ) : (
          <APIKeySet onSetEditable={() => setIsEditable(true)} />
        )}
        <EditModel
          choices={MODEL_CHOICES}
          saveSettings={() => saveSettings(appSettings)}
          handleModelChange={handleModelChange}
          selected={appSettings.model}
        />
      </div>
      {showSaved && <Saved />}
    </div>
  );
}
