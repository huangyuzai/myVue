/* 重写数组部分方法 */
// 原对象原型
const oldArrayProto = Array.prototype

/* Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。 类似于继承*/
export const newArrayProto = Object.create(oldArrayProto)

// 改写7种可以改变原数组的方法
const methods = [
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'reverse',
	'sort'
]

// 循环方法数组，改写新创建的数组对象
methods.forEach(method => {
	// 改写 newArrayProto 数组原型上面的 push、pop等方法
	newArrayProto[method] = function (...args) {
		// 调用原数组原型的相关方法，这里需要把当前 this 和 操作传入的参数传到原数组原型的相关方法上
		const result = oldArrayProto[method].call(this, ...args)
		// 对新增的数据进行再次劫持
		let inserted;
		// 获取刚刚实例上挂载的 this 实例
		const ob = this.__ob__;
		switch (method) {
			case 'push':
			case 'unshift':
				inserted = args
				break
			case 'splice':
				// arr.splice(0, 1, {//这里才是数据})
				// 所以这里取2号索引
				inserted = args.slice(2)
				break
			default:
				break
		}
		// 如果存在 inserted，则对新数据进行劫持
		if (inserted) {
			// 调用实例上面的检测数据方法
			ob.observerArray(inserted)
		}
		return result
	}
})
