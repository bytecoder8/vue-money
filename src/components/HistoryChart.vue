<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: {
    categories: {
      type: Array,
      required: true
    },
    records: {
      type: Array,
      required: true
    },
    type: {
      required: true,
      validator: function (value) {
        return ['charge', 'income'].indexOf(value) !== -1
      }
    }
  },
  mounted() {
    this.displayData()
  },
  methods: {
    displayData() {
      const charges = this.categories
      .filter(cat => cat.type === this.type)
      .map(cat => {
        const amount = this.records.reduce((total, rec) => {
          if (rec.categoryId === cat.id) {
            total += +rec.amount
          }
          return total
        }, 0)
        return({ name: cat.name, amount })
      })
      .filter(cat => cat.amount > 0)
      const title = (this.type === 'income' ? 'Доходы' : 'Расходы') +' по категориям'
      // chart.js
      this.renderChart({
        labels: charges.map( c => c.name),
        datasets: [{
            label: title,
            data: charges.map( c => c.amount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
      }, {
        title: {
          display: true,
          text: title
        },
        cutoutPercentage: 40
      })
    }
  }
}
</script>