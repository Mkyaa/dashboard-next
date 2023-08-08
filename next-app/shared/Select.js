"use client"
import React from 'react'

const Select = ({ options, onChange, value, className }) => {    
    return (
        <select
            onChange={onChange}
            value={value}
            className={className}
        >
            {options.map((option, index) => (
                <option value={option.value} key={index}>{option.label}</option>
            ))}
        </select>
    )
}

export default Select