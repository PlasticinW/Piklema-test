<template>
    <form @submit.prevent="addItemAndClear(todo)">
        <input v-model="todo" type="text" placeholder="Add a new task" /><button>Add</button>
    </form>
</template>

<script>
import { ref, onMounted } from "vue";
//import { useTodoListStore } from '../stores/useTodoListStore.js'
import { useTodoListStore } from '@/stores/useTodoListStore'
export default {
    setup () {
        const todo = ref("")
        const store = useTodoListStore()



        function addItemAndClear(item) {
            if(item.length === 0){
                return
            }
            store.addTodo(item)
            todo.value = ''
        }
    
        return { todo, addItemAndClear };
    },
};
</script>

<style lang="scss" scoped>

</style>