import React from 'react';
import { Container, Icon, ExternalLink } from './styles/button';

function Button({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Button.Icon = function ButtonIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Button.ExternalLink = function ButtonExternalLink({children, ...restProps}) {
    return (
        <ExternalLink {...restProps}>
            {children}
        </ExternalLink>
    );
}

export default Button;