<template>
  <div>
    <Header :user="currentUser" @logged-out="onLoggedOut" />
    <div style="display: flex;">
      <Sidebar 
        :activeView="currentView"
        @change-view="currentView = $event" 
      />
      <MainContent :view="currentView" />
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
            currentUser: null
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
        const res = await fetch('http://localhost:3000/auth/me', {
          credentials: 'include'
        })
        if (!res.ok) return
        const data = await res.json()
        this.currentUser = data.user
      } catch (err) {
        console.log('Auth error:', err)
      }
    }
    }
</script>
