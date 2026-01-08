<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    @click.self="cancelEdit"
  >
    <section class="w-full max-w-2xl rounded-xl bg-white shadow-lg border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {{ isEditing ? 'Edit product' : 'Add product' }}
        </h2>

        <button
          type="button"
          class="text-sm text-gray-600 hover:underline"
          @click="cancelEdit"
        >
          Close
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product name</label>
          <input v-model="form.name" required class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input v-model="form.category" required class="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">In stock</label>
            <input v-model.number="form.inStock" type="number" min="0" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input v-model.number="form.price" type="number" min="0" step="0.01" required
              class="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea v-model="form.description" rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2"></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : (isEditing ? 'Save changes' : 'Add') }}
          </button>
        </div>

        <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['saved', 'close'])

const emptyForm = () => ({
  name: '',
  category: '',
  price: 0,
  inStock: 0,
  description: ''
})

const form = ref(emptyForm())
const isEditing = ref(false)
const editingId = ref(null)
const saving = ref(false)
const errorMsg = ref('')

const startEdit = (product) => {
  isEditing.value = true
  editingId.value = product._id
  form.value = {
    name: product.name ?? '',
    category: product.category ?? '',
    price: product.price ?? 0,
    inStock: product.inStock ?? 0,
    description: product.description ?? ''
  }
}

const resetForm = () => {
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  errorMsg.value = ''
}

const cancelEdit = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  errorMsg.value = ''
  saving.value = true

  const payload = {
    name: form.value.name,
    category: form.value.category,
    price: Number(form.value.price),
    inStock: Number(form.value.inStock),
    description: form.value.description || ''
  }

  try {
    const url = isEditing.value
      ? `http://localhost:3000/products/${editingId.value}`
      : `http://localhost:3000/products`

    const method = isEditing.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const text = await res.text()
      errorMsg.value = `Error (${res.status}): ${text}`
      return
    }

    emit('saved')
    cancelEdit()
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Network error - could not save.'
  } finally {
    saving.value = false
  }
}

const onKey = (e) => {
  if (e.key === 'Escape') cancelEdit()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

defineExpose({ startEdit, resetForm, cancelEdit })
</script>