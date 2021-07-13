const {Nuxt} = require('nuxt');
const express = require('express');

const app = new express();

const nuxtConfig = {
   dev: false,
   buildDir: 'nuxt',
   build: {
      publicPath: '/'
   }
}

const nuxt = new Nuxt(nuxtConfig);

app.get('*', (req, res) => {
   nuxt.renderroute('/')
      .then(result => res.send(result.html))
      .catch(err => res.send(err));
});
