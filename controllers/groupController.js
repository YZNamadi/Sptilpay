const { Group, GroupMember, User } = require('../models');

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const ownerId = req.user.id;

    const group = await Group.create({ name, ownerId });

    await GroupMember.create({ groupId: group.id, userId: ownerId });

    res.status(201).json({ group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;

    const group = await Group.findByPk(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (group.ownerId !== req.user.id)
      return res.status(403).json({ message: 'Only the group owner can add members' });

    const existing = await GroupMember.findOne({ where: { groupId, userId } });
    if (existing) return res.status(400).json({ message: 'User already in group' });

    await GroupMember.create({ groupId, userId });

    res.status(200).json({ message: 'Member added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


