module.exports = {
  stories: ['../src/**/__stories__/*.stories.mdx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.module.rules.push({
      resolve: { fullySpecified: false },
    });

    return config;
  },
};
