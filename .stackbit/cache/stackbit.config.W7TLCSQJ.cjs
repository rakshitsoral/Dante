var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// stackbit.config.js
var stackbit_config_exports = {};
__export(stackbit_config_exports, {
  default: () => stackbit_config_default
});
module.exports = __toCommonJS(stackbit_config_exports);
var stackbit_config_default = {
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "16",
  devCommand: "npm run eleventy:serve",
  experimental: {
    ssg: {
      name: "Eleventy",
      logPatterns: {
        up: ["Server at"]
      },
      directoryChangePatterns: ["src/**"]
    }
  },
  contentSources: [
    {
      name: "local",
      type: "git"
    }
  ],
  models: {
    page: {
      type: "page",
      label: "Page",
      filePath: "src/{slug}.md",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          required: true
        },
        {
          type: "markdown",
          name: "body",
          label: "Content"
        }
      ]
    }
  }
};
//# sourceMappingURL=stackbit.config.W7TLCSQJ.cjs.map
