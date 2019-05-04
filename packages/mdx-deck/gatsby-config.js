const src = process.env.__SRC__
const dirname = process.env.__DIRNAME__

const path = require('path')
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

const relative = path.relative(dirname, src) || '.'
const filepath = path.join(dirname, src)
console.log({ src, dirname })
console.log('relative', relative)

module.exports = {
  __experimentalThemes: [
    {
      resolve: '@mdx-deck/gatsby-theme',
      options: {
        path: relative,
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
        path: filepath,
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
