const src = process.env.__SRC__
const dirname = process.env.__DIRNAME__
const chalk = require('chalk')

module.exports = {
  plugins: [
    {
      resolve: '@mdx-deck/gatsby-theme',
      options: {
        contentPath: src,
      },
    },
    /*
      { resolve: 'gatsby-source-filesystem',
        options: { path: src } },
    */
  ],
}
