import React from 'react'
import { Helmet } from 'react-helmet'

// get head for all slides
export const AllHeads = ({ slides = [] }) => {
  const heads = slides
    .reduce((acc, children) => [...acc, ...children], [])
    .filter(child => child.type === Head || child.props.mdxType === 'Head')
  return heads
}

export const Head = props => {
  // fix for MDX elements
  const children = React.Children.toArray(props.children).map((child, i) => {
    const { originalType, mdxType, ...rest } = child.props
    return React.createElement(originalType || child.type, {
      ...rest,
      key: i,
    })
  })
  return <Helmet>{children}</Helmet>
}

export default Head
