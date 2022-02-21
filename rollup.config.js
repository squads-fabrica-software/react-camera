import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";

const packageJson = require("./package.json");

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        babelrc: false,
        presets: [
          ["@babel/preset-env", { modules: false }],
          "@babel/preset-react",
        ],
        extensions: EXTENSIONS,
        exclude: "node_modules/**",
      }),
      resolve({
        extensions: EXTENSIONS,
        preferBuiltins: false,
      }),
      commonjs({ include: /node_modules/ }),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: [...Object.keys(packageJson.dependencies || {}), "fs", "path"],
  },
  {
    input: "lib/esm/types/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
