const {Nuxt} = require('nuxt');

let _event;
let _context;

exports.handler = async function(event, context) {
   _event = event;
   _context = context;

   return new Promise((resolve, reject) => {
      const nuxtConfig = {
         dev: false,
         buildDir: 'nuxt'
      }

      try {
         const nuxt = new Nuxt(nuxtConfig);
         nuxt.renderRoute('/')
            .then(result => resolve(responseObject(result.html)))
            .catch(err => reject(responseObject(err)));
      }
      catch(err) {
         resolve(responseObject(`${err.toString()}, new Nuxt: ${Object.entries(new Nuxt(nuxtConfig)).join(' || ')}`));
      }
   });
}

function responseObject(result) {
   return {
      statusCode: 200,
      headers: {
         'Content-Type': 'text/html'
      },
      body: result
   };
}