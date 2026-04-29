const categoryRules = [
  { keywords: ['swiggy', 'zomato', 'restaurant', 'cafe', 'food'], category: 'Food' },
  { keywords: ['uber', 'ola', 'metro', 'fuel', 'travel'], category: 'Travel' },
  { keywords: ['bill', 'electricity', 'water', 'broadband', 'rent'], category: 'Bills' },
  { keywords: ['amazon', 'flipkart', 'myntra', 'shopping', 'store'], category: 'Shopping' },
  { keywords: ['salary', 'payroll', 'bonus'], category: 'Salary' },
  { keywords: ['sip', 'mutual fund', 'stock', 'investment'], category: 'Investment' },
  { keywords: ['doctor', 'pharmacy', 'hospital'], category: 'Health' },
  { keywords: ['movie', 'netflix', 'spotify', 'game'], category: 'Entertainment' },
];

const categorizeTransaction = (description = '', fallbackCategory = 'Other') => {
  const normalizedDescription = description.toLowerCase();

  const matchedRule = categoryRules.find((rule) =>
    rule.keywords.some((keyword) => normalizedDescription.includes(keyword))
  );

  return matchedRule?.category || fallbackCategory || 'Other';
};

export default categorizeTransaction;
