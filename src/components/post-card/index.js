import React from 'react';
import { Container, Window, Line, ButtonGroup, Post, Row, Column, Group, Title, Subtitle, SmallText, Text, Label, BigLabel, Dash, Status, SpecialRow } from './styles/post-card';

function PostCard({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

PostCard.Line = function PostCardLine({children, ...restProps}) {
    return (
        <Line {...restProps}>
            {children}
        </Line>
    );
}

PostCard.ButtonGroup = function PostCardButtonGroup({children, ...restProps}) {
    return (
        <ButtonGroup {...restProps}>
            {children}
        </ButtonGroup>
    );
}

PostCard.Window = function PostCardWindow({children, refPointer, ...restProps}) {
    return (
        <Window ref={refPointer} {...restProps}>
            {children}
        </Window>
    );
}

PostCard.Post = function PostCardPost({children, ...restProps}) {
    return (
        <Post {...restProps}>
            {children}
        </Post>
    );
}

PostCard.Row = function PostCardRow({children, ...restProps}) {
    return (
        <Row {...restProps}>
            {children}
        </Row>
    );
}

PostCard.Column = function PostCardColumn({children, ...restProps}) {
    return (
        <Column {...restProps}>
            {children}
        </Column>
    );
}

PostCard.Group = function PostCardGroup({children, ...restProps}) {
    return (
        <Group {...restProps}>
            {children}
        </Group>
    );
}

PostCard.Title = function PostCardTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

PostCard.Subtitle = function PostCardSubtitle({children, ...restProps}) {
    return (
        <Subtitle {...restProps}>
            {children}
        </Subtitle>
    );
}

PostCard.Text = function PostCardText({children, ...restProps}) {
    return (
        <Text {...restProps}>
            {children}
        </Text>
    );
}

PostCard.SmallText = function PostCardSmallText({children, ...restProps}) {
    return (
        <SmallText {...restProps}>
            {children}
        </SmallText>
    );
}

PostCard.Label = function PostCardLabel({children, ...restProps}) {
    return (
        <Label {...restProps}>
            {children}
        </Label>
    );
}

PostCard.BigLabel = function PostCardBigLabel({children, ...restProps}) {
    return (
        <BigLabel {...restProps}>
            {children}
        </BigLabel>
    );
}

PostCard.Dash = function PostCardDash({children, ...restProps}) {
    return (
        <Dash {...restProps}>
            {children}
        </Dash>
    );
}

PostCard.Status = function PostCardStatus({children, ...restProps}) {
    return (
        <Status {...restProps}>
            {children}
        </Status>
    );
}

PostCard.SpecialRow = function PostCardSpecialRow({children, ...restProps}) {
    return (
        <SpecialRow {...restProps}>
            {children}
        </SpecialRow>
    );
}

export default PostCard;