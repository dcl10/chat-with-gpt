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
        let config_file = tauri_path::app_config_dir(config)
            .unwrap()
            .join(APPSETTINGS_NAME);

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
pub fn set_settings(state: State<'_, Mutex<AppSettings>>, new_settings: AppSettings) {
    let mut settings = state.lock().unwrap();
    settings.api_key = new_settings.api_key;
    settings.model = new_settings.model;
}
