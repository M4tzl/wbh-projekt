export function update<T, K extends keyof T>(obj: T, updateSpec: Pick<T, K>): T {
    const result = {} as T
    Object.keys(obj).forEach(key => result[key] = obj[key])
    Object.keys(updateSpec).forEach((key: K) => result[key] = updateSpec[key])
    return result
}
