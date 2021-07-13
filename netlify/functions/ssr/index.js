const {Nuxt} = require('nuxt');

exports.handler = async function(event, context) {
   const nuxtConfig = {
      dev: false,
      buildDir: 'nuxt'
   }
   const nuxt = new Nuxt(nuxtConfig);

   return new Promise((resolve, reject) => {
      nuxt.renderroute('/')
         .then(result => {
            resolve({
               statusCode: 200,
               headers: { 'Content-Type': 'text/html', 'x-explore': `${__dirname} ||| ${Object.keys(event).join(' / ')} ||| ${Object.keys(context).join(' / ')}` },
               body: result.html
            });
         })
         .catch(err => reject(err));
   });
}