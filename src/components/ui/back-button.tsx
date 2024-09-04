import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton({ onClick }: { onClick: any }) {
  return (
    <button
      className="content-start items-center space-x-2 inline-flex max-w-20"
      onClick={onClick}
    >
      <ArrowLeftIcon className="size-8 text-blue-200 hover:text-white rounded-full border-2 border-blue-200 hover:border-white" />
      <p className="test-semibold text-white">Back</p>
    </button>
  );
}
