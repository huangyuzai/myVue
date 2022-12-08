import { newArrayProto } from '../array'

class Observer {
	constructor(data) {
		// 将 this 挂载到实例上，方便array.js中使用
		/* 这样写会导致直接堆栈报错，需要将其设置为不可枚举 */
		// data.__ob__ = this // 给数据加了个标识，如果存在 __ob__ 属性，说明被代理过
		Object.defineProperty(data, '__ob__', {
			value: this,
			enumerable: false // 不可被枚举
		})
		// Object.defineProperty 只能劫持已经存在的属性
		// 判断要观察的数据是数组还是对象，对象单独处理
		if (Array.isArray(data)) {
			data.__proto__ = newArrayProto // 保留原有的属性，还可以重写部分方法
			this.observerArray(data) // 如果数组中放的是对象，可以监测到数组对象中的属性
		} else {
			// 检测对象
			this.walk(data)
		}
	}
	walk(data){
		/* 循环每个属性进行重新定义 */
		Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
	}
	observerArray (data) {
		/* 循环对数组对象里面的属性进行劫持 */
		data.forEach(item => observer(item))
	}
}

/* 对数据进行劫持 */
export function observer (data) {
	/* 判断数据是否为对象 */
	if (typeof data !== 'object' || data === null) return
	/* 如果一个对象被劫持过了，则不再进行劫持 */
	if (data.__ob__ instanceof Observer) { // 说明对象被劫持过了
		return data.__ob__
	}

	return new Observer(data)
}

/* 进行劫持的方法 */
export function defineReactive (target, key, value) { // 这个value是闭包
	// 如果 value值还是对象，则深度劫持，对所有的对象都进行数据劫持
	observer(value)
	/* 劫持每个属性 key */
	Object.defineProperty(target, key, {
		get () {
			console.log(`有人读取了数据`)
			return value
		},
		set (newValue) {
			console.log(`有人设置了数据`)
			/* 如果新旧值相同则不处理 */
			if (newValue === value) return
			// 如果设置的值是对象，则再次进行劫持
			observer(newValue)
			value = newValue
		}
	})
}

export default observer
