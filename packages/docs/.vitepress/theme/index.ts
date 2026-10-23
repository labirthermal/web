// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import { withBase } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import ComponentInfo from './ComponentInfo.vue'
import ComponentAttribute from './ComponentAttribute.vue'
import ComponentExample from './ComponentExample.vue'
import Hierarchy from './Hierarchy.vue'
import HierarchyProvider from './HierarchyProvider.vue'
import WebcomponentTable from './WebcomponentTable.vue'
import HierarchyApp from './HierarchyApp.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {

    enhanceAppWithTabs(app)

    app.component("ComponentInfo", ComponentInfo);
    app.component("ComponentAttribute", ComponentAttribute);
    app.component("ComponentExample", ComponentExample);
    app.component("Hierarchy", Hierarchy);
    app.component("WebcomponentTable", WebcomponentTable);
    app.component("HierarchyApp", HierarchyApp);
    const providers = { HierarchyManager: 'manager-provider', HierarchyRegistry: 'registry-provider', HierarchyGroup: 'group-provider', HierarchyFile: 'file-provider' } as const;
    for (const [name, tag] of Object.entries(providers)) {
      app.component(name, (_props, { attrs, slots }) => h(HierarchyProvider, { ...attrs, tag }, slots));
    }

    if (typeof document === 'undefined') {
      return;
    }

    const ifeeScriptId = "webcomponentsIIFE";

    const ifeeScriptObject = document.getElementById(ifeeScriptId);

    if ( !ifeeScriptObject ) {
        const script = document.createElement('script');
        script.id = ifeeScriptId;
        script.src = withBase('/lib/labirthermal.iife.js');
        document.body.appendChild(script);
    }

    // ...

    const cjsScriptId = "webcomponentsCJS";

    const cjsScriptObject = document.getElementById(cjsScriptId);

    if ( !cjsScriptObject ) {
        const script = document.createElement('script');
        script.id = cjsScriptId;
        script.src = withBase('/lib/core.esm.cjs');
        script.type = 'module';
        // document.body.appendChild(script);
    }

  }
} satisfies Theme
