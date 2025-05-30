# Product Data Solution - File Structure

## File 1: `utils/dataMappingUtils.ts`

```typescript
// Enhanced dataMappingUtils.ts with additional mapping functions

export const mapFieldValue = (value: any, fieldType: string): string => {
  // Your existing implementation
  // ... existing mapping logic
  return value;
};

export const getInterestOnlyAllowFTB = (value: string): string => {
  const valueMap: Record<string, string> = {
    '0': 'No',
    '1': 'Yes',
    '2': 'Use Range data'
  };
  return valueMap[value] || value;
};

export const formatWithPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '';
  return `${value}%`;
};

export const formatYesNo = (value: boolean): string => {
  return value ? 'Yes' : 'No';
};

export const formatYearsText = (value: number | null, label: string = 'Years'): string => {
  if (!value || value <= 0) return '';
  return `${value} ${label}`;
};

export const getRangeOrValue = (atProductLevel: boolean, value?: string): string => {
  return atProductLevel ? (value || '') : "Range Level Data";
};
```

---

## File 2: `utils/productTransforms.ts`

```typescript
import { 
  mapFieldValue, 
  getInterestOnlyAllowFTB, 
  formatWithPercentage,
  formatYesNo,
  formatYearsText,
  getRangeOrValue
} from './dataMappingUtils';

// Type definitions
interface ProductRate {
  rateType: string;
  payRate: number;
  rateDuration: string;
  collarRate: number;
}

interface Advance {
  advance: number;
  ltvPur: number;
  ltvRmg: number;
}

interface RepaymentTypes {
  atProductLevel: boolean;
  capitalAndInterest?: string;
  interestOnly?: string;
  partEndowment?: string;
  endowment?: string;
  isa?: string;
  pep?: string;
  pension?: string;
  unitLinked?: string;
  withProfit?: string;
}

// Transform rates section
export const transformRates = (ratesData: {
  productRates: ProductRate[];
  advances: Advance[];
  steppedRate: string | null;
  baseRate: number;
  baseRateType: string;
}) => {
  const filteredRates = ratesData.productRates?.filter(rate => rate !== null) || [];

  return {
    productRates: filteredRates.map(rate => ({
      ...rate,
      displayText: `${rate.payRate}% ${mapFieldValue(rate.rateType, 'rateType')} for ${rate.rateDuration}`
    })),
    stepped: mapFieldValue(ratesData.steppedRate, 'steppedRate'),
    baseRate: formatWithPercentage(ratesData.baseRate),
    baseRateType: mapFieldValue(ratesData.baseRateType, 'baseRateType')
  };
};

// Transform descriptions section
export const transformDescriptions = (descriptionsData: {
  variableRateDescr: string | null;
  baseRateDescr: string | null;
}) => {
  return {
    variable: descriptionsData.variableRateDescr,
    basic: descriptionsData.baseRateDescr,
  };
};

// Transform purpose section
export const transformPurpose = (purposeData: {
  advances: Advance[];
  ltvMaxFtb: number;
  loanMinPur: number;
  loanMinRmg: number;
  loanMaxPur: number;
  loanMaxRmg: number;
  loanMaxFtb: number;
}) => {
  const filteredAdvances = purposeData.advances?.filter(advance => advance !== null) || [];
  const firstAdvance = filteredAdvances[0] || {} as Advance;

  return {
    ltvPur: firstAdvance.ltvPur,
    ltvRmg: firstAdvance.ltvRmg,
    ltvMaxFtb: purposeData.ltvMaxFtb,
    loanMinPur: purposeData.loanMinPur,
    loanMinRmg: purposeData.loanMinRmg,
    loanMaxPur: purposeData.loanMaxPur,
    loanMaxRmg: purposeData.loanMaxRmg,
    loanMaxFtb: purposeData.loanMaxFtb
  };
};

// Transform repayment section
export const transformRepayment = (repaymentData: {
  repaymentTypes: RepaymentTypes;
}) => {
  const { repaymentTypes } = repaymentData;
  const { atProductLevel } = repaymentTypes;
  
  return {
    atProductLevel,
    capitalRepayment: getRangeOrValue(atProductLevel, repaymentTypes.capitalAndInterest),
    pureInterestOnly: getRangeOrValue(atProductLevel, repaymentTypes.interestOnly),
    interestOnly: getRangeOrValue(atProductLevel, repaymentTypes.interestOnly),
    partAndPart: getRangeOrValue(atProductLevel, repaymentTypes.partEndowment),
    endowment: getRangeOrValue(atProductLevel, repaymentTypes.endowment),
    isa: getRangeOrValue(atProductLevel, repaymentTypes.isa),
    pep: getRangeOrValue(atProductLevel, repaymentTypes.pep),
    pension: getRangeOrValue(atProductLevel, repaymentTypes.pension),
    unitLinked: getRangeOrValue(atProductLevel, repaymentTypes.unitLinked),
    withProfits: getRangeOrValue(atProductLevel, repaymentTypes.withProfit)
  };
};

// Transform interest only section
export const transformInterestOnly = (interestData: {
  interestOnlyMaxLoan: number;
  interestOnlyAllowFTB: string;
  interestOnlyMaxLoanFTB: string;
  interestOnlyMaxLtvFTB: string;
}) => {
  return {
    maxLoan: interestData.interestOnlyMaxLoan,
    interestOnlyAllowFTB: getInterestOnlyAllowFTB(interestData.interestOnlyAllowFTB),
    maxLoanFtb: interestData.interestOnlyMaxLoanFTB,
    maxLtvFtb: interestData.interestOnlyMaxLtvFTB
  };
};

// Transform incentives section
export const transformIncentives = (incentivesData: {
  valFeeFreePStatus: string | null;
  valFeeMax: number | null;
  valFeeFreeMag: string | null;
  legalFee: string | null;
  legalFeeMaxRefund: number;
  legalFeeFreeRmg: string | null;
  cashbackAvailable: string | null;
  cashbackAmount: string | null;
  cashbackMax: number | null;
  cashbackFtbOnly: string;
  cashbackRmg: string | null;
  flexibleMortgage: string;
}) => {
  return {
    valuation: mapFieldValue(incentivesData.valFeeFreePStatus, 'valFeeFreePStatus'),
    valuationFeeMax: incentivesData.valFeeMax,
    valFeeFreeMag: incentivesData.valFeeFreeMag,
    legalFee: mapFieldValue(incentivesData.legalFee, 'legalFee'),
    legalFeeMaxRefund: incentivesData.legalFeeMaxRefund,
    remortgageFeeLegal: mapFieldValue(incentivesData.legalFeeFreeRmg, 'legalFeeFreeRmg'),
    cashback: mapFieldValue(incentivesData.cashbackAvailable, 'cashbackAvailable'),
    cashbackAmount: incentivesData.cashbackAmount,
    cashbackMax: incentivesData.cashbackMax,
    ftbCashback: mapFieldValue(incentivesData.cashbackFtbOnly, 'cashbackFtbOnly'),
    remortgageCashback: incentivesData.cashbackRmg,
    flexibleMortgage: mapFieldValue(incentivesData.flexibleMortgage, 'flexibleMortgage')
  };
};

// Transform application section
export const transformApplication = (applicationData: {
  forLtdCompany: string;
  forSelfBuild: string;
  selfEmpMinYrsAcc: number | null;
  sharedOwnership: string;
  newBuild: string;
  capitalRest: string;
  availableDirect: boolean;
  h2bNewBuy: boolean;
  h2bEquityLoan: string;
  h2bMtgGuarantee: string;
}) => {
  return {
    purpose: '', // not available
    limitedCompany: mapFieldValue(applicationData.forLtdCompany, 'forLtdCompany'),
    selfBuild: mapFieldValue(applicationData.forSelfBuild, 'forSelfBuild'),
    selfEmployed: '', // not available
    selfEmployedAccounts: formatYearsText(applicationData.selfEmpMinYrsAcc),
    sharedOwnership: mapFieldValue(applicationData.sharedOwnership, 'sharedOwnership'),
    newBuild: mapFieldValue(applicationData.newBuild, 'newBuild'),
    capitalRest: mapFieldValue(applicationData.capitalRest, 'capitalRest'),
    availableDirect: formatYesNo(applicationData.availableDirect),
    newBuy: formatYesNo(applicationData.h2bNewBuy),
    h2bEquityLoan: mapFieldValue(applicationData.h2bEquityLoan, 'h2bEquityLoan'),
    mortgageGuarantee: mapFieldValue(applicationData.h2bMtgGuarantee, 'h2bMtgGuarantee')
  };
};

// Transform features section
export const transformFeatures = (featuresData: {
  greenMortgage: string | null;
  familyAssistedMortgage: string | null;
  rioMortgage: string | null;
  firstHomesMortgage: string | null;
  rateReducer: boolean;
}) => {
  return {
    greenMortgage: mapFieldValue(featuresData.greenMortgage, 'greenMortgage'),
    familyAssistedMortgage: mapFieldValue(featuresData.familyAssistedMortgage, 'familyAssistedMortgage'),
    rioMortgage: mapFieldValue(featuresData.rioMortgage, 'rioMortgage'),
    firstHomesMortgage: mapFieldValue(featuresData.firstHomesMortgage, 'firstHomesMortgage'),
    rateReducer: formatYesNo(featuresData.rateReducer)
  };
};
```

---

## File 3: `hooks/useProductData.ts`

```typescript
import { useMemo } from 'react';
import { ProductDetails } from '../../types/product';
import {
  transformRates,
  transformDescriptions,
  transformPurpose,
  transformRepayment,
  transformInterestOnly,
  transformIncentives,
  transformApplication,
  transformFeatures
} from '../utils/productTransforms';

// Main hook with reduced complexity and clean separation
export const useProductData = (data: ProductDetails) => {
  return useMemo(() => {
    if (!data) {
      return null;
    }

    // Destructure the main data object into logical sections
    const {
      // Rates related
      productRates,
      advances,
      steppedRate,
      baseRate,
      baseRateType,
      
      // Descriptions
      variableRateDescr,
      baseRateDescr,
      
      // Purpose/LTV related
      ltvMaxFtb,
      loanMinPur,
      loanMinRmg,
      loanMaxPur,
      loanMaxRmg,
      loanMaxFtb,
      
      // Repayment
      repaymentTypes,
      
      // Interest only
      interestOnlyMaxLoan,
      interestOnlyAllowFTB,
      interestOnlyMaxLoanFTB,
      interestOnlyMaxLtvFTB,
      
      // Incentives
      valFeeFreePStatus,
      valFeeMax,
      valFeeFreeMag,
      legalFee,
      legalFeeMaxRefund,
      legalFeeFreeRmg,
      cashbackAvailable,
      cashbackAmount,
      cashbackMax,
      cashbackFtbOnly,
      cashbackRmg,
      flexibleMortgage,
      
      // Application
      forLtdCompany,
      forSelfBuild,
      selfEmpMinYrsAcc,
      sharedOwnership,
      newBuild,
      capitalRest,
      availableDirect,
      h2bNewBuy,
      h2bEquityLoan,
      h2bMtgGuarantee,
      
      // Features
      greenMortgage,
      familyAssistedMortgage,
      rioMortgage,
      firstHomesMortgage,
      rateReducer
    } = data;

    return {
      rates: transformRates({
        productRates,
        advances,
        steppedRate,
        baseRate,
        baseRateType
      }),
      
      descriptions: transformDescriptions({
        variableRateDescr,
        baseRateDescr
      }),
      
      purpose: transformPurpose({
        advances,
        ltvMaxFtb,
        loanMinPur,
        loanMinRmg,
        loanMaxPur,
        loanMaxRmg,
        loanMaxFtb
      }),
      
      repayment: transformRepayment({
        repaymentTypes
      }),
      
      interestOnly: transformInterestOnly({
        interestOnlyMaxLoan,
        interestOnlyAllowFTB,
        interestOnlyMaxLoanFTB,
        interestOnlyMaxLtvFTB
      }),
      
      incentives: transformIncentives({
        valFeeFreePStatus,
        valFeeMax,
        valFeeFreeMag,
        legalFee,
        legalFeeMaxRefund,
        legalFeeFreeRmg,
        cashbackAvailable,
        cashbackAmount,
        cashbackMax,
        cashbackFtbOnly,
        cashbackRmg,
        flexibleMortgage
      }),
      
      application: transformApplication({
        forLtdCompany,
        forSelfBuild,
        selfEmpMinYrsAcc,
        sharedOwnership,
        newBuild,
        capitalRest,
        availableDirect,
        h2bNewBuy,
        h2bEquityLoan,
        h2bMtgGuarantee
      }),
      
      features: transformFeatures({
        greenMortgage,
        familyAssistedMortgage,
        rioMortgage,
        firstHomesMortgage,
        rateReducer
      })
    };
  }, [data]);
};
```

---

## File 4: `utils/__tests__/productTransforms.test.ts` (Optional but recommended)

```typescript
import {
  transformRates,
  transformDescriptions,
  transformApplication,
  transformFeatures
} from '../productTransforms';

describe('Product Transforms', () => {
  describe('transformRates', () => {
    it('should transform rates data correctly', () => {
      const mockData = {
        productRates: [{ rateType: 'Variable', payRate: 2.5, rateDuration: '2 years', collarRate: 1.5 }],
        advances: [{ advance: 1000, ltvPur: 85, ltvRmg: 75 }],
        steppedRate: 'Yes',
        baseRate: 2.0,
        baseRateType: 'Standard'
      };

      const result = transformRates(mockData);
      
      expect(result.baseRate).toBe('2%');
      expect(result.productRates).toHaveLength(1);
      expect(result.productRates[0].displayText).toContain('2.5%');
    });
  });

  describe('transformApplication', () => {
    it('should format boolean values correctly', () => {
      const mockData = {
        forLtdCompany: 'Yes',
        forSelfBuild: 'No',
        selfEmpMinYrsAcc: 3,
        sharedOwnership: 'Available',
        newBuild: 'Yes',
        capitalRest: 'Available',
        availableDirect: true,
        h2bNewBuy: false,
        h2bEquityLoan: 'Available',
        h2bMtgGuarantee: 'Available'
      };

      const result = transformApplication(mockData);
      
      expect(result.availableDirect).toBe('Yes');
      expect(result.newBuy).toBe('No');
      expect(result.selfEmployedAccounts).toBe('3 Years');
    });
  });
});
```

---

## Benefits of This Structure:

1. **Separation of Concerns**: Each file has a clear responsibility
2. **Reusability**: Transform functions can be used elsewhere
3. **Testability**: Easy to unit test individual functions
4. **Maintainability**: Changes are isolated to specific files
5. **Type Safety**: Full TypeScript support throughout
6. **Reduced Complexity**: Main hook has cognitive complexity < 5
7. **Clean Imports**: Clear dependency structure

## Usage in Components:

```typescript
// In your React component
import { useProductData } from '../hooks/useProductData';

const ProductDetailsComponent = ({ productDetails }) => {
  const transformedData = useProductData(productDetails);
  
  if (!transformedData) return null;
  
  return (
    <div>
      <RatesSection data={transformedData.rates} />
      <ApplicationSection data={transformedData.application} />
      {/* etc. */}
    </div>
  );
};
```
