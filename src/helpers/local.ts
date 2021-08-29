export let local: Storage

if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
  local = window.localStorage
}

export const setLocal = (key: any, data: any) => {
  const jsonData = JSON.stringify(data)
  if (local) {
    local.setItem(key, jsonData)
  }
}

export const getLocal = (key: any) => {
  let data = null
  let raw = null
  if (local) {
    raw = local.getItem(key)
  }
  if (raw && typeof raw === "string") {
    try {
      data = JSON.parse(raw)
    } catch (error) {
      return null
    }
  }
  return data
}

export const removeLocal = (key: any) => {
  if (local) {
    local.removeItem(key)
  }
}

export const updateLocal = (key: any, data: any) => {
  const localData = getLocal(key) || {}
  const mergedData = {
    ...localData,
    ...data
  }
  setLocal(key, mergedData)
}
