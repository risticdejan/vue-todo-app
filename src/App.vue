<template>
    <div id="app">
        <todo></todo>
    </div>
</template>

<script>
    import todo from './components/Todo.vue'

    export default {
        name: 'app',
        components: {
            todo
        }
    }
</script>

