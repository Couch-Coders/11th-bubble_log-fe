import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

const globalStyle = css`
  ${reset}
`

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`

export default GlobalStyle
