const knexfile = require('../knexfile');
const knex = require('knex')

/**
 * knex documentation for initializing the knex library: { @link https://knexjs.org/#Installation-client } <-- please read.
 * TLDR: The exported member/variable from the knex library is a function that takes in a configuration
 * object @see KnexConfigurationObject 
 */
module.exports = knex(knexfile.development);

/**
 * @interface KnexConfigurationObject
 */
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     user : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test'
//   }
// });
