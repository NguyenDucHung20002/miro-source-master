import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface IUserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

const UserAvatar = ({ src, name, fallback, borderColor }: IUserAvatarProps) => {
  return (
    <>
      <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
        <Avatar className="w-8 h-8 flex items-center justify-center  rounded-full bg-gray-200">
          <AvatarImage
            style={{
              borderColor,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            className="rounded-full"
            src={src}
          ></AvatarImage>
          <AvatarFallback className="text-xs font-semibold">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </Hint>
    </>
  );
};

export default UserAvatar;
