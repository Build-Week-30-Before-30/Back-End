exports.seed = function(knex) {
  const { item_name, description } = req.body;
    // Deletes ALL existing entries
    return knex('items').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('items').insert([
          {
            item_name: 'Skydiving',
            description: 'write something cool here',
            user_id: 2,
            category_id: '1',
            links: 'link1, link2',
            completed: false,
          },
          {
            item_name: 'Learn Japanese', 
            description: 'write something cool here',
            user_id: 3,
            category_id: '2',
            links: 'link1, link2',
            completed: false,
          },
          {
            item_name: 'Visit the Grand Canyon', 
            description: 'write something cool here',
            user_id: 1,
            category_id: '3',
            links: 'link1, link2',
            completed: false,
          },
          {
            item_name: 'Go sea fishing', 
            description: 'write something cool here',
            user_id: 1,
            category_id: '4',
            links: 'link1, link2',
            completed: false,
          },
          {
            item_name: 'Visit the Dead Sea', 
            description: 'write something here',
            user_id: 2,
            category_id: '5',
            links: 'link1, link2',
            completed: false,
          },
          {
            item_name: 'learn how to code', 
            description: 'write something cool here',
            user_id: 3,
            category_id: '6',
            links: 'link1, link2',
            completed: false,
          }
        ]);
      });
  };
  