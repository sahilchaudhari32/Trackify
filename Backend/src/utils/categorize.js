/**
 * Auto-categorize transaction based on description
 * @param {string} description 
 * @returns {string} category
 */
const categorizeTransaction = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes('swiggy') || desc.includes('zomato')) {
    return 'Food';
  }
  
  if (desc.includes('uber') || desc.includes('ola')) {
    return 'Travel';
  }

  if (desc.includes('electricity') || desc.includes('water') || desc.includes('gas') || desc.includes('bill')) {
    return 'Bills';
  }

  if (desc.includes('amazon') || desc.includes('flipkart') || desc.includes('myntra')) {
    return 'Shopping';
  }

  if (desc.includes('salary') || desc.includes('bonus') || desc.includes('dividend')) {
    return 'Salary';
  }

  if (desc.includes('stock') || desc.includes('mutual fund') || desc.includes('crypto')) {
    return 'Investment';
  }

  return 'Other';
};

export default categorizeTransaction;
