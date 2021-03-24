<template>
  <div class="home">
    <div class="todo-list__container">
      <div class="todo-list__header-contaner">
        <h2 class="todo-list__title">Tasks</h2>
        <span class="action-setting">
          <select class="todo-select__filtered" @change="sortTasks">
            <option value="Ascending">Ascending</option>
            <option value="descending">descending</option>
          </select>
        </span>
      </div>
      <AddTodoItem
        :flagEdit="flagEdit"
        @is-Open-Edit="isOpenEdit"
        @add-task="addTask"
      />
      <TodoItems
        v-if="currentPageTodos.length"
        v-bind:todos="currentPageTodos"
        @remove-task="removeTast"
        @edit-Tast="editTask"
      />
      <p v-if="!currentPageTodos.length" class="todo-list__empty-title">The task list is empty...</p>
      <div class="todo-list__pagination-container">
        <span v-for="(page, index) in pages" :key="index" @click="setCurrentPage(page)" class="pagination__item">{{page + 1}}</span>
      </div>
      <PopUpItem v-if="editingTask" @onEdit="onEditTask" @closePopUp="closePopUp" :todo="editingTask"></PopUpItem>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import TodoItems from '@/components/TodoItems.vue'
import AddTodoItem from '@/components/AddTodoItem.vue'
import PopUpItem from '@/components/PopUpItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    TodoItems,
    AddTodoItem,
    PopUpItem
  },
  data () {
    return {
      todosInPage: 10,
      currentPage: 0,
      locations: []
    }
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks,
      flagEdit: state => state.flagEdit,
      editingTask: state => state.editingTask,
      flagaOpen: state => state.flagaOpen
    }),
    pages () {
      const pages = []
      const totalPages = Math.ceil(this.tasks.length / this.todosInPage)

      for (let i = 0; i < totalPages; i++) {
        pages.push(i)
      }

      return pages
    },
    currentPageTodos () {
      const startIdx = this.currentPage * this.todosInPage
      const endIdx = startIdx + this.todosInPage

      return this.tasks.slice(startIdx, endIdx)
    }
  },
  mounted () {
    this.getTasks()
  },
  methods: {
    getTasks () {
      this.$store.dispatch('getTasks')
    },
    sortTasks (event) {
      this.$store.dispatch('sortTaks', { way: event.target.value })
    },
    removeTast (employeeId) {
      this.$store.dispatch('removeTast', { employeeId })
      if (!this.currentPageTodos.length) this.currentPage = this.currentPage - 1
    },
    isOpenEdit () {
      this.$store.dispatch('openEdit')
    },
    addTask (item) {
      this.$store.dispatch('addTask', { task: item })
      this.currentPage = 0
    },
    editTask (task) {
      this.$store.dispatch('editTask', { task })
    },
    closePopUp () {
      this.$store.dispatch('closePopUp')
    },
    setCurrentPage (page) {
      this.currentPage = page
    },
    onEditTask (todo) {
      this.$store.dispatch('onEditTask', { title: todo.title, employeeId: todo.employeeId })
    }
  }
}
</script>

<style lang="scss">
  .todo-select__filtered{
    padding: 5px;
    font-size:15px;
    background-color: inherit;
  }
  .todo-list__container{
    max-width: 500px;
    border-radius: 5px;
    margin: 0 auto;
    padding: 10px;
    -webkit-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
    -moz-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
    box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
  }
  .todo-list__header-contaner{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .todo-list__title{
      font-size: 20px;
    }
  }
  .active{
    display: block;
  }
  .todo-list__pagination-container{
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .pagination__item{
      cursor: pointer;
      font-size:15px;
      padding: 0 7px;
    }
  }
</style>
