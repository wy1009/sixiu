export function getObjectURL(file) {
  var url = null
  if (window.createObjectURL) { // basic
    url = window.createObjectURL(file)
  } else if (window.URL) { // mozilla(firefox)
    url = window.URL.createObjectURL(file)
  } else if (window.webkitURL) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file)
  }
  return url
}

export function encodePassword(pwd) {
  let sb = ''
  Array.prototype.forEach.call(pwd, (item, i) => {
    if (i % 2 == 0) {
      sb += String.fromCharCode(item.charCodeAt() - 1)
    } else {
      sb += String.fromCharCode(item.charCodeAt() + 1)
    }
  })
  return sb
}

function getBlob(url) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }

    xhr.send()
  })
}

function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename)
  } else {
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob)
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href)
  }
}

export function download(url, filename) {
  getBlob(url).then(blob => {
    saveAs(blob, filename)
  })
}
