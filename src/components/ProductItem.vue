<template>
  <tr class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
    <td class="px-6 py-4 font-medium text-gray-800">
      {{ product.name }}
    </td>
    <td class="px-6 py-4 text-gray-600">
      {{ product.category }}
    </td>
    <td class="px-6 py-4 text-gray-600">
      {{ product.price }} kr
    </td>
    <td class="px-6 py-4">
      <span
        :class="[
          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
          product.inStock > 0
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        ]"
      >
        {{ product.inStock }} st
      </span>
    </td>
    <td class="px-6 py-4 text-right space-x-3">
      <button class="text-blue-600 hover:underline text-sm">
        Redigera
      </button>
      <button
        class="text-red-600 hover:underline text-sm"
        @click="$emit('delete-product', product._id)"
      >
        Ta bort
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  product: Object
})
</script>