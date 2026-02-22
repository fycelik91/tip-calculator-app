"use client";

import { useState, useEffect } from 'react';
import { DollarSign, User, Percent } from 'lucide-react';
import clsx from 'clsx';

export default function Home() {
  const [bill, setBill] = useState('');
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(1);
  const [customTip, setCustomTip] = useState('');

  const [tipAmount, setTipAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [perPerson, setPerPerson] = useState(0);

  useEffect(() => {
    const billFloat = parseFloat(bill);
    const peopleInt = parseInt(people);
    const tipFloat = customTip !== '' ? parseFloat(customTip) : tip;

    if (!isNaN(billFloat) && !isNaN(peopleInt) && peopleInt > 0) {
      const calculatedTip = billFloat * (tipFloat / 100);
      const calculatedTotal = billFloat + calculatedTip;
      const calculatedPerPerson = calculatedTotal / peopleInt;

      setTipAmount(calculatedTip);
      setTotal(calculatedTotal);
      setPerPerson(calculatedPerPerson);
    } else {
      setTipAmount(0);
      setTotal(0);
      setPerPerson(0);
    }
  }, [bill, tip, people, customTip]);

  const handleTipClick = (percentage) => {
    setTip(percentage);
    setCustomTip('');
  };

  const reset = () => {
    setBill('');
    setTip(15);
    setPeople(1);
    setCustomTip('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-cyan-100 font-mono">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-4xl grid md:grid-cols-2 gap-8">
        
        {/* Left Side: Inputs */}
        <div className="space-y-8">
          
          {/* Bill Input */}
          <div className="space-y-2">
            <label className="text-gray-600 font-bold text-sm">Bill</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="number"
                placeholder="0"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="w-full bg-cyan-50 rounded-md py-2 px-4 pl-9 text-right text-cyan-900 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:cursor-pointer"
              />
            </div>
          </div>

          {/* Tip Selection */}
          <div className="space-y-3">
            <label className="text-gray-600 font-bold text-sm">Select Tip %</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[5, 10, 15, 25, 50].map((percentage) => (
                <button
                  key={percentage}
                  onClick={() => handleTipClick(percentage)}
                  className={clsx(
                    "py-2 rounded-md font-bold text-xl transition-colors",
                    tip === percentage && customTip === ''
                      ? "bg-cyan-700 text-white"
                      : "bg-cyan-900 text-white hover:bg-cyan-200 hover:text-cyan-900"
                  )}
                >
                  {percentage}%
                </button>
              ))}
              <input
                type="number"
                placeholder="Custom"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                className="bg-cyan-50 rounded-md text-center text-cyan-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-cyan-700"
              />
            </div>
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-gray-600 font-bold text-sm">Number of People</label>
              {people === '0' && <span className="text-red-500 text-xs font-bold">Can't be zero</span>}
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
              <input
                type="number"
                placeholder="0"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className={clsx(
                  "w-full bg-cyan-50 rounded-md py-2 px-4 pl-9 text-right text-cyan-900 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500",
                  people === '0' ? "ring-2 ring-red-500" : ""
                )}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="bg-cyan-900 rounded-2xl p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">Tip Amount</h3>
                <p className="text-cyan-400 text-sm font-bold">/ person</p>
              </div>
              <div className="text-cyan-300 text-4xl font-bold">
                ${people > 0 ? (tipAmount / people).toFixed(2) : '0.00'}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-bold">Total</h3>
                <p className="text-cyan-400 text-sm font-bold">/ person</p>
              </div>
              <div className="text-cyan-300 text-5xl font-bold">
                ${perPerson.toFixed(2)}
              </div>
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full bg-cyan-300 text-cyan-900 font-bold text-xl py-3 rounded-md uppercase hover:bg-cyan-100 transition-colors disabled:opacity-20"
            disabled={!bill || bill === '0'}
          >
            RESET
          </button>
        </div>

      </div>
    </main>
  );
}