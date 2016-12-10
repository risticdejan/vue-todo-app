<template>
    <li :class="{ completed: todo.completed, editing: editing }">
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
            <span class="edit-todo"
                @click="editing = true"
            >
                <i class="glyphicon glyphicon-edit" aria-hidden="true"></i>
            </span>
            <span class="destroy"
                @click="deleteTodoItem({ todo: todo })"
            >
                <i class="glyphicon glyphicon-remove" aria-hidden="true"></i>
            </span>
        </div>
        <input class="edit"
            v-show="editing"
            v-focus="editing"
            :value="todo.body"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            @blur="doneEdit"
        >
    </li>
</template>


<script>
    import { mapMutations } from 'vuex'

    export default {
        name: 'todoItems',
        props: ['todo'],
        data () {
            return {
                editing: false
            }
        },
        directives: {
            focus (el, { value }, { context }) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        methods: {
            ...mapMutations([
              'toggleTodoItem',
              'editTodo',
              'deleteTodoItem'
            ]),
            doneEdit (e) {
                const value = e.target.value.trim()
                const { todo } = this

                if (!value) {
                    this.deleteTodo({
                        todo
                    })
                } else if (this.editing) {
                    this.editTodo({
                        todo,
                        value
                    })
                    this.editing = false
                }
            },
            cancelEdit (e) {
                e.target.value = this.todo.body
                this.editing = false
            }
        }
    }
</script>