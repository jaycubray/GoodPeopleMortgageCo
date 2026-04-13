"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { COMPANY } from "@/lib/constants";
import {
  Calculator, RefreshCw, DollarSign, Home, Percent,
  TrendingDown, BarChart3, Receipt, Coins, Wallet, ArrowDownUp,
} from "lucide-react";

const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");

function calcPayment(principal: number, annualRate: number, years: number) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function ResultBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? "text-primary" : "text-gray-800"}`}>{value}</p>
    </div>
  );
}

function CalcCTA({ text }: { text?: string }) {
  return (
    <div className="text-center pt-2">
      <p className="text-gray-500 text-sm mb-3">{text || "Want a personalized quote? Talk to a loan officer."}</p>
      <Button href={COMPANY.applyUrl} size="sm">Get Your Custom Rate</Button>
    </div>
  );
}

// ─── 1. Mortgage Calculator ─────────────────────
function MortgageCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const p = parseFloat(loan) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(term) || 30;
  const mo = calcPayment(p, r, t);
  const total = mo * t * 12;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Input label="Loan Amount ($)" id="m1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Interest Rate (%)" id="m2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="m3" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Monthly Payment" value={`$${fmt(mo)}`} highlight />
        <ResultBox label="Total Interest" value={`$${fmtInt(total - p)}`} />
        <ResultBox label="Total Cost" value={`$${fmtInt(total)}`} />
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 2. Refinance Calculator ────────────────────
function RefinanceCalc() {
  const [balance, setBalance] = useState("250000");
  const [oldRate, setOldRate] = useState("7.0");
  const [newRate, setNewRate] = useState("6.0");
  const [term, setTerm] = useState("30");
  const b = parseFloat(balance) || 0;
  const t = parseFloat(term) || 30;
  const oldPmt = calcPayment(b, parseFloat(oldRate) || 0, t);
  const newPmt = calcPayment(b, parseFloat(newRate) || 0, t);
  const savings = oldPmt - newPmt;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Balance ($)" id="r1" value={balance} onChange={e => setBalance(e.target.value)} />
        <Input label="Current Rate (%)" id="r2" value={oldRate} onChange={e => setOldRate(e.target.value)} />
        <Input label="New Rate (%)" id="r3" value={newRate} onChange={e => setNewRate(e.target.value)} />
        <Input label="New Term (years)" id="r4" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Current Payment" value={`$${fmt(oldPmt)}`} />
        <ResultBox label="New Payment" value={`$${fmt(newPmt)}`} highlight />
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Savings</p>
          <p className="text-2xl font-bold text-green-600">${fmt(Math.max(0, savings))}</p>
        </div>
      </div>
      <CalcCTA text="Ready to refinance? Let us find your best rate." />
    </div>
  );
}

// ─── 3. Extra Payment Calculator ────────────────
function ExtraPaymentCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [extra, setExtra] = useState("200");
  const p = parseFloat(loan) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(term) || 30) * 12;
  const ex = parseFloat(extra) || 0;
  const basePmt = r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  // With extra payments
  let balance = p;
  let months = 0;
  let totalInterestExtra = 0;
  while (balance > 0 && months < n) {
    const interest = balance * r;
    totalInterestExtra += interest;
    const principalPaid = basePmt + ex - interest;
    balance = Math.max(0, balance - principalPaid);
    months++;
  }
  const totalInterestNormal = basePmt * n - p;
  const interestSaved = totalInterestNormal - totalInterestExtra;
  const yearsOff = (n - months) / 12;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Amount ($)" id="ep1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Interest Rate (%)" id="ep2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="ep3" value={term} onChange={e => setTerm(e.target.value)} />
        <Input label="Extra Monthly Payment ($)" id="ep4" value={extra} onChange={e => setExtra(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Interest Saved</p>
          <p className="text-2xl font-bold text-green-600">${fmtInt(Math.max(0, interestSaved))}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Years Saved</p>
          <p className="text-2xl font-bold text-primary">{Math.max(0, yearsOff).toFixed(1)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Payoff In</p>
          <p className="text-2xl font-bold text-gray-800">{(months / 12).toFixed(1)} years</p>
        </div>
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 4. Affordability Calculator ────────────────
function AffordabilityCalc() {
  const [income, setIncome] = useState("75000");
  const [debts, setDebts] = useState("500");
  const [down, setDown] = useState("20000");
  const [rate, setRate] = useState("6.5");
  const moIncome = (parseFloat(income) || 0) / 12;
  const moDebts = parseFloat(debts) || 0;
  const dp = parseFloat(down) || 0;
  const maxPmt = moIncome * 0.43 - moDebts;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = 360;
  const maxLoan = r > 0 ? (maxPmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : maxPmt * n;
  const maxHome = maxLoan + dp;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Annual Income ($)" id="a1" value={income} onChange={e => setIncome(e.target.value)} />
        <Input label="Monthly Debts ($)" id="a2" value={debts} onChange={e => setDebts(e.target.value)} />
        <Input label="Down Payment ($)" id="a3" value={down} onChange={e => setDown(e.target.value)} />
        <Input label="Interest Rate (%)" id="a4" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Home You Can Afford</p>
          <p className="text-3xl font-bold text-primary">${fmtInt(Math.max(0, maxHome))}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Max Monthly Payment</p>
          <p className="text-2xl font-bold text-gray-800">${fmt(Math.max(0, maxPmt))}</p>
        </div>
      </div>
      <CalcCTA text="Ready to get pre-approved? Start your application today." />
    </div>
  );
}

// ─── 5. Principal Calculator ────────────────────
function PrincipalCalc() {
  const [payment, setPayment] = useState("1900");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const pmt = parseFloat(payment) || 0;
  const r = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseFloat(term) || 30) * 12;
  const principal = r > 0 ? (pmt * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n)) : pmt * n;
  const totalPaid = pmt * n;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Input label="Desired Monthly Payment ($)" id="p1" value={payment} onChange={e => setPayment(e.target.value)} />
        <Input label="Interest Rate (%)" id="p2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="p3" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Loan Amount" value={`$${fmtInt(Math.max(0, principal))}`} highlight />
        <ResultBox label="Total Interest" value={`$${fmtInt(Math.max(0, totalPaid - principal))}`} />
        <ResultBox label="Total Paid" value={`$${fmtInt(totalPaid)}`} />
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 6. Tax Benefits Calculator ─────────────────
function TaxBenefitsCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [taxRate, setTaxRate] = useState("24");
  const [propTax, setPropTax] = useState("4000");
  const annualInterest = (parseFloat(loan) || 0) * ((parseFloat(rate) || 0) / 100);
  const annualPropTax = parseFloat(propTax) || 0;
  const totalDeduction = annualInterest + annualPropTax;
  const taxBracket = (parseFloat(taxRate) || 0) / 100;
  const annualSavings = totalDeduction * taxBracket;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Amount ($)" id="tb1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Interest Rate (%)" id="tb2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Tax Bracket (%)" id="tb3" value={taxRate} onChange={e => setTaxRate(e.target.value)} />
        <Input label="Annual Property Tax ($)" id="tb4" value={propTax} onChange={e => setPropTax(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Annual Interest" value={`$${fmtInt(annualInterest)}`} />
        <ResultBox label="Total Deductions" value={`$${fmtInt(totalDeduction)}`} />
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Estimated Tax Savings</p>
          <p className="text-2xl font-bold text-green-600">${fmtInt(annualSavings)}/yr</p>
        </div>
      </div>
      <p className="text-xs text-gray-400 text-center">* This is a simplified estimate. Consult a tax professional for accurate advice.</p>
      <CalcCTA />
    </div>
  );
}

// ─── 7. APR Calculator ──────────────────────────
function APRCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [fees, setFees] = useState("5000");
  const p = parseFloat(loan) || 0;
  const f = parseFloat(fees) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(term) || 30;
  const basePmt = calcPayment(p, r, t);
  // APR: effective rate when fees are rolled in
  const effectiveLoan = p - f;
  // Find APR by iteration (bisection)
  let lo = 0, hi = 30;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const pmt = calcPayment(effectiveLoan, mid, t);
    if (pmt < basePmt) lo = mid; else hi = mid;
  }
  const apr = (lo + hi) / 2;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Amount ($)" id="apr1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Interest Rate (%)" id="apr2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="apr3" value={term} onChange={e => setTerm(e.target.value)} />
        <Input label="Total Fees & Points ($)" id="apr4" value={fees} onChange={e => setFees(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Note Rate" value={`${r.toFixed(3)}%`} />
        <ResultBox label="APR" value={`${apr.toFixed(3)}%`} highlight />
        <ResultBox label="Monthly Payment" value={`$${fmt(basePmt)}`} />
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 8. Interest-Only Calculator ────────────────
function InterestOnlyCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [ioPeriod, setIoPeriod] = useState("10");
  const [term, setTerm] = useState("30");
  const p = parseFloat(loan) || 0;
  const r = parseFloat(rate) || 0;
  const io = parseFloat(ioPeriod) || 10;
  const t = parseFloat(term) || 30;
  const ioPayment = p * (r / 100 / 12);
  const remainingTerm = t - io;
  const fullPayment = remainingTerm > 0 ? calcPayment(p, r, remainingTerm) : 0;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Amount ($)" id="io1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Interest Rate (%)" id="io2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Interest-Only Period (years)" id="io3" value={ioPeriod} onChange={e => setIoPeriod(e.target.value)} />
        <Input label="Total Loan Term (years)" id="io4" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="IO Payment" value={`$${fmt(ioPayment)}`} highlight />
        <ResultBox label="Full Payment After IO" value={`$${fmt(fullPayment)}`} />
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Payment Increase</p>
          <p className="text-2xl font-bold text-orange-600">+${fmt(Math.max(0, fullPayment - ioPayment))}</p>
        </div>
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 9. Points Calculator ───────────────────────
function PointsCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [rateWithPoints, setRateWithPoints] = useState("6.0");
  const [pointsCost, setPointsCost] = useState("1");
  const [term, setTerm] = useState("30");
  const p = parseFloat(loan) || 0;
  const t = parseFloat(term) || 30;
  const noPoints = calcPayment(p, parseFloat(rate) || 0, t);
  const withPoints = calcPayment(p, parseFloat(rateWithPoints) || 0, t);
  const savings = noPoints - withPoints;
  const cost = p * ((parseFloat(pointsCost) || 0) / 100);
  const breakEvenMonths = savings > 0 ? Math.ceil(cost / savings) : 0;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Loan Amount ($)" id="pt1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Rate Without Points (%)" id="pt2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Rate With Points (%)" id="pt3" value={rateWithPoints} onChange={e => setRateWithPoints(e.target.value)} />
        <Input label="Points Cost (%)" id="pt4" value={pointsCost} onChange={e => setPointsCost(e.target.value)} />
        <Input label="Loan Term (years)" id="pt5" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Cost of Points</p>
          <p className="text-2xl font-bold text-gray-800">${fmtInt(cost)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Monthly Savings</p>
          <p className="text-2xl font-bold text-green-600">${fmt(Math.max(0, savings))}</p>
        </div>
        <ResultBox label="Break Even" value={breakEvenMonths > 0 ? `${breakEvenMonths} months` : "N/A"} highlight />
      </div>
      <p className="text-xs text-gray-400 text-center">
        If you plan to stay longer than {breakEvenMonths > 0 ? `${(breakEvenMonths / 12).toFixed(1)} years` : "N/A"}, paying points saves money.
      </p>
      <CalcCTA />
    </div>
  );
}

// ─── 10. Income Calculator ──────────────────────
function IncomeCalc() {
  const [homePrice, setHomePrice] = useState("350000");
  const [down, setDown] = useState("20000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [debts, setDebts] = useState("500");
  const loan = (parseFloat(homePrice) || 0) - (parseFloat(down) || 0);
  const t = parseFloat(term) || 30;
  const mo = calcPayment(loan, parseFloat(rate) || 0, t);
  const moDebts = parseFloat(debts) || 0;
  // Using 43% DTI ratio
  const requiredMonthlyIncome = (mo + moDebts) / 0.43;
  const requiredAnnualIncome = requiredMonthlyIncome * 12;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Home Price ($)" id="inc1" value={homePrice} onChange={e => setHomePrice(e.target.value)} />
        <Input label="Down Payment ($)" id="inc2" value={down} onChange={e => setDown(e.target.value)} />
        <Input label="Interest Rate (%)" id="inc3" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="inc4" value={term} onChange={e => setTerm(e.target.value)} />
        <Input label="Monthly Debts ($)" id="inc5" value={debts} onChange={e => setDebts(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Required Annual Income" value={`$${fmtInt(Math.max(0, requiredAnnualIncome))}`} highlight />
        <ResultBox label="Monthly Payment" value={`$${fmt(mo)}`} />
        <ResultBox label="Required Monthly Income" value={`$${fmtInt(Math.max(0, requiredMonthlyIncome))}`} />
      </div>
      <p className="text-xs text-gray-400 text-center">* Based on 43% maximum debt-to-income ratio.</p>
      <CalcCTA />
    </div>
  );
}

// ─── 11. Buydown Calculator ─────────────────────
function BuydownCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const p = parseFloat(loan) || 0;
  const r = parseFloat(rate) || 0;
  const t = parseFloat(term) || 30;
  // 2-1 buydown: Year 1 = rate-2%, Year 2 = rate-1%, Year 3+ = full rate
  const yr1Pmt = calcPayment(p, Math.max(0, r - 2), t);
  const yr2Pmt = calcPayment(p, Math.max(0, r - 1), t);
  const fullPmt = calcPayment(p, r, t);
  const yr1Savings = (fullPmt - yr1Pmt) * 12;
  const yr2Savings = (fullPmt - yr2Pmt) * 12;
  const totalBuydownCost = yr1Savings + yr2Savings;
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        A <strong>2-1 buydown</strong> temporarily reduces your rate by 2% in year 1 and 1% in year 2, then returns to the full rate. The cost is often paid by the seller as a concession.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        <Input label="Loan Amount ($)" id="bd1" value={loan} onChange={e => setLoan(e.target.value)} />
        <Input label="Note Rate (%)" id="bd2" value={rate} onChange={e => setRate(e.target.value)} />
        <Input label="Loan Term (years)" id="bd3" value={term} onChange={e => setTerm(e.target.value)} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-xs text-green-700 font-medium mb-1">Year 1 ({(r - 2).toFixed(1)}%)</p>
          <p className="text-xl font-bold text-green-700">${fmt(yr1Pmt)}/mo</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-blue-700 font-medium mb-1">Year 2 ({(r - 1).toFixed(1)}%)</p>
          <p className="text-xl font-bold text-blue-700">${fmt(yr2Pmt)}/mo</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 font-medium mb-1">Year 3+ ({r.toFixed(1)}%)</p>
          <p className="text-xl font-bold text-gray-800">${fmt(fullPmt)}/mo</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500 mb-1">Estimated Buydown Cost</p>
        <p className="text-2xl font-bold text-primary">${fmtInt(totalBuydownCost)}</p>
        <p className="text-xs text-gray-400 mt-1">Often paid by the seller as a concession</p>
      </div>
      <CalcCTA text="Ask us about buydown options on your next purchase." />
    </div>
  );
}

// ─── Tabs + Page ────────────────────────────────
const calculators = [
  { id: "mortgage", label: "Mortgage", icon: Calculator, component: MortgageCalc },
  { id: "refi", label: "Refinance", icon: RefreshCw, component: RefinanceCalc },
  { id: "extra", label: "Extra Payments", icon: TrendingDown, component: ExtraPaymentCalc },
  { id: "afford", label: "Affordability", icon: Home, component: AffordabilityCalc },
  { id: "principal", label: "Principal", icon: BarChart3, component: PrincipalCalc },
  { id: "tax", label: "Tax Benefits", icon: Receipt, component: TaxBenefitsCalc },
  { id: "apr", label: "APR", icon: Percent, component: APRCalc },
  { id: "io", label: "Interest-Only", icon: DollarSign, component: InterestOnlyCalc },
  { id: "points", label: "Points", icon: Coins, component: PointsCalc },
  { id: "income", label: "Income", icon: Wallet, component: IncomeCalc },
  { id: "buydown", label: "Buydown", icon: ArrowDownUp, component: BuydownCalc },
];

export default function MortgageCalculatorsPage() {
  const [active, setActive] = useState("mortgage");
  const ActiveCalc = calculators.find(c => c.id === active)?.component || MortgageCalc;

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
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActive(calc.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer ${
                  active === calc.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <calc.icon className="h-3.5 w-3.5" />
                {calc.label}
              </button>
            ))}
          </div>

          <Card hover={false}>
            <CardContent className="p-6 md:p-8">
              <ActiveCalc />
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
