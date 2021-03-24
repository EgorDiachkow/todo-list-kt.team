<template>
  <div class="todo-modal">
    <div class="todo-modal__overlay">
      <div class="todo-modal__content">
        <div class="todo-modal__header">
            <div class="todo-modal__title">Edit Task</div>
            <span class="close-popUp"><font-awesome-icon
            :icon="['fas', 'times']"
            v-on:click="closePopUp()"
            /></span>
        </div>
          <form class="todo-modal__form" @submit.prevent="onEditTask({ title, employeeId: todo.employeeId })">
            <input class="todo-edit__item" placeholder="Editing a task" v-model="title" />
            <button class="btn edit" type="submit">Edit</button>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-modal',
  props: {
    todo: {
      type: Object
    }
  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = this.todo.title
  },
  methods: {
    closePopUp () {
      this.$store.dispatch('closePopUp')
    },
    onEditTask (todo) {
      this.$store.dispatch('onEditTask', { title: todo.title, employeeId: todo.employeeId })
    }
  }
}
</script>

<style lang="scss">
  .todo-modal{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .todo-modal__overlay{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      .todo-modal__content{
        padding: 15px;
        background-color: #fff;
        border-radius: 4px;
        width: 400px;
        animation: zoomIn 0.2s ease;
      }
    }
    .todo-modal__form{
      display: flex;
      flex-direction: column;
    }
    .todo-edit__item {
      margin-bottom: 20px;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      outline: none;
    }
    .todo-modal__header{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .todo-modal__title{
        margin-bottom: 15px;
        font-size: 16px;
        font-weight: 600;
      }
      .close-popUp{
        cursor: pointer;
        color: #808d97;
        font-size: 15px;
      }
    }
    .btn{
      margin: 0 3px;
      cursor: pointer;
      user-select:none;
      -webkit-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
      -moz-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
      box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
      &.edit{
        padding: 8px 12px;
        color:#fff;
        background-color: #61bd4f;
        border-radius: 4px;
        &:hover{
          background-color: #4fa33e;
        }
      }
    }
  }

  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
