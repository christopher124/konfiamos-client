import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ListLoanPayments } from "../../../components/Admin/LoanPayments";

export function LoanPayment() {
  const [reload, setReload] = useState();
  const navigate = useNavigate();
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      render: () => (
        <Tab.Pane attached={false}>
          <ListLoanPayments reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div>
        <div className="w-full ">
          <div className="flex flex-row items-center justify-between mb-4"></div>
          <button
            className="text-white bg-[#1678C2] font-bold py-2 px-4 rounded-xl"
            onClick={() => navigate(`/admin/loanrequests`)}
          >
            <i className="fas fa-arrow-left text-white mr-2 text-lg"></i>
            Regresar
          </button>
        </div>

        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
    </>
  );
}
