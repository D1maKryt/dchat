import { DivProperties } from "@/types";

export const DIV_PROPERTIES = {
  BASE_SECTION: {
    className: [
      "flex flex-col h-fit w-fit items-center",
      "p-4 gap-2 rounded-2xl",
      "bg-(--bg-section)",
    ].filter(Boolean).join(" ")
  }
} as const satisfies Record<string, DivProperties>;