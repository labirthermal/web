# @labirthermal/webcomponents

Web components for viewing and analysing thermal recordings in the browser.
The package is built on [Lit](https://lit.dev) and
[`@labirthermal/core`](../core/README.md).

## Documentation

- [Webcomponents guide and component reference](https://labirthermal.github.io/web/webcomponents/)
- [Full component catalogue](https://labirthermal.github.io/web/webcomponents/list)
- [Applications](https://labirthermal.github.io/web/webcomponents/applications/)
- [Providers and custom interfaces](https://labirthermal.github.io/web/webcomponents/guide/hierarchy)
- [Usage in the browser](https://labirthermal.github.io/web/webcomponents/usage)
- [Core package](https://labirthermal.github.io/web/core/)

## Install

For use in a JavaScript or TypeScript project:

```sh
npm install @labirthermal/webcomponents
```

For React applications, use the
[`@labirthermal/react` package](https://www.npmjs.com/package/@labirthermal/react)
and its [documentation](https://labirthermal.github.io/web/react/).

## Use in a web page

Load the IIFE build to register the custom elements, then use an application
element in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/@labirthermal/webcomponents@2.0.4/dist/iife/embed.iife.js"></script>

<thermal-file-app thermal="/files/recording.lrc"></thermal-file-app>
```

`thermal-file-app` displays a recording from a URL. To let visitors choose
their own files, use `thermal-dropin-app`:

```html
<thermal-dropin-app></thermal-dropin-app>
```

See the [application reference](https://labirthermal.github.io/web/webcomponents/applications/)
for configuration and the [browser usage guide](https://labirthermal.github.io/web/webcomponents/usage)
for other ways to load the library.
