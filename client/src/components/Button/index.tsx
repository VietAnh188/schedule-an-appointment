interface IProps {
    content: string,
    classname: string
}

function Button({content, classname}: IProps) {
    return <button className={`font-medium text-sm p-2 cursor-pointer ${classname}`}>{content}</button>;
}

export default Button;