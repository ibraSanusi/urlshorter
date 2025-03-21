import React from "react";
import RocketIcon from "@/app/_components//icons/RocketIcon";
import Button from "@/app/ui/Button";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  router: AppRouterInstance;
  submit: boolean;
}

export default function ModalFooter({ router, submit }: Props) {
  return (
    <div className="flex gap-2 xl:flex-row xl:justify-end">
      <Button
        onClick={() => {
          router.back();
        }}
        type="button"
        className="hover:scale-100"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className={`bg-secondary/80 ${submit ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={submit}
      >
        {submit ? <span>Loading...</span> : <RocketIcon />}
        Create
      </Button>
    </div>
  );
}
