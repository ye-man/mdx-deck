/** @jsx jsx */
import { jsx } from 'theme-ui'

export const Invert = props => (
  <div
    sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'background',
      bg: 'text',
      '& a': {
        color: 'inherit',
      },
    }}
  />
)

export default Invert
