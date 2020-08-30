import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import { IconBaseProps } from 'react-icons'

import { useField } from '@unform/core'
import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name) //eslint-disable-line

  const handleInputFocus = useCallback(() => {
    setFocused(true)
  }, [])
  const handleInputBlur = useCallback(() => {
    setFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete="none"
      />
    </Container>
  )
}

export default Input
