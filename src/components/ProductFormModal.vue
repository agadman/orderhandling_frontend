<template>
  <section class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-800">
        {{ isEditing ? 'Redigera produkt' : 'Lägg till produkt' }}
      </h2>

      <button
        v-if="isEditing"
        type="button"
        class="text-sm text-gray-600 hover:underline"
        @click="cancelEdit"
      >
        Avbryt redigering
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="grid gap-4 max-w-xl">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Produktnamn</label>
        <input
          v-model="form.name"
          required
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <input
          v-model="form.category"
          required
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Antal i lager</label>
          <input
            v-model.number="form.inStock"
            type="number"
            min="0"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pris</label>
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
        <label class="block text-sm font-medium text-gray-700 mb-1">Beskrivning</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full border border-gray-300 rounded-lg px-3 py-2"
        ></textarea>
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          :disabled="saving"
        >
          {{ saving ? 'Sparar...' : (isEditing ? 'Spara ändringar' : 'Lägg till') }}
        </button>

        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300"
          @click="cancelEdit"
          :disabled="saving"
        >
          Avbryt
        </button>
      </div>

      <p v-if="errorMsg" class="text-sm text-red-600">{{ errorMsg }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'

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

const cancelEdit = () => {
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  errorMsg.value = ''
  emit('close')
}

const resetForm = () => {
  isEditing.value = false
  editingId.value = null
  form.value = emptyForm()
  errorMsg.value = ''
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
      errorMsg.value = `Fel (${res.status}): ${text}`
      saving.value = false
      return
    }

    cancelEdit()
    emit('saved')
  } catch (err) {
    console.log(err)
    errorMsg.value = 'Nätverksfel – kunde inte spara.'
  } finally {
    saving.value = false
  }
}

defineExpose({ startEdit, cancelEdit, resetForm })
</script>