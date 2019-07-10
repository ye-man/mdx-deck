const green = '#42ff71'

export default {
  googleFont: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono',
  fonts: {
    body: '"IBM Plex Mono", monospace',
    monospace: '"IBM Plex Mono", monospace',
  },
  colors: {
    text: green,
    background: '#000',
    primary: green,
  },
  styles: {
    Slide: {
      display: 'block',
      padding: '2em',
      textAlign: 'left',
      fontSize: ['1.5em', '3em'],
      // minWidth: '80vw',
      // minHeight: '60vh',
    },
    pre: {
      color: 'background',
      bg: 'primary',
    },
    code: {
      color: 'background',
      bg: 'primary',
    },
  },
}
