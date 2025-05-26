import React from 'react';

// Data mapping utility based on your C# configuration
const mapFieldValue = (value, fieldName) => {
  // Return empty string for null/undefined values
  if (value === null || value === undefined) return '';
  
  // Text mappings from your C# file
  const textMappings = {
    'CapitalRest': { 'A': 'Annual', 'D': 'Daily', 'Q': 'Quarterly', 'M': 'Monthly' },
    'ValFeeFreeStatus': { 'F': 'Free', 'R': 'Refunded' },
    'LegalFee': { 'F': 'Free', 'R': 'Refunded' },
    'BorrowerType': { 'F': 'First Time Buyer', 'S': 'Second Time Buyer', 'E': 'Existing Customer' },
    'BaseRateType': { 'B': 'Base Rate', 'V': 'Variable', 'L': 'Libor' },
    'EmplStatus': { 'P': 'Employed', 'S': 'Self Employed' },
    'RateType': { 'T': 'Tracker', 'D': 'Discount', 'F': 'Fixed', 'V': 'Variable' }
  };

  // Yes/No mappings
  const yesNoFields = [
    'ValFeeFreeing', 'LegalFreeFreeWRG', 'CashbackAvailable', 'CashbackEwOnly', 'FlexibleMortgage',
    'Underpayments', 'PaymentHolidays', 'BorrowBack', 'Portable', 'ForBTL', 'ForLTB', 'ForPlatCompany',
    'SelfDeclared', 'KFIPPermitted', 'AddictBorrow', 'AddictSecBorrow', 'AddictInsecBorrow',
    'UnsecCashReserve', 'AddFeesAboveMaxLTV', 'CreditCards', 'FeesInterestCalcOnRepayBasis',
    'LegalFeeFreeRmg', 'CashbackOnDlv', 'ForResidential', 'ForLtdCompany', 'ForSelfBuild',
    'RightToBuy', 'SharedOwnership', 'NewBuild', 'AllowNegatedBTL'
  ];

  const yesNoMapping = { 'Y': 'Yes', 'N': 'No' };
  const yesNoReferMapping = { 'Y': 'Yes', 'N': 'No', 'R': 'Refer' };
  const yesNoMaybeMapping = { 'Y': 'Yes', 'N': 'No', 'M': 'Maybe' };
  const yesNoReferOtherMapping = { 'Y': 'Yes', 'N': 'No', 'R': 'Refer', 'O': 'Other' };

  // Apply specific text mapping first
  if (textMappings[fieldName] && textMappings[fieldName][value]) {
    return textMappings[fieldName][value];
  }

  // Apply Y/N mappings based on field type
  if (yesNoFields.includes(fieldName) && yesNoMapping[value]) {
    return yesNoMapping[value];
  }

  // Special cases for specific fields
  if (['Overpayments', 'Offset', 'CurrAccWithLender'].includes(fieldName)) {
    if (yesNoMaybeMapping[value]) return yesNoMaybeMapping[value];
  }

  if (['ForSelfBuild', 'RightToBuy', 'SharedOwnership', 'NewBuild', 'H2BEquGuarantee', 'H2BEquityLoan', 'GreenMortgage', 'FamilyAssistMortgage', 'H1OMortgage', 'FirstHomeBuyerScot'].includes(fieldName)) {
    if (yesNoReferOtherMapping[value]) return yesNoReferOtherMapping[value];
  }

  // Handle "Set at Range Level"
  if (value === "Set at Range Level" || value === "Set at range level") {
    return "Set at Range Level";
  }

  // Return original value or empty string
  return value?.toString() || '';
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '';
  if (value === 0) return '£0';
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercentage = (value) => {
  if (value === null || value === undefined) return '';
  if (value === 0) return '0%';
  return `${value}%`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB');
};

const ProductDetailsTab = ({ productData }) => {
  if (!productData?.SummaryData) return <div>No product data available</div>;

  const data = productData.SummaryData;
  const rates = data.ProductRates?.filter(rate => rate) || [];
  const advances = data.Advances?.filter(advance => advance) || [];

  const LeftProductPanel = () => (
    <div className="col-6">
      {/* Rates Section */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-3">Rates:</h4>
        {rates.length > 0 ? rates.map((rate, index) => (
          <div key={index} className="flex justify-content-between mb-1">
            <span>
              {index + 1} - {rate.PayRate}% {mapFieldValue(rate.RateType, 'RateType')} until {rate.RateDuration || 'Term'}
            </span>
          </div>
        )) : (
          <div className="mb-1">
            <span>No rates available</span>
          </div>
        )}
        <div className="flex justify-content-between mb-1">
          <span>Stepped</span>
          <span>{data.SteppedRate || 'No'}</span>
        </div>
      </div>

      {/* Reverting Rate */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Reverting Rate</h4>
        <div>
          {data.BaseRate !== null && data.BaseRate !== undefined ? `${data.BaseRate}%` : ''} {mapFieldValue(data.BaseRateType, 'BaseRateType')}
        </div>
      </div>

      {/* Variable Rate Description */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Variable rate description</h4>
        <div>{data.VariableRateDescription || ''}</div>
      </div>

      {/* Basic Rate Description */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Basic rate description</h4>
        <div>{data.BasicRateDescription || ''}</div>
      </div>

      {/* Purpose Table */}
      <div className="mb-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 border-bottom-1 surface-border">Purpose</th>
              <th className="text-left p-2 border-bottom-1 surface-border">Purchase</th>
              <th className="text-left p-2 border-bottom-1 surface-border">Remortgage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-bottom-1 surface-border">LTV</td>
              <td className="p-2 border-bottom-1 surface-border">{formatPercentage(advances[0]?.LtvPur)}</td>
              <td className="p-2 border-bottom-1 surface-border">{formatPercentage(advances[0]?.LtvRmg)}</td>
            </tr>
            <tr>
              <td className="p-2 border-bottom-1 surface-border">FTB LTV</td>
              <td className="p-2 border-bottom-1 surface-border">{formatPercentage(data.LtvMaxFtb)}</td>
              <td className="p-2 border-bottom-1 surface-border"></td>
            </tr>
            <tr>
              <td className="p-2 border-bottom-1 surface-border">Min Loan</td>
              <td className="p-2 border-bottom-1 surface-border">{formatCurrency(data.LoanMinPur)}</td>
              <td className="p-2 border-bottom-1 surface-border">{formatCurrency(data.LoanMinRmg)}</td>
            </tr>
            <tr>
              <td className="p-2 border-bottom-1 surface-border">Max Loan</td>
              <td className="p-2 border-bottom-1 surface-border">{formatCurrency(data.LoanMaxPur)}</td>
              <td className="p-2 border-bottom-1 surface-border">{formatCurrency(data.LoanMaxRmg)}</td>
            </tr>
            <tr>
              <td className="p-2">FTB Max Loan</td>
              <td className="p-2">{formatCurrency(data.LoanMaxFtb)}</td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Repayment Types */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Repayment Types</h4>
        <div className="flex justify-content-between mb-1">
          <span>Capital Repayment</span>
          <span>{data.RepaymentTypes?.CapitalAndInterest || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Pure Interest Only</span>
          <span>{data.RepaymentTypes?.InterestOnly || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Interest Only with RV</span>
          <span>{data.RepaymentTypes?.InterestOnlyRV || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Part and Part</span>
          <span>{data.RepaymentTypes?.PartEndowment || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Endowment</span>
          <span>{data.RepaymentTypes?.Endowment || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>ISA</span>
          <span>{data.RepaymentTypes?.ISA || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>PEP</span>
          <span>{data.RepaymentTypes?.PEP || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Pension</span>
          <span>{data.RepaymentTypes?.Pension || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Unit Linked</span>
          <span>{data.RepaymentTypes?.UnitLinked || 'Set at Range Level'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>With Profits</span>
          <span>{data.RepaymentTypes?.WithProfit || 'Set at Range Level'}</span>
        </div>
      </div>

      {/* Interest Only */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Interest Only</h4>
        <div className="flex justify-content-between mb-1">
          <span>Max Loan</span>
          <span>{data.InterestOnlyMinLoan !== null && data.InterestOnlyMinLoan !== undefined && data.InterestOnlyMinLoan > 0 ? 'Allow' : mapFieldValue(data.InterestOnlyAllowRIT, 'InterestOnlyAllowRIT')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>FTB</span>
          <span>{mapFieldValue(data.InterestOnlyAllowFTB)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Max Loan - FTB</span>
          <span>{data.InterestOnlyMaxLoanFTB || '0'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Max TTV - FTB</span>
          <span>{data.InterestOnlyMaxLTVFTB || '0.00'}</span>
        </div>
      </div>
    </div>
  );

  const RightProductPanel = () => (
    <div className="col-6">
      {/* Incentives */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-3">Incentives:</h4>
        <div className="flex justify-content-between mb-1">
          <span>Valuation</span>
          <span>{mapFieldValue(data.ValFeeFreeStatus, 'ValFeeFreeStatus')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Valuation fee max up to</span>
          <span>{formatCurrency(data.ValuationFeeMaxUpTo)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Remortgage fee val</span>
          <span>{formatCurrency(data.RemortgageFeeVal)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Legal fee</span>
          <span>{mapFieldValue(data.LegalFeeFreeRmg, 'LegalFeeFreeRmg') === 'Yes' ? 'Free' : mapFieldValue(data.LegalFee, 'LegalFee')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Legal Fee max ref</span>
          <span>{formatCurrency(data.LegalFeeMaxRefund)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Remortgage fee legal</span>
          <span>{formatCurrency(data.RemortgageFeeLegal)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Cashback</span>
          <span>{mapFieldValue(data.CashbackOnDlv) || mapFieldValue(data.CashbackAvailable)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Cashback amount</span>
          <span>{formatCurrency(data.CashbackAmount)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Cashback max</span>
          <span>{formatCurrency(data.CashbackRmg) || formatCurrency(data.CashbackMax)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>FTB Cashback</span>
          <span>{formatCurrency(data.FTBCashback)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Remortgage Cashback</span>
          <span>{formatCurrency(data.RemortgageCashback)}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Flexible mortgages</span>
          <span>{mapFieldValue(data.FlexibleMortgage, 'FlexibleMortgage')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Underpayments</span>
          <span>{mapFieldValue(data.Underpayments, 'Underpayments')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Overpayments</span>
          <span>{data.Overpayments && data.Overpayments !== 'N' && data.Overpayments !== 'Y' ? `${data.Overpayments}%` : mapFieldValue(data.Overpayments, 'Overpayments')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Offset</span>
          <span>{mapFieldValue(data.Offset, 'Offset')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Current account</span>
          <span>{mapFieldValue(data.CurrAccWithLender, 'CurrAccWithLender')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Payment holidays</span>
          <span>{mapFieldValue(data.PaymentHolidays, 'PaymentHolidays')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Borrow back</span>
          <span>{mapFieldValue(data.BorrowBack, 'BorrowBack')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Portable</span>
          <span>{mapFieldValue(data.Portable, 'Portable')}</span>
        </div>
      </div>

      {/* Application */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Application:</h4>
        <div className="flex justify-content-between mb-1">
          <span>Purpose</span>
          <span>{data.ForResidential === 'Y' ? 'Residential' : data.ForBTL === 'Y' ? 'BTL' : 'Residential'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Limited Company</span>
          <span>{mapFieldValue(data.ForLtdCompany, 'ForLtdCompany')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Self build</span>
          <span>{mapFieldValue(data.ForSelfBuild, 'ForSelfBuild')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Self employed</span>
          <span>{data.SelfEmpInYrsAcc > 0 ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Self employed accounts</span>
          <span>{data.SelfEmpInYrsAcc > 0 ? `${data.SelfEmpInYrsAcc} Years` : ''}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Shared Ownership</span>
          <span>{mapFieldValue(data.SharedOwnership, 'SharedOwnership')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>New build</span>
          <span>{mapFieldValue(data.NewBuild, 'NewBuild')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Capital rest</span>
          <span>{mapFieldValue(data.CapitalRest, 'CapitalRest')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Available direct</span>
          <span>{data.AvailableDirect ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>New Buy</span>
          <span>{data.H2BNewBuy ? 'Yes' : 'No'}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>HTB equity loan</span>
          <span>{mapFieldValue(data.H2BEquityLoan, 'H2BEquityLoan')}</span>
        </div>
        <div className="flex justify-content-between mb-1">
          <span>Mortgage guarantee</span>
          <span>{mapFieldValue(data.H2BMtgGuarantee, 'H2BEquGuarantee')}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Features:</h4>
        <div className="mb-1">
          <span>Green mortgage</span>
          <span className="ml-2">{mapFieldValue(data.GreenMortgage, 'GreenMortgage')}</span>
        </div>
        <div className="mb-1">
          <span>Family assisted mortgage</span>
          <span className="ml-2">{mapFieldValue(data.FamilyAssistMortgage, 'FamilyAssistMortgage')}</span>
        </div>
        <div className="mb-1">
          <span>RIO mortgage</span>
          <span className="ml-2">{mapFieldValue(data.H1OMortgage, 'H1OMortgage')}</span>
        </div>
        <div className="mb-1">
          <span>First homes mortgage</span>
          <span className="ml-2">{mapFieldValue(data.FirstHomeBuyerScot, 'FirstHomeBuyerScot')}</span>
        </div>
        <div className="mb-1">
          <span>Rate Reducer</span>
          <span className="ml-2">{data.RateReducer ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="product-details-tab p-4">
      <div className="grid">
        <LeftProductPanel />
        <RightProductPanel />
      </div>
    </div>
  );
};

export default ProductDetailsTab;
