<template>
  <aside style="width: 200px; border-right: 1px solid black; padding: 16px;">
    <h2>Sidebar</h2>
    <ul>
      <li>
        <a href="#" @click.prevent="$emit('change-view', 'products')">Products</a>
      </li>
      <li>
        <a href="#" @click.prevent="$emit('change-view', 'users')">Users</a>
      </li>
    </ul>
  </aside>
</template>
