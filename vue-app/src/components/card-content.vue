<script>
export default {
  name: 'CardContent',
  props: {
    id: {
      type: String,
      default: () => '',
    },
    to: {
      type: String,
      default: () => '',
    },
    message: {
      type: String,
      default: () => '',
    },
    date: {
      type: String,
      default: () => '',
    },
    imageurl: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    formatTimestamp: (timestamp) => {
      const date = new Date(timestamp);
      return date.toDateString();
    },
  },
};
</script>

<template>
  <div class="card-content">
    <div class="content">
      <div class="twocolumn">
        <div class="left">
          <div class="name">{{ to }}</div>
          <div class="description">{{ message }}</div>
          <div class="date">{{ formatTimestamp(date) }}</div>
        </div>
        <div class="right">
          <img v-bind:src="imageurl" />
        </div>
      </div>
    </div>
  </div>
</template>
