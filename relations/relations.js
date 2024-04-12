const Admin = require('../models/Admin');
const Slot = require('../models/Slot');
const User = require('../models/User');
const Event = require('../models/Event');

module.exports = () => {
  Admin.hasMany(Event, { onDelete: 'CASCADE' });
  Event.belongsTo(Admin);

  Event.hasMany(Slot, { onDelete: 'CASCADE' });
  Slot.belongsTo(Event);

  User.hasMany(Slot, { onDelete: 'CASCADE' });
  Slot.belongsTo(User);
};
