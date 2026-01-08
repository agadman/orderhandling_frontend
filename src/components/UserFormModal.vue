<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click.self="$emit('close')"
  >
    <section
      class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full max-w-md"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          Create new user
        </h2>
        <button
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>
      <form @submit.prevent="createUser" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            v-model="form.username"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            minlength="6"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            v-model="form.role"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <p v-if="error" class="text-sm text-red-600">
          {{ error }}
        </p>
        <div class="flex justify-end pt-2">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            :disabled="loading"
          >
            {{ loading ? 'Creating...' : 'Create user' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['created', 'close'])

const loading = ref(false)
const error = ref('')

const form = ref({
  username: '',
  email: '',
  password: '',
  role: 'user'
})

const createUser = async () => {
  error.value = ''
  loading.value = true

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const msg = await res.json().catch(() => ({}))
      error.value = msg.message || `Could not create user (status ${res.status})`
      return
    }

    // Rensa formuläret
    form.value = { username: '', email: '', password: '', role: 'user' }

    // Säg till listan att uppdatera, och stäng "modalen"
    emit('created')
    emit('close')
  } catch (e) {
    error.value = 'Something went wrong during the request.'
  } finally {
    loading.value = false
  }
}
</script>