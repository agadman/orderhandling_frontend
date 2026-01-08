<template>
    <div class="flex items-center justify-between px-6 pt-4 pb-10">
      <h1 class="text-xl font-semibold text-gray-800">
        Products
      </h1>

      <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        @click="openCreate()"
      >
        + Add product
      </button>  
    </div>
    <ProductFormModal
      v-if="showForm"
      ref="productFormRef"
      @saved="handleSaved"
      @close="showForm = false"
    />

  <section class="bg-white rounded-xl shadow-sm border-gray-200 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr class="border-b border-gray-200">
          <th class="text-left font-medium px-6 py-3">Name</th>
          <th class="text-left font-medium px-6 py-3">Category</th>
          <th class="text-left font-medium px-6 py-3">Price</th>
          <th class="text-left font-medium px-6 py-3">In stock</th>
          <th class="text-right font-medium px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody v-if="products.length">
        <ProductItem
          v-for="product in products"
          :key="product._id"
          :product="product"
          @delete-product="deleteProduct"
          @edit-product="openEdit"
        />
      </tbody>
    </table>

    <div
      v-if="!products.length"
      class="px-6 py-6 text-sm text-gray-500"
    >
      List is empty.
    </div>

  </section>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import ProductItem from './ProductItem.vue';
  import ProductFormModal from './ProductFormModal.vue'

  const products = ref([]);
  const showForm = ref(false)
  const productFormRef = ref(null)

  onMounted(() => {
    getProducts();
  });

  const openCreate = async () => {
  showForm.value = true
  await nextTick()
  productFormRef.value?.resetForm?.() 
}

const openEdit = async (product) => {
  showForm.value = true
  await nextTick()
  productFormRef.value?.startEdit?.(product)
}

const handleSaved = () => {
  showForm.value = false
  getProducts()
}

  const getProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/products', {
        credentials: 'include' 
      });

      if (!res.ok) {
        console.log('Error:', res.status);
        return;
      }

      const data = await res.json();
      products.value = data;
    } catch (error) {
      console.log('There was an error:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (res.ok) getProducts();
      else console.log('Delete failed:', res.status);
    } catch (error) {
      console.log('There was an error:', error);
    }
  };
</script>