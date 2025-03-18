export default {
  '*.{ts,tsx}': _filenames => ['npm run format:fix', 'npm run validate'],
};
