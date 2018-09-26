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
