<template>
  <div class="priceChart">
    <LineChart v-if="data.labels.length > 0" :data="data" :options="options" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import LineChart from '~/components/Charts/LineChart'
export default {
  components: {
    LineChart
  },
  data: () => {
    return {
      data: {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        bezierCurve: false,
        legend: {
          display: false
        },
        elements: {
          line: {
            borderColor: '#3FFF96',
            borderWidth: 2,
            tension: 0,
            backgroundColor: '#1b2f6b'

          },
          point: {
            radius: 0
          }
        },
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [
            {
              display: false
            }
          ],
          xAxes: [
            {
              display: false
            }
          ]
        } }
    }
  },
  computed: {
    ...mapGetters({
      dailyHistoryPrice: 'price/getDailyHistoryPrice'
    })
  },
  mounted () {
    this.dailyHistoryPrice.USD.forEach(day => {
      this.data.labels.push(day.date)
      this.data.datasets[0].data.push(day.price)
    })
  }
}
</script>

<style>
  .priceChart{
    height: 400px;
    width: calc(100% + 64px);
    position: absolute;
    left: -32px;
    bottom: -32px;
  }

  #line-chart{
    height: 400px;
    width: 100%;
  }
</style>
