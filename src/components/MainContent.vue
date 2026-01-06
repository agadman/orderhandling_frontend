<template>
  <div style="flex: 1; padding: 16px;">
    <component :is="currentComponent" />
  </div>
</template>

<script>
    import ProductList from './ProductList.vue'
    import UsersList from './UsersList.vue'

    export default {
    props: ['view'],
    computed: {
        currentComponent() {
        return this.view === 'products' ? ProductList : UsersList
        }
    }
    }
</script>
