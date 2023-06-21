import { useState } from "react";
import { Button, Icon, Modal, Input } from "semantic-ui-react";
import { addDays, format } from "date-fns";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { LoanRequest } from "../../../../api";
import { useAuth } from "../../../../hooks";

const LoanRequestController = new LoanRequest();

export function LoanPaymentsItem(props) {
  const { loanPayment, onReload } = props;
  const { accessToken } = useAuth();
  const [showPartialPaymentModal, setShowPartialPaymentModal] = useState(false);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(
    loanPayment.partialPaymentAmount || 0
  );

  const openDesactivateActivateConfirm = () => {
    const action = loanPayment.paid ? "Revertir" : "Confirmar";
    Swal.fire({
      title: `${action} el pago del préstamo`,
      text: `¿Estás seguro de que deseas ${action.toLowerCase()} el pago del préstamo ${
        loanPayment.end
      }?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${action.toLowerCase()}`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await onActivateDesactivate();
      }
    });
  };

  const openPartialPaymentModal = () => {
    setShowPartialPaymentModal(true);
  };

  const closePartialPaymentModal = () => {
    setShowPartialPaymentModal(false);
  };

  const onActivateDesactivate = async () => {
    try {
      const paymentStatusUpdate = { paid: !loanPayment.paid };

      await LoanRequestController.updatePaymentStatus(
        accessToken,
        loanPayment._id,
        paymentStatusUpdate
      );
      onReload();
      const action = loanPayment.paid ? "revertido" : "confirmado";
      toast.success(`Estado de pago ${action} correctamente`);
    } catch (error) {
      toast.error("Error al actualizar el estado de pago.");
    }
  };

  const submitPartialPayment = async () => {
    try {
      const partialPayment = parseFloat(partialPaymentAmount);

      if (partialPayment < loanPayment.paymentAmount) {
        const paymentStatusUpdate = {
          paid: false,
          partialPayment: true,
          partialPaymentAmount: partialPayment,
          comment: "Pago parcial",
        };

        await LoanRequestController.updatePaymentStatus(
          accessToken,
          loanPayment._id,
          paymentStatusUpdate
        );
        onReload();
        toast.success("Pago parcial registrado correctamente");
        closePartialPaymentModal();
      } else if (partialPayment === loanPayment.paymentAmount) {
        const paymentStatusUpdate = {
          paid: true,
          partialPayment: false,
          partialPaymentAmount: partialPayment,
          comment: "Pago completo",
        };

        await LoanRequestController.updatePaymentStatus(
          accessToken,
          loanPayment._id,
          paymentStatusUpdate
        );
        onReload();
        toast.success("Pago completo registrado correctamente");
        closePartialPaymentModal();
      } else {
        toast.error(
          "El monto del pago parcial es mayor que el monto total del pago."
        );
      }
    } catch (error) {
      toast.error("Error al registrar el pago parcial.");
    }
  };

  return (
    <>
      <tr className="border-b bg-cyan-800 border-white">
        <th
          scope="row"
          className="justify-center flex p-9 px-6 py-4 text-center"
        >
          <td className="text-white px-6 py-4 font-medium text-center">
            {loanPayment.paymentDate
              ? format(
                  addDays(new Date(loanPayment.paymentDate), 1),
                  "dd/MM/yyyy "
                )
              : "No hay datos"}
          </td>
        </th>
        <td className="border border-slate-50 px-6 py-4 font-medium text-white whitespace-nowrap">
          {loanPayment.dueDate
            ? format(addDays(new Date(loanPayment.dueDate), 1), "dd/MM/yyyy ")
            : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanPayment.paymentAmount
            ? loanPayment.paymentAmount
            : "No hay datos"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanPayment.paid ? "Pagado" : "No pagado"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanPayment.partialPayment ? "Sí" : "No"}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanPayment.partialPaymentAmount}
        </td>
        <td className="border border-slate-50 text-white font-medium px-6 py-4 text-center">
          {loanPayment.comment ? loanPayment.comment : "No hay comentario"}
        </td>
        <td className="border border-slate-50 py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <Button
              icon
              color={loanPayment.paid ? "red" : "teal"}
              onClick={openDesactivateActivateConfirm}
            >
              <Icon name={loanPayment.paid ? "undo" : "check"} />
            </Button>
            <Button
              icon
              color="yellow"
              onClick={openPartialPaymentModal}
              disabled={loanPayment.paid}
            >
              <Icon name="edit" />
            </Button>
          </div>
        </td>
      </tr>

      {/* Modal for Partial Payment */}
      <Modal
        open={showPartialPaymentModal}
        onClose={closePartialPaymentModal}
        className="modal"
      >
        <Modal.Header>Pago Parcial</Modal.Header>
        <Modal.Content>
          <div className="flex flex-col items-center">
            <p>Ingrese el monto del pago parcial:</p>
            <p className="text-2xl font-bold mt-2">
              Faltan {loanPayment.paymentAmount - partialPaymentAmount} del pago
              original.
            </p>
            <Input
              type="number"
              value={partialPaymentAmount}
              onChange={(e) => setPartialPaymentAmount(e.target.value)}
              className="mt-4"
            />
            <p className="mt-2">Pago actual: {partialPaymentAmount}</p>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={closePartialPaymentModal}>
            Cancelar
          </Button>
          <Button color="teal" onClick={submitPartialPayment}>
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
