let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'Enterprise', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'Professional', status: 'active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', plan: 'Free', status: 'suspended' },
];

let settings = {
  siteName: 'SearchIQ',
  pricing: [
    { title: 'Free', price: '$0', features: ['Direct analysis', 'Basic keywords'] },
    { title: 'Professional', price: '$99', features: ['Advanced tracking', 'Backlink audit'] },
    { title: 'Enterprise', price: '$499', features: ['API Access', 'Custom reports', 'White-label'] }
  ],
  maintenanceMode: false
};

export const getUsers = (req, res) => {
  res.json(users);
};

export const createUser = (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.status(204).send();
};

export const getSettings = (req, res) => {
  res.json(settings);
};

export const updateSettings = (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
};
