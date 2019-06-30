const { getAppEnv } = require("../config/env");

const env = getAppEnv();
const { NODE_ENV, PUBLIC_URL = "" } = env.raw;

let assetManifest: any;
if (NODE_ENV === "production") {
  assetManifest = require("../build/asset-manifest.json");
} else {
  assetManifest = {
    "main.js": "/main.bundle.js"
  };
}

const preloadScripts = (bundles: any) => {
  const mainJS = assetManifest["main.js"];
  const bundleFilePaths = bundles
    .filter((bundle: any) => bundle.file.match(/\.js$/))
    .map((jsBundle: any) => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<link rel="preload" as="script" href="${jsFilePath}"></script>`
    )
    .join("");
};

const cssLinks = () => {
  if (NODE_ENV !== "production") {
    return "";
  }

  return Object.keys(assetManifest)
    .filter(file => file.match(/\.css$/))
    .map(cssFile => assetManifest[cssFile])
    .map(cssFilePath => `<link rel="stylesheet" href="${cssFilePath}">`)
    .join("");
};

const jsScripts = (bundles: any) => {
  const mainJS = assetManifest["main.js"];
  const bundleFilePaths = bundles
    .filter((bundle: any) => bundle.file.match(/\.js$/))
    .map((jsBundle: any) => `${PUBLIC_URL}/${jsBundle.file}`);

  return [...bundleFilePaths, mainJS]
    .map(
      jsFilePath =>
        `<script type="text/javascript" src="${jsFilePath}" defer></script>`
    )
    .join("");
};

export const indexHtml = ({
  helmet,
  serverData,
  markup,
  bundles,
  styleTags
}: {
  helmet: any;
  serverData: any;
  markup: any;
  bundles: any;
  styleTags: any;
}): any => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();
  return `
    <!doctype html>
    <html lang="en" ${htmlAttrs}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}

        ${preloadScripts(bundles)}
        ${helmet.link.toString()}
        ${cssLinks()}
        ${helmet.style.toString()}

        ${helmet.noscript.toString()}
        ${helmet.script.toString()}
        ${styleTags}
        ${jsScripts(bundles)}
      </head>
      <body ${bodyAttrs}>
        <div id="root">${markup}</div>

        <script>
          window.process = ${env.forIndexHtml};
          window.__SERVER_DATA__ = ${JSON.stringify(serverData).replace(
            /</g,
            "\\u003c"
          )}
          window.__ASSET_MANIFEST__ = ${JSON.stringify(assetManifest)}
        </script>
      </body>
    </html>
  `;
};
