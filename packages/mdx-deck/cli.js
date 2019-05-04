#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const execa = require('execa')
const chalk = require('chalk')
const pkg = require('./package.json')

const config = require('pkg-conf').sync('mdx-deck')

const log = (...args) => {
  console.log(chalk.green('[mdx-deck]'), ...args)
}
log.error = (...args) => {
  console.log(chalk.red('[err]'), ...args)
}

const cli = meow(
  `
  ${chalk.gray('Usage')}

    $ ${chalk.green('mdx-deck deck.mdx')}

    $ ${chalk.green('mdx-deck build deck.mdx')}

  ${chalk.gray('Options')}

      -h --host     Dev server host
      -p --port     Dev server port
      --no-open     Prevent from opening in default browser
      -d --out-dir  Output directory for exporting

`,
  {
    description: chalk.green('[mdx-deck] ') + chalk.gray(pkg.description),
    flags: {
      port: {
        type: 'string',
        alias: 'p',
      },
      host: {
        type: 'string',
        alias: 'h',
      },
      open: {
        type: 'boolean',
        alias: 'o',
        default: true,
      },
      outDir: {
        type: 'string',
        alias: 'd',
      },
      basepath: {
        type: 'string',
      },
    },
  }
)

const [cmd, file] = cli.input
const filename = file || cmd

if (!filename) cli.showHelp(0)

const dirname = path.dirname(filename)
const userdir = process.cwd()

process.env.__DIRNAME__ = userdir
process.env.__SRC__ = path.resolve(filename)

const opts = Object.assign(
  {
    host: 'localhost',
    port: 8080,
  },
  config,
  cli.flags
)

if (opts.outDir) {
  console.log(
    chalk.red('[mdx-deck] the --out-dir flag has been deprecated'),
    chalk.gray('Decks are now built to the `public/` directory')
  )
}

const run = args =>
  execa('gatsby', args.filter(Boolean), {
    cwd: __dirname,
    stdio: 'inherit',
  })

switch (cmd) {
  case 'build':
    log('building')
    const build = run([
      'build',
      opts.basepath && '--prefix-paths',
      opts.basepath,
    ])
    break
  case 'eject':
    require('./lib/eject')(opts)
    break
  case 'dev':
  default:
    log('starting dev server')
    const dev = run([
      'develop',
      '--host',
      opts.host,
      '--port',
      opts.port,
      opts.open && '--open',
    ])
    break
}
