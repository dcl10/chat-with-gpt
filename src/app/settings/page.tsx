export default function SettingsPage() {
    return (
        <div className="sm:p-5 lg:p-20 space-y-2 flex flex-col">
            <h1 className="text-3xl font-semibold pb-4">Settings</h1>
            <div className="inline space-x-2">
                <label className="text-semibold" htmlFor="api-key">API key:&nbsp;</label>
                <input type="text" placeholder="API key here..." className="bg-transparent border-2 dark:border-white rounded-md"/>
                <button className="rounded-md text-blue-200 border-blue-200 border-2 min-w-20">Save</button>
            </div>
        </div>
    )
}