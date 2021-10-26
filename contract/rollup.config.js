import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import nodePolyfills from "rollup-plugin-node-polyfills";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/koi-task-contract.js",
      format: "cjs",
    },
    plugins: [resolve({ preferBuiltins: false }), commonjs(), nodePolyfills()],
  },
];
