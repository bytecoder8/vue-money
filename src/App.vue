<template>
  <div id="app">
    <component :is="layout">
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import messages from '@/lang/messages'

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    error() {
      return this.$store.state.error
    }
  },
  components: {
    EmptyLayout, MainLayout
  },
  watch: {
    error(error) {
      this.$error(messages[error.code || error.message || error] || 'Что-то пошло не так')
    }
  }
}
</script>

<style lang="scss">
@import 'assets/index.css';
</style>
