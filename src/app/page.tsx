import MainMenuItem from "@/components/ui/main-menu-item";

export default function Home() {
  return (
    <main className="flex-col items-center justify-start lg:p-24 md:p-10 content-center">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to Chat with GPT
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            A desktop version of ChatGPT using <a href="https://tauri.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-green-600">Tauri</a>
          </p>
        </div>
      </section>

      <div className="lg:mb-10 sm:mb-2 text-center content-center">
        <button
          className="group rounded-lg px-5 py-4 transition-colors content-center hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 border border-transparent wx-64"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            New chat{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm opacity-50">
            Start a new chat.
          </p>
        </button>
      </div>

      <MainMenuItem title="Options" subtitle="Configure application from here."/>
    </main>
  );
}
