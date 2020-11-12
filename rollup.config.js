import ts from "@wessberg/rollup-plugin-ts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import importAlias from "rollup-plugin-import-alias";
import externalGlobals from "rollup-plugin-external-globals";

export const external = ["react", "react-dom"];

export const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

const plugins = [
  commonjs(),
  nodeResolve(),
  ts(),
  externalGlobals({
    react: "React",
    "react-dom": "ReactDOM",
  }),
];

function createEntry(input, outputFile) {
  return {
    input,
    output: {
      file: outputFile,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  };
}

export default [
  createEntry("root/Root.tsx", "./dist/Root.mjs"),
  createEntry("plugins/Header.tsx", "./dist/Header.mjs"),
  createEntry("plugins/AppOne.tsx", "./dist/AppOne.mjs"),
  createEntry("plugins/AppTwo.tsx", "./dist/AppTwo.mjs"),
];
