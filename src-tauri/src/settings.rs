use crate::constants::APPSETTINGS_NAME;
use serde::{Deserialize, Serialize};
use std::{fs, sync::Mutex};
use tauri::{api::path as tauri_path, State};

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
#[serde(rename_all = "camelCase")]
pub struct AppSettings {
    pub api_key: String,
    pub model: String,
}

impl AppSettings {
    pub fn from_file(config: &tauri::Config) -> AppSettings {
        let config_file = tauri_path::app_config_dir(config)
            .unwrap()
            .join(APPSETTINGS_NAME);

        if config_file.exists() {
            match fs::read_to_string(config_file) {
                Ok(config_string) => {
                    let settings = serde_json::from_str::<AppSettings>(config_string.as_str());
                    return settings.unwrap_or_default();
                }
                _ => (),
            }
        }

        AppSettings::default()
    }

    pub fn config_file_exists(config: &tauri::Config) -> bool {
        let config_file = tauri_path::app_config_dir(config)
            .unwrap()
            .join(APPSETTINGS_NAME);

        return config_file.exists();
    }

    pub fn new_config_file(config: &tauri::Config) {
        let config_dir = tauri_path::app_config_dir(config).unwrap();
        if !config_dir.exists() {
            fs::create_dir_all(&config_dir).expect("Unable to create app configuration");
        }
        let config_file = config_dir.join(APPSETTINGS_NAME);

        let app_settings = AppSettings::default();
        let app_settings_str = serde_json::to_string(&app_settings).unwrap();

        fs::write(config_file, app_settings_str).expect("Unable to create app configuration");
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
    app_handle: tauri::AppHandle,
    new_settings: AppSettings,
) -> bool {
    // Get save location
    let app_settings_str = serde_json::to_string(&new_settings).unwrap();
    let config_file = app_handle
        .path_resolver()
        .app_config_dir()
        .unwrap()
        .join(APPSETTINGS_NAME);

    // Try to save the file and check it saved
    let saved = fs::write(config_file, app_settings_str).is_ok();

    if saved {
        // Update the active in-memory state if the file saved properly
        let mut settings = state.lock().unwrap();
        settings.api_key = new_settings.api_key.clone();
        settings.model = new_settings.model.clone();
    }

    saved
}
