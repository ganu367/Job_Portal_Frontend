import React from 'react';
import { Search, Box, DropdownContainer, Option, Icon, SearchContainer } from './styles/dropdown';

function Dropdown({children, ...restProps}) {
    return(
        <Box {...restProps}>
            <DropdownContainer {...restProps}>
                {children}
            </DropdownContainer>
        </Box>
    );
}

Dropdown.Option = function DropdownOption({children, ...restProps}) {
    return (
        <Option {...restProps}>
            {children}
        </Option>
    );
}

Dropdown.Search = function DropdownSearch({children, ...restProps}) {
    return (
        <Search {...restProps}>
            {children}
        </Search>
    );
}

Dropdown.Icon = function DropdownIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Dropdown.SearchContainer = function DropdownSearchContainer({children, refPointer, ...restProps}) {
    return (
        <SearchContainer {...restProps} ref={refPointer}>
            {children}
        </SearchContainer>
    );
}

export default Dropdown;