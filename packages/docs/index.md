---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@labirthermal"
  text: "IR recordings in the browser"
  tagline: Set of TypeScript packages and webcomponents for work with IR recordings in the browser
  actions:
    - theme: brand
      text: Webcomponents
      link: /webcomponents/list
    - theme: alt
      text: Guide
      link: /webcomponents/

---

<script setup>
import { withBase } from 'vitepress'
import { VPFeatures } from 'vitepress/theme'

const features = [
  {
    title: 'LRC thermal recordings',
    details: 'View and analyse LRC recordings with a ready-to-use web component. Adjust the palette and temperature range, play sequences and inspect temperatures in selected areas.',
    link: '/webcomponents/applications/thermal-file-app',
    linkText: 'Explore the file app'
  },
  {
    title: 'Multiple files at once',
    details: 'Compose a workspace for multiple recordings using provider elements. Share palettes and temperature ranges, and synchronise analysis areas across files in a group.',
    link: '/webcomponents/guide/hierarchy',
    linkText: 'Compose your workspace'
  },
  {
    title: 'Framework independent',
    details: 'Load a script and add custom HTML elements to your page. Configure them with attributes, without depending on a frontend framework.',
    link: '/webcomponents/usage',
    linkText: 'Usage in the browser'
  },
  {
    title: 'Built with Lit',
    details: 'Lightweight, fast and standards-based components built on top of the Lit library.',
    link: 'https://lit.dev',
    linkText: 'lit.dev',
    target: '_blank',
    rel: 'noopener'
  }
]
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

<VPFeatures class="home-features" :features="features" />