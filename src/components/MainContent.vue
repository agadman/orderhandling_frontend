<template>
  <main class="flex-1 min-w-0 p-4 sm:p-6">
    <component :is="currentComponent" />
  </main>
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