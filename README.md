# Chat with GPT

This is my attempt at making a chat bot using [ChatGPT](https://chatgpt.com/). It is built using [Tauri](https://tauri.app/) as the runtime and [Next.js](https://nextjs.org/) for the UI.

## Installation - Desktop

### Requirements

- [Rust](https://www.rust-lang.org/tools/install)
- [Node](https://nodejs.org/en/download/package-manager/)
- [Tauri](https://tauri.app/)

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

- MacOS: the command will open a `.dmg` where you drag and drop the app into `Applications`
- Windows: when the build command finishes, the path to a `.msi` file for the app will appear. Copy and paste this into the terminal and hit enter. Follow the instuctions in the installation wizard.

## Installation - Android

### Requirements

- [Rust](https://www.rust-lang.org/tools/install)
- [Node](https://nodejs.org/en/download/package-manager/)
- [Tauri](https://tauri.app/)
- [Android Studio](https://developer.android.com/studio)
  - Further instructions to set up for Android development can be found [here](https://v2.tauri.app/start/prerequisites/#android)
- [OpenSSL for Android](https://github.com/backtrace-labs/openssl-android-binary?utm_source=chatgpt.com)

```bash
# after Rust is installed
cargo install tauri-cli
```

### Get the code

```bash
git clone https://github.com/dcl10/chat-with-gpt.git
```

## Set up OpenSSL for Android

You need to set up some environment variables before running the app in the emulator.

First clone the prebuilt OpenSSL repo.

```bash
git clone https://github.com/backtrace-labs/openssl-android-binary.git
```

This will give you a directory called `openssl-android-binary`.

Next, set up the variables. You can do this in the command line or put them in `.bashrc`, `.zshrc` (depening on your shell).

```bash
export OPENSSL_DIR=/path/to/openssl-android-binary/openssl-arm64-v8a
export OPENSSL_LIB_DIR=$OPENSSL_DIR/lib
export OPENSSL_INCLUDE_DIR=$OPENSSL_DIR/include
export OPENSSL_STATIC=1
export PATH=$NDK_HOME/toolchains/llvm/prebuilt/<arch>/bin:$PATH
```

NB: `<arch>` will change depending on your machine. Check the folder `$NDK_HOME/toolchains/llvm` to find yours.

## Run in Android Emulator

```bash
cargo tauri android dev
```
