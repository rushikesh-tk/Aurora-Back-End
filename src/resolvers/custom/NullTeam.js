const NullTeam = {
  name: async ({ teamId }, __, { teamLoader }) => {
    const team = await teamLoader.load(teamId);
    return team.name;
  },

  id: async ({ teamId }) => teamId,

  members: async ({ teamId }, __, { teamLoader }) => {
    const team = await teamLoader.load(teamId);
    if (team) {
      const members = team.members.map(member => {
        return { id: member };
      });
      return members;
    }
    return null;
  },

  event: async ({ teamId }, __, { teamLoader }) => {
    const team = await teamLoader.load(teamId);
    if (team) return { id: team.event };
    return null;
  },

  pendingInvitations: async ({ teamId }, __, { teamLoader }) => {
    const team = await teamLoader.load(teamId);
    if (team) return team.pendingInvitations;
    return null;
  },

  paymentStatus: async ({ teamId }, __, { teamLoader }) => {
    const team = await teamLoader.load(teamId);
    if (team) return team.paymentStatus;
    return null;
  },
};

module.exports = NullTeam;
