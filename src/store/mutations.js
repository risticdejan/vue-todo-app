import * as types from './mutation-types.js'

export const STORAGE_KEY = 'todo';

export const state = {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
};

export const mutations = {
    [types.ADD_TODO] (state, { body }) {
        state.todos.push({
            body,
            completed: false
        })
    },
    [types.DELETE_TODO] (state, { todo }) {
        state.todos.splice(state.todos.indexOf(todo), 1)
    },
    [types.TOGGLE_TODO] (state, { todo }) {
        todo.completed = !todo.completed
    }
};
