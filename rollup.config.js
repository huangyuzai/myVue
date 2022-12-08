/*
* 2022-12-06
* 使用 import 语法会报错
* 官方文档 https://rollupjs.org/guide/en/#--bundleconfigascjs 提示运行时可使用参数 --bundleConfigAsCjs
* 即  yarn run dev --bundleConfigAsCjs
* */
import babel from 'rollup-plugin-babel'
// 默认可以导出一个对象，作为打包的配置文件
export default {
	input: "./src/index.js", // 入口， 需要打包的文件
	output: {
		file: "./dist/vue.js", // 出口， 打包后的文件存放路径
		name: "Vue", // 挂载的名称
		format: "umd", // 打包的格式 esm es6 commonjs模块 iife自执行模块 umd (兼容 cjs、amd、iife)
		sourcemap: true // 可以调试代码
	},
	// 插件
	plugin: [
		babel({
			exclude: 'node_modules/**' // 忽略 node_modules 里面的所有文件
		})
	]
}
