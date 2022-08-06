module.exports = {
  ...require('./email'),
  ...require('./users'),
  ...require('./disease'),
  ...require('./treatment'),
  ...require('./post'),
  SampleData: require('./sampleData'),
  ApiPlans: require('./apiPlans'),
  UserPlansHistory: require('./userPlansHistory'),
};
