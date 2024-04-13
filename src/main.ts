import { createApp } from 'vue';
import pinia from './store';
import router from './router';
import './index.css';
import App from './App.vue';
import 'virtual:svg-icons-register';
import globalComponents from './components/globalCmp';
import useImgLazy from './hooks/useImgLazy';

const app = createApp(App);
app.directive('useImgLazy', useImgLazy);

app.use(pinia).use(router).use(globalComponents).use(useImgLazy).mount('#app');
