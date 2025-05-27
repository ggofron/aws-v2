

// Type definitions
type YesNoValue = 'Y' | 'N';
type YesNoMaybeValue = 'Y' | 'N' | 'M';
type YesNoReferOtherValue = 'Y' | 'N' | 'R' | 'O';

interface TextMappings {
  [key: string]: { [key: string]: string };
}

// Text mappings for specific fields
const TEXT_MAPPINGS: TextMappings = {
  'RateType': { 'F': 'Fixed', 'V': 'Variable', 'T': 'Tracker', 'D': 'Discount' },
  'CapitalRest': { 'Y': 'Yes', 'N': 'No' },
  'ValFeeFreeStatus': { 'F': 'Free', 'R': 'Refunded' },
  'LegalFee': { 'F': 'Free', 'R': 'Refunded' },
  'BorrowerType': { 'F': 'First Time Buyer', 'S': 'Second Time Buyer', 'E': 'Existing Customer' },
  'BaseRateType': { 'Y': 'Yes', 'N': 'No', 'B': 'Base Rate', 'V': 'Variable', 'L': 'Libor' },
  'EmplStatus': { 'P': 'Employed', 'S': 'Self Employed' }
} as const;

// Yes/No field categories
const YES_NO_FIELDS: readonly string[] = [
  'flexibleMortgage', 'underPayments', 'paymentHolidays', 'borrowBack', 'portable', 
  'forBTL', 'forLTB', 'forResidential', 'forLtdCompany', 'forSelfBuild',
  'rightToBuy', 'sharedOwnership', 'newBuild', 'selfDeclared', 
  'legalFeeFreeReg', 'cashBackAvailable', 'unempRedundant',
  'availableByDirect', 'directOnly', 'interestOnlyAllowFTB',
  'h2BntGuarantee', 'h2EquityLoan', 'addressAboveMaxLTV', 'feesInterestCalcRepayBasis'
] as const;

const YES_NO_MAYBE_FIELDS: readonly string[] = [
  'overPayments', 'offset', 'currentAccountLender'
] as const;

const YES_NO_REFER_OTHER_FIELDS: readonly string[] = [
  'forSelfBuild', 'rightToBuy', 'sharedOwnership', 'newBuild', 'h2BntGuarantee', 
  'h2EquityLoan', 'greenMortgage', 'familyAssistanTarget', 'rightTarget', 'firstBuyerTarget'
] as const;

// Value mappings
const YES_NO_MAPPING: Record<YesNoValue, string> = { 'Y': 'Yes', 'N': 'No' } as const;
const YES_NO_MAYBE_MAPPING: Record<YesNoMaybeValue, string> = { 'Y': 'Yes', 'N': 'No', 'M': 'Maybe' } as const;
const YES_NO_REFER_OTHER_MAPPING: Record<YesNoReferOtherValue, string> = { 'Y': 'Yes', 'N': 'No', 'R': 'Refer', 'O': 'Other' } as const;

/**
 * Maps field values based on predefined rules
 */
export const mapFieldValue = (value: unknown, fieldName: string = ''): string => {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  // Specific text mappings
  if (TEXT_MAPPINGS[fieldName]?.[stringValue]) {
    return TEXT_MAPPINGS[fieldName][stringValue];
  }
  
  // Category-based mappings
  if (YES_NO_FIELDS.includes(fieldName) && stringValue in YES_NO_MAPPING) {
    return YES_NO_MAPPING[stringValue as YesNoValue];
  }
  
  if (YES_NO_MAYBE_FIELDS.includes(fieldName) && stringValue in YES_NO_MAYBE_MAPPING) {
    return YES_NO_MAYBE_MAPPING[stringValue as YesNoMaybeValue];
  }
  
  if (YES_NO_REFER_OTHER_FIELDS.includes(fieldName) && stringValue in YES_NO_REFER_OTHER_MAPPING) {
    return YES_NO_REFER_OTHER_MAPPING[stringValue as YesNoReferOtherValue];
  }
  
  // Handle numeric strings for repayment types
  if (stringValue === '1') return 'Yes';
  if (stringValue === '0') return 'No';
  
  // Handle "Set at Range Level"
  if (stringValue.toLowerCase().includes('set at range level')) {
    return 'Set at Range Level';
  }
  
  return stringValue;
};

/**
 * Formats currency values in GBP
 */
export const formatCurrency = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return '';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '';
  if (numericValue === 0) return '£0';
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue);
};

/**
 * Formats percentage values
 */
export const formatPercentage = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined) return '';
  
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numericValue)) return '';
  if (numericValue === 0) return '0%';
  
  return `${numericValue}%`;
};

===============

  // components/ui/DataRow.jsx - Keep this simple
import React from 'react';

export const DataRow = ({ label, value }) => (
  <div className="flex justify-content-between mb-2">
    <span className="text-700">{label}</span>
    <span className="font-medium">{value || '-'}</span>
  </div>
);

export const SectionHeader = ({ title }) => (
  <h4 className="text-lg font-semibold mb-3 text-900">{title}</h4>
);

// Only create a table component if you have actual tabular data
export const SimpleTable = ({ children }) => (
  <table className="w-full mb-4 surface-border">
    {children}
  </table>
);

// components/product-details/PurposeTable.jsx - Simplified
import React from 'react';
import { SectionHeader } from '../ui/DataRow';

const PurposeTable = ({ purpose }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Loan Limits" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-bottom-1 surface-border">
            <th className="text-left p-2 font-semibold">Purpose</th>
            <th className="text-left p-2 font-semibold">Purchase</th>
            <th className="text-left p-2 font-semibold">Remortgage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-700">LTV</td>
            <td className="p-2">{purpose.ltvPur}</td>
            <td className="p-2">{purpose.ltvRmg}</td>
          </tr>
          <tr>
            <td className="p-2 text-700">FTB LTV</td>
            <td className="p-2">{purpose.ltvMaxFtb}</td>
            <td className="p-2">-</td>
          </tr>
          <tr>
            <td className="p-2 text-700">Min Loan</td>
            <td className="p-2">{purpose.loanMinPur}</td>
            <td className="p-2">{purpose.loanMinRmg}</td>
          </tr>
          <tr>
            <td className="p-2 text-700">Max Loan</td>
            <td className="p-2">{purpose.loanMaxPur}</td>
            <td className="p-2">{purpose.loanMaxRmg}</td>
          </tr>
          <tr>
            <td className="p-2 text-700">FTB Max Loan</td>
            <td className="p-2">{purpose.loanMaxFtb}</td>
            <td className="p-2">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurposeTable;

  ============


// utils/dataMappingUtils.js

// Text mappings for specific fields
const TEXT_MAPPINGS = {
  'RateType': { 'F': 'Fixed', 'V': 'Variable', 'T': 'Tracker', 'D': 'Discount' },
  'CapitalRest': { 'Y': 'Yes', 'N': 'No' },
  'ValFeeFreeStatus': { 'F': 'Free', 'R': 'Refunded' },
  'LegalFee': { 'F': 'Free', 'R': 'Refunded' },
  'BorrowerType': { 'F': 'First Time Buyer', 'S': 'Second Time Buyer', 'E': 'Existing Customer' },
  'BaseRateType': { 'Y': 'Yes', 'N': 'No', 'B': 'Base Rate', 'V': 'Variable', 'L': 'Libor' },
  'EmplStatus': { 'P': 'Employed', 'S': 'Self Employed' }
};

// Yes/No field categories
const YES_NO_FIELDS = [
  'flexibleMortgage', 'underPayments', 'paymentHolidays', 'borrowBack', 'portable', 
  'forBTL', 'forLTB', 'forResidential', 'forLtdCompany', 'forSelfBuild',
  'rightToBuy', 'sharedOwnership', 'newBuild', 'selfDeclared', 
  'legalFeeFreeReg', 'cashBackAvailable', 'unempRedundant',
  'availableByDirect', 'directOnly', 'interestOnlyAllowFTB',
  'h2BntGuarantee', 'h2EquityLoan', 'addressAboveMaxLTV', 'feesInterestCalcRepayBasis'
];

const YES_NO_MAYBE_FIELDS = ['overPayments', 'offset', 'currentAccountLender'];

const YES_NO_REFER_OTHER_FIELDS = [
  'forSelfBuild', 'rightToBuy', 'sharedOwnership', 'newBuild', 'h2BntGuarantee', 
  'h2EquityLoan', 'greenMortgage', 'familyAssistanTarget', 'rightTarget', 'firstBuyerTarget'
];

// Value mappings
const YES_NO_MAPPING = { 'Y': 'Yes', 'N': 'No' };
const YES_NO_MAYBE_MAPPING = { 'Y': 'Yes', 'N': 'No', 'M': 'Maybe' };
const YES_NO_REFER_OTHER_MAPPING = { 'Y': 'Yes', 'N': 'No', 'R': 'Refer', 'O': 'Other' };

/**
 * Maps field values based on predefined rules
 */
export const mapFieldValue = (value, fieldName = '') => {
  if (value === null || value === undefined) return '';
  
  // Specific text mappings
  if (TEXT_MAPPINGS[fieldName]?.[value]) {
    return TEXT_MAPPINGS[fieldName][value];
  }

  // Category-based mappings
  if (YES_NO_FIELDS.includes(fieldName) && YES_NO_MAPPING[value]) {
    return YES_NO_MAPPING[value];
  }

  if (YES_NO_MAYBE_FIELDS.includes(fieldName) && YES_NO_MAYBE_MAPPING[value]) {
    return YES_NO_MAYBE_MAPPING[value];
  }

  if (YES_NO_REFER_OTHER_FIELDS.includes(fieldName) && YES_NO_REFER_OTHER_MAPPING[value]) {
    return YES_NO_REFER_OTHER_MAPPING[value];
  }

  // Handle numeric strings for repayment types
  if (value === '1') return 'Yes';
  if (value === '0') return 'No';

  // Handle "Set at Range Level"
  if (String(value).toLowerCase().includes('set at range level')) {
    return 'Set at Range Level';
  }

  return String(value);
};

/**
 * Formats currency values in GBP
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  if (value === 0) return '£0';
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(value));
};

/**
 * Formats percentage values
 */
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '';
  if (value === 0) return '0%';
  return `${value}%`;
};

/**
 * Helper to safely access nested properties
 */
export const safeGet = (obj, path, defaultValue = '') => {
  return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
};






// hooks/useProductData.js
import { useMemo } from 'react';
import { mapFieldValue, formatCurrency, formatPercentage } from '../utils/dataMappingUtils';

/**
 * Transform raw product data into component-ready format
 */
export const useProductData = (productWrapper) => {
  return useMemo(() => {
    const productData = productWrapper?.product;
    if (!productData?.summaryData) {
      return null;
    }

    const data = productData.summaryData;
    const rates = data.productRates?.filter(Boolean) || [];
    const advances = data.advances?.filter(Boolean) || [];
    const firstAdvance = advances[0] || {};

    // Helper functions
    const getPurpose = () => {
      if (data.forResidential === 'Y') return 'Residential';
      if (data.forBTL === 'Y') return 'BTL';
      return 'Residential';
    };

    const getLegalFee = () => {
      return mapFieldValue(data.legalFeeFreeReg, 'legalFeeFreeReg') === 'Yes' 
        ? 'Free' 
        : mapFieldValue(data.legalFee, 'LegalFee');
    };

    const getCashback = () => {
      return mapFieldValue(data.cashBackRationary, 'cashBackRationary') || 
             mapFieldValue(data.cashBackAvailable, 'cashBackAvailable');
    };

    const getOverpayments = () => {
      if (data.overPayments && data.overPayments !== 'N' && data.overPayments !== 'Y') {
        return `${data.overPayments}%`;
      }
      return mapFieldValue(data.overPayments, 'overPayments');
    };

    const getInterestOnlyMaxLoan = () => {
      return data.interestOnlyMaxLoan !== null && 
             data.interestOnlyMaxLoan !== undefined && 
             data.interestOnlyMaxLoan > 0 
        ? 'Allow' 
        : mapFieldValue(data.interestOnlyAllowFTB, 'interestOnlyAllowFTB');
    };

    const getRepaymentTypeValue = (value) => {
      if (value === '1') return 'Yes';
      if (value === '0') return 'No';
      return 'Set at Range Level';
    };

    return {
      // Product info
      productInfo: {
        name: productData.productName || '',
        code: productData.productCode || '',
        rangeName: productData.rangeName || '',
        startDate: productData.startDate || '',
        withdrawDate: productData.withdrawDate || null
      },

      // Rates data
      rates: {
        list: rates.map(rate => ({
          ...rate,
          displayText: `${rate.payRate}% ${mapFieldValue(rate.rateType, 'RateType')} until ${rate.rateDuration || 'Term'}`
        })),
        stepped: data.steppedRates || 'No',
        baseRate: data.baseRate !== null && data.baseRate !== undefined ? `${data.baseRate}%` : '',
        baseRateType: mapFieldValue(data.baseRateType, 'BaseRateType')
      },

      // Descriptions  
      descriptions: {
        variable: data.variableRateDescr || '',
        basic: data.baseRateDescr || ''
      },

      // Purpose table data
      purpose: {
        ltvPur: formatPercentage(firstAdvance.ltv),
        ltvRmg: formatPercentage(firstAdvance.ltv),
        ltvMaxFtb: formatPercentage(firstAdvance.ltvMax),
        loanMinPur: formatCurrency(data.loanMinRTU),
        loanMinRmg: formatCurrency(data.loanMinRTU),
        loanMaxPur: formatCurrency(data.loanMaxRTU),
        loanMaxRmg: formatCurrency(data.loanMaxRTU),
        loanMaxFtb: formatCurrency(data.loanMaxRTU)
      },

      // Repayment types
      repayment: {
        capitalRepayment: getRepaymentTypeValue(data.repaymentTypes?.capitalAndInterest),
        pureInterestOnly: getRepaymentTypeValue(data.repaymentTypes?.interestOnly),
        interestOnlyRV: getRepaymentTypeValue(data.repaymentTypes?.interestOnlyAV),
        partAndPart: getRepaymentTypeValue(data.repaymentTypes?.partEndowment),
        endowment: getRepaymentTypeValue(data.repaymentTypes?.endowment),
        isa: getRepaymentTypeValue(data.repaymentTypes?.isa),
        pep: getRepaymentTypeValue(data.repaymentTypes?.pep),
        pension: getRepaymentTypeValue(data.repaymentTypes?.pension),
        unitLinked: getRepaymentTypeValue(data.repaymentTypes?.unitLinked),
        withProfits: getRepaymentTypeValue(data.repaymentTypes?.withProfit)
      },

      // Interest only data
      interestOnly: {
        maxLoan: getInterestOnlyMaxLoan(),
        ftb: mapFieldValue(data.interestOnlyAllowFTB, 'interestOnlyAllowFTB'),
        maxLoanFtb: data.interestOnlyMaxLoanFTB || '0',
        maxTtvFtb: data.interestOnlyMaxLVFTB || '0.00'
      },

      // Incentives data
      incentives: {
        valuation: mapFieldValue(data.valFeeTextStatus, 'ValFeeFreeStatus'),
        valuationFeeMax: formatCurrency(data.valFeeText),
        remortgageFeeVal: formatCurrency(data.valFeeTextReg),
        legalFee: getLegalFee(),
        legalFeeMaxRef: formatCurrency(data.legalFeeHandleReFund),
        remortgageFeeLegal: '', // Not available in mock
        cashback: getCashback(),
        cashbackAmount: formatCurrency(data.cashBackAmount),
        cashbackMax: formatCurrency(data.cashBackReq),
        ftbCashback: '', // Not available in mock
        remortgageCashback: '', // Not available in mock
        flexibleMortgage: mapFieldValue(data.flexibleMortgage, 'flexibleMortgage'),
        underpayments: mapFieldValue(data.underPayments, 'underPayments'),
        overpayments: getOverpayments(),
        offset: mapFieldValue(data.offset, 'offset'),
        currentAccount: mapFieldValue(data.currentAccountLender, 'currentAccountLender'),
        paymentHolidays: mapFieldValue(data.paymentHolidays, 'paymentHolidays'),
        borrowBack: mapFieldValue(data.borrowBack, 'borrowBack'),
        portable: mapFieldValue(data.portable, 'portable')
      },

      // Application data
      application: {
        purpose: getPurpose(),
        limitedCompany: mapFieldValue(data.forLtdCompany, 'forLtdCompany'),
        selfBuild: mapFieldValue(data.forSelfBuild, 'forSelfBuild'),
        selfEmployed: data.selfEmpMinYrsAcc > 0 ? 'Yes' : 'No',
        selfEmployedAccounts: data.selfEmpMinYrsAcc > 0 ? `${data.selfEmpMinYrsAcc} Years` : '',
        sharedOwnership: mapFieldValue(data.sharedOwnership, 'sharedOwnership'),
        newBuild: mapFieldValue(data.newBuild, 'newBuild'),
        capitalRest: mapFieldValue(data.capitalResi, 'CapitalRest'),
        availableDirect: data.availableByDirect ? 'Yes' : 'No',
        newBuy: data.h2NewBuy ? 'Yes' : 'No',
        htbEquityLoan: mapFieldValue(data.h2EquityLoan, 'h2EquityLoan'),
        mortgageGuarantee: mapFieldValue(data.h2BntGuarantee, 'h2BntGuarantee')
      },

      // Features data
      features: {
        greenMortgage: mapFieldValue(data.greenMortgage, 'greenMortgage'),
        familyAssistedMortgage: mapFieldValue(data.familyAssistanTarget, 'familyAssistanTarget'),
        rioMortgage: mapFieldValue(data.rightTarget, 'rightTarget'),
        firstHomesMortgage: mapFieldValue(data.firstBuyerTarget, 'firstBuyerTarget'),
        rateReducer: data.rateReducer ? 'Yes' : 'No'
      },

      // Additional data from mock
      btlData: productWrapper?.product?.btlData || null,
      fees: productWrapper?.product?.fees || []
    };
  }, [productWrapper]);
};




===================================


// components/ui/DataRow.jsx
import React from 'react';

export const DataRow = ({ label, value }) => (
  <div className="flex justify-content-between mb-1">
    <span>{label}</span>
    <span>{value || ''}</span>
  </div>
);

// components/ui/SectionHeader.jsx
import React from 'react';

export const SectionHeader = ({ title }) => (
  <h4 className="text-lg font-semibold mb-3">{title}</h4>
);

// components/ui/Table.jsx
import React from 'react';

export const Table = ({ children }) => (
  <table className="w-full mb-4">
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead>
    <tr>
      {children}
    </tr>
  </thead>
);

export const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

export const TableHeaderCell = ({ children }) => (
  <th className="text-left p-2 border-bottom-1 surface-border">
    {children}    
  </th>
);

export const TableCell = ({ children, isLast = false }) => (
  <td className={`p-2 ${!isLast ? 'border-bottom-1 surface-border' : ''}`}>
    {children || ''}
  </td>
);


==============================



// components/product-details/RatesSection.jsx
import React from 'react';
import { SectionHeader, DataRow } from '../ui/DataRow';

const RatesSection = ({ rates }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Rates:" />
      
      {/* Individual Rates */}
      {rates.list.length > 0 ? (
        rates.list.map((rate, index) => (
          <div key={index} className="flex justify-content-between mb-1">
            <span>{index + 1} - {rate.displayText}</span>
          </div>
        ))
      ) : (
        <div className="mb-1">
          <span>No rates available</span>
        </div>
      )}
      
      <DataRow label="Stepped" value={rates.stepped} />
      
      {/* Reverting Rate */}
      <div className="mt-4">
        <SectionHeader title="Reverting Rate" />
        <div>{rates.baseRate} {rates.baseRateType}</div>
      </div>
    </div>
  );
};

export default RatesSection;


===========================


// components/product-details/DescriptionsSection.jsx
import React from 'react';
import { SectionHeader } from '../ui/DataRow';

const DescriptionsSection = ({ descriptions }) => {
  return (
    <>
      <div className="mb-4">
        <SectionHeader title="Variable rate description" />
        <div>{descriptions.variable}</div>
      </div>

      <div className="mb-4">
        <SectionHeader title="Basic rate description" />
        <div>{descriptions.basic}</div>
      </div>
    </>
  );
};

export default DescriptionsSection;

===================


  // components/product-details/PurposeTable.jsx
import React from 'react';
import { Table, TableHeader, TableBody, TableHeaderCell, TableCell } from '../ui/DataRow';

const PurposeTable = ({ purpose }) => {
  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Purpose</TableHeaderCell>
        <TableHeaderCell>Purchase</TableHeaderCell>
        <TableHeaderCell>Remortgage</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <tr>
          <TableCell>LTV</TableCell>
          <TableCell>{purpose.ltvPur}</TableCell>
          <TableCell>{purpose.ltvRmg}</TableCell>
        </tr>
        <tr>
          <TableCell>FTB LTV</TableCell>
          <TableCell>{purpose.ltvMaxFtb}</TableCell>
          <TableCell></TableCell>
        </tr>
        <tr>
          <TableCell>Min Loan</TableCell>
          <TableCell>{purpose.loanMinPur}</TableCell>
          <TableCell>{purpose.loanMinRmg}</TableCell>
        </tr>
        <tr>
          <TableCell>Max Loan</TableCell>
          <TableCell>{purpose.loanMaxPur}</TableCell>
          <TableCell>{purpose.loanMaxRmg}</TableCell>
        </tr>
        <tr>
          <TableCell isLast>FTB Max Loan</TableCell>
          <TableCell isLast>{purpose.loanMaxFtb}</TableCell>
          <TableCell isLast></TableCell>
        </tr>
      </TableBody>
    </Table>
  );
};

export default PurposeTable;


=================


  // components/product-details/AllSections.jsx

import React from 'react';
import { SectionHeader, DataRow } from '../ui/DataRow';

// Repayment Types Section
export const RepaymentTypesSection = ({ repayment }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Repayment Types" />
      <DataRow label="Capital Repayment" value={repayment.capitalRepayment} />
      <DataRow label="Pure Interest Only" value={repayment.pureInterestOnly} />
      <DataRow label="Interest Only with RV" value={repayment.interestOnlyRV} />
      <DataRow label="Part and Part" value={repayment.partAndPart} />
      <DataRow label="Endowment" value={repayment.endowment} />
      <DataRow label="ISA" value={repayment.isa} />
      <DataRow label="PEP" value={repayment.pep} />
      <DataRow label="Pension" value={repayment.pension} />
      <DataRow label="Unit Linked" value={repayment.unitLinked} />
      <DataRow label="With Profits" value={repayment.withProfits} />
    </div>
  );
};

// Interest Only Section
export const InterestOnlySection = ({ interestOnly }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Interest Only" />
      <DataRow label="Max Loan" value={interestOnly.maxLoan} />
      <DataRow label="FTB" value={interestOnly.ftb} />
      <DataRow label="Max Loan - FTB" value={interestOnly.maxLoanFtb} />
      <DataRow label="Max TTV - FTB" value={interestOnly.maxTtvFtb} />
    </div>
  );
};

// Incentives Section
export const IncentivesSection = ({ incentives }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Incentives:" />
      <DataRow label="Valuation" value={incentives.valuation} />
      <DataRow label="Valuation fee max up to" value={incentives.valuationFeeMax} />
      <DataRow label="Remortgage fee val" value={incentives.remortgageFeeVal} />
      <DataRow label="Legal fee" value={incentives.legalFee} />
      <DataRow label="Legal Fee max ref" value={incentives.legalFeeMaxRef} />
      <DataRow label="Remortgage fee legal" value={incentives.remortgageFeeLegal} />
      <DataRow label="Cashback" value={incentives.cashback} />
      <DataRow label="Cashback amount" value={incentives.cashbackAmount} />
      <DataRow label="Cashback max" value={incentives.cashbackMax} />
      <DataRow label="FTB Cashback" value={incentives.ftbCashback} />
      <DataRow label="Remortgage Cashback" value={incentives.remortgageCashback} />
      <DataRow label="Flexible mortgages" value={incentives.flexibleMortgage} />
      <DataRow label="Underpayments" value={incentives.underpayments} />
      <DataRow label="Overpayments" value={incentives.overpayments} />
      <DataRow label="Offset" value={incentives.offset} />
      <DataRow label="Current account" value={incentives.currentAccount} />
      <DataRow label="Payment holidays" value={incentives.paymentHolidays} />
      <DataRow label="Borrow back" value={incentives.borrowBack} />
      <DataRow label="Portable" value={incentives.portable} />
    </div>
  );
};

// Application Section
export const ApplicationSection = ({ application }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Application:" />
      <DataRow label="Purpose" value={application.purpose} />
      <DataRow label="Limited Company" value={application.limitedCompany} />
      <DataRow label="Self build" value={application.selfBuild} />
      <DataRow label="Self employed" value={application.selfEmployed} />
      <DataRow label="Self employed accounts" value={application.selfEmployedAccounts} />
      <DataRow label="Shared Ownership" value={application.sharedOwnership} />
      <DataRow label="New build" value={application.newBuild} />
      <DataRow label="Capital rest" value={application.capitalRest} />
      <DataRow label="Available direct" value={application.availableDirect} />
      <DataRow label="New Buy" value={application.newBuy} />
      <DataRow label="HTB equity loan" value={application.htbEquityLoan} />
      <DataRow label="Mortgage guarantee" value={application.mortgageGuarantee} />
    </div>
  );
};

// Features Section
export const FeaturesSection = ({ features }) => {
  return (
    <div className="mb-4">
      <SectionHeader title="Features:" />
      <div className="mb-1">
        <span>Green mortgage</span>
        <span className="ml-2">{features.greenMortgage}</span>
      </div>
      <div className="mb-1">
        <span>Family assisted mortgage</span>
        <span className="ml-2">{features.familyAssistedMortgage}</span>
      </div>
      <div className="mb-1">
        <span>RIO mortgage</span>
        <span className="ml-2">{features.rioMortgage}</span>
      </div>
      <div className="mb-1">
        <span>First homes mortgage</span>
        <span className="ml-2">{features.firstHomesMortgage}</span>
      </div>
      <div className="mb-1">
        <span>Rate Reducer</span>
        <span className="ml-2">{features.rateReducer}</span>
      </div>
    </div>
  );
};

===================

  // components/ProductDetailsTab.jsx
import React from 'react';
import { useProductData } from '../hooks/useProductData';
import RatesSection from './product-details/RatesSection';
import DescriptionsSection from './product-details/DescriptionsSection';
import PurposeTable from './product-details/PurposeTable';
import {
  RepaymentTypesSection,
  InterestOnlySection,
  IncentivesSection,
  ApplicationSection,
  FeaturesSection
} from './product-details/AllSections';

const ProductDetailsTab = ({ productData }) => {
  const data = useProductData(productData);

  if (!data) {
    return (
      <div className="product-details-tab p-4">
        <div className="text-center text-gray-500">
          No product data available
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-tab p-4">
      {/* Product Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">{data.productInfo.name}</h2>
        <p className="text-gray-600">Range: {data.productInfo.rangeName}</p>
      </div>

      <div className="grid">
        {/* Left Panel */}
        <div className="col-6">
          <RatesSection rates={data.rates} />
          <DescriptionsSection descriptions={data.descriptions} />
          <PurposeTable purpose={data.purpose} />
          <RepaymentTypesSection repayment={data.repayment} />
          <InterestOnlySection interestOnly={data.interestOnly} />
        </div>

        {/* Right Panel */}
        <div className="col-6">
          <IncentivesSection incentives={data.incentives} />
          <ApplicationSection application={data.application} />
          <FeaturesSection features={data.features} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;


=======


  
