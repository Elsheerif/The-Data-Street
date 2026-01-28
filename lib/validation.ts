// Form validation utilities

export const validators = {
  email: (email: string): string | null => {
    if (!email) return 'Email is required';
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? null : 'Invalid email format';
  },

  phone: (phone: string): string | null => {
    if (!phone) return null; // Optional field
    const regex = /^[\d\s\-\+\(\)]{10,}$/;
    return regex.test(phone) ? null : 'Invalid phone format';
  },

  url: (url: string): string | null => {
    if (!url) return null; // Optional field
    try {
      new URL(url);
      return null;
    } catch {
      return 'Invalid URL';
    }
  },

  required: (value: any, fieldName: string): string | null => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  },

  minLength: (value: string, min: number, fieldName: string): string | null => {
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value: string, max: number, fieldName: string): string | null => {
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },
};

export interface ValidationErrors {
  [key: string]: string;
}

export const validateMemberForm = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name validation
  const nameError = validators.required(data.name, 'Name');
  if (nameError) errors.name = nameError;

  // Email validation
  const emailError = validators.email(data.email);
  if (emailError) errors.email = emailError;

  // Phone validation
  const phoneError = validators.phone(data.phone);
  if (phoneError) errors.phone = phoneError;

  // Role validation
  const roleError = validators.required(data.roleTitle, 'Role Title');
  if (roleError) errors.roleTitle = roleError;

  // Department validation
  const deptError = validators.required(data.department, 'Department');
  if (deptError) errors.department = deptError;

  // LinkedIn validation
  const linkedInError = validators.url(data.socialLinkedIn);
  if (linkedInError) errors.socialLinkedIn = linkedInError;

  // GitHub validation
  const gitHubError = validators.url(data.socialGitHub);
  if (gitHubError) errors.socialGitHub = gitHubError;

  return errors;
};

export const validateDepartmentForm = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  const nameError = validators.required(data.name, 'Department Name');
  if (nameError) errors.name = nameError;

  const descError = validators.required(data.description, 'Description');
  if (descError) errors.description = descError;

  return errors;
};
