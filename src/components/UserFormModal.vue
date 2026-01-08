<template>
  <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Skapa ny user</h2>

    <form @submit.prevent="createUser" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Användarnamn</label>
        <input
          v-model="form.username"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Lösenord</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg"
          minlength="6"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Roll</label>
        <select
          v-model="form.role"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <div class="flex gap-3">
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          :disabled="loading"
        >
          {{ loading ? 'Skapar...' : 'Skapa user' }}
        </button>

        <button
          type="button"
          class="text-sm text-gray-600 hover:underline"
          @click="$emit('close')"
        >
          Avbryt
        </button>
      </div>
    </form>
  </section>
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
      error.value = msg.message || `Kunde inte skapa user (status ${res.status})`
      return
    }

    // Rensa formuläret
    form.value = { username: '', email: '', password: '', role: 'user' }

    // Säg till listan att uppdatera, och stäng "modalen"
    emit('created')
    emit('close')
  } catch (e) {
    error.value = 'Något gick fel vid anropet.'
  } finally {
    loading.value = false
  }
}
</script>