import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import "dotenv/config";

export default {
  input: "src/quicklogin.js",
  output: {
    file: "dist/quicklogin.js",
    format: "cjs",
  },
  plugins: [
    replace({
      "process.env.CREATOR_DOMAIN": JSON.stringify(process.env.CREATOR_DOMAIN),
    }),
    terser(),
  ],
};
