import React from 'react';
import { Container, Text, Icon, Overlay } from './styles/alert-modal';
import { FaTimes } from 'react-icons/fa';

function AlertModal({children, ...restProps}) {
    return(
        <Overlay>
            <Container {...restProps}>
                {children}
            </Container>
        </Overlay> 
    );
}

AlertModal.Text = function AlertModalText({children, ...restProps}) {
    return (
        <Text {...restProps}>
            {children}
        </Text>
    );
}

AlertModal.Icon = function AlertModalIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            <FaTimes />
        </Icon>
    );
}

export default AlertModal;