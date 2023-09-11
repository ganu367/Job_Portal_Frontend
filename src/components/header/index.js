import React from 'react';
import { Container, ButtonGroup, Button, Icon, Dropdown, DropdownContainer, ColorOption, Option, OptionText, Title } from './styles/header';

function Header({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Header.ButtonGroup = function HeaderButtonGroup({children, ...restProps}) {
    return (
        <ButtonGroup {...restProps}>
            {children}
        </ButtonGroup>
    );
}

Header.Button = function HeaderButton({children, ...restProps}) {
    return (
        <Button {...restProps}>
            {children}
        </Button>
    );
}

Header.Icon = function HeaderIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Header.Dropdown = function HeaderDropdown({children, ...restProps}) {
    return (
        <Dropdown {...restProps}>
            <DropdownContainer {...restProps}>
                {children}
            </DropdownContainer>
        </Dropdown>
    );
}

Header.ColorOption = function HeaderColorOption({children, ...restProps}) {
    return (
        <ColorOption {...restProps}>
            {children}
        </ColorOption>
    );
}

Header.Option = function HeaderOption({children, ...restProps}) {
    return (
        <Option {...restProps}>
            {children}
        </Option>
    );
}

Header.OptionText = function HeaderOptionText({children, ...restProps}) {
    return (
        <OptionText {...restProps}>
            {children}
        </OptionText>
    );
}

Header.Title = function HeaderTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

export default Header;