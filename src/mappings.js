const TEXT_MAPPINGS: Record<string, Record<string, string>> = {
  // From C# CapitalRest case
  capitalRest: { A: 'Annual', D: 'Daily', Q: 'Quarterly', M: 'Monthly' },
  
  // From C# BaseRateType case  
  baseRateType: { B: 'B', V: 'V', L: 'L' },
  
  // From C# ValFreeStatus case
  valFreeStatus: { F: 'Free', R: 'Refunded' },
  
  // From C# LegalFee case
  legalFee: { F: 'Free', R: 'Refunded' },
  
  // From C# Offset case
  offset: { Y: 'Y', N: 'N', M: 'M' },
  
  // From C# CurrAccntLender case
  currAccntLender: { Y: 'Y', N: 'N', M: 'M' },
  
  // From C# EmplStatus case
  emplStatus: { P: 'Employed', S: 'Self Employed' },
  
  // From C# IllustrationType case
  illustrationType: { E: 'E', K: 'K', P: 'P' },
  
  // From C# BorrowerType case
  borrowerType: { F: 'First Time Buyer', S: 'Second Time Buyer', E: 'Existing Customer' }
};

const YES_NO_FIELDS: string[] = [
  'flexibleMortgage', 'underPayments', 'paymentHolidays', 'borrowBack', 'portable',
  'forBTL', 'forLTB', 'forResidential', 'forLtdCompany', 'forSelfBuild',
  'rightToBuy', 'sharedOwnership', 'newBuild', 'selfDeclared',
  'legalFeeFreeRng', 'cashBackAvailable', 'unempRedundant',
  'availableByDirect', 'directOnly', 'interestOnlyAllowFTB',
  'h2BmtGuarantee', 'h2EquityLoan', 'addressAboveMaxLTV', 'feesInterestCalcRepaymentBasis'
];

const YES_NO_MAPPING: Record<string, string> = { Y: 'Yes', N: 'No' };

export const mapFieldValue = (value: unknown, fieldName = ''): string => {
  if (value == null) return '';
  
  const stringValue = String(value);
  
  if (TEXT_MAPPINGS[fieldName]?.[stringValue]) {
    return TEXT_MAPPINGS[fieldName][stringValue];
  }
  
  if (YES_NO_FIELDS.includes(fieldName)) {
    return YES_NO_MAPPING[stringValue] || stringValue;
  }
  
  return stringValue;
};
