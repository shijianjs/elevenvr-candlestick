import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import monkey, {cdn} from 'vite-plugin-monkey';
import TurboConsole from "vite-plugin-turbo-console";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        TurboConsole(),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
                author: 'shijianjs',
                icon: 'https://vitejs.dev/logo.svg',
                namespace: 'npm/vite-plugin-monkey',
                match: ['https://elevenvr.net/eleven/*'],
                description: 'Eleven table tennis vr 的elo页面添加K线图功能。源码：https://github.com/shijianjs/elevenvr-candlestick'
            },
            build: {
                externalGlobals: {
                    'react': cdn.jsdelivr('React', 'umd/react.production.min.js'),
                    'react-dom': cdn.jsdelivr('ReactDOM', 'umd/react-dom.production.min.js',),
                    'echarts': cdn.jsdelivr('echarts', 'dist/echarts.min.js',),
                    // 'antd': cdn.jsdelivr('antd', 'dist/antd.min.js',),
                    //     //.concat((version) => `https://cdn.jsdelivr.net/npm/antd@${version}/dist/reset.min.css`),
                    // 'mobx': cdn.jsdelivr('mobx', 'dist/mobx.umd.production.min.js',),
                    // 下面这几个意义不大，可以不加
                    // 'mobx-react': cdn.jsdelivr('mobxReact', 'dist/mobxreact.umd.production.min.js',),
                    // '@ant-design/icons': cdn.jsdelivr('antdIcons', 'dist/index.umd.min.js',),
                    // 'ahooks': cdn.jsdelivr('ahooks', 'dist/ahooks.min.js',),
                },
                // externalResource:{
                //     'antd/dist/reset.min.css':cdn.jsdelivr()
                // }
            },
        }),
    ],
});
