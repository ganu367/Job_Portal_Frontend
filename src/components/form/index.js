import React from 'react';
import { Container, Title, Line, Error, Alert, Base, Label, Input, InputColumn, Search, Dropdown, DropdownContainer, Option, Submit, Text, Icon, InputContainer, SearchContainer, Link, Toggle, ToggleGroup, ImagePreview, ImageRemoveIcon, InputRow, Tooltip, TooltipText } from './styles/form';
import { AiFillDelete, AiOutlineQuestionCircle } from "react-icons/ai";

function Form({children, ...restProps}) {
    return(
        <Container {...restProps}>
            {children}
        </Container>
    );
}

Form.Title = function FormTitle({children, ...restProps}) {
    return (
        <Title {...restProps}>
            {children}
        </Title>
    );
}

Form.Line = function FormLine({children, ...restProps}) {
    return (
        <Line {...restProps}>
            {children}
        </Line>
    );
}

Form.Error = function FormError({children, ...restProps}) {
    return (
        <Error {...restProps}>
            {children}
        </Error>
    );
}

Form.Alert = function FormAlert({children, ...restProps}) {
    return (
        <Alert {...restProps}>
            {children}
        </Alert>
    );
}

Form.Base = function FormBase({children, ...restProps}) {
    return (
        <Base {...restProps}>
            {children}
        </Base>
    );
}

Form.Label = function FormLabel({children, ...restProps}) {
    return (
        <Label {...restProps}>
            {children}
        </Label>
    );
}

Form.Input = function FormInput({children, ...restProps}) {
    return (
        <Input {...restProps}>
            {children}
        </Input>
    );
}

Form.InputColumn = function FormInputColumn({children, ...restProps}) {
    return (
        <InputColumn {...restProps}>
            {children}
        </InputColumn>
    );
}

// Form.Select = function FormSelect({children, ...restProps}) {
//     return (
//         <Select {...restProps}>
//             {children}
//         </Select>
//     );
// }

Form.Dropdown = function FormDropdown({children, ...restProps}) {
    return (
        <Dropdown {...restProps}>
            <DropdownContainer {...restProps}>
                {children}
            </DropdownContainer>
        </Dropdown>
    );
}

Form.Option = function FormOption({children, ...restProps}) {
    return (
        <Option {...restProps}>
            {children}
        </Option>
    );
}

Form.Search = function FormSearch({children, ...restProps}) {
    return (
        <Search {...restProps}>
            {children}
        </Search>
    );
}

Form.Submit = function FormSubmit({children, ...restProps}) {
    return (
        <Submit {...restProps}>
            {children}
        </Submit>
    );
}

Form.Text = function FormText({children, ...restProps}) {
    return (
        <Text {...restProps}>
            {children}
        </Text>
    );
}

Form.Icon = function FormIcon({children, ...restProps}) {
    return (
        <Icon {...restProps}>
            {children}
        </Icon>
    );
}

Form.InputContainer = function FormInputContainer({children, refPointer, ...restProps}) {
    return (
        <InputContainer {...restProps} ref={refPointer}>
            {children}
        </InputContainer>
    );
}

Form.SearchContainer = function FormSearchContainer({children, refPointer, ...restProps}) {
    return (
        <SearchContainer {...restProps} ref={refPointer}>
            {children}
        </SearchContainer>
    );
}

Form.Link = function FormLink({children, ...restProps}) {
    return (
        <Link {...restProps}>
            {children}
        </Link>
    );
}

Form.Toggle = function FormToggle({children, ...restProps}) {
    return (
        <Toggle {...restProps}>
            {children}
        </Toggle>
    );
}

Form.ToggleGroup = function FormToggleGroup({children, ...restProps}) {
    return (
        <ToggleGroup {...restProps}>
            {children}
        </ToggleGroup>
    );
}

Form.ImagePreview = function FormImagePreview({children, ...restProps}) {
    return (
        <ImagePreview {...restProps}>
            {children}
        </ImagePreview>
    );
}

Form.ImageRemoveIcon = function FormImageRemoveIcon({children, ...restProps}) {
    return (
        <ImageRemoveIcon {...restProps}>
            <AiFillDelete />
            {children}
        </ImageRemoveIcon>
    );
}
Form.InputRow = function FormInputRow({children, ...restProps}) {
    return (
        <InputRow {...restProps}>
            {children}
        </InputRow>
    );
}

Form.Tooltip = function FormTooltip({children, ...restProps}) {
    return (
        <Tooltip {...restProps}>
            <AiOutlineQuestionCircle />
            <TooltipText>{children}</TooltipText>
        </Tooltip>
    );
}

export default Form;