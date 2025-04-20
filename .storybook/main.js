module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};