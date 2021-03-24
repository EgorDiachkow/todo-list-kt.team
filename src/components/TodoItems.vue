<template>
  <div class="list_contener__items">
    <TodoItem
    v-for="(item, index) in todos"
    :key="item.id"
    :todo="item"
    :index="index"
    v-on:remove-Tast="removeTast"
    v-on:edit-Tast="editTask"
    />
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'TodoItems',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array
    }
  },
  methods: {
    removeTast (employeeId) {
      this.$emit('remove-task', employeeId)
    },
    editTask (index) {
      this.$emit('edit-Tast', index)
    }
  }
}
</script>

<style lang="scss">
.list_contener__items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
