import React, {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
    useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
//
import * as S from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon?: string;
}

interface InputValueRef {
    value: string;
}

interface InputRef {
    focus(): void;
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { name, icon, ...rest },
    ref
) => {

    const {
        registerField,
        defaultValue,
        fieldName,
        error,
        clearError,
    } = useField(name);
    const inputElRef = useRef<any>(null);
    const inputValueRef = useRef<InputValueRef>({ value: defaultValue });
    const [isFocused, setFocused] = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
        });
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElRef.current.focus();
        },
    }));

    const handleFocus = () => {
        clearError();
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    return (
        <S.Container isErrored={!!error}>
            <S.Icon
                name={icon}
                size={20}
                color={isFocused ? '#025aa2' : '#999'}
            />

            <S.TextInput
                ref={inputElRef}
                placeholderTextColor="#999"
                onFocus={handleFocus}
                onBlur={handleBlur}
                defaultValue={defaultValue}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </S.Container>
    );
};

export default forwardRef(Input);
