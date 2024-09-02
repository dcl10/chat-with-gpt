// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use settings::AppSettings;
use tauri::Manager;

mod settings;
mod constants;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let config = app.config();
            let app_settings = AppSettings::from_file(&config);
            println!("{:?}", app_settings);
            app.manage(app_settings);
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
