import React from 'react';
import { Container, Column, Row, SpecialRow, Header, Data, JobStatusBox, AppStatusBox, Box } from './styles/table';

function Table({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Table.Column = function TableColumn({children, ...restProps}) {
    return (
        <Column {...restProps}>
            {children}
        </Column>
    );
}

Table.Row = function TableRow({children, ...restProps}) {
    return (
        <Row {...restProps}>
            {children}
        </Row>
    );
}

Table.SpecialRow = function TableSpecialRow({children, ...restProps}) {
    return (
        <SpecialRow {...restProps}>
            {children}
        </SpecialRow>
    );
}

Table.Header = function TableHeader({children, ...restProps}) {
    return (
        <Header {...restProps}>
            {children}
        </Header>
    );
}

Table.Data = function TableData({children, ...restProps}) {
    return (
        <Data {...restProps}>
            {children}
        </Data>
    );
}

Table.JobStatusBox = function TableJobStatusBox({children, ...restProps}) {
    return (
        <JobStatusBox {...restProps}>
            {children}
        </JobStatusBox>
    );
}

Table.AppStatusBox = function TableAppStatusBox({children, ...restProps}) {
    return (
        <AppStatusBox {...restProps}>
            {children}
        </AppStatusBox>
    );
}

Table.Box = function TableBox({children, ...restProps}) {
    return (
        <Box {...restProps}>
            {children}
        </Box>
    );
}

export default Table;