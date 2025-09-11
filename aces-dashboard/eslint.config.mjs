import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Disable common annoying rules but keep safety-critical ones

      // Console and debugging (commonly disabled during development)
      "no-console": "off",
      "no-debugger": "off",

      // TypeScript strict rules (commonly disabled)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-non-null-assertion": "off",

      // Next.js rules (commonly disabled)
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",

      // React rules (commonly disabled)
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",

      // React Hooks (the exhaustive-deps rule is very commonly disabled)
      "react-hooks/exhaustive-deps": "off",

      // Accessibility rules (commonly disabled during development)
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/alt-text": "off",
      "jsx-a11y/no-autofocus": "off",
    },
  },
];

export default eslintConfig;
