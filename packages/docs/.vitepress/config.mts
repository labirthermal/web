import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

// Keep in sync with the registrations in packages/embed/src/iifeCatalog.ts.
const customElements = new Set([
  'thermal-app',
  'thermal-bar',
  'thermal-btn',
  'thermal-btn-group',
  'thermal-dialog',
  'thermal-dropdown',
  'thermal-dropin',
  'thermal-expandable',
  'thermal-field',
  'thermal-icon',
  'thermal-loading',
  'thermal-radio',
  'thermal-slot',
  'thermal-spinner',
  'thermal-tip',
  'manager-provider',
  'registry-provider',
  'group-provider',
  'file-provider',
  'file-copy',
  'manager-image-smooth-switch',
  'manager-graph-smooth-switch',
  'manager-advanced-palette-switch',
  'manager-palette-dropdown',
  'manager-palette-buttons',
  'manager-tool-bar',
  'manager-export-panel',
  'registry-histogram',
  'registry-opacity-slider',
  'registry-range-auto-button',
  'registry-range-full-button',
  'registry-range-display',
  'registry-range-form',
  'registry-range-slider',
  'registry-ticks-bar',
  'group-analysis-sync-button',
  'group-chart',
  'group-download-buttons',
  'group-download-dropdown',
  'group-dropin-element',
  'group-dropin-input',
  'group-range-propagator',
  'group-timeline',
  'file-canvas',
  'file-download-dropdown',
  'file-info-button',
  'file-playback-speed-dropdown',
  'file-timeline',
  'file-video-export-button',
  'file-video-export-panel',
  'file-label',
  'file-button',
  'file-dropdown-elt',
  'file-download-lrc',
  'file-download-png',
  'file-range-propagator',
  'file-analysis-complex',
  'file-analysis-display',
  'file-analysis-edit',
  'file-analysis-graph',
  'file-analysis-table-row',
  'file-analysis-table',
  'analysis-color',
  'analysis-name',
  'edit-area',
  'edit-point',
  'thermal-chart',
  'file-detail',
  'file-thumbnail',
  'apparent-temperature-aat',
  'thermal-dropin-app',
  'thermal-file-app',
  'thermal-group-app',
])

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "@labirthermal",
  description: "Work with thermal images in the browser.",
  base: "/web/",
  sitemap: {
    hostname: 'https://labirthermal.github.io/web/'
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => customElements.has(tag)
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: [2, 3],
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Reference',
        items: [
          { text: '@labirthermal/core', link: "/core" },
          { text: '@labirthermal/webcomponents', link: '/webcomponents' },
        ]

      },
      { text: 'Webcomponents', link: '/webcomponents/list' },
    ],

    sidebar: [
      {
        text: '@labirthermal/core',
        items: [
          { text: 'Overview', link: '/core' },
          {
            text: 'Standalone usage',
            collapsed: true,
            items: [
              { text: 'Load a single file', link: '/core/single-file' },
              { text: 'Load multiple files', link: '/core/multiple-files' },
              { text: 'Controls', link: '/core/controls' }
            ]
          },
          {
            text: "Core classes",
            collapsed: true,
            items: [
              { text: 'ThermalManager', link: '/core/thermal-manager' },
              { text: 'ThermalRegistry', link: '/core/thermal-registry' },
              { text: 'ThermalGroup', link: '/core/thermal-group' }
            ]
          }
        ]
      },
      {
        text: '@labirthermal/webcomponents',
        items: [
          { text: 'Overview', link: '/webcomponents' },
          { text: 'Usage in the browser', link: '/webcomponents/usage' },
          {
            text: 'Guide',
            collapsed: true,
            items: [
              { text: 'Context providers and consumers', link: '/webcomponents/guide/hierarchy' },
              { text: "Thermal palette", link: '/webcomponents/guide/thermal-palette' },
              { text: "Thermal range", link: '/webcomponents/guide/thermal-range' },
              { text: 'Styling and CSS variables', link: '/webcomponents/guide/styling' },
              { text: "Boolean attributes", link: '/webcomponents/guide/boolean-attributes' }
            ]
          },
          { text: 'List of all components', link: '/webcomponents/list' },
          {
            text: 'App components',
            collapsed: true,
            items: [
              { text: 'Overview of app components', link: '/webcomponents/applications' },
              { text: 'thermal-dropin-app', link: '/webcomponents/applications/thermal-dropin-app' },
              { text: 'thermal-file-app', link: '/webcomponents/applications/thermal-file-app' },
              { text: 'thermal-group-app', link: '/webcomponents/applications/thermal-group-app' }
            ]
          },
          {
            text: 'UI components',
            collapsed: true,
            items: [
              { text: 'Overview of UI components', link: '/webcomponents/ui/overview' },
              { text: 'Icons', link: '/webcomponents/icons' },
              { text: 'thermal-btn', link: '/webcomponents/ui/thermal-btn' },
              { text: 'thermal-btn-group', link: '/webcomponents/ui/thermal-btn-group' },
              { text: 'thermal-dialog', link: '/webcomponents/ui/thermal-dialog' },
              { text: 'thermal-dropdown', link: '/webcomponents/ui/thermal-dropdown' },
              { text: 'thermal-app', link: '/webcomponents/ui/thermal-app' }
            ]
          },
          {
            text: 'Context providers',
            collapsed: true,
            items: [
              { text: 'manager-provider', link: '/webcomponents/providers/manager-provider' },
              { text: 'registry-provider', link: '/webcomponents/providers/registry-provider' },
              { text: 'group-provider', link: '/webcomponents/providers/group-provider' },
              { text: 'file-provider', link: '/webcomponents/providers/file-provider' }
            ]
          }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/labirthermal/web' }
    ],

    search: {
      provider: 'local'
    },

  }

})
