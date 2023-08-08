import React from 'react'

const Button = ({ text, onClick, className, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button