import React from "react";

import { useRouter } from "next/navigation";
import BackButton from "./back-button";

export default function TitleBar({ title }: { title: string }) {
  const router = useRouter();

  function goBack() {
    router.back();
  }
  return (
    <div className="fixed flex items-center space-x-2 min-w-full fixed dark:bg-black dark:text-white light:bg-white light:text-black py-2">
      <BackButton onClick={goBack} />
      <h2 className="text-semibold text-4xl">{title}</h2>
    </div>
  );
}
