import { Button, Icon, Confirm } from "semantic-ui-react";
export function RoleItem(props) {
  const { role } = props;
  console.log(role);
  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <th
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <td className=" text-white px-6 py-4 font-medium text-center">
            {role.name ? role.name : "No hay datos"}
          </td>
        </th>
        <td className=" border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {role.displayName ? role.displayName : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {role.description ? role.description : "No hay datos"}
        </td>

        <td className=" border border-slate-50 py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <Button icon primary>
              <Icon name="pencil" />
            </Button>

            <Button icon color="red">
              <Icon name="trash" />
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}
