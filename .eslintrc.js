module.exports = {
  extends: ['react-app'],
  plugins: ['@emotion', 'react-hooks'],
  rules: {
    'no-console': ['error', {allow: ['info', 'warn', 'error']}],
    'no-debugger': 'error',
    'linebreak-style': 'off',
    '@emotion/pkg-renaming': 'error',
    "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn'
  },
};
