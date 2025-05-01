const sequelize = require('../config/database');

const db = {};
db.Sequelize = sequelize;

// Import Models
const User = require('./user');
const Group = require('./group');
const GroupMember = require('./groupMember');
const Bill = require('./bill');
const BillShare = require('./billShare');

// Attach to db object
db.User = User;
db.Group = Group;
db.GroupMember = GroupMember;
db.Bill = Bill;
db.BillShare = BillShare;

// Init Models
User.initModel(sequelize);
Group.initModel(sequelize);
GroupMember.initModel(sequelize);
Bill.initModel(sequelize);
BillShare.initModel(sequelize);

// Define Associations
User.associate?.(db);
Group.associate?.(db);
GroupMember.associate?.(db);
Bill.associate?.(db);
BillShare.associate?.(db);

module.exports = db;

