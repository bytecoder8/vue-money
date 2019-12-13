<template>
  <div class="app-main-layout">
    <Navbar @menu-click="isMenuOpen = !isMenuOpen" />
    <Sidebar :isOpen="isMenuOpen" />
    <main class="app-content" :class="{full: !isMenuOpen}">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  components: {
    Navbar, Sidebar
  },
  data() {
    return {
      isMenuOpen: true
    }
  },
  async mounted() {
    if (Object.keys(this.$store.getters.info).length === 0) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>
