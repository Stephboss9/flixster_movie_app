import "./Navigation.css";
import {
  NavWrapper,
  Title,
  FlixsterLogo,
  NavHead
} from './NavStyle';


function Navigation() {
  return (<>
    <NavWrapper>
      <NavHead>
        <Title />
        <FlixsterLogo />
      </NavHead>
    </NavWrapper>
  </>)
}


export default Navigation;