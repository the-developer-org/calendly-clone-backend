const Admin = require('../models/Admin');
const Slot = require('../models/Slot');
const User = require('../models/User');
const Event = require('../models/Event');

module.exports = () => {
  Admin.hasMany(Event);
  Event.belongsTo(Admin);
};
