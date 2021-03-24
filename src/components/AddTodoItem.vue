<template>
  <div class="todo-edit__container" >
    <div class="todo-edit add-open" :class="{active:!flagEdit}">
      <span class="btn action-open" v-on:click="isOpenEdit(true)">Add new task</span>
    </div>
    <div class="todo-edit is-edit" :class="{active:flagEdit}">
      <form @submit.prevent="addTask">
        <input type="text" placeholder="Enter a title for this card..." v-model="title" class="todo-edit__item" />
        <div class="edit-actions__container">
          <button type="submit" class="btn add-task">Add Card</button>
          <span class="btn close-edit"><font-awesome-icon
          :icon="['fas', 'times']"
          v-on:click="isOpenEdit(false)"
          /></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-edit__container',
  props: {
    flagEdit: {
      type: Boolean
    }
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    addTask () {
      if (this.title !== '') {
        const todoItem = {
          id: Date.now(),
          title: this.title,
          complited: false,
          createTime: Date.now()
        }
        this.$emit('add-task', todoItem)
        this.$emit('is-Open-Edit', false)
        this.title = ''
      }
    },
    isOpenEdit () {
      this.$store.dispatch('openEdit')
    }
  }
}
</script>

<style lang="scss">
.todo-edit__container {
  margin-bottom: 15px;
  .todo-edit__item{
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    background-color: #fff;
    border: none;
    outline: none;
    padding: 10px 8px;
    border-radius: 3px;
  }
  .edit-actions__container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &.active{
    display: block;
  }
  .btn{
    margin: 0 3px;
    cursor: pointer;
    user-select:none;
    -webkit-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
    -moz-box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
    box-shadow: 0px 8px 25px -2px rgba(34, 60, 80, 0.17);
    &.add-task,
    &.action-open{
      padding: 6px 12px;
      color:#fff;
      background-color: #61bd4f;
      border-radius: 4px;
      }
    &.close-edit{
      margin-left: 10px;
      color: #808d97;
      font-size: 20px;
    }
  }
  .todo-edit{
    display: none;
    flex-direction: column;
    &.active{
      display: flex;
    }
  }
}
</style>
