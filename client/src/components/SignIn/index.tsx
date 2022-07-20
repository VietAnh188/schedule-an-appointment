import { IconType } from "react-icons";

interface IProps {
  Icon: IconType;
  names: string;
} 

function LoginInWith({ Icon, names }: IProps) {
  return (
    <button className="w-16 h-16 cursor-pointer p-3 border-gray-400 hover:border-blue-600 border-1">
      <Icon className={`${names}`} style={{ fontSize: "200%" }} />
    </button>
  );
}

export default LoginInWith;