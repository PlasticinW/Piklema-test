<template>
  <form @submit.prevent="saveEdit">
    <div v-for="todo in todoList" :key="todo.id">
      <div>
        <span class="todo-item" :class="{ completed: todo.completed }">{{ todo.item }}</span>
        <span class="span-button" @click.stop="toggleCompleted(todo.id)">&#10004;</span>
        <span class="span-button" @click="deleteTodo(todo.id)">&#10060;</span>
        <span class="span-button" @click="editTodo(todo)">&#9998;</span>
        <input v-if="editId === todo.id" v-model="editItem" @blur="saveEdit" @keyup.enter="saveEdit" />
      </div>
    </div>
</form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useTodoListStore } from "../stores/useTodoListStore";
import { storeToRefs } from "pinia";
import type { ToDoItem } from "../stores/useTodoListStore";

export default defineComponent({
  setup() {
    const store = useTodoListStore();
    
    onMounted(() => {
      store.loadTodos();
    });
    
    const { todoList } = storeToRefs(store);
    const { toggleCompleted, deleteTodo } = store;
    
    const editId = ref<number | null>(null);
    const editItem = ref("");

    function editTodo(todo: ToDoItem) {
      editId.value = todo.id;
      editItem.value = todo.item;
    }

    function saveEdit() {
      if (editId.value !== null) {
        store.updateTodo(editId.value, editItem.value);
        editId.value = null; // сбрасываем редактирование
        editItem.value = ""; // очищаем поле ввода
      }
    }

    return { todoList, toggleCompleted, deleteTodo, editTodo, editId, editItem, saveEdit };
  },
});
</script>

<style>

.completed {
  text-decoration: line-through;
}

.span-button {
  cursor: pointer;
}


</style>