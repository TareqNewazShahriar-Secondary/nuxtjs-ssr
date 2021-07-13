<template>
   <section class="container">
      <app-logo></app-logo>
      <ul>
         <li v-for="poke in pokemon" :key="poke.name">{{ poke.name }}</li>
      </ul>
   </section>
</template>

<script>
   import AppLogo from '~/components/AppLogo.vue'

   export default {
      components: { AppLogo },
      async asyncData() {
         const fetchPokemonsPromise = fetch('https://pokeapi.co/api/v2/location?offset=20&limit=10');

         // Making it ready to handle multiple requests
         return new Promise((resolve, reject) => {
            debugger;
            Promise.all([fetchPokemonsPromise])
               .then(responses => {
                  Promise.all([responses[0].json()])
                     .then(data => {
                        resolve({ pokemon: data[0].results });
                     });
               })
               .catch(err => reject(err));;
         });
      }
   }
</script>

<style>
   .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
   }

   .title {
      font-family: "Quicksand", "Source Sans Pro", -apple-system,
         BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
         sans-serif; /* 1 */
      display: block;
      font-weight: 300;
      font-size: 100px;
      color: #35495e;
      letter-spacing: 1px;
   }

   .subtitle {
      font-weight: 300;
      font-size: 42px;
      color: #526488;
      word-spacing: 5px;
      padding-bottom: 15px;
   }

   .links {
      padding-top: 15px;
   }
</style>

