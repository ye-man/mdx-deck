#!/usr/bin/env node
const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const execa = require('execa')
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
    },
  }
)

const [cmd, file] = cli.input
const filename = file || cmd

if (!filename) cli.showHelp(0)

process.env.__DIRNAME__ = process.cwd()
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

const run = (...args) =>
  execa('gatsby', args.filter(Boolean), {
    cwd: __dirname,
    stdio: 'inherit',
  })

switch (cmd) {
  case 'build':
    run('build')
    break
  case 'eject':
    const eject = require('./eject')
    eject().then(() => {
      console.log('TODO eject')
    })
    break
  case 'dev':
  default:
    run(
      'develop',
      '--host',
      opts.host,
      '--port',
      opts.port,
      opts.open && '--open'
    )
    break
}

/*
switch (cmd) {
  case 'build':
    log('building')
    const build = require('./lib/build')
    build(opts)
      .then(res => {
        log('done')
        process.exit(0)
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
  case 'dev':
  default:
    log('starting dev server')
    dev = require('./lib/dev')
    dev(opts)
      .then(server => {
        const { address, port } = server.address()
        const url = `http://localhost:${port}`
        if (opts.open) open(url)
        log('listening on', chalk.green(url))
      })
      .catch(err => {
        log.error(err)
        process.exit(1)
      })
    break
}
*/
