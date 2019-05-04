import React from 'react'
import { Helmet } from 'react-helmet'

// get head for all slides
export const CombineHeads = ({ slides = [] }) => {
  console.log('CombineHeads', slides)
  return false
}

export const Head = props => {
  // fix for MDX elements
  const children = React.Children.toArray(props.children).map((child, i) => {
    const { originalType, mdxType, ...rest } = child.props
    return React.createElement(originalType, {
      ...rest,
      key: i,
    })
  })
  return <Helmet>{children}</Helmet>
}

export default Head
