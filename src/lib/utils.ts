import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Type helpers for components
export type WithElementRef<T> = T & { ref?: any };
export type WithoutChildrenOrChild<T> = Omit<T, "children" | "child">;

