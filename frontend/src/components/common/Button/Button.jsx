


import "./Button.css";

function Button({

    children,
    leftIcon,
    rightIcon,

    onClick,

    type = "button",

    variant = "primary",

    size = "md",

    disabled = false,

    className = "",

    fullWidth = false,

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`btn btn-${variant} btn-${size} ${fullWidth ? "btn-full" : ""} ${className}`}

        >
        {leftIcon &&
            <span>
                {leftIcon}
            </span>
        }
        {children}
        {rightIcon &&
            <span>
                {rightIcon}
            </span>
        }


        </button>

    );

}

export default Button;



