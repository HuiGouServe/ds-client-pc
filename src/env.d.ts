declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
//   // declare module "*.vue" {
//   //   import Vue from "vue";
//   //   export default Vue;
//   // }
//   //方案二
//   // declare module '*.vue' {
//   //   import { defineComponent } from 'vue'
//   //   const Component: ReturnType<typeof defineComponent>
//   //   export default Component
// }
declare module 'axios';
declare module 'qs';
declare module 'nprogress';
