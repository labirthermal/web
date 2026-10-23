---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@labirthermal"
  text: "IR recordings in the browser"
  tagline: Set of TypeScript packages and webcomponents for work with IR recordings in the browser
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

---

<script setup>
import { withBase } from 'vitepress'
</script>

<thermal-file-app 
  label="example" 
  :thermal="withBase('/files/sequence.lrc')"
  analysis1="Rectangle 0;rectangle;color:Blue;top:22;left:25;width:80;height:53;min"
  analysis2="Rectangle 1;rectangle;color:Red;top:56;left:44;width:40;height:36;avg"
  class="full-width"
  from="10"
  to="100"
></thermal-file-app>

```html

<!-- Import the IIFE build of the library-->
 <script src="/lib/embed.iife.js"></script>

<!-- Use the webcomponents anywhere in your DOM -->
 <thermal-file-app
  label="A thermal file"
  thermal="/files/sequence.lrc"
  analysis1="Rectangle 0;rectangle;color:Blue;top:22;left:25;width:80;height:53;min"
 ></thermal-file-app>
```
<thermal-dropin-app label="Popiska" palette="iron" advanced-palettes="true"></thermal-dropin-app>