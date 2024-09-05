"use client";
import MainMenuItem from "@/components/ui/main-menu-item";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function goToChat() {
    router.push("/chat");
  }

  function goToSettings() {
    router.push("/settings");
  }

  return (
    <main className="flex-col items-center justify-start lg:p-24 md:p-10 content-center">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl dark:text-white">
            Welcome to Chat with GPT
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            A desktop version of ChatGPT using{" "}
            <a
              href="https://tauri.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-green-600 hover:text-xl"
            >
              Tauri
            </a>
          </p>
        </div>
      </section>

      <div className="space-y-2">
        <MainMenuItem
          title="New chat"
          subtitle="Start a new chat"
          onClick={goToChat}
        />
        <MainMenuItem
          title="Settings"
          subtitle="Configure application from here."
          onClick={goToSettings}
        />
      </div>
    </main>
  );
}
