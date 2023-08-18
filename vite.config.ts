import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import type { ConfigEnv } from 'vite';
import { resolve } from 'path';
import checker from 'vite-plugin-checker';
import WindiCSS from 'vite-plugin-windicss';
import AutoImport from 'unplugin-auto-import/vite';
import postcsspxtoviewport from 'postcss-px-to-viewport';
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv) => {
  const currentEnv = loadEnv(mode, process.cwd());
  console.log('当前模式', command);
  console.log('当前环境配置', currentEnv); // loadEnv即加载根目录下.env.[mode]环境配置文件
  return defineConfig({
    plugins: [
      react(),
      WindiCSS(),
      AutoImport({
        imports: ['react', 'react-router-dom'],
        dts: './src/auto-imports.d.ts',
        dirs: ['src/store'],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
        }
      }),
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"'
        }
      })
    ],
    // 项目部署的基础路径,
    base: './',
    mode: mode,
    resolve: {
      // 别名
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
        '@store': resolve(__dirname, './src/store'),
        '@views': resolve(__dirname, './src/views'),
        '@assets': resolve(__dirname, './src/assets'),
        '@hooks': resolve(__dirname, './src/hooks')
      }
    },
    // 服务
    server: {
      // 自定义代理---解决跨域
      proxy: {
        // 选项写法
        '/api': {
          target: 'http://127.0.0.1:8090/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      host: '0.0.0.0',
      port: 3000
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        sass: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          // postCssPxToRem({
          //   rootValue: 75,
          //   propList: ['*'],
          //   selectorBlackList: ['md-editor-']
          // })
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    // 构建
    build: {
      // 构建后是否生成 source map 文件
      sourcemap: mode !== 'production'
      // 打包去掉打印信息 保留debugger vite3需要单独安装terser才行
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     drop_console: true,
      //     drop_debugger: false,
      //   },
      // },
    }
  });
};
