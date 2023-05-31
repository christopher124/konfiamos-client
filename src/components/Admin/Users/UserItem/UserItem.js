import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import "./UserItem.scss";

export function UserItem(props) {
  const { user } = props;
  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <td className="justify-center flex p-9 px-6 py-4 text-center">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
        </td>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {user.firstname && user.lastname
            ? `${user.firstname} ${user.lastname}`
            : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {user.email || "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {user.role.displayName || "No hay datos"}
        </td>
        <td className="border border-slate-50 py-3 px-6 text-center">
          <Button icon primary>
            <Icon name="pencil" />
          </Button>
          <Button icon color={user.active ? "orange" : "teal"}>
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red">
            <Icon name="trash" />
          </Button>
        </td>
      </tr>
    </>
  );
}
