import { useState } from 'react';

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount) return;
    
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount),
    };
    
    onAddExpense(newExpense);
    setFormData({
      name: '',
      amount: '',
      date: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        name="name"
        placeholder="Expense name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        required
        min="0"
        step="0.01"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;