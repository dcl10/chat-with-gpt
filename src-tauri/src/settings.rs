use crate::constants::APPSETTINGS_NAME;
use serde::{Deserialize, Serialize};
use std::{fs, sync::Mutex};
use tauri::{AppHandle, Manager, State};

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AppSettings {
    pub api_key: String,
    pub model: String,
}

impl AppSettings {
    /// Given an AppHandle, read settings from the config file if present
    pub fn from_handle(handle: &AppHandle) -> Self {
        if let Ok(mut config_dir) = handle.path().app_config_dir() {
            // e.g. ~/.config/<your-bundle-id> on Linux
            config_dir.push(APPSETTINGS_NAME);
            if config_dir.exists() {
                if let Ok(s) = fs::read_to_string(&config_dir) {
                    if let Ok(settings) = serde_json::from_str::<AppSettings>(&s) {
                        return settings;
                    }
                }
            }
        }
        // fallback
        AppSettings::default()
    }

    /// Checks if the config file exists
    pub fn config_file_exists(handle: &AppHandle) -> bool {
        if let Ok(mut config_dir) = handle.path().app_config_dir() {
            config_dir.push(APPSETTINGS_NAME);
            return config_dir.exists();
        }
        false
    }

    /// Create a default config file if not present (and create directories)
    pub fn new_config_file(handle: &AppHandle) -> std::io::Result<()> {
        if let Ok(mut config_dir) = handle.path().app_config_dir() {
            // Ensure the directory exists
            fs::create_dir_all(&config_dir)?;
            config_dir.push(APPSETTINGS_NAME);
            let default = AppSettings::default();
            let s = serde_json::to_string(&default).unwrap();
            fs::write(config_dir, s)?;
        }
        Ok(())
    }
}

#[tauri::command]
pub fn get_settings(state: State<'_, Mutex<AppSettings>>) -> AppSettings {
    let settings = state.lock().unwrap();
    settings.clone()
}

#[tauri::command]
pub fn set_settings(
    state: State<'_, Mutex<AppSettings>>,
    app_handle: AppHandle,
    new_settings: AppSettings,
) -> bool {
    let s = serde_json::to_string(&new_settings).unwrap();
    if let Ok(mut config_dir) = app_handle.path().app_config_dir() {
        // Create the directory if missing
        if !config_dir.exists() {
            if let Err(e) = fs::create_dir_all(&config_dir) {
                eprintln!("Failed to create config dir: {}", e);
                return false;
            }
        }
        config_dir.push(APPSETTINGS_NAME);
        let saved = fs::write(&config_dir, &s).is_ok();
        if saved {
            let mut settings = state.lock().unwrap();
            settings.api_key = new_settings.api_key.clone();
            settings.model = new_settings.model.clone();
        }
        saved
    } else {
        false
    }
}
