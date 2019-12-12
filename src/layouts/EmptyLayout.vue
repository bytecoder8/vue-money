<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/lang/messages'

export default {
  computed: {
    error() {
      return this.$store.state.error
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>