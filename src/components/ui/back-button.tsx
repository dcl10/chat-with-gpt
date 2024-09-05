import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";

export default function BackButton({ onClick }: { onClick: any }) {
  return (
    <Button
      onClick={onClick}
      color="blue"
      pill
    >
      <ArrowLeftIcon className="size-8" title="Back" />
    </Button>
  );
}
