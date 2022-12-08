/* 定义初始化方法 */
import initState from "./initState";
function initMixin (Vue) {
	Vue.prototype._init = function (options) {
		const vm = this
		/* 将用户数据挂载到实例上 */
		vm.$options = options
		initState(vm)
	}
}

export default initMixin

