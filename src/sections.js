// types/productTypes.ts
export interface RepaymentTypes {
  capitalRepayment: string;
  pureInterestOnly: string;
  interestOnlyRV: string;
  partAndPart: string;
  endowment: string;
  isa: string;
  pep: string;
  pension: string;
  unitLinked: string;
  withProfits: string;
}

export interface InterestOnly {
  maxLoan: string;
  ftb: string;
  maxLoanFtb: string;
  maxTtvFtb: string;
}

export interface Incentives {
  valuation: string;
  valuationFeeMax: string;
  remortgageFeeVal: string;
  legalFee: string;
  legalFeeMaxRef: string;
  remortgageFeeLegal: string;
  cashback: string;
  cashbackAmount: string;
  cashbackMax: string;
  ftbCashback: string;
  remortgageCashback: string;
  flexibleMortgage: string;
  underpayments: string;
  overpayments: string;
  offset: string;
  currentAccount: string;
  paymentHolidays: string;
  borrowBack: string;
  portable: string;
}

export interface Application {
  purpose: string;
  limitedCompany: string;
  selfBuild: string;
  selfEmployed: string;
  selfEmployedAccounts: string;
  sharedOwnership: string;
  newBuild: string;
  capitalRest: string;
  availableDirect: string;
  newBuy: string;
  htbEquityLoan: string;
  mortgageGuarantee: string;
}

export interface Features {
  greenMortgage: string;
  familyAssistedMortgage: string;
  rioMortgage: string;
  firstHomesMortgage: string;
  rateReducer: string;
}

// components/product-details/AllSections.tsx
import React from 'react';
import { SectionHeader } from '../ui/DataRow';
import { RepaymentTypes, InterestOnly, Incentives, Application, Features } from '../../types/productTypes';

// Repayment Types Section
export const RepaymentTypesSection: React.FC<{ repayment: RepaymentTypes }> = ({ repayment }) => {
  const repaymentData = [
    { label: 'Capital Repayment', value: repayment.capitalRepayment },
    { label: 'Pure Interest Only', value: repayment.pureInterestOnly },
    { label: 'Interest Only with RV', value: repayment.interestOnlyRV },
    { label: 'Part and Part', value: repayment.partAndPart },
    { label: 'Endowment', value: repayment.endowment },
    { label: 'ISA', value: repayment.isa },
    { label: 'PEP', value: repayment.pep },
    { label: 'Pension', value: repayment.pension },
    { label: 'Unit Linked', value: repayment.unitLinked },
    { label: 'With Profits', value: repayment.withProfits },
  ];

  return (
    <div className="mb-4">
      <SectionHeader title="Repayment Types" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Type</th>
            <th className="text-left p-2 font-semibold">Available</th>
          </tr>
        </thead>
        <tbody>
          {repaymentData.map((item, index) => (
            <tr key={index}>
              <td className="p-2 text-700">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Interest Only Section
export const InterestOnlySection: React.FC<{ interestOnly: InterestOnly }> = ({ interestOnly }) => {
  const interestOnlyData = [
    { label: 'Max Loan', value: interestOnly.maxLoan },
    { label: 'FTB', value: interestOnly.ftb },
    { label: 'Max Loan - FTB', value: interestOnly.maxLoanFtb },
    { label: 'Max TTV - FTB', value: interestOnly.maxTtvFtb },
  ];

  return (
    <div className="mb-4">
      <SectionHeader title="Interest Only" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Criteria</th>
            <th className="text-left p-2 font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {interestOnlyData.map((item, index) => (
            <tr key={index}>
              <td className="p-2 text-700">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Incentives Section
export const IncentivesSection: React.FC<{ incentives: Incentives }> = ({ incentives }) => {
  const incentivesData = [
    { label: 'Valuation', value: incentives.valuation },
    { label: 'Valuation fee max up to', value: incentives.valuationFeeMax },
    { label: 'Remortgage fee val', value: incentives.remortgageFeeVal },
    { label: 'Legal fee', value: incentives.legalFee },
    { label: 'Legal Fee max ref', value: incentives.legalFeeMaxRef },
    { label: 'Remortgage fee legal', value: incentives.remortgageFeeLegal },
    { label: 'Cashback', value: incentives.cashback },
    { label: 'Cashback amount', value: incentives.cashbackAmount },
    { label: 'Cashback max', value: incentives.cashbackMax },
    { label: 'FTB Cashback', value: incentives.ftbCashback },
    { label: 'Remortgage Cashback', value: incentives.remortgageCashback },
    { label: 'Flexible mortgages', value: incentives.flexibleMortgage },
    { label: 'Underpayments', value: incentives.underpayments },
    { label: 'Overpayments', value: incentives.overpayments },
    { label: 'Offset', value: incentives.offset },
    { label: 'Current account', value: incentives.currentAccount },
    { label: 'Payment holidays', value: incentives.paymentHolidays },
    { label: 'Borrow back', value: incentives.borrowBack },
    { label: 'Portable', value: incentives.portable },
  ];

  return (
    <div className="mb-4">
      <SectionHeader title="Incentives:" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Feature</th>
            <th className="text-left p-2 font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          {incentivesData.map((item, index) => (
            <tr key={index}>
              <td className="p-2 text-700">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Application Section
export const ApplicationSection: React.FC<{ application: Application }> = ({ application }) => {
  const applicationData = [
    { label: 'Purpose', value: application.purpose },
    { label: 'Limited Company', value: application.limitedCompany },
    { label: 'Self build', value: application.selfBuild },
    { label: 'Self employed', value: application.selfEmployed },
    { label: 'Self employed accounts', value: application.selfEmployedAccounts },
    { label: 'Shared Ownership', value: application.sharedOwnership },
    { label: 'New build', value: application.newBuild },
    { label: 'Capital rest', value: application.capitalRest },
    { label: 'Available direct', value: application.availableDirect },
    { label: 'New Buy', value: application.newBuy },
    { label: 'HTB equity loan', value: application.htbEquityLoan },
    { label: 'Mortgage guarantee', value: application.mortgageGuarantee },
  ];

  return (
    <div className="mb-4">
      <SectionHeader title="Application:" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Criteria</th>
            <th className="text-left p-2 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {applicationData.map((item, index) => (
            <tr key={index}>
              <td className="p-2 text-700">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Features Section
export const FeaturesSection: React.FC<{ features: Features }> = ({ features }) => {
  const featuresData = [
    { label: 'Green mortgage', value: features.greenMortgage },
    { label: 'Family assisted mortgage', value: features.familyAssistedMortgage },
    { label: 'RIO mortgage', value: features.rioMortgage },
    { label: 'First homes mortgage', value: features.firstHomesMortgage },
    { label: 'Rate Reducer', value: features.rateReducer },
  ];

  return (
    <div className="mb-4">
      <SectionHeader title="Features:" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Feature</th>
            <th className="text-left p-2 font-semibold">Available</th>
          </tr>
        </thead>
        <tbody>
          {featuresData.map((item, index) => (
            <tr key={index}>
              <td className="p-2 text-700">{item.label}</td>
              <td className="p-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
