export const formatValidations = (errors) => {
  if (!errors) return 'Validation failed';
  const issuesArray = errors.issues || errors.issue;
  if (Array.isArray(issuesArray)) {
    return issuesArray.map(i => i.message || 'Invalid value').join(', ');
  }

  try {
    return typeof errors === 'string' ? errors : JSON.stringify(errors);
  } catch{
    return 'Validation failed';
  }
};