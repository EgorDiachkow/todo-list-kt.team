<template>
  <div class="list-item__container" :class="{done: todo.complited}">
    <input type="checkbox"
      v-on:change="todo.complited = !todo.complited"
    />
    <div class="item__number">{{index + 1}})</div>
    <div class="item__content">{{todo.title}}</div>
    <div class="item__action-container">
      <span class="item-action edit"
        ><font-awesome-icon
        :icon="['fas', 'pen']"
        v-on:click="$emit('edit-Tast', todo)"
      /></span>
      <span class="item-action remove"
        ><font-awesome-icon
        :icon="['fas', 'times']"
        v-on:click="$emit('remove-Tast', todo.employeeId)"
      /></span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    todo: {
      type: Object
    },
    index: {
      type: Number
    }
  }
}
</script>

<style lang="scss">
.list-item__container {
  -webkit-box-shadow: 0px 14px 42px -7px rgba(34, 60, 80, 0.12);
  -moz-box-shadow: 0px 14px 42px -7px rgba(34, 60, 80, 0.12);
  box-shadow: 0px 14px 42px -7px rgba(34, 60, 80, 0.12);
  display: flex;
  justify-content: space-between;
  min-height: 30px;
  padding: 9px 8px;
  margin: 4px 0;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #f5f6f7;
  }
  &.done{
    background-color: #77E477;
    .item__content{
      text-decoration: line-through;
    }
  }
  .item__content {
    width: 100%;
    text-align: left;
    margin-left: 10px;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .item__action-container {
    display: flex;
    justify-content: space-between;
    .item-action {
      margin: 0 5px;
      color: #808d97;
      font-size: 12px;
      padding: 2px 0;
    }
  }
}
</style>
