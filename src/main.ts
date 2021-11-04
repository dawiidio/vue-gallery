import './assets/tailwind.css';
import './assets/common.css';
import { createApp } from 'vue';
import { router } from './router/router';
import { store } from './store/store';
import App from './App.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faEdit, faSpinner, faTimes, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHeart);
library.add(faSpinner);
library.add(faEdit);
library.add(faTimes);
library.add(faTrash);
library.add(faPlus);

createApp(App)
    .use(store)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app');
