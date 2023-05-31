import { Button, Icon } from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { toast } from "react-toastify";

export function CustomerItem(props) {
  const { customer } = props;

  //   const handleDownloadAccountStatus = () => {
  //     if (customer.accountStatus) {
  //       const url = `${ENV.BASE_PATH}/${customer.accountStatus}`;
  //       window.open(url, "_blank");
  //     } else {
  //       toast.info("No hay archivo de estado de cuenta disponible", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   };

  //   const handleDownloadIdentification = () => {
  //     if (customer.identification) {
  //       const url = `${ENV.BASE_PATH}/${customer.identification}`;
  //       window.open(url, "_blank");
  //     } else {
  //       toast.info("No hay archivo de identificación disponible", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //   };

  return (
    <tr className="border-b bg-cyan-800 border-white">
      <td scope="row" className="justify-center flex p-9 px-6 py-4 text-center">
        <span className="text-white px-6 py-4 font-medium text-center">
          {customer.firstname && customer.lastname
            ? `${customer.firstname} ${customer.lastname}`
            : "No hay datos"}
        </span>
      </td>
      <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
        {customer.email || "No hay datos"}
      </td>
      <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
        {customer.phone || "No hay datos"}
      </td>
      <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
        {customer.cellnumber || "No hay datos"}
      </td>
      <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
        {customer.ocupation || "No hay datos"}
      </td>
      <td className="border border-slate-50 py-3 px-6 text-center">
        {/* <Button
          icon
          primary
          onClick={handleDownloadAccountStatus}
          disabled={!customer.accountStatus}
          data-tip="Descargar Estado de Cuenta"
        >
          <Icon name="download" />
        </Button>

        <Button
          icon
          primary
          onClick={handleDownloadIdentification}
          disabled={!customer.identification}
          data-tip="Descargar Identificación"
        >
          <Icon name="download" />
        </Button> */}

        <Button icon primary>
          <Icon name="eye" />
        </Button>
        <Button icon primary>
          <Icon name="pencil" />
        </Button>
        <Button icon color="red">
          <Icon name="trash" />
        </Button>
      </td>
    </tr>
  );
}
