<template>
  <tr class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
    <td class="px-6 py-4 font-medium text-gray-800">
      {{ user.username }}
    </td>

    <td class="px-6 py-4 text-gray-600">
      {{ user.email }}
    </td>

    <td class="px-6 py-4">
      <span
        :class="[
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-700'
            : 'bg-gray-100 text-gray-700'
        ]"
      >
        {{ user.role }}
      </span>
    </td>

    <td class="px-6 py-4 text-gray-600">
      {{ formatDate(user.createdAt) }}
    </td>

    <td v-if="isAdmin" class="px-8 py-4 text-right space-x-3">
      <button
        class="text-red-600 hover:underline text-sm"
        @click="$emit('delete-user', user._id || user.id)"
      >
        Delete
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  user: Object,
  isAdmin: Boolean
})

defineEmits(['delete-user'])

const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('sv-SE')
}
</script>