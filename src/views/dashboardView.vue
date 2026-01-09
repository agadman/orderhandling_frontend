<template>
  <div>
    <Header
      :user="currentUser"
      @logged-out="onLoggedOut"
      @toggle-sidebar="sidebarOpen = true"
    />

    <div class="flex">
      <Sidebar
        :activeView="currentView"
        :isOpen="sidebarOpen"
        @close="sidebarOpen = false"
        @change-view="currentView = $event"
      />

      <main class="flex-1 min-w-0">
        <MainContent :view="currentView" />
      </main>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import MainContent from '@/components/MainContent.vue'

export default {
  components: { Header, Sidebar, MainContent },
  data() {
    return {
      currentView: 'products',
      currentUser: null,
      sidebarOpen: false
    }
  },
  methods: {
    onLoggedOut() {
      this.currentUser = null
      this.$router.push('/')
    }
  },
  async mounted() {
    try {
      const res = await fetch('http://localhost:3000/auth/me', { credentials: 'include' })
      if (!res.ok) return
      const data = await res.json()
      this.currentUser = data.user
    } catch (err) {
      console.log('Auth error:', err)
    }
  }
}
</script>