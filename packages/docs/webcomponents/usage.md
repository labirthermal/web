# Usage in the browser

In case you want to use the webcomponents directly in the browser, you need to use the **IIFE build** which registers the webcomponents immadiately after the script arrives to the browser. 

```html
<!-- Load the IIFE build anywhere in your html -->
<script src="/labirthermal.ifee.js"></script>

<!-- This webcomponent will be rendered right after the script is loaded -->
<thermal-file-app thermal="... path to your LRC file ..."></thermal-file-app>
```

<blockquote>IIFE = Instantly invoked function expression</blockquote>