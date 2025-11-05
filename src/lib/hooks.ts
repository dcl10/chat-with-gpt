import { useEffect, useState } from "react";
import { listen, UnlistenFn } from "@tauri-apps/api/event";

export default function useAppVisibility() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const unlisteners: Array<Promise<UnlistenFn>> = [];

        unlisteners.push(
            listen("tauri://focus", () => setIsVisible(true))
        );
        unlisteners.push(
            listen("tauri://blur", () => setIsVisible(false))
        );

        return () => {
            unlisteners.forEach(async (u) => (await u)());
        };
    }, []);

    return isVisible;
}
