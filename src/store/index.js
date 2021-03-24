import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [],
    flagEdit: false,
    editingTask: null
  },
  mutations: {
    addTask (state, { task, employeeId }) {
      state.tasks.push({ ...task, employeeId })
    },
    removeTask (state, employeeId) {
      const tasks = state.tasks.slice(0)

      state.tasks = tasks.filter(item => item.employeeId !== employeeId)
    },
    openEdit (state) {
      state.flagEdit = !state.flagEdit
    },
    editTask (state, { task }) {
      state.editingTask = task
    },
    onEditTask (state, { title, employeeId }) {
      const task = state.tasks.find(todo => todo.employeeId === state.editingTask.employeeId)

      task.title = title
      state.editingTask = null
    },
    sortTasks (state, { way }) {
      const cloneTasks = state.tasks.slice(0)

      if (way === 'Ascending') state.tasks = cloneTasks.sort((a, b) => a.createTime - b.createTime)
      else if (way === 'descending') state.tasks = cloneTasks.sort((a, b) => b.createTime - a.createTime)
    },
    getTasks (state, { data }) {
      state.tasks = data
    },
    closePopUp (state) {
      state.editingTask = null
    }
  },
  actions: {
    editTask ({ commit }, { task }) {
      commit('editTask', { task })
    },
    openEdit ({ commit }) {
      commit('openEdit')
    },
    sortTaks ({ commit }, { way }) {
      commit('sortTasks', { way })
    },
    closePopUp ({ commit }) {
      commit('closePopUp')
    },
    async addTask ({ commit }, { task }) {
      db.collection('tasks').add(task)
        .then((respons) => {
          const employeeId = respons.id

          commit('addTask', { task, employeeId })
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
        })
    },
    async removeTast ({ commit }, { employeeId }) {
      db.collection('tasks').doc(employeeId).delete().then(() => {
        commit('removeTask', employeeId)
      }).catch((error) => {
        console.error('Error removing document: ', error)
      })
    },
    async onEditTask ({ commit }, { title, employeeId }) {
      db.collection('tasks').doc(employeeId).update({
        title
      }).then(() => {
        commit('onEditTask', { title, employeeId })
      })
    },
    async getTasks ({ commit }) {
      db.collection('tasks').get()
        .then(querySnapshot => {
          const data = []

          querySnapshot.forEach(doc => {
            const task = {
              id: doc.data().id,
              title: doc.data().title,
              complited: doc.data().complited,
              createTime: doc.data().createTime,
              employeeId: doc.id
            }
            data.push(task)
          })
          commit('getTasks', { data })
        })
        .catch((error) => {
          console.error('Error get document: ', error)
        })
    }
  }
})
