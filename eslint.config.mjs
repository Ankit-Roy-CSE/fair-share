import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//   rules: {
//         "@typescript-eslint/no-unused-vars": 1,
//         "@typescript-eslint/no-explicit-any": 1,
//         "react/no-unescaped-entities" : 1,
//         "@typescript-eslint/no-empty-object-type": 1,
//         "@typescript-eslint/ban-types": 0,
//         "@typescript-eslint/explicit-module-boundary-types": 0
//       },
//   }
  
// ];

const eslintConfig = []

export default eslintConfig;
