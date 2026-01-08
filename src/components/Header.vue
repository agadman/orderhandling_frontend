<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold text-gray-900">Hälsolager</h1>

      <div class="flex-1 max-w-xl mx-8 relative">
        <input
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div class="flex items-center gap-4">
        <div class="text-right leading-tight">
          <p class="text-sm font-medium text-gray-800">
            {{ user?.username }}
          </p>
          <p class="text-xs text-gray-500 capitalize">
            {{ user?.role }}
          </p>
        </div>

        <button
          @click="handleLogout"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Logga ut"
        >
          <LogOut class="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { LogOut, Search } from 'lucide-vue-next'

defineProps({
  user: Object
})

const handleLogout = async () => {
  console.log('Logging out...')
}
</script>