const data = {
  stats: [
    {
      date: '2020-06-05T18:25:43.511Z',
      counts: [
        {
          koedo_id: 10,
          count: 20
        },
        {
          koedo_id: 20,
          count: 7
        },
        {
          koedo_id: 30,
          count: 2
        },
      ]
    },
    {
      date: '2020-06-04T18:25:43.511Z',
      counts: [
        {
          koedo_id: 10,
          count: 16
        },
        {
          koedo_id: 20,
          count: 6
        },
        {
          koedo_id: 30,
          count: 2
        },
      ]
    },
    {
      date: '2020-06-03T18:25:43.511Z',
      counts: [
        {
          koedo_id: 10,
          count: 14
        },
        {
          koedo_id: 20,
          count: 4
        },
        {
          koedo_id: 30,
          count: 1
        },
      ]
    },
  ],
};

const getStats = () => {
  return data.stats;
};

module.exports = { getStats };
