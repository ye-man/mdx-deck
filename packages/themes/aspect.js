import merge from 'lodash.merge'

export default theme => {
  // todo: remove responsive styles from built-in themes

  return merge(theme, {
    aspectRatio: 16 / 9,
    styles: {
      root: {
        fontSize: '1em',
      },
    },
  })
}
