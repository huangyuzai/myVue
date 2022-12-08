import initData from "./initData";

export default (vm) => {
	/* 判断是否存在 data 属性，如果存在，则初始化 data */
	const opts = vm.$options
	/* 如果存在 data，则调用初始化 state 的方法 */
	if (opts.data) {
		initData(vm)
	}
}
