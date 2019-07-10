/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'

export const Horizontal = ({ children }) => {
  const kids = React.Children.toArray(children)

  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}>
      {kids.map(child => (
        <div
          key={child.key}
          sx={{
            width: 100 / kids.length + '%',
          }}>
          {child}
        </div>
      ))}
    </div>
  )
}

export default Horizontal
