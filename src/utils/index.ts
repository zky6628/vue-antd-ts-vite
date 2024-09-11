/**
 * @file 工具方法
 * 
 * @date 2024/08/02
 */

/**
 * 更新目标对象的部分属性
 * @param target 目标对象
 * @param source 源对象
 * @param keys 要更新的属性数组
 * @returns 目标对象
 */
export const updatePartial = <T>(target: T, source: T, keys: (keyof T)[]) => {
  if (!target || !source) return target

  for (const key of keys) {
    if (typeof source === 'object' && Reflect.has(source, key)) {
      target[key] = source[key]
    }
  }
  return target
}
