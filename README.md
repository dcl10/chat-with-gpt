# Chat with GPT
This is my attempt at making a chat bot using [ChatGPT](https://chatgpt.com/). It is built using [Tauri](https://tauri.app/) as the runtime and [Next.js](https://nextjs.org/) for the UI.

## Installation
### Requirements
* [Rust](https://www.rust-lang.org/tools/install)
* [Node](https://nodejs.org/en/download/package-manager/)
* [Tauri](https://tauri.app/)
```bash
# after Rust is installed
cargo install tauri-cli
```

### Get the code
```bash
git clone https://github.com/dcl10/chat-with-gpt.git
```

## Build the app
```bash
cargo tauri build
```

* MacOS: the command will open a `.dmg` where you drag and drop the app into `Applications`
* Windows: when the build command finishes, the path to a `.msi` file for the app will appear. Copy and paste this into the terminal and hit enter. Follow the instuctions in the installation wizard.