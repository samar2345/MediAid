import React, { useState } from 'react';
import { 
  FaWallet, 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaPlus, 
  FaHistory 
} from 'react-icons/fa';

const WalletPage = () => {
  // Hardcoded initial wallet balance
  const [balance, setBalance] = useState(500);
  const [addAmount, setAddAmount] = useState('');
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);

  // Transaction history state
  const [transactionHistory, setTransactionHistory] = useState([
    { 
      id: 1, 
      type: 'Initial Balance', 
      amount: 500, 
      date: '2023-06-15', 
      method: 'Initial' 
    }
  ]);

  // Predefined quick add amounts
  const quickAddAmounts = [100, 500, 1000, 2000];

  // Payment methods
  const paymentMethods = [
    { 
      id: 'credit', 
      name: 'Credit Card', 
      icon: <FaCreditCard className="text-blue-500" /> 
    },
    { 
      id: 'debit', 
      name: 'Debit Card', 
      icon: <FaMoneyBillWave className="text-green-500" /> 
    }
  ];

  const handleAddMoney = () => {
    // Validate amount
    const amount = parseFloat(addAmount);
    if (amount && amount > 0) {
      // Update balance
      setBalance(prevBalance => prevBalance + amount);

      // Create new transaction
      const newTransaction = {
        id: transactionHistory.length + 1,
        type: 'Added',
        amount: amount,
        date: new Date().toISOString().split('T')[0], // Current date
        method: 'Credit Card' // You can make this dynamic based on selected method
      };

      // Add transaction to history
      setTransactionHistory(prevHistory => [
        newTransaction, 
        ...prevHistory
      ]);

      // Reset modal
      setAddAmount('');
      setShowAddMoneyModal(false);
    }
  };

  const handleQuickAdd = (amount) => {
    // Update balance
    setBalance(prevBalance => prevBalance + amount);

    // Create new transaction
    const newTransaction = {
      id: transactionHistory.length + 1,
      type: 'Added',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      method: 'Quick Add'
    };

    // Add transaction to history
    setTransactionHistory(prevHistory => [
      newTransaction, 
      ...prevHistory
    ]);

    // Close modal
    setShowAddMoneyModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Wallet Summary */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <FaWallet className="text-4xl text-purple-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">My Wallet</h2>
                <p className="text-gray-500">Balance for medicine purchases</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">₹{balance}</p>
              <button 
                onClick={() => setShowAddMoneyModal(true)}
                className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700"
              >
                <FaPlus />
                <span>Add Money</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Transaction History</h3>
            <FaHistory className="text-gray-500" />
          </div>
          <div className="divide-y">
            {transactionHistory.map((transaction) => (
              <div 
                key={transaction.id} 
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <p className={`font-bold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''} ₹{Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Money Modal (rest of the modal code remains the same as in previous example) */}
        {showAddMoneyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-96">
              <h3 className="text-xl font-semibold mb-4">Add Money to Wallet</h3>
              
              {/* Quick Add Buttons */}
              <div className="flex justify-between mb-4">
                {quickAddAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAdd(amount)}
                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount Input */}
              <div className="mb-4">
                <label className="block mb-2">Enter Amount</label>
                <input 
                  type="number" 
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter amount to add"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                  onClick={handleAddMoney}
                  className="flex-grow bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Add Money
                </button>
                <button 
                  onClick={() => setShowAddMoneyModal(false)}
                  className="flex-grow bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;