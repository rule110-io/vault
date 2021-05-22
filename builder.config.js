const ICONS_DIR = "build/icons/";

const windowsOS = {
  win: {
    icon: ICONS_DIR + "win-icon.ico",
    publisherName: "rule110",
    target: "nsis",
  },

  nsis: {
    differentialPackage: true,
  },
};

const linuxOS = {
  linux: {
    icon: ICONS_DIR,
    target: "deb",
  },
};

const macOS = {
  afterSign: "scripts/notarize.js",
  mac: {
    hardenedRuntime: true,
    category: "public.app-category.productivity",
    gatekeeperAssess: false,
    entitlements: "build/entitlements.mac.plist",
    entitlementsInherit: "build/entitlements.mac.plist",
    target: [
      "dmg",
      "pkg",
      "zip",
      "mas"
    ],
    icon: ICONS_DIR + "con.icns",
  },
  mas: {
    type: "distribution",
    category: "public.app-category.productivity",
    entitlements: "build/entitlements.mas.plist",
    entitlementsInherit: "build/entitlements.mas.plist",
    icon: ICONS_DIR + "con.icns",
  },
  dmg: {
    "sign": false,
    contents: [
      {
        x: 410,
        y: 150,
        type: "link",
        path: "/Applications",
      },
      {
        x: 130,
        y: 150,
        type: "file",
      },
    ],
  },
};

module.exports = {
  productName: "Vault",
  appId: "com.rule110io.vault",
  artifactName: "vault-${version}.${ext}",
  directories: {
    output: "build",
  },
  // default files: https://www.electron.build/configuration/contents
  files: [
    "package.json",
    {
      from: "dist/main/",
      to: "dist/main/",
    },
    {
      from: "dist/renderer",
      to: "dist/renderer/",
    },
  ],
  extraResources: [
    {
      from: "src/extraResources/",
      to: "",
    },
  ],
  ...windowsOS,
  ...linuxOS,
  ...macOS,
};
