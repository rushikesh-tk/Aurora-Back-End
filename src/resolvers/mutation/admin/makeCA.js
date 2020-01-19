const { AuthenticationError, ApolloError } = require('apollo-server-express');

const makeCA = async (_, args, context) => {
  const { isValid, isRoot, userLoader, db } = context;

  if (isValid && isRoot) {
    const arId = args.arId.toUpperCase();

    const user = await userLoader.load(arId);

    if (!user) throw new ApolloError('User does not exist', 'USR_DOESNT_EXIST');

    if (!user.ca.isCA) {
      db.collection('users').updateOne({ _id: arId }, { $set: { 'ca.isCA': true } });
    }
    return {
      success: true,
      message: 'User is now Campus Ambassador',
      code: 200,
    };
  }
  throw new AuthenticationError('Go Home Kid');
};

module.exports = makeCA;
