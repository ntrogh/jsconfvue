<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';

export default {
  name: 'Stats',
  data() {
    return {
      errorMessage: '',
    };
  },
  components: {
    ListHeader,
  },
  async created() {
    await this.getStats();
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
      <ListHeader
        title="Koedo Stats"
        @refresh="getStats"
        :showAdd="false"
      ></ListHeader>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-if="!stats.length && !errorMessage">
        Loading data ...
      </div>
      <ul class="list">
        <li
          role="presentation"
          v-for="stat in stats"
          :key="stat.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="content stat-grid">
                <label>Date:</label><span>{{ formatTimestamp(stat.date) }}</span>
                <label>Count:</label><span>{{ stat.count }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
