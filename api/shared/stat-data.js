const data = {
  stats: [
    {
      date: '2020-06-06T18:25:43.511Z',
      count: 25
    },
    {
      date: '2020-06-05T18:25:43.511Z',
      count: 20
    },
    {
      date: '2020-06-04T18:25:43.511Z',
      count: 11
    },
    {
      date: '2020-06-03T18:25:43.511Z',
      count: 7
    },
  ],
};

const getStats = () => {
  return data.stats;
};

module.exports = { getStats };
