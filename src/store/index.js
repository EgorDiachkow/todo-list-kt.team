import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    flagEdit: false,
    editingTask: null
  },
  mutations: {
    addTask (state, task) {
      state.tasks.push(task.task)
    },
    removeTask (state, id) {
      const tasks = state.tasks.slice(0)

      state.tasks = tasks.filter(item => item.id !== id)
    },
    openEdit (state) {
      state.flagEdit = !state.flagEdit
    },
    editTask (state, { task }) {
      state.editingTask = task
    },
    onEditTask (state, { title }) {
      const task = state.tasks.find(todo => todo.id === state.editingTask.id)

      task.title = title
      state.editingTask = null
    },
    sortTasks (state, { way }) {
      const cloneTasks = state.tasks.slice(0)

      if (way === 'Ascending') state.tasks = cloneTasks.sort((a, b) => a.createTime - b.createTime)
      else if (way === 'descending') state.tasks = cloneTasks.sort((a, b) => b.createTime - a.createTime)
    },
    getTasks (state, { tasks }) {
      state.tasks = tasks
    }
  },
  actions: {
    async addTask ({ commit }, { task }) {
      const newTask = JSON.stringify(task)

      axios.post('http://localhost:3000/tasks', newTask, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
        .then((respons) => {
          const task = respons.data
          commit('addTask', { task })
        })
    },
    removeTast ({ commit }, { id }) {
      axios.delete('http://localhost:3000/tasks/' + id)
        .then(() => {
          commit('removeTask', id)
        })
    },
    editTask ({ commit }, { task }) {
      commit('editTask', { task })
    },
    openEdit ({ commit }) {
      commit('openEdit')
    },
    onEditTask ({ commit }, { title }) {
      commit('onEditTask', { title })
    },
    sortTaks ({ commit }, { way }) {
      commit('sortTasks', { way })
    },
    async getTasks ({ commit }) {
      return axios('http://localhost:3000/tasks/', {
        method: 'GET'
      })
        .then((respons) => {
          const tasks = respons.data

          commit('getTasks', { tasks })
          return tasks
        })
    }
  }
})
