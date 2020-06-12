const data = {
  types: [
    {
      id: 10,
      label: 'Moo',
      imageurl: 'https://media.giphy.com/media/h55EUEsTG9224/giphy.gif',
      description: 'Just a koedo to say thank you.',
    },
    {
      id: 20,
      label: 'Team Moo',
      imageurl: 'https://media.giphy.com/media/J3hkzeKr6IDKw/giphy.gif',
      description: 'A koedo to recognize someone for being a great team player.',
    },
    {
      id: 30,
      label: 'Inclusive Moo',
      imageurl: 'https://media.giphy.com/media/11qwfyd5mTJvDa/giphy.gif',
      description: 'A koedo to recognize someone for stimulation diversity and inclusion in the community.',
    },
  ],
};

const getTypes = () => {
  return data.types;
};

module.exports = { getTypes };
