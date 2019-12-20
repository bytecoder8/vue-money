<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="cur in currencies" :key="cur">
          <span>{{getInCurrency(cur) | currency(cur) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR']
    }
  },
  props: {
    rates: Object
  },
  computed: {
    ...mapState({
      bill: state => state.info.info.bill
    })
  },
  methods: {
    getInCurrency(currency) {
      return this.bill / this.rates[currency]
    }
  }
}
</script>