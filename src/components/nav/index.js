import React from 'react';
import { Container, Close, Line, Header, Title, Logo, Button, Icon, SubContainer, LinkContainer, Link, LinkText, Dropdown, DropdownItem } from './styles/nav';
import { FaTimes } from "react-icons/fa";

function Nav({children, ...restProps}) {
    return(
        <Container {...restProps}>
            <SubContainer>
                {children}
            </SubContainer>
        </Container>
    );
}

Nav.Close = function NavClose({children, ...restProps}) {
    return (
        <Close {...restProps}>
            <FaTimes />
        </Close>
    );
}

Nav.Line = function NavLine({children, ...restProps}) {
    return (
        <Line {...restProps}>
            {children}
        </Line>
    );
}

Nav.Header = function NavHeader({children, ...restProps}) {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    );
}

Nav.Title = function NavTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

Nav.Logo = function NavLogo({children, ...restProps}) {
    return (
        <Logo {...restProps}>
            {children}
        </Logo>
    );
}

Nav.Button = function NavButton({children, ...restProps}) {
    return (
        <Button {...restProps}>
            {children}
        </Button>
    );
}

Nav.Icon = function NavIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Nav.LinkContainer = function NavLinkContainer({children, ...restProps}) {
    return (
        <LinkContainer {...restProps}>
            {children}
        </LinkContainer>
    );
}

Nav.Link = function NavLink({children, ...restProps}) {
    return (
        <Link {...restProps}>
            {children}
        </Link>
    );
}

Nav.LinkText = function NavLinkText({children, ...restProps}) {
    return (
        <LinkText {...restProps}>
            {children}
        </LinkText>
    );
}

Nav.Dropdown = function NavDropdown({children, ...restProps}) {
    return (
        <Dropdown {...restProps}>
            {children}
        </Dropdown>
    );
}

Nav.DropdownItem = function NavDropdownItem({children, ...restProps}) {
    return (
        <DropdownItem {...restProps}>
            {children}
        </DropdownItem>
    );
}

export default Nav;