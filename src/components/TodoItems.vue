<template>
    <li :class="{ completed: todo.completed}">
        <div class="view">
            <span class="checked">
                <i class="glyphicon glyphicon-ok"
                    v-show="todo.completed"
                    aria-hidden="true"
                >
                </i>
            </span>
            <span class="todo-body"
                @click="toggleTodoItem({ todo: todo })"
            >
                {{ todo.body }}
            </span>
            <span class="destroy"
                @click="deleteTodoItem({ todo: todo })"
            >
                <i class="glyphicon glyphicon-remove" aria-hidden="true"></i>
            </span>
        </div>
    </li>
</template>


<script>
    import { mapMutations } from 'vuex'

    export default {
        name: 'todoItems',
        props: ['todo'],
        methods: {
            ...mapMutations([
              'toggleTodoItem',
              'deleteTodoItem'
            ])
        }
    }
</script>