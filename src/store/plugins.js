import { STORAGE_KEY } from './mutations.js'

const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
};

export default [localStoragePlugin]