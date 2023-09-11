import React from 'react';
import { Container, Check } from './styles/checkbox';

function Checkbox({children, checked, ...restProps}) {
    return(
        <Container {...restProps}>
            <Check checked={checked} />
        </Container>
    );
}

export default Checkbox;