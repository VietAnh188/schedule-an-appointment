interface IProps {
    content: string,
    className: string
}

function Button({content, className}: IProps) {
    return <button className={`font-medium text-sm p-2 cursor-pointer ${className}`}>{content}</button>;
}

export default Button;