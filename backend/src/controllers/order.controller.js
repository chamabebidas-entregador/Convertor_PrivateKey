const orders = [];

const walletSplit = (subtotal, deliveryFee) => ({
  storeAmount: Number((subtotal * 0.9).toFixed(2)),
  platformAmount: Number((subtotal * 0.1).toFixed(2)),
  courierAmount: Number(deliveryFee.toFixed(2))
});

export const createOrder = (req, res) => {
  const { items, subtotal, deliveryFee = 0 } = req.body;
  const split = walletSplit(subtotal, deliveryFee);
  const order = {
    id: orders.length + 1,
    customerId: req.user.sub,
    items,
    subtotal,
    deliveryFee,
    split,
    pickupCode: Math.floor(10000 + Math.random() * 90000).toString(),
    deliveryCode: Math.floor(10000 + Math.random() * 90000).toString(),
    status: 'PLACED',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json(order);
};

export const listOrders = (req, res) => {
  const isAdmin = req.user.role === 'ADMIN';
  const filtered = isAdmin ? orders : orders.filter(o => o.customerId === req.user.sub);
  res.json(filtered);
};
