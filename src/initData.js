/* 初始化 data 对象的数据 */
import observer from "./observer/index";

/* 将 vm.xxx 形式的数据转发到 vm._data.xxx 获取数据 */
export function proxy (vm, target, key) {
	Object.defineProperty(vm, key, {
		get () {
			// 从 vm 上面的 target 属性对象里面取
			return vm[target][key]
		},
		set(newValue) {
			vm[target][key] = newValue
		}
	})
}

export default (vm) => {
	let data = vm.$options.data
	/* data 可以是函数，返回一个对象，也可以直接是对象 */
	/* 需要保证this是当前实例，所以这里将 vm 传进去改变 this 指针 */
	data = typeof data === 'function' ? data.call(vm) : data
	// 将data挂载到实例上
	vm._data = data
	// 劫持数据
	observer(data)

	for (let k in data) {
		proxy(vm, '_data', k)
	}
}
