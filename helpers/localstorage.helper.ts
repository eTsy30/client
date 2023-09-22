export function getTokenTolocalStorage(): string {
  const data = localStorage.getItem('token')
  const token = data ? JSON.parse(data) : ''
  return token
}
export function setTokenTolocalStorage(key: string, token: string): void {
  localStorage.setItem(key, JSON.stringify(token))
}
export function removeTokenTolocalStorage(key: string): void {
  localStorage.removeItem(key)
}
