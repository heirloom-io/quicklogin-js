import replace from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/quicklogin.js",
  output: {
    format: "es",
  },
  plugins: [
    replace({
      "process.env.CREATOR_URL": JSON.stringify(process.env.CREATOR_URL),
    }),
    terser(),
  ],
};
