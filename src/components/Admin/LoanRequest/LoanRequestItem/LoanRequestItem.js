import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Icon } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { LoanRequestForm } from "../LoanRequestForm";
import { addDays, format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { useNavigate } from "react-router-dom";
import { LoanRequestPdf } from "./LoanRequestPdf";
const LoanRequestController = new LoanRequest();

export function LoanRequestItem(props) {
  const { loanRequest, onReload } = props;
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const openUpdateRole = () => {
    setTitleModal(`Actualizar ${loanRequest.code}`);
    onOpenCloseModal();
  };
  console.log(loanRequest);
  const onDelete = () => {
    Swal.fire({
      title: "Eliminar el préstamo",
      text: `¿Estás seguro de que deseas eliminar el préstamo ${loanRequest.code}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onDeleteConfirm();
      }
    });
  };

  const onDeleteConfirm = async () => {
    try {
      await LoanRequestController.deleteLoanRequest(
        accessToken,
        loanRequest._id
      );
      toast.success("Préstamo eliminado correctamente");
      onReload();

      const result = await Swal.fire({
        title: "Préstamo eliminado",
        text: "¿Deseas recuperar el préstamo eliminado?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, recuperar",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        try {
          await LoanRequestController.restoreLoanRequest(
            accessToken,
            loanRequest._id
          );
          toast.success("Préstamo recuperado correctamente");
          onReload();
        } catch (error) {
          toast.error(error.msg);
        }
      }
    } catch (error) {
      toast.error(error.msg);
    }
  };
  const startDate = loanRequest.startDate; // Obtén la fecha de inicio

  // Aumenta un día a la fecha de inicio
  const updatedStartDate = addDays(new Date(startDate), 1);

  // Formatea la fecha aumentada
  const formattedStartDate = format(updatedStartDate, "dd/MM/yyyy");

  const hasPayments = loanRequest.totalPaid > 0; // Verifica si se ha realizado al menos un pago

  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <th
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <td className="text-white px-6 py-4 font-medium text-center">
            {loanRequest.customer.firstname +
            " " +
            loanRequest.customer.lastname
              ? loanRequest.customer.firstname +
                " " +
                loanRequest.customer.lastname
              : "No hay datos"}
          </td>
        </th>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {loanRequest.code ? loanRequest.code : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanRequest.amountRequested
            ? loanRequest.amountRequested
            : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanRequest.totalAmount ? loanRequest.totalAmount : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanRequest.status ? loanRequest.status : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanRequest.periodPaid}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanRequest.totalPaid}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {formattedStartDate}
        </td>

        <td className="border border-slate-50 py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <Button
              icon
              primary
              disabled={hasPayments}
              onClick={openUpdateRole}
            >
              <Icon name="pencil" />
            </Button>

            <Button icon color="red" disabled={hasPayments} onClick={onDelete}>
              <Icon name="trash" />
            </Button>

            {/* <Button
              icon
              onClick={() => navigate(`/admin/loanrequest/${loanRequest._id}`)}
            >
              <Icon name="eye" />
            </Button> */}

            <Button
              icon
              onClick={() => navigate(`/admin/loanpayments/${loanRequest._id}`)}
            >
              <Icon name="money" />
            </Button>
            <PDFDownloadLink
              document={<LoanRequestPdf loanRequest={loanRequest} />}
              fileName="propuesta.pdf"
            >
              <Button icon>
                <Icon name="file pdf" />
              </Button>
            </PDFDownloadLink>
          </div>
        </td>
      </tr>
      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <LoanRequestForm
          close={onOpenCloseModal}
          onReload={onReload}
          loanRequest={loanRequest}
        />
      </BasicModal>
    </>
  );
}
