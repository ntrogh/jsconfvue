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
      // stats: {},
    };
  },
  components: {
    ListHeader,
    LineChart,
  },
  async created() {
    console.log('created');
    await this.getStats();
  },
  async mounted() {
    console.log('mounted');
    this.loaded = false;
    try {
      const dates = this.stats.map((item) => this.formatTimestamp(item.date));
      const counts = this.stats.map((item) => item.count);
      this.chartdata = {
        labels: dates,
        datasets: [{
          label: 'Koedo Count',
          data: counts,
        }],
      };
      this.options = {};
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    ...mapGetters('stats', { stats: 'stats' }),
  },
  methods: {
    ...mapActions('stats', ['getStatsAction']),
    async getStats() {
      this.errorMessage = undefined;
      try {
        await this.getStatsAction();
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
            <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
          </div>
        </div>
      </div>

      <!-- <ul class="list">
        <li role="presentation" v-for="stat in stats" :key="stat.id">
          <div class="card">
            <div class="card-content">
              <div class="content stat-grid">
                <label>Date:</label>
                <span>{{ formatTimestamp(stat.date) }}</span>
                <label>Count:</label>
                <span>{{ stat.count }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>
