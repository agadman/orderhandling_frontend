<template>
  <div class="px-4 sm:px-6 pt-4 pb-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h1 class="text-xl font-semibold text-gray-800">Users</h1>

      <button
        v-if="currentUser?.role === 'admin'"
        @click="showForm = true"
        class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Add new user
      </button>
    </div>
  </div>

  <UserFormModal
    v-if="showForm"
    @created="getUsers"
    @close="showForm = false"
  />

  <section class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="min-w-175 w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr class="border-b border-gray-200">
            <th class="text-left font-medium px-4 sm:px-6 py-3">Username</th>
            <th class="text-left font-medium px-4 sm:px-6 py-3">Email</th>
            <th class="text-left font-medium px-4 sm:px-6 py-3">Role</th>
            <th class="hidden sm:table-cell text-left font-medium px-4 sm:px-6 py-3">Created</th>
            <th
              v-if="currentUser?.role === 'admin'"
              class="text-right font-medium px-4 sm:px-6 py-3"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody v-if="users.length">
          <UserItem
            v-for="user in users"
            :key="user._id || user.id"
            :user="user"
            :isAdmin="currentUser?.role === 'admin'"
            @delete-user="deleteUser"
          />
        </tbody>
      </table>
    </div>

    <div v-if="!users.length" class="px-6 py-6 text-sm text-gray-500">
      List is empty.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserItem from './UserItem.vue'
import UserFormModal from './UserFormModal.vue'

const users = ref([])
const showForm = ref(false)
const currentUser = ref(null)

onMounted(() => {
  getUsers()
  getCurrentUser()
})

const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', { credentials: 'include' })
    if (!res.ok) return console.log('Error:', res.status)
    users.value = await res.json()
  } catch (e) {
    console.log('There was an error:', e)
  }
}

const deleteUser = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (res.ok) getUsers()
    else console.log('Delete failed:', res.status)
  } catch (e) {
    console.log('There was an error:', e)
  }
}

const getCurrentUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/me', { credentials: 'include' })
    if (!res.ok) return
    const data = await res.json()
    currentUser.value = data.user
  } catch (e) {
    console.log('Auth error:', e)
  }
}
</script>