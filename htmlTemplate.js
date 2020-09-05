import { html } from 'common-tags';

export default async function ({ attributes, files, meta, publicPath, title }) {
  const stylesheets = (files.css || [])
    .map(opts => `<link href="${opts.fileName}" rel="stylesheet">`)
    .join('\n');

  const scripts = (files.js || [])
    .map(opts => `<script defer src="${opts.fileName}"></script>`)
    .join('\n');

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="msapplication-TileColor" content="#00a6a6">
        <meta name="theme-color" content="#f9f6f1">

        <title>type-kana</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00a6a6">

        <link rel="stylesheet" href="/global.css">
        ${stylesheets}

        ${scripts}
      </head>
      <body>
        <noscript>
          Sorry, it's <code>new Date().getFullYear()</code>, get with the times!
        </noscript>
      </body>
    </html>`;
};
