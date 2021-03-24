<template>
  <div class="list_contener__items">
    <TodoItem
    v-for="(item, index) in todos"
    :key="item.id"
    :todo="item"
    :index="index"
    />
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'

export default {
  name: 'list_contener__items',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array
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
