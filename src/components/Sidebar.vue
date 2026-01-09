<script setup>
import { Package, Users, X } from 'lucide-vue-next'

defineProps({
  activeView: { type: String, required: true },
  isOpen: { type: Boolean, default: false } 
})

defineEmits(['change-view', 'close'])
</script>

<template>
  <!-- Sidebar för större skärmar -->
  <aside class="hidden md:block w-56 min-h-screen bg-white border-r border-gray-200 px-4 py-6">
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

  <!-- Sidebar för mobil -->
  <div v-if="isOpen" class="md:hidden fixed inset-0 z-50">
    <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>
    <aside class="absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 px-4 py-6 shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-gray-800">Menu</p>
        <button class="p-2 hover:bg-gray-100 rounded-lg" @click="$emit('close')" aria-label="Close">
          <X class="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <nav class="space-y-2">
        <button
          @click="$emit('change-view', 'products'); $emit('close')"
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
          @click="$emit('change-view', 'users'); $emit('close')"
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
  </div>
</template>