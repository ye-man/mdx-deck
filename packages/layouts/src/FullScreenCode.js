/** @jsx jsx */
import { jsx } from 'theme-ui'

export const FullScreenCode = props => (
  <div
    sx={{
      textAlign: 'left',
      pre: {
        // needed to override inline styles from prism
        margin: '0 !important',
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      },
    }}
  />
)

export default FullScreenCode
