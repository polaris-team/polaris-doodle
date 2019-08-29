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
`;

const lineupObject = `
    _id
    name
    players {
      ${playerObj}
    }
`;

/* LINEUP */
const GET_LINEUP = gql`
query getLineUp($id: MongoID!) {
  lineupById(_id: $id) {
${lineupObject}
  }
}
`;

/* PLAYER */

const LOGIN_PLAYER = gql`
query {
  playerLogin {
${playerObj}
    lineup {
${lineupObject}
    }
  }
}
`;

const UPDATE_PLAYER = gql`
mutation modifyPlayer($record: UpdateByIdPlayerInput!) {
  playerUpdateById(record: $record) {
    record {
${playerObj}
    }
  }
}
`;

/* DATA */

const GET_ROLES = gql`
query getRoles {
  rolesMany {
    _id
    name
  }
}
`;


export {
  GET_LINEUP,
  LOGIN_PLAYER,
  UPDATE_PLAYER,
  GET_ROLES,
};
