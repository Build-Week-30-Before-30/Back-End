exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          item_name: '',
          description: '',
          user_id: 2,
          category_id: 1,
          privacy: true,
          target_date: ''
        },
        {
          item_name: '', 
          description: '',
          user_id: 3,
          category_id: 4,
          privacy: false,
          target_date: ''
        },
        {
          item_name: '', 
          description: '',
          user_id: 1,
          category_id: 2,
          privacy: false,
          target_date: ''
        },
        {
          item_name: '', 
          description: '',
          user_id: 1,
          category_id: 3,
          privacy: false,
          target_date: ''
        },
        {
          item_name: '', 
          description: '',
          user_id: 2,
          category_id: 4,
          privacy: false,
          target_date: ''
        },
        {
          item_name: '', 
          description: '',
          user_id: 3,
          category_id: 1,
          privacy: true,
          target_date: ''
        }
      ]);
    });
};