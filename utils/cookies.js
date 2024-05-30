
export const setCookie = (name, value, options = {}) => {
  const cookie = useCookie(name, options)
  cookie.value = value
}

export const getCookie = (name) => {
  const cookie = useCookie(name)
  return cookie.value
}

export const removeCookie = (name) => {
  const cookie = useCookie(name)
  cookie.value = null
}