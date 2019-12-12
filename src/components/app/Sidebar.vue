<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link tag="li" active-class="active" v-for="link in links"
      :to="link.to" :key="link.to" :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {title: 'Счет', to: '/', exact: true},
        {title: 'История', to: '/history'},
        {title: 'Планирование', to: '/planning'},
        {title: 'Новая запись', to: '/record'},
        {title: 'Категории', to: '/categories'},
      ]
    }
  },
  props: ['isOpen']
}
</script>
