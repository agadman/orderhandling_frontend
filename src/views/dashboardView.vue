<template>
  <div>
    <Header />
    <div style="display: flex;">
      <Sidebar @change-view="currentView = $event" />
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
            currentView: 'products' // default view
            }
        }
    }
</script>
