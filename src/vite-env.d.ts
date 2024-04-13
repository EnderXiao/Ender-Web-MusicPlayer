// ts三斜线指令，读到该配置时Vite自动引入"vite/client"
/// <reference types="vite/client" />

// 此处编写的借口将与ts默认类型进行合并，此后调用import.meta.env就能获得关于VITE_PROXY_TARGET的语法提示
interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_API_URL: string;
}
