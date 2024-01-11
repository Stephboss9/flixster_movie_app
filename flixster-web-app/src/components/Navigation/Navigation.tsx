import {
  NavHeader,
  Title,
  NavWrapper,
  NavLinks,
  Link,
  SearchButton,
  SearchBox,
  SearchInput,
  TextInput,
  MainSearchIcon,
  SubSearchIcon,
} from './NavStyle'


function Navigation() {
  return (<>
  <NavWrapper>
    <NavHeader>
      <Title>Flixster</Title>
      <NavLinks>
        <Link>Home</Link>
        <Link>Popular</Link>
        <Link>Top Rated</Link>
        <Link>Trending</Link>
        <Link>Upcoming</Link>
      </NavLinks>
      <SearchBox>
        <SearchButton>
        <MainSearchIcon/>
        </SearchButton>
      </SearchBox>
    </NavHeader>
  </NavWrapper>
  </>)
}


export default Navigation;