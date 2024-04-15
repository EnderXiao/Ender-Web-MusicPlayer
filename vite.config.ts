import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// ts语法检测插件
// import checker from 'vite-plugin-checker';
import os from "os";

function getNetworkIp() {
    let needHost = "";
    try {
        const network = os.networkInterfaces();
        for (const dev in network) {
            const iface = network[dev];
            if (iface) {
                // 添加这个条件检查，确保iface有被定义
                for (let i = 0; i < iface.length; i++) {
                    const alias = iface[i];
                    if (
                        alias.family === "IPv4" &&
                        alias.address !== "127.0.0.1" &&
                        !alias.internal
                    ) {
                        needHost = alias.address;
                    }
                }
            }
        }
    } catch (e) {
        needHost = "localhost";
    }
    return needHost;
}

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        minify: false,
        rollupOptions: {
            output: {
                manualChunks: (filePath) => {
                    if (filePath.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
    },
    plugins: [
        vue(),
        // 开启ts语法检测
        // checker({ typescript: true }),
        AutoImport({
            // 自动导入vue和vue-router相关的函数
            imports: ["vue", "vue-router"],
            dirs: ["src/hooks/**", "src/store/**", "src/utils/**"],
            dts: "src/auto-import/imports.d.ts",
            resolvers: [
                // 自动导入ElementUI组件的解析器
                ElementPlusResolver(),
                // 自动导入图标组件的解析器
                IconsResolver({
                    prefix: "icon",
                }),
            ],
        }),
        Components({
            dirs: ["src/components"],
            dts: "src/auto-import/components.d.ts",
            resolvers: [
                // Element组件自动引入解析器
                ElementPlusResolver(),
                // 自动引入图标组件
                IconsResolver({
                    prefix: "icon",
                    enabledCollections: ["solar"],
                }),
            ],
        }),
        Icons({
            // 图标自动安装
            autoInstall: true,
            // 编译方式
            compiler: "vue3",
            // 缩放比
            // scale: 1
        }),
        // 对于1k的文件进行压缩
        viteCompression({
            threshold: 1000,
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(__dirname, "src/assets/svgIcons")],
            symbolId: "icon-[name]",
        }),
        ElementPlus(),
    ],
    // 配置sass预编译
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "./src/style/BEM.scss" as *;@use "./src/style/theme.scss" as *;`,
            },
        },
    },
    // 配置路径
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    // 设置环境变量
    // 注意变量名必须为'import.meta.env.XXX'
    define: {
        "import.meta.env.BASE_IP": JSON.stringify(
            `http://${getNetworkIp()}:${process.env.PORT || 3000}`
        ),
    },
});
