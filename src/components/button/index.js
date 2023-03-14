import React from 'react'
import style from './button.module.css'

function Button({ title, btn, color, onClick,disabled ,type}) {
    return (
        <div>
            <button disabled={disabled} type={type} className={`${style[btn]} ${style[color]}`} onClick={onClick}>{title}</button>
        </div>
    )
}

export default Button