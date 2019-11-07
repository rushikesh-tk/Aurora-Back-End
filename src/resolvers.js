const user = require('./resolvers/query/user');

const signup = require('./resolvers/mutation/signup');
const login = require('./resolvers/mutation/login');
const eventRegister = require('./resolvers/mutation/eventRegister');
const sendInvite = require('./resolvers/mutation/sendInvite');
const cancelInvite = require('./resolvers/mutation/cancelInvite');
const acceptInvite = require('./resolvers/mutation/acceptInvite');
const declineInvite = require('./resolvers/mutation/declineInvite');
const removeMember = require('./resolvers/mutation/removeMember');
const leaveTeam = require('./resolvers/mutation/leaveTeam');
const User = require('./resolvers/custom/User');
const Team = require('./resolvers/custom/Team');
const Event = require('./resolvers/custom/Event');

const resolvers = {
  Query: {
    user,
  },
  Mutation: {
    signup,
    login,
    eventRegister,
    sendInvite,
    cancelInvite,
    acceptInvite,
    declineInvite,
    removeMember,
    leaveTeam,
  },
  User,
  Team,
  Event,
};

module.exports = resolvers;
