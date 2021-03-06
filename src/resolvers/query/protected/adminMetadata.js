const { AuthenticationError } = require('apollo-server-express');

const eventData = require('../../../data/eventData');
const {
  getRoles,
  canViewUsers,
  canEditUsers,
  canViewAllEvents,
  canViewSomeEvents,
  canViewEvents,
  canViewOrders,
  canEditOrders,
  canViewAcc,
  canEditAcc,
  canViewPronites,
  canEditPronites,
  canViewCA,
  canEditCA,
} = require('../../../utils/roles');

const adminMetadata = async (_, __, context) => {
  const { id, isValid, userLoader } = context;
  const roles = await getRoles(id, userLoader);

  if (isValid && roles.length) {
    const user = await userLoader.load(id);
    let events = [];

    if (await canViewAllEvents(id, userLoader)) {
      events = Array.from(eventData.values());
    } else if (user.role && user.role.events && (await canViewSomeEvents(id, userLoader))) {
      events = user.role.events.map(evtId => {
        return {
          id: evtId,
        };
      });
    }

    return {
      roles,
      canViewUsers: await canViewUsers(id, userLoader),
      canEditUsers: await canEditUsers(id, userLoader),
      canViewEvents: await canViewEvents(id, userLoader),
      canViewOrders: await canViewOrders(id, userLoader),
      canEditOrders: await canEditOrders(id, userLoader),
      canViewAcc: await canViewAcc(id, userLoader),
      canEditAcc: await canEditAcc(id, userLoader),
      canViewPronites: await canViewPronites(id, userLoader),
      canEditPronites: await canEditPronites(id, userLoader),
      canViewCA: await canViewCA(id, userLoader),
      canEditCA: await canEditCA(id, userLoader),
      events,
    };
  }
  throw new AuthenticationError('Go Home Kid');
};

module.exports = adminMetadata;
