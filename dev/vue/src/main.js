import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import store from './store';
import App from './App.vue';
import Test from './components/test.vue';
import ToDoList from './components/todo.vue';
import MicroApp from './components/microApp.vue';
import HelloGarfish from './components/HelloGarfish.vue';
import RemoteComponent from './components/remoteComponent.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;

let vm;
const render = ({ dom, basename = '/' }) => {
  const router = new VueRouter({
    mode: 'history',
    base: basename,
    router,
    routes: [
      { path: '/', component: HelloGarfish },
      { path: '/test', component: Test },
      { path: '/todo', component: ToDoList },
      { path: '/micro-*', component: MicroApp },
      { path: '/remote-component', component: RemoteComponent },
    ],
  });

  vm = new Vue({
    store,
    router,
    render: (h) => h(App, { props: { basename } }),
  }).$mount();
  (dom || document).querySelector('#app').appendChild(vm.$el);
};

export function provider({ basename, dom }) {
  return {
    render: () => render({ basename, dom }),
    destroy: () => {
      vm.$destroy();
      vm.$el.parentNode && vm.$el.parentNode.removeChild(vm.$el);
    },
  };
}

// There is no running show that the main application execution run, you can perform in micro front-end environment rendering
if (!window.__GARFISH_PARENT__) {
  render({});
}
