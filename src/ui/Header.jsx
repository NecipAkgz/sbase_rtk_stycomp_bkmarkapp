import { styled } from 'styled-components'

const StyledHader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solic var(--color-gray-100);
`

function Header() {
  return <StyledHader>Header</StyledHader>
}
export default Header
