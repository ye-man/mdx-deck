const src = process.env.__SRC__
const dirname = process.env.__DIRNAME__

const chalk = require('chalk')
const remarkPlugins = [require('remark-unwrap-images'), require('remark-emoji')]
const pkg = require('./package.json')

const deps =
  require('pkg-conf').sync('dependencies', {
    cwd: src,
  }) || {}

const isTheme = name => /^gatsby-theme-/.test(name)

const themes = Object.keys(deps).filter(isTheme)

if (themes.length) {
  console.log(chalk.green('[mdx-deck]', 'loading themes:'), themes.join(' '))
}

module.exports = {
  __experimentalThemes: [
    {
      resolve: '@mdx-deck/gatsby-theme',
      options: {
        path: src,
        name: '/',
      },
    },
    ...themes,
  ],
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: src,
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: [pkg.name],
      },
    },
  ],
}
