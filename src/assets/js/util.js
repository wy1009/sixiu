import store from '../../store'

export function uploadFile(files, idName, type) {
  let formData = new FormData()

  formData.append('userToken', store.state.userToken)
  formData.append(idName, form[idName].value)
  formData.append('file', files[0])
  formData.append('name', files[0].name)
}

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