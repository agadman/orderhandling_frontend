<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    @click.self="closeModal"
  >
    <section class="w-full max-w-2xl rounded-xl bg-white shadow-lg border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-800">
          {{ isEditing ? 'Edit product' : 'Add product' }}
        </h2>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-600"
          @click="closeModal"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div v-if="isEditing || meta.createdBy" class="mt-4 text-xs text-gray-500 border-t pt-3 mb-3">
        <p v-if="meta.createdAt">
          Created {{ fmtDate(meta.createdAt) }}
          <span v-if="meta.createdBy">by {{ meta.createdBy.username }}</span>
        </p>

        <p v-if="meta.updatedBy">
          Updated {{ fmtDate(meta.updatedAt) }}
          by {{ meta.updatedBy.username }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Product name</label>
          <input
            v-model="form.name"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            v-model="form.category"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">In stock</label>
            <input
              v-model.number="form.inStock"
              type="number"
              min="0"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              v-model.number="form.price"
              type="number"
              min="0"
              step="0.01"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full border border-gray-300 rounded-lg px-3 py-2"
          ></textarea>
        </div>
        <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
        <div class="flex items-center justify-end pt-2">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : (isEditing ? 'Save changes' : 'Add') }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

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

const meta = ref({
  createdAt: null,
  createdBy: null,
  updatedAt: null,
  updatedBy: null
})

const fmtDate = (iso) => {
  if (!iso) return null
  return new Date(iso).toLocaleString('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

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

  meta.value = {
    createdAt: product.createdAt ?? null,
    createdBy: product.createdBy ?? null,
    updatedAt: product.updatedAt ?? null,
    updatedBy: product.updatedBy ?? null
  }
}

const resetForm = () => {
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  errorMsg.value = ''
  meta.value = { createdAt: null, createdBy: null, updatedAt: null, updatedBy: null }
}

const closeModal = () => {
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
    closeModal()
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Network error - could not save.'
  } finally {
    saving.value = false
  }
}

const onKey = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

defineExpose({ startEdit, resetForm })
</script>