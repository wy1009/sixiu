import store from '../../store'

export function uploadFile(files, idName, type) {
  let formData = new FormData()

  formData.append('userToken', store.state.userToken)
  formData.append(idName, form[idName].value)
  formData.append('file', files[0])
  formData.append('name', files[0].name)
}