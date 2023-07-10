import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import {
  ListLoanRequests,
  LoanRequestForm,
} from "../../../components/Admin/LoanRequest";

export function LoanRequest() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState();
  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListLoanRequests reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {" "}
      <>
        <div className="roles-page">
          <button
            onClick={onOpenCloseModal}
            type="button"
            className="roles-page__add flex flex-row items-center justify-center px-4 py-3 text-xs font-bold text-white uppercase bg-blue-500 rounded-lg hover:bg-blue-600 space-x-1"
          >
            <span className="p-1">Nuevo Registro</span>
          </button>

          <Tab menu={{ secondary: true }} panes={panes} />
        </div>
        <BasicModal
          show={showModal}
          close={onOpenCloseModal}
          title="Nuevo prestamo"
        >
          <LoanRequestForm close={onOpenCloseModal} onReload={onReload} />
        </BasicModal>
      </>
    </>
  );
}
