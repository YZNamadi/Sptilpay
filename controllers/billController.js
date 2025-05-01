const { Bill, BillShare } = require('../models');

// Create Bill
const createBill = async (req, res) => {
  try {
    const { groupId, description, amount, paidBy, shares } = req.body;

    const bill = await Bill.create({ groupId, description, amount, paidBy });

    for (let share of shares) {
      await BillShare.create({
        billId: bill.id,
        userId: share.userId,
        amountOwed: share.amountOwed,
      });
    }

    res.status(201).json({ message: 'Bill created succesfully', bill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Settle Bill
const settleBill = async (req, res) => {
  try {
    const { billId } = req.params;

    const bill = await Bill.findByPk(billId);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.status === 'paid') {
      return res.status(400).json({ message: 'This bill is already paid' });
    }

    bill.status = 'paid';
    await bill.save();

    await BillShare.update(
      { amountOwed: 0 },
      { where: { billId: bill.id } }
    );

    res.status(200).json({ message: 'Bill settled successfully', bill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 const getBills = async (req, res) => {
    try {
      const bills = await Bill.findAll({
        include: [{ model: BillShare, as: 'shares' }],
      });
      
      res.status(200).json(bills);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
   const getBill = async (req, res) => {
    try {
      const { billId } = req.params;
      const bill = await Bill.findOne({
        where: { id: billId },
        include: [{ model: BillShare, as: 'shares' }],
      });
  
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.status(200).json(bill);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  const getBillShares = async (req, res) => {
    try {
      const { billId } = req.params;
      const billShares = await BillShare.findAll({
        where: { billId },
      });
  
      if (!billShares.length) {
        return res.status(404).json({ message: 'No shares found for this bill' });
      }
  
      res.status(200).json(billShares);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  

module.exports = {
   createBill,
   settleBill,
    getBills,
    getBill,
    getBillShares
};


