import Ria from 've-ria';
// 支持 Icon.vue 的 raw 模式。
import 'svg-innerhtml';

import AppView from './AppView';
import commonConfig from '@/common/config';

class App extends Ria {
    config = commonConfig;

    AppComponent = AppView;
};


const app = new App();
app.start();
