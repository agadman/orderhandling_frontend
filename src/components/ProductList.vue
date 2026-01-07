<template>
    <div class="flex items-center justify-between px-6 pt-4 pb-10">
      <h1 class="text-xl font-semibold text-gray-800">
        Produkter
      </h1>

      <button
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        + Lägg till produkt
      </button>
    </div>

  <section class="bg-white rounded-xl shadow-sm border-gray-200 overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 text-gray-600">
        <tr class="border-b border-gray-200">
          <th class="text-left font-medium px-6 py-3">Namn</th>
          <th class="text-left font-medium px-6 py-3">Kategori</th>
          <th class="text-left font-medium px-6 py-3">Pris</th>
          <th class="text-left font-medium px-6 py-3">Lagerstatus</th>
          <th class="text-right font-medium px-6 py-3">Åtgärder</th>
        </tr>
      </thead>

      <tbody v-if="products.length">
        <ProductItem
          v-for="product in products"
          :key="product._id"
          :product="product"
          @delete-product="deleteProduct"
        />
      </tbody>
    </table>

    <div
      v-if="!products.length"
      class="px-6 py-6 text-sm text-gray-500"
    >
      Listan är tom.
    </div>

  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import ProductItem from './ProductItem.vue';

  const products = ref([]);

  onMounted(() => {
    getProducts();
  });

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