import merge from 'lodash.merge'
import baseTheme from '@mdx-deck/themes/base'

// TODO: update basetheme merge with official

export default (legacyTheme = {}) => {
  const {
    components,
    colors = {},
    font,
    monospace,
    // UI
    Provider,
    Presenter,
    googleFont,
    // styles
    css,
    heading,
    ...styles
  } = merge({}, baseTheme, legacyTheme)

  const theme = merge(
    {},
    {
      googleFont,
      colors: {
        ...colors,
        primary: colors.link,
        muted: colors.codeBackground,
      },
      fonts: {
        body: font,
        heading: font,
        monospace,
      },
      text: {
        heading,
      },
      styles: merge(
        {
          root: css,
          h1: {
            variant: 'text.heading',
          },
          h2: {
            variant: 'text.heading',
          },
          h3: {
            variant: 'text.heading',
          },
          h4: {
            variant: 'text.heading',
          },
          h5: {
            variant: 'text.heading',
          },
          h6: {
            variant: 'text.heading',
          },
          code: {
            fontFamily: 'monospace',
            color: 'code',
            bg: 'codeBackground',
          },
          pre: {
            fontFamily: 'monospace',
            color: 'code',
            bg: 'codeBackground',
          },
        },
        styles
      ),
    }
  )

  return {
    components,
    theme,
  }
}
