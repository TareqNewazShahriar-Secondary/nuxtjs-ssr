const {Nuxt} = require('nuxt');

let _event;
let _context;

exports.handler = async function(event, context) {
   _event = event;
   _context = context;

   const nuxtConfig = {
      dev: false,
      buildDir: 'nuxt'
   }

   try {
      const nuxt = new Nuxt(nuxtConfig);

      return new Promise((resolve, reject) => {
         nuxt.renderRoute('/')
            .then(result => resolve(responseObject(result.html)))
            .catch(err => reject(responseObject(err)));
      });
   }
   catch(err) {
      return responseObject(`${err.toString()} ||| ${Object.entries(Nuxt).join(' // ')} ||| ${Object.entries(nuxt).join(' // ')}`);
   }
}

function responseObject(result) {
   return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html', 'x-explore': `${__dirname} ||| ${Object.entries(_event).join(' / ')} ||| ${Object.entries(_context).join(' / ')}` },
      body: result
   };
}