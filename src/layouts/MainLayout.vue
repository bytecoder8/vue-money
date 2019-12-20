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
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip:left="'Добавить новую запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      info: state => state.info.info
    })
  },
  async mounted() {
    if (Object.keys(this.info).length === 0) {
      await this.$store.dispatch('fetchInfo')
    }
  }
}
</script>
