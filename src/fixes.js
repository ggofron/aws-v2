import { useMemo } from 'react';
import { mapFieldValue } from '../utils/dataMappingUtils';
import { ProductDetails } from '../../types/product';

// Helper function for interest calculation
const getInterestOnlyAllowFTB = (value: string) => {
  const valueMap: Record<string, string> = {
    '0': 'No',
    '1': 'Yes',
    '2': 'Use Range data'
  };
  return valueMap[value] || value;
};

// Build rates section
const buildRatesData = (data: ProductDetails) => {
  const productRates = data.productRates?.filter(rate => rate !== null) || [];
  const advances = data.advances?.filter(advance => advance !== null) || [];
  const firstAdvance = advances[0] || {};

  return {
    productRates: productRates.map(rate => ({
      ...rate,
      displayText: `${rate.payRate}% ${mapFieldValue(rate.rateType, 'rateType')} for ${rate.rateDuration}`
    })),
    stepped: mapFieldValue(data.steppedRate, 'steppedRate'),
    baseRate: data.baseRate === null && data.baseRate === undefined ? '' : `${data.baseRate}%`,
    baseRateType: mapFieldValue(data.baseRateType, 'baseRateType')
  };
};

// Build descriptions section
const buildDescriptionsData = (data: ProductDetails) => {
  return {
    variable: data.variableRateDescr,
    basic: data.baseRateDescr,
  };
};

// Build purpose section
const buildPurposeData = (data: ProductDetails) => {
  return {
    ltvPur: firstAdvance.ltvPur,
    ltvRmg: firstAdvance.ltvRmg,
    ltvMaxFtb: data.ltvMaxFtb,
    loanMinPur: data.loanMinPur,
    loanMinRmg: data.loanMinRmg,
    loanMaxPur: data.loanMaxPur,
    loanMaxRmg: data.loanMaxRmg,
    loanMaxFtb: data.loanMaxFtb
  };
};

// Build repayment section
const buildRepaymentData = (data: ProductDetails) => {
  return {
    atProductLevel: data.repaymentTypes.atProductLevel,
    capitalRepayment: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.capitalAndInterest : "Range Level Data",
    pureInterestOnly: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.interestOnly : "Range Level Data",
    interestOnly: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.interestOnly : "Range Level Data",
    partAndPart: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.partEndowment : "Range Level Data",
    endowment: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.endowment : "Range Level Data",
    isa: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.isa : "Range Level Data",
    pep: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.pep : "Range Level Data",
    pension: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.pension : "Range Level Data",
    unitLinked: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.unitLinked : "Range Level Data",
    withProfits: data.repaymentTypes.atProductLevel ? data.repaymentTypes?.withProfit : "Range Level Data"
  };
};

// Build interest only section
const buildInterestOnlyData = (data: ProductDetails) => {
  return {
    maxLoan: data.interestOnlyMaxLoan,
    interestOnlyAllowFTB: getInterestOnlyAllowFTB(data.interestOnlyAllowFTB),
    maxLoanFtb: data.interestOnlyMaxLoanFTB,
    maxLtvFtb: data.interestOnlyMaxLtvFTB
  };
};

// Build incentives section
const buildIncentivesData = (data: ProductDetails) => {
  return {
    valuation: mapFieldValue(data.valFeeFreePStatus, 'valFeeFreePStatus'),
    valuationFeeMax: data.valFeeMax,
    valFeeFreeMag: data.valFeeFreeMag,
    legalFee: mapFieldValue(data.legalFee, 'legalFee'),
    legalFeeMaxRefund: data.legalFeeMaxRefund,
    remortgageFeeLegal: mapFieldValue(data.legalFeeFreeRmg, 'legalFeeFreeRmg'),
    cashback: mapFieldValue(data.cashbackAvailable, 'cashbackAvailable'),
    cashbackAmount: data.cashbackAmount,
    cashbackMax: data.cashbackMax,
    ftbCashback: mapFieldValue(data.cashbackFtbOnly, 'cashbackFtbOnly'),
    remortgageCashback: data.cashbackRmg,
    flexibleMortgage: mapFieldValue(data.flexibleMortgage, 'flexibleMortgage')
  };
};

// Build application section
const buildApplicationData = (data: ProductDetails) => {
  return {
    purpose: '', // not available
    limitedCompany: mapFieldValue(data.forLtdCompany, 'forLtdCompany'),
    selfBuild: mapFieldValue(data.forSelfBuild, 'forSelfBuild'),
    selfEmployed: '', // not available
    selfEmployedAccounts: data.selfEmpMinYrsAcc === null && data.selfEmpMinYrsAcc > 0 ? `${data.selfEmpMinYrsAcc} Years` : '',
    sharedOwnership: mapFieldValue(data.sharedOwnership, 'sharedOwnership'),
    newBuild: mapFieldValue(data.newBuild, 'newBuild'),
    capitalRest: mapFieldValue(data.capitalRest, 'capitalRest'),
    availableDirect: data.availableDirect ? 'Yes' : 'No',
    newBuy: data.h2bNewBuy ? 'Yes' : 'No',
    h2bEquityLoan: mapFieldValue(data.h2bEquityLoan, 'h2bEquityLoan'),
    mortgageGuarantee: mapFieldValue(data.h2bMtgGuarantee, 'h2bMtgGuarantee')
  };
};

// Build features section
const buildFeaturesData = (data: ProductDetails) => {
  return {
    greenMortgage: mapFieldValue(data.greenMortgage, 'greenMortgage'),
    familyAssistedMortgage: mapFieldValue(data.familyAssistedMortgage, 'familyAssistedMortgage'),
    rioMortgage: mapFieldValue(data.rioMortgage, 'rioMortgage'),
    firstHomesMortgage: mapFieldValue(data.firstHomesMortgage, 'firstHomesMortgage'),
    rateReducer: data.rateReducer ? 'Yes' : 'No'
  };
};

// Main hook with reduced complexity
export const useProductData = (data: ProductDetails) => {
  return useMemo(() => {
    if (!data) {
      return null;
    }

    return {
      rates: buildRatesData(data),
      descriptions: buildDescriptionsData(data),
      purpose: buildPurposeData(data),
      repayment: buildRepaymentData(data),
      interestOnly: buildInterestOnlyData(data),
      incentives: buildIncentivesData(data),
      application: buildApplicationData(data),
      features: buildFeaturesData(data)
    };
  }, [data]);
};
