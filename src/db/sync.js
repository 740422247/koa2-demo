const seq = require('./seq');

require('./models/index');



seq.sync({force: true}).then(() => {
  console.log('sync success')
  process.exit();
})
