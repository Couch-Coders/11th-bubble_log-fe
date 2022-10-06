import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
  width: 420px;
  background-color: gray;
  background-position: center center;
}
`

export default GlobalStyle
