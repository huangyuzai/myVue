class Observer {
	constructor(data) {
		// Object.defineProperty 只能劫持已经存在的属性
		this.walk(data)
	}
	walk(data){
		/* 循环每个属性进行重新定义 */
		Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
	}
}

/* 对数据进行劫持 */
export function observer (data) {
	/* 判断数据是否为对象 */
	if (typeof data !== 'object' || data === null) return
	/* 如果一个对象被劫持过了，则不再进行劫持 */
	return new Observer(data)
  }

/* 进行劫持的方法 */
export function defineReactive (target, key, value) { // 这个value是闭包
	// 如果 value值还是对象，则深度检测
	observer(value)
	/* 劫持每个属性 key */
	Object.defineProperty(target, key, {
		get () {
			return value
		},
		set (newValue) {
			/* 如果新旧值相同则不处理 */
			if (newValue === value) return
			value = newValue
		}
	})
}

export default observer
