import axios from 'axios'
const baseUrl = '/api/books'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBook => {
  const response = await axios.post(baseUrl, newBook)
  return response.data
}

const update = async bookToUpdate => {
  const response = await axios.put(`${ baseUrl }/${bookToUpdate.id}`, bookToUpdate)
  return response.data
}

const remove = id => {
  console.log(id)
  const request = axios.delete(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }
