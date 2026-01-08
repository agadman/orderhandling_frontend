<script setup>
import { Package, Users } from 'lucide-vue-next'

defineProps({
  activeView: {
    type: String,
    required: true
  }
})
</script>

<template>
  <aside class="w-56 min-h-screen bg-white border-r border-gray-200 px-4 py-6">
    <nav class="space-y-2">
      <button
        @click="$emit('change-view', 'products')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition',
          activeView === 'products'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
      >
        <Package class="w-5 h-5" />
        Products
      </button>
      <button
        @click="$emit('change-view', 'users')"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition',
          activeView === 'users'
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
      >
        <Users class="w-5 h-5" />
        Users
      </button>
    </nav>
  </aside>
</template>