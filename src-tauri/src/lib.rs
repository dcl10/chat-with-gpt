use std::sync::Mutex;

use chatgpt::chat_to_model;
use settings::{get_settings, set_settings, AppSettings};
use tauri::Manager;

mod chatgpt;
mod constants;
mod errors;
mod models;
mod settings;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let app_settings;
            if AppSettings::config_file_exists(&handle) {
                app_settings = AppSettings::from_handle(&handle);
            } else {
                AppSettings::new_config_file(&handle);
                app_settings = AppSettings::from_handle(&handle);
            }
            app.manage(Mutex::new(app_settings));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_settings,
            set_settings,
            chat_to_model
        ])
        .plugin(tauri_plugin_notification::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
