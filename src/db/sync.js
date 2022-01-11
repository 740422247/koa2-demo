const seq = require('./seq');

require('./models/user.model');
require('./models/blog.model');



seq.sync({force: true}).then(() => {
  console.log('sync success')
  process.exit();
})
