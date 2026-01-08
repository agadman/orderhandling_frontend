<template>
  <div class="flex items-center justify-between px-6 pt-4 pb-10">
    <h1 class="text-xl font-semibold text-gray-800">
      Users
    </h1>

    <button
      v-if="currentUser?.role === 'admin'"
      @click="showForm = true"
      class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
    >
      + Add new user
    </button>
  </div>

  <UserFormModal
    v-if="showForm"
    @created="getUsers"
    @close="showForm = false"
  />

  <section class="bg-white rounded-xl shadow-sm border-gray-200 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr class="border-b border-gray-200">
          <th class="text-left font-medium px-6 py-3">Username</th>
          <th class="text-left font-medium px-6 py-3">Email</th>
          <th class="text-left font-medium px-6 py-3">Role</th>
          <th class="text-left font-medium px-6 py-3">Created</th>
          <th class="text-right font-medium px-6 py-3">Actions</th>
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

onMounted(() => {
  getUsers()
  getCurrentUser()
})

const getUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/users', {
      credentials: 'include'
    })

    if (!res.ok) {
      console.log('Error:', res.status)
      return
    }

    const data = await res.json()
    users.value = data
  } catch (error) {
    console.log('There was an error:', error)
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
  } catch (error) {
    console.log('There was an error:', error)
  }
}

const currentUser = ref(null)

const getCurrentUser = async () => {
  try {
    const res = await fetch('http://localhost:3000/auth/me', {
      credentials: 'include'
    })

    if (!res.ok) return

    const data = await res.json()
    currentUser.value = data.user
  } catch (error) {
    console.log('Auth error:', error)
  }
}
</script>