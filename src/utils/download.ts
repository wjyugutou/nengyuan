export function downloadJson(data: object) {
  const blob = new Blob([JSON.stringify(data)])
  const url = window.URL.createObjectURL(blob)
  download(url, 'data.json')
  window.URL.revokeObjectURL(url)
}

export function download(dataURI: string, name: string) {
  const save_link = document.createElement('a')
  save_link.href = dataURI
  save_link.download = name
  save_link.click()
}
