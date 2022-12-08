
import initMixin from "./initMixin";
/* 定义一个 Vue 方法，方便创建实例对象，接收一个 options，用于接收用户定义的数据 */
function Vue(options) {
	const vm = this
	/* 初始化 options */
	vm._init(options)
}
// 调用初始化Vue的方法
initMixin(Vue)

export default Vue
