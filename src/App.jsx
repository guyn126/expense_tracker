import { useState } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([
     { id: 1, name: 'Ugali', description: "Wednesday's Lunch", amount: 450, date: '2023-06-15' },
     { id: 2, name: 'KPLC tokens', description: 'Power tokens', amount: 1000, date: '2023-06-14' },
     { id: 3, name: 'Buy shoes', description: 'Add to my shoe collection', amount: 3500, date: '2023-06-13' },
     { id: 4, name: 'Buy book', description: 'Add to my book collection', amount: 1200, date: '2023-06-12' },
     { id: 5, name: 'Pay rent', description: 'Absa Bank ', amount: 5000, date: '2023-06-10' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: '',
    date: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: expenses.length + 1,
      name: formData.name,
      description: formData.description,
      amount: parseFloat(formData.amount) || 0,
      date: formData.date || new Date().toLocaleDateString()
    };
    setExpenses([...expenses, newExpense]);
    setFormData({ name: '', description: '', amount: '', date: '' });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete the expense "${name}"?`)) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    const searchLower = searchTerm.toLowerCase();
    return (
      expense.name.toLowerCase().includes(searchLower) ||
      expense.description.toLowerCase().includes(searchLower)
    );
  });

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app-container">
      <header>
        <h1>Expense Tracker</h1>
        <p className="subtitle">Start taking control of your finances and life. Record, categorize and analyze your spending</p>
      </header>

      <div className="content-section">
        <div className="form-section">
          <h2>Add Expense</h2>
          <p className="form-subtitle">Enter your expense details below</p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Expense name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            
            <input
              type="number"
              placeholder="Amount (Ksh)"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              min="0"
              step="100"
            />
            
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
            
            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search expenses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="expenses-table">
          <table>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Description</th>
                <th>Amount (Ksh)</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td className="amount-cell">{expense.amount.toLocaleString()}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(expense.id, expense.name)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="total-label">Total</td>
                <td className="total-amount">{totalAmount.toLocaleString()} Ksh</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;