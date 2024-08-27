"use client"
import { WebviewWindow } from "@tauri-apps/api/window"
import { useEffect, useState } from "react"


export default function SettingsPage() {
    // Set up app window
    const [appWindow, setAppWindow] = useState<WebviewWindow>()
    async function setupAppWindow() {
        const appWindow = (await import("@tauri-apps/api/window")).appWindow
        setAppWindow(appWindow)
    }
    useEffect(() => {
        setupAppWindow()
    }, [])
    
    return (
        <div className="sm:p-5 lg:p-20 space-y-2 flex flex-col">
            <h1 className="text-3xl font-semibold pb-4">Settings</h1>
            <div className="inline space-x-2">
                <label className="text-semibold" htmlFor="api-key">API key:&nbsp;</label>
                <input id="api-key" type="text" placeholder="API key here..." className="bg-transparent border-2 dark:border-white rounded-md"/>
                <button className="rounded-md text-blue-200 border-blue-200 border-2 min-w-20">Save</button>
            </div>
        </div>
    )
}