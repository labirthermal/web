# Usage in the browser

To use the webcomponents directly in the browser, load the **IIFE build**. It
registers the webcomponents as soon as the script loads. The published package
is available through jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/@labirthermal/webcomponents@2.0.4/dist/iife/embed.iife.js"></script>

<thermal-file-app thermal="... path to your LRC file ..."></thermal-file-app>
```

<blockquote>IIFE = Instantly invoked function expression</blockquote>

For applications using a bundler, install
[`@labirthermal/webcomponents` from npm](https://www.npmjs.com/package/@labirthermal/webcomponents):

```sh
npm install @labirthermal/webcomponents
```