/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'

export const Split = ({ children }) => {
  const [a, ...rest] = React.Children.toArray(children)

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}>
      <div
        sx={{
          width: '50%',
        }}>
        {a}
      </div>
      <div
        sx={{
          width: '50%',
        }}>
        {rest}
      </div>
    </div>
  )
}

export default Split
