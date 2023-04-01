// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Zhi framework",
  tagline: "The ultimate framework for building blog and theme",
  url: "https://terwer.space",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "terwer", // Usually your GitHub org/user name.
  projectName: "zhi", // Usually your repo name.

  // https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/docusaurus-plugin-typedoc#readme
  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi",
        entryPoints: ["packages/zhi/src/theme.ts"],
        tsconfig: "packages/zhi/tsconfig.json",
        out: "zhi",
        sidebar: {
          categoryLabel: "Zhi",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-blog-api",
        entryPoints: ["packages/zhi-blog-api/src/index.ts"],
        tsconfig: "packages/zhi-blog-api/tsconfig.json",
        out: "zhi-blog-api",
        sidebar: {
          categoryLabel: "Zhi Blog Api",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-cli",
        entryPoints: ["packages/zhi-cli/src/index.ts"],
        tsconfig: "packages/zhi-cli/tsconfig.json",
        out: "zhi-cli",
        sidebar: {
          categoryLabel: "Zhi Cli",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-common",
        entryPoints: ["packages/zhi-common/src/index.ts"],
        tsconfig: "packages/zhi-common/tsconfig.json",
        out: "zhi-common",
        sidebar: {
          categoryLabel: "Zhi Common",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-env",
        entryPoints: ["packages/zhi-env/src/index.ts"],
        tsconfig: "packages/zhi-env/tsconfig.json",
        out: "zhi-env",
        sidebar: {
          categoryLabel: "Zhi Env",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-log",
        entryPoints: ["packages/zhi-log/src/index.ts"],
        tsconfig: "packages/zhi-log/tsconfig.json",
        out: "zhi-log",
        sidebar: {
          categoryLabel: "Zhi Log",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-sdk",
        entryPoints: ["packages/zhi-sdk/src/index.ts"],
        tsconfig: "packages/zhi-sdk/tsconfig.json",
        out: "zhi-sdk",
        sidebar: {
          categoryLabel: "Zhi Sdk",
        },
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        id: "zhi-siyuan-api",
        entryPoints: ["packages/zhi-siyuan-api/src/index.ts"],
        tsconfig: "packages/zhi-siyuan-api/tsconfig.json",
        out: "zhi-siyuan-api",
        sidebar: {
          categoryLabel: "Zhi Siyuan Api",
        },
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/facebook/docusaurus/edit/main/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/terwer/zhi/tree/dev/packages/zhi-docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Zhi",
        logo: {
          alt: "Zhi Logo",
          src: "img/logo-small.svg",
        },
        items: [
          { to: "/docs/zhi", label: "Api", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/terwer/zhi",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Api",
                to: "/docs/zhi",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Discord",
                href: "https://discordapp.com/invite/docusaurus",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/docusaurus",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/terwer/zhi",
              },
            ],
          },
        ],
        copyright: `Copyright © 2011 - ${new Date().getFullYear()} Terwer, Inc. Built with <a href="https://docusaurus.io/" target="_blank">Docusaurus</a> .`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
