import gql from 'graphql-tag';

const playerObj = `
    _id
    mainBtag
    name
    doodle
    role {
      _id
      name
    }
`

/* LINEUP */
const GET_LINEUP = gql`
query getLineUp($id: MongoID!) {
  lineupById(_id: $id) {
    _id
    name
    players {
${playerObj}
    }
  }
}
`

/* PLAYER */

const LOGIN_PLAYER = gql`
query {
  playerLogin {
${playerObj}
  }
}
`

const UPDATE_PLAYER = gql`
mutation modifyPlayer($record: UpdateByIdPlayerInput!) {
  playerUpdateById(record: $record) {
    record {
${playerObj}
    }
  }
}
`

/* DATA */

const GET_ROLES = gql`
query getRoles {
  rolesMany {
    _id
    name
  }
}
`


export { 
  GET_LINEUP,
  LOGIN_PLAYER,
  UPDATE_PLAYER,
  GET_ROLES,
}
