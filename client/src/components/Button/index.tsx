import classNames from "classnames";

interface IProps {
    content: string,
    color?: string,
    border?: string,
    bacolor?: string,
    borderColor?: string,
    flag?: string
}

function Button({content, color, border, bacolor, borderColor, flag}: IProps) {
    return <button style={{
        color: color === 'primary' ? 'var(--primary-color)' : color, 
        border: border, 
        borderColor: borderColor === 'primary' ? 'var(--primary-color)' : borderColor,
        padding: '8px',
        backgroundColor: bacolor,
        marginRight: flag}} className="font-medium text-sm">{content}</button>;
}

export default Button;