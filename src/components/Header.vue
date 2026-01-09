<template>
  <header class="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        
        <!-- Hamburger meny(bara på mobil) -->
        <button
          type="button"
          class="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          @click="emit('toggle-sidebar')"
          aria-label="Open menu"
        >
          <Menu class="w-6 h-6 text-gray-600" />
        </button>

        <div class="flex items-center min-w-0">
          <img
            src="/logo.png"
            alt="Wellory logo"
            class="h-10 md:h-14 w-auto shrink-0"
          />
          <h1 class="text-lg md:text-xl font-semibold text-gray-900 truncate">
            Wellory Inventory
          </h1>
        </div>
      </div>

      <div class="hidden sm:block flex-1 max-w-xl mx-2 md:mx-8 relative">
        <input
          type="text"
          placeholder="Search"
          class="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg
                 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>

      <div class="hidden md:flex items-center gap-4">
        <div class="text-right leading-tight">
          <p class="text-xs text-gray-500">Logged in as</p>
          <p class="text-sm font-medium text-gray-800">
            {{ user?.username || '-' }}
          </p>
        </div>

        <button
          type="button"
          @click="handleLogout"
          class="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Logga ut"
        >
          <LogOut class="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <button
        type="button"
        @click="handleLogout"
        class="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        title="Logga ut"
      >
        <LogOut class="w-6 h-6 text-gray-600" />
      </button>
    </div>

    <div class="sm:hidden mt-3 relative">
      <input
        type="text"
        placeholder="Search"
        class="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  </header>
</template>

<script setup>
import { LogOut, Search, Menu } from 'lucide-vue-next'

const emit = defineEmits(['logged-out', 'toggle-sidebar'])

defineProps({
  user: Object
})

const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })

    if (res.ok) emit('logged-out')
    else console.log('Logout failed:', res.status)
  } catch (err) {
    console.log('Logout error:', err)
  }
}
</script>