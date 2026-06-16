export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const getTeamColor = (teamName) => {
  const colors = {
    'MI': '#004BA0',
    'CSK': '#FFEB3B',
    'RCB': '#EC1C24',
    'KKR': '#3D1F70',
    'DC': '#003D71',
    'PBKS': '#EE3124',
    'RR': '#E94D60',
    'GT': '#094C9D',
    'LSG': '#004B87',
    'SRH': '#FB771A',
  };
  
  const key = Object.keys(colors).find(k => teamName?.includes(k));
  return colors[key] || '#1E40AF';
};

export const getPlayerRole = (role) => {
  const roles = {
    'batsman': 'Batsman',
    'bowler': 'Bowler',
    'all-rounder': 'All-rounder',
    'wicket-keeper': 'Wicket Keeper',
  };
  return roles[role] || role;
};

export const generateGradient = (color1, color2) => {
  return `linear-gradient(135deg, ${color1}, ${color2})`;
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const sanitizeInput = (input) => {
  return input?.toString().trim().slice(0, 255) || '';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// =========================
// REMOVE UNDEFINED VALUES
// =========================
export const removeUndefinedValues = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj
      .map(item => removeUndefinedValues(item))
      .filter(item => item !== undefined);
  }
  
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = removeUndefinedValues(value);
      return acc;
    }, {});
};

// =========================
// SAFE IMAGE SOURCE
// =========================
export const getSafeImageSrc = (src) => {
  return src && src.trim() !== '' ? src : null;
};
