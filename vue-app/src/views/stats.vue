<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';
import LineChart from './Chart.vue';

export default {
  name: 'Stats',
  data() {
    return {
      errorMessage: '',
      loaded: false,
    };
  },
  components: {
    ListHeader,
    LineChart,
  },
  async created() {
    await this.getStats();
  },
  async mounted() {
    await this.getStats();
  },
  computed: {
    ...mapGetters('stats', { stats: 'stats' }),
  },
  methods: {
    ...mapActions('stats', ['getStatsAction']),
    async getStats() {
      this.errorMessage = undefined;
      this.options = {};
      try {
        await this.getStatsAction();

        const dates = this.stats.map((item) => this.formatTimestamp(item.date));
        const counts = this.stats.map((item) => item.count);
        this.chartdata = {
          labels: dates,
          datasets: [{
            label: 'Koedo Count',
            data: counts,
          }],
        };
        this.loaded = true;
      } catch (error) {
        this.errorMessage = 'Unauthorized';
        this.errorMessage = error;
      }
    },
    formatTimestamp: (timestamp) => {
      const date = new Date(timestamp);
      return date.toDateString();
    },
  },
};
</script>

<template>
  <div class="container columns">
    <div v-if="stats" class="column is-8">
      <ListHeader title="Koedo Stats" @refresh="getStats" :showAdd="false"></ListHeader>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-if="!stats.length && !errorMessage">Loading data ...</div>

      <div class="container columns">
        <div v-if="stats" class="column is-half">
          <div class="container">
            <line-chart v-if="loaded" :chart-data="chartdata" :options="options" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
