import { createApp, provide, h } from 'vue'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'

const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

// const query = gql`
//   query {
//     allWines {
//       title
//       description
//       variety
//     }
//   }
// `

// defaultClient.query({
//   query
// })
//   .then(res => console.log(res))

createApp(
  {
    setup () {
      provide(DefaultApolloClient, defaultClient)
    },
    render() {
      return h(App)
    }
  }
).mount('#app')
