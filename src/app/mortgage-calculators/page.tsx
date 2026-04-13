"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { COMPANY } from "@/lib/constants";
import { Calculator, RefreshCw, DollarSign, Home, Percent, TrendingDown } from "lucide-react";

const calculatorTabs = [
  { id: "purchase", label: "Mortgage", icon: Calculator },
  { id: "refi", label: "Refinance", icon: RefreshCw },
  { id: "prequal", label: "Affordability", icon: Home },
  { id: "payoff", label: "Extra Payment", icon: TrendingDown },
  { id: "apr", label: "APR", icon: Percent },
  { id: "income", label: "Income", icon: DollarSign },
];

function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");

  const principal = parseFloat(loanAmount) || 0;
  const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;
  const numPayments = (parseFloat(term) || 30) * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : principal / numPayments;
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Input label="Loan Amount ($)" id="calcLoan" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
        <Input label="Interest Rate (%)" id="calcRate" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="calcTerm" value={term} onChange={(e) => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Payment</p>
          <p className="text-3xl font-bold text-primary">${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-gray-700">${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Total Cost</p>
          <p className="text-2xl font-bold text-gray-700">${totalPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-600 mb-4">Want a personalized quote? Talk to a loan officer.</p>
        <Button href={COMPANY.applyUrl} size="sm">Get Your Custom Rate</Button>
      </div>
    </div>
  );
}

function AffordabilityCalculator() {
  const [income, setIncome] = useState("75000");
  const [debts, setDebts] = useState("500");
  const [downPayment, setDownPayment] = useState("20000");
  const [rate, setRate] = useState("6.5");

  const monthlyIncome = (parseFloat(income) || 0) / 12;
  const monthlyDebts = parseFloat(debts) || 0;
  const maxPayment = monthlyIncome * 0.43 - monthlyDebts;
  const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;
  const numPayments = 360;
  const maxLoan = monthlyRate > 0
    ? (maxPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
    : maxPayment * numPayments;
  const maxHome = maxLoan + (parseFloat(downPayment) || 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Annual Income ($)" id="affIncome" value={income} onChange={(e) => setIncome(e.target.value)} />
        <Input label="Monthly Debts ($)" id="affDebts" value={debts} onChange={(e) => setDebts(e.target.value)} />
        <Input label="Down Payment ($)" id="affDown" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        <Input label="Interest Rate (%)" id="affRate" value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>
      <div className="bg-gray-50 rounded-xl p-6 text-center">
        <p className="text-sm text-gray-500 mb-1">You can afford a home up to</p>
        <p className="text-4xl font-bold text-primary">${Math.max(0, maxHome).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        <p className="text-sm text-gray-500 mt-2">Based on 43% debt-to-income ratio</p>
      </div>
      <div className="text-center">
        <Button href={COMPANY.applyUrl} size="sm">Get Pre-Approved</Button>
      </div>
    </div>
  );
}

function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState("250000");
  const [currentRate, setCurrentRate] = useState("7.0");
  const [newRate, setNewRate] = useState("6.0");
  const [term, setTerm] = useState("30");

  const balance = parseFloat(currentBalance) || 0;
  const oldMonthly = (parseFloat(currentRate) || 0) / 100 / 12;
  const newMonthly = (parseFloat(newRate) || 0) / 100 / 12;
  const n = (parseFloat(term) || 30) * 12;

  const currentPayment = oldMonthly > 0
    ? (balance * oldMonthly * Math.pow(1 + oldMonthly, n)) / (Math.pow(1 + oldMonthly, n) - 1)
    : balance / n;
  const newPayment = newMonthly > 0
    ? (balance * newMonthly * Math.pow(1 + newMonthly, n)) / (Math.pow(1 + newMonthly, n) - 1)
    : balance / n;
  const monthlySavings = currentPayment - newPayment;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Current Loan Balance ($)" id="refiBalance" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} />
        <Input label="Current Rate (%)" id="refiOldRate" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} />
        <Input label="New Rate (%)" id="refiNewRate" value={newRate} onChange={(e) => setNewRate(e.target.value)} />
        <Input label="New Term (years)" id="refiTerm" value={term} onChange={(e) => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Current Payment</p>
          <p className="text-2xl font-bold text-gray-700">${currentPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">New Payment</p>
          <p className="text-2xl font-bold text-primary">${newPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Savings</p>
          <p className="text-2xl font-bold text-green-600">${Math.max(0, monthlySavings).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
      </div>
      <div className="text-center">
        <Button href={COMPANY.applyUrl} size="sm">Start Your Refinance</Button>
      </div>
    </div>
  );
}

export default function MortgageCalculatorsPage() {
  const [activeCalc, setActiveCalc] = useState("purchase");

  return (
    <>
      <section className="bg-gradient-to-br from-primary-darker to-primary text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Mortgage Calculators</h1>
          <p className="text-lg text-primary-lighter max-w-2xl mx-auto">
            Crunch the numbers and plan your mortgage with our interactive calculators.
          </p>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {calculatorTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCalc(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeCalc === tab.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <Card hover={false}>
            <CardContent className="p-6 md:p-8">
              {activeCalc === "purchase" && <MortgageCalculator />}
              {activeCalc === "refi" && <RefinanceCalculator />}
              {activeCalc === "prequal" && <AffordabilityCalculator />}
              {(activeCalc === "payoff" || activeCalc === "apr" || activeCalc === "income") && (
                <div className="text-center py-12">
                  <Calculator className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                    {calculatorTabs.find((t) => t.id === activeCalc)?.label} Calculator
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For a personalized calculation, contact one of our loan experts.
                  </p>
                  <Button href="/contact-us" variant="outline">Contact Us</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <p className="text-xs text-gray-400 mt-6 text-center">
            * These calculators are for illustrative purposes only. Actual rates, payments, and terms may vary. Contact us for a personalized quote.
          </p>
        </div>
      </Section>
    </>
  );
}
