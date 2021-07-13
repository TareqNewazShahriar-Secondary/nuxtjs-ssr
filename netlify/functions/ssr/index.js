const {Nuxt} = require('nuxt');

let _event;
let _context;

exports.handler = async function(event, context) {
   _event = event;
   _context = context;

   return new Promise((resolve, reject) => {
      try {
         const nuxtConfig = {
            dev: false,
            buildDir: 'nuxt'
         }
         const nuxt = new Nuxt(nuxtConfig);
         nuxt.renderRoute('/')
            .then(result => resolve(responseObject(result.html)))
            .catch(err => reject(responseObject(err)));
      }
      catch(err) {
         reject(responseObject(`${err.toString()} ||| ${Object.entries(Nuxt).join(' // ')}`));
      }
   });
}

function responseObject(result) {
   return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: result
   };

   // 'x-explore': `${__dirname} ||| ${Object.entries(_event).join(' / ')} ||| ${Object.entries(_context).join(' / ')}`
}