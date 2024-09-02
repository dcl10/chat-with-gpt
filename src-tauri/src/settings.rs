use serde::{Deserialize, Serialize};
use std::fs;
use tauri::api::path as tauri_path;
use crate::constants::APPSETTINGS_NAME;

#[derive(Serialize, Deserialize, Default, Debug)]
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
        println!("{:?}", config_file);

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
}
