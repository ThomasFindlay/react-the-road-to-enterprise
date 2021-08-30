const { spawnSync, spawn } = require('child_process')
const path = require('path/posix')

const styles = {
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  error: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  note: { open: '\u001b[2;1m', close: '\u001b[0m' },
}

const color = (modifier, string) => {
  return styles[modifier].open + string + styles[modifier].close
}

const success = (txt) => console.log(color('success', txt))
const error = (txt) => console.error(color('error', txt))
const info = (txt) => console.log(color('info', txt))
const note = (txt) => console.log(color('note', txt))

const npxError = spawnSync('npx --version', { shell: true })
  .stderr.toString()
  .trim()

if (npxError) {
  error(
    '🚨  npx is not available on this device. Please install npm@5.2.0 or greater'
  )
  throw npxError
}

const init = () => {
  spawnSync(
    'npx "https://gist.github.com/ThomasFindlay/e7a6ee1570ec07e078acabfeaca2379b" -q',
    { stdio: 'inherit', shell: true }
  )
}

init()
