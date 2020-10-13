<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  {{ message }}
  <ul>
    <li v-for="wine in wines" :key="wine.id">
      <h2>{{ wine.title }}</h2>
      <button @click="deleteAndUpdateCache(wine.id)">delete this wine</button>
    </li>
  </ul>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import allWinesQuery from './graphql/allWines.query.gql'
import deleteWineMutation from './graphql/deleteWine.mutation.gql'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const message = ref('Hello Jason!')
    const { result } = useQuery(allWinesQuery)
    const wines = useResult(result, null, data => data.allWines)

    const { mutate: deleteWine } = useMutation(deleteWineMutation)

    function deleteAndUpdateCache(id) {
      deleteWine({ id }, {
      update: (store, {}) => {
        const data = store.readQuery({query: allWinesQuery})
        const updatedData = data.allWines.filter(w => w.id !== id)
        store.writeQuery({query: allWinesQuery, data: { allWines: updatedData}})
      }
    });
      // TODO update the cache
    }

    return { message, wines, deleteAndUpdateCache }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
