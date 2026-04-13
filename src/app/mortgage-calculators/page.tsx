"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SliderInput } from "@/components/ui/SliderInput";
import { DonutChart } from "@/components/ui/DonutChart";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
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
  if (r === 0 || n === 0) return principal / (n || 1);
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function ResultBox({ label, num, prefix = "$", decimals = 0, highlight, color, suffix = "" }: { label: string; num: number; prefix?: string; decimals?: number; highlight?: boolean; color?: string; suffix?: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color || (highlight ? "text-primary" : "text-gray-800")}`}>
        <AnimatedNumber value={num} prefix={prefix} decimals={decimals} suffix={suffix} />
      </p>
    </div>
  );
}

function ResultBoxStatic({ label, value, highlight, color }: { label: string; value: string; highlight?: boolean; color?: string }) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color || (highlight ? "text-primary" : "text-gray-800")}`}>{value}</p>
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
  const p = parseFloat(loan) || 0, r = parseFloat(rate) || 0, t = parseFloat(term) || 30;
  const mo = calcPayment(p, r, t);
  const total = mo * t * 12;
  const interest = total - p;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Amount" id="m1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest Rate" id="m2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Loan Term" id="m3" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <div className="grid md:grid-cols-[1fr_auto] gap-8 bg-gray-50 rounded-xl p-6 items-center">
        <div className="grid grid-cols-3 gap-4">
          <ResultBox label="Monthly Payment" num={mo} decimals={2} highlight />
          <ResultBox label="Total Interest" num={interest} />
          <ResultBox label="Total Cost" num={total} />
        </div>
        <DonutChart principal={p} interest={interest} />
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
  const b = parseFloat(balance) || 0, t = parseFloat(term) || 30;
  const oldPmt = calcPayment(b, parseFloat(oldRate) || 0, t);
  const newPmt = calcPayment(b, parseFloat(newRate) || 0, t);
  const savings = oldPmt - newPmt;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Balance" id="r1" value={balance} onChange={setBalance} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Current Rate" id="r2" value={oldRate} onChange={setOldRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="New Rate" id="r3" value={newRate} onChange={setNewRate} min={1} max={12} step={0.125} suffix="%" />
      </div>
      <SliderInput label="New Term" id="r4" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Current Payment" num={oldPmt} decimals={2} />
        <ResultBox label="New Payment" num={newPmt} decimals={2} highlight />
        <ResultBox label="Monthly Savings" num={Math.max(0, savings)} decimals={2} color="text-green-600" />
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
  let balance = p, months = 0, totalInterestExtra = 0;
  while (balance > 0 && months < n) {
    const interest = balance * r;
    totalInterestExtra += interest;
    balance = Math.max(0, balance - (basePmt + ex - interest));
    months++;
  }
  const totalInterestNormal = basePmt * n - p;
  const interestSaved = totalInterestNormal - totalInterestExtra;
  const yearsOff = (n - months) / 12;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Amount" id="ep1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest Rate" id="ep2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Loan Term" id="ep3" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <SliderInput label="Extra Monthly Payment" id="ep4" value={extra} onChange={setExtra} min={0} max={2000} step={25} prefix="$" />
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Interest Saved" num={Math.max(0, interestSaved)} color="text-green-600" />
        <ResultBoxStatic label="Years Saved" value={Math.max(0, yearsOff).toFixed(1)} highlight />
        <ResultBoxStatic label="Payoff In" value={`${(months / 12).toFixed(1)} years`} />
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
      <SliderInput label="Annual Income" id="a1" value={income} onChange={setIncome} min={20000} max={500000} step={5000} prefix="$" />
      <SliderInput label="Monthly Debts" id="a2" value={debts} onChange={setDebts} min={0} max={5000} step={50} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Down Payment" id="a3" value={down} onChange={setDown} min={0} max={500000} step={5000} prefix="$" />
        <SliderInput label="Interest Rate" id="a4" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Home You Can Afford</p>
          <p className="text-3xl font-bold text-primary"><AnimatedNumber value={Math.max(0, maxHome)} prefix="$" /></p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Max Monthly Payment</p>
          <p className="text-2xl font-bold text-gray-800"><AnimatedNumber value={Math.max(0, maxPmt)} prefix="$" decimals={2} /></p>
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
      <SliderInput label="Desired Monthly Payment" id="p1" value={payment} onChange={setPayment} min={300} max={10000} step={50} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest Rate" id="p2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Loan Term" id="p3" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Loan Amount" num={Math.max(0, principal)} highlight />
        <ResultBox label="Total Interest" num={Math.max(0, totalPaid - principal)} />
        <ResultBox label="Total Paid" num={totalPaid} />
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
      <SliderInput label="Loan Amount" id="tb1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest Rate" id="tb2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Tax Bracket" id="tb3" value={taxRate} onChange={setTaxRate} min={10} max={37} step={1} suffix="%" />
      </div>
      <SliderInput label="Annual Property Tax" id="tb4" value={propTax} onChange={setPropTax} min={0} max={25000} step={250} prefix="$" />
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Annual Interest" num={annualInterest} />
        <ResultBox label="Total Deductions" num={totalDeduction} />
        <ResultBox label="Est. Tax Savings" num={annualSavings} suffix="/yr" color="text-green-600" />
      </div>
      <p className="text-xs text-gray-400 text-center">* Simplified estimate. Consult a tax professional for accurate advice.</p>
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
  const p = parseFloat(loan) || 0, f = parseFloat(fees) || 0;
  const r = parseFloat(rate) || 0, t = parseFloat(term) || 30;
  const basePmt = calcPayment(p, r, t);
  const effectiveLoan = p - f;
  let lo = 0, hi = 30;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (calcPayment(effectiveLoan, mid, t) < basePmt) lo = mid; else hi = mid;
  }
  const apr = (lo + hi) / 2;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Amount" id="apr1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest Rate" id="apr2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Loan Term" id="apr3" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <SliderInput label="Total Fees & Points" id="apr4" value={fees} onChange={setFees} min={0} max={30000} step={500} prefix="$" />
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Note Rate" num={r} prefix="" decimals={3} suffix="%" />
        <ResultBox label="APR" num={apr} prefix="" decimals={3} suffix="%" highlight />
        <ResultBox label="Monthly Payment" num={basePmt} decimals={2} />
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
  const p = parseFloat(loan) || 0, r = parseFloat(rate) || 0;
  const io = parseFloat(ioPeriod) || 10, t = parseFloat(term) || 30;
  const ioPayment = p * (r / 100 / 12);
  const remaining = t - io;
  const fullPayment = remaining > 0 ? calcPayment(p, r, remaining) : 0;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Amount" id="io1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <SliderInput label="Interest Rate" id="io2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Interest-Only Period" id="io3" value={ioPeriod} onChange={setIoPeriod} min={1} max={15} step={1} suffix=" yr" />
        <SliderInput label="Total Loan Term" id="io4" value={term} onChange={setTerm} min={10} max={30} step={5} suffix=" yr" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="IO Payment" num={ioPayment} decimals={2} highlight />
        <ResultBox label="Full Payment After IO" num={fullPayment} decimals={2} />
        <ResultBox label="Payment Increase" num={Math.max(0, fullPayment - ioPayment)} prefix="+$" decimals={2} color="text-orange-600" />
      </div>
      <CalcCTA />
    </div>
  );
}

// ─── 9. Points Calculator ───────────────────────
function PointsCalc() {
  const [loan, setLoan] = useState("300000");
  const [rate, setRate] = useState("6.5");
  const [rateWP, setRateWP] = useState("6.0");
  const [ptsCost, setPtsCost] = useState("1");
  const [term, setTerm] = useState("30");
  const p = parseFloat(loan) || 0, t = parseFloat(term) || 30;
  const noPoints = calcPayment(p, parseFloat(rate) || 0, t);
  const withPoints = calcPayment(p, parseFloat(rateWP) || 0, t);
  const savings = noPoints - withPoints;
  const cost = p * ((parseFloat(ptsCost) || 0) / 100);
  const breakEven = savings > 0 ? Math.ceil(cost / savings) : 0;
  return (
    <div className="space-y-6">
      <SliderInput label="Loan Amount" id="pt1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Rate Without Points" id="pt2" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
        <SliderInput label="Rate With Points" id="pt3" value={rateWP} onChange={setRateWP} min={1} max={12} step={0.125} suffix="%" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Points Cost" id="pt4" value={ptsCost} onChange={setPtsCost} min={0.25} max={4} step={0.25} suffix="%" />
        <SliderInput label="Loan Term" id="pt5" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Cost of Points" num={cost} />
        <ResultBox label="Monthly Savings" num={Math.max(0, savings)} decimals={2} color="text-green-600" />
        <ResultBoxStatic label="Break Even" value={breakEven > 0 ? `${breakEven} mo` : "N/A"} highlight />
      </div>
      {breakEven > 0 && (
        <p className="text-xs text-gray-400 text-center">
          If you stay longer than {(breakEven / 12).toFixed(1)} years, paying points saves you money.
        </p>
      )}
      <CalcCTA />
    </div>
  );
}

// ─── 10. Income Calculator ──────────────────────
function IncomeCalc() {
  const [price, setPrice] = useState("350000");
  const [down, setDown] = useState("20000");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");
  const [debts, setDebts] = useState("500");
  const loan = (parseFloat(price) || 0) - (parseFloat(down) || 0);
  const t = parseFloat(term) || 30;
  const mo = calcPayment(loan, parseFloat(rate) || 0, t);
  const moDebts = parseFloat(debts) || 0;
  const reqMonthly = (mo + moDebts) / 0.43;
  const reqAnnual = reqMonthly * 12;
  return (
    <div className="space-y-6">
      <SliderInput label="Home Price" id="inc1" value={price} onChange={setPrice} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Down Payment" id="inc2" value={down} onChange={setDown} min={0} max={500000} step={5000} prefix="$" />
        <SliderInput label="Interest Rate" id="inc3" value={rate} onChange={setRate} min={1} max={12} step={0.125} suffix="%" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Loan Term" id="inc4" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
        <SliderInput label="Monthly Debts" id="inc5" value={debts} onChange={setDebts} min={0} max={5000} step={50} prefix="$" />
      </div>
      <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-xl p-6">
        <ResultBox label="Required Annual Income" num={Math.max(0, reqAnnual)} highlight />
        <ResultBox label="Monthly Payment" num={mo} decimals={2} />
        <ResultBox label="Required Monthly Income" num={Math.max(0, reqMonthly)} />
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
  const p = parseFloat(loan) || 0, r = parseFloat(rate) || 0, t = parseFloat(term) || 30;
  const yr1Pmt = calcPayment(p, Math.max(0, r - 2), t);
  const yr2Pmt = calcPayment(p, Math.max(0, r - 1), t);
  const fullPmt = calcPayment(p, r, t);
  const totalBuydownCost = (fullPmt - yr1Pmt) * 12 + (fullPmt - yr2Pmt) * 12;
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
        A <strong>2-1 buydown</strong> temporarily reduces your rate by 2% in year 1 and 1% in year 2, then returns to the full rate. The cost is often paid by the seller.
      </p>
      <SliderInput label="Loan Amount" id="bd1" value={loan} onChange={setLoan} min={50000} max={2000000} step={5000} prefix="$" />
      <div className="grid md:grid-cols-2 gap-6">
        <SliderInput label="Note Rate" id="bd2" value={rate} onChange={setRate} min={3} max={12} step={0.125} suffix="%" />
        <SliderInput label="Loan Term" id="bd3" value={term} onChange={setTerm} min={5} max={30} step={5} suffix=" yr" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-xs text-green-700 font-medium mb-1">Year 1 ({Math.max(0, r - 2).toFixed(1)}%)</p>
          <p className="text-xl font-bold text-green-700">${fmt(yr1Pmt)}/mo</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-xs text-blue-700 font-medium mb-1">Year 2 ({Math.max(0, r - 1).toFixed(1)}%)</p>
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
