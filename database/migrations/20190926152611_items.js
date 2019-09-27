exports.up = function(knex) {
      return knex.schema
        .createTable('items', tbl => {
            tbl.increments();
    
            tbl
                .text('item_name')
                .notNullable()
            tbl
                .text('description')
            tbl
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl
                .boolean('completed')
                .defaultTo (false)
            
            tbl
                .text('links')
        })
    };
    
    exports.down = function(knex) {
        return knex.schema.dropTableIfExists('items')
    };
    