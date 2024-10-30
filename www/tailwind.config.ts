import { createPreset } from "fumadocs-ui/tailwind-plugin";
import config from "@tenant-kit/kit/tailwind-config";
import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
	...config,
	content: [
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./content/**/*.{md,mdx}",
		"./mdx-components.{ts,tsx}",
		"./node_modules/fumadocs-ui/dist/**/*.js",
		"../kit/src/**/*.tsx",
	],
	presets: [createPreset(), typography()],
};
