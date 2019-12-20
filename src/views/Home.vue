<template>
<div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>

  <Loader v-if="loading" />
  <div v-else class="row">
    <HomeBill :rates="currency.rates" />
    <HomeCurrency :rates="currency.rates" :date="currency.date" />
  </div>
</div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      currency: { rates: { 'RUB': 1 }, date: null }
    }
  },
  mounted() {
    this.loadCurrencyData()
  },
  methods: {
    async loadCurrencyData() {
      if (!this.loading) {
        this.loading = true
      }
      
      this.currency = await this.$store.dispatch('fetchCurrency')

      this.loading = false
    },
    refresh() {
      this.loadCurrencyData()
    },
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
