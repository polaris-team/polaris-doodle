import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

export default class GraphQLClient {
  requester: ApolloClient<any>;

  constructor(token: String) {
    // const httpLink = new HttpLink({ uri: `${process.env.VUE_APP_API_URL}/graphql` });
    const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      // const token = localStorage.getItem('token');
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3QiOnRydWUsImlhdCI6MTU2NjQ2MDg4Mn0.1SdTKlxES1seoCldEKx9MQqV_ID5V0zZd9vIW8Gzous';

      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `jwt ${token}` : '',
        },
      };
    });

    this.requester = new ApolloClient({
      // Provide the URL to the API server.
      link: authLink.concat(httpLink),
      // Using a cache for blazingly
      // fast subsequent queries.
      cache: new InMemoryCache(),
    });
  }
}
