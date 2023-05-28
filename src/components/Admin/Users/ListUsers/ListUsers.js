import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function ListUsers(props) {
  const { usersActive } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();
  console.log(users);
  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [usersActive]);

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No hay ningun usuario";

  return (
    <div>
      <h2>Estamos viendo los usuarios</h2>
      <p>{usersActive ? "Activos" : "Inactivos"}</p>
    </div>
  );
}
