// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use settings::AppSettings;
use tauri::Manager;

mod constants;
mod settings;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let config = app.config();
            let mut app_settings = AppSettings::default();
            if AppSettings::config_file_exists(&config) {
                app_settings = AppSettings::from_file(&config);
            } else {
                AppSettings::new_config_file(&config);
                app_settings = AppSettings::from_file(&config);
            }
            app.manage(app_settings);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
