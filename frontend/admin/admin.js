import { createApp } from "vue";
import App from "./src/App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 覆盖 antd 样式
import "./muse-ant-vue/app.scss";

import router from "./src/plugins/router";

const app = createApp(App);

app.use(Antd);
app.use(router);

app.mount("#app");
