<template>
    <div>
        <section class="todo">
            <header>
                <h2>Todo list</h2>
            </header>
            <section v-show="filteredTodos.length">
                <transition-group name="fade" tag="ul" class="todo-list">
                    <todo-items v-for="todo in filteredTodos"
                        :todo="todo"
                        :key="todo.body"
                    >
                    </todo-items>
                </transition-group>
            </section>
            <footer>
                <div class="todo-nav"
                    v-show="todos.length"
                >
                    <ul class="filters">
                        <li v-for="(val, key) in filters">
                            <a href="javascript:void(0);"
                                :class="{ selected: visibility === key }"
                                @click="visibility = key"
                            >
                                {{ key | capitalize }}
                            </a>
                        </li>
                    </ul>
                </div>
                <input class="new-todo"
                    autofocus
                    placeholder="What needs to be done?"
                    @keyup.enter="addTodo"
                />
                <div class="todo-left"
                    v-show="todos.length"
                >
                    <span class="count">
                        <strong>{{ remaining }}</strong>
                        {{ remaining | pluralize('item') }} left
                    </span>
                    <span class="clear-completed"
                        v-show="todos.length > remaining"
                        @click="clearCompleted"
                    >
                        clear completed
                    </span>
                </div>
            </footer>
        </section>

    </div>
</template>
<script>
    import todoItems from './TodoItems.vue'
    import { mapMutations } from 'vuex'

    const filters = {
        all: todos => todos,
        active: todos => todos.filter(todo => !todo.completed),
        completed: todos => todos.filter(todo => todo.completed)
    }

    export default {
        name: 'todo',
        components: {
            todoItems
        },
        data () {
            return {
                visibility: 'all',
                filters: filters
            }
        },
        computed: {
            todos () {
                return this.$store.state.todos
            },
            filteredTodos () {
                return filters[this.visibility](this.todos)
            },
            remaining () {
                return this.todos.filter(todo => ! todo.completed).length
            }
        },
        methods: {
            addTodo (e) {
                const body = e.target.value

                if( body.trim() ) {
                    this.$store.commit('addTodoItem', { body })
                }

                e.target.value = ''
            },
            ...mapMutations([
                'clearCompleted'
            ])
        },
        filters: {
            pluralize: (n, w) => n === 1 ? w : (w + 's'),
            capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
        }
    }
</script>

<style>
    .todo {
        background: #fff;
        position: relative;
        -webkit-box-shadow: 0 .25em .25em 0 rgba(0,0,0,0.2);
        box-shadow: .25em .25em .4em 0 rgba(0,0,0,0.2);
        border: .1em solid #ccc;
    }

    .todo header{
        background: rgba(0,0,0,.04);
    }
    .todo footer {
        background: rgba(0,0,0,.02);
    }

    .todo header  h2 {
        font-size: 2em;
        font-weight: bold;
        margin: 0;
        padding:  .5em .5em .5em 2em;
    }

    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
        border-bottom: .1em solid #ccc;
        border-top: .1em solid #ccc;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }




    .todo-list li {
        position: relative;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.completed span.todo-body {
        color: #ccc;
        text-decoration: line-through;
    }

    .todo-list li span.todo-body {
        word-break: break-all;
        padding: .5em 1em;
        margin-left: 3em;
        margin-right: 6em;
        display: block;
        cursor: pointer;
    }

    .todo-list li .checked,
    .todo-list li .destroy,
    .todo-list li .edit-todo {
        text-align: center;
        padding: .5em 1em;
        width: 3em;
        height: auto;
        position: absolute;
        top: 0;
        margin: auto 0;
        border: none;
    }


    .todo-list li .completed {
        bottom: 0;
        border-right: 1px dashed #e9e9e9;
    }

    .todo-list li .destroy {
        right: 0;
        display: none;
        cursor: pointer;
    }

    .todo-list li .edit-todo {
        right: 3em;
        display: none;
        cursor: pointer;
    }

    .todo-list li .edit-todo:hover {
        color: #123456;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li:hover .destroy,
    .todo-list li:hover .edit-todo {
        display: block;
    }

    .todo-list li .edit
    {
        background: inherit;
        border: none;
        position: relative;
        margin: .1em 0;
        width: 100%;
        line-height: 1.4em;
        padding: .5em .5em .5em 4em;
        display: none;
    }

    .todo-list li.editing .edit {
        display: block;
    }

    .todo-list li.editing .view {
        display: none;
    }

    :focus {
        outline: 0;
    }

    .new-todo {
        background: inherit;
        border: none;
        position: relative;
        margin: 0;
        width: 100%;
        line-height: 1.4em;
        padding: 1em 1em 1em 4em;
    }

    .todo-nav,
    .todo-left {
        padding: .5em 1em .5em 4em;
        background: inherit;
        border-bottom: 1px solid #e9e9e9;
        border-top: 1px solid #e9e9e9;
    }

    .todo-left .count {
        padding: .5em 0;
        text-align: center;
    }

    .todo-nav .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        display: inline;

    }

    .todo-nav .filters li {
        display: inline;
    }

    .todo-nav .filters li a {
        color: inherit;
        margin: 3px 3px 3px 0;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }

    .todo-nav .filters li a:hover {
        border-color: rgba(0, 0, 0, 0.4);
    }

    .todo-nav .filters li a.selected {
        background: #fff;
        border-color: rgba(0, 0, 0, 0.4);
    }

    .todo-left .clear-completed {
        color: inherit;
        background: inherit;
        float: right;
        padding: 0;
        cursor: pointer;
    }

    .todo-left .clear-completed:hover {
        color: #000000;
    }
</style>