import React from 'react'

function DashboardTableData({title, data}) {
    console.log(data)

    const proposalWineer = (item) => {
      const winner = item.proposals.find(proposal => proposal.status === "accepted")
      console.log(winner)
      if(winner !== undefined){
        return winner.Company.name;
      }else{
        return "No Adjudicada"
      }
    }

    const amountWinnerProposal = (item) => {
      const winner = item.proposals.find(
        (proposal) => proposal.status === "accepted"
      );
      console.log(winner);
      if (winner !== undefined) {
        return winner.totalAmount;
      } else {
        return "No Adjudicada";
      }
    }


  return (
    <div className="w-full">
      <div>{title} </div>
      <div>
        <div className="flex flex-col p-2">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        Titulo de la Licitación
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Empresa Contratada
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tu Presupuesto
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Propuesta Aceptada
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <h5>No existen licitaciones</h5>
                    ) : (
                      data?.map((item) => (
                        <tr
                          className={`border-b transition duration-300 ease-in-out 
                           ${
                             item.status === "working"
                               ? "bg-green-300 hover:bg-green-200"
                               : item.status === "completed"
                               ? "bg-green-800 hover:bg-green-500"
                               : item.status === "expired"
                               ? "bg-red-300 hover:bg-red-200"
                               : "hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                           }`}
                          key={item.id}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.title}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {proposalWineer(item)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.budget}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {amountWinnerProposal(item)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.status === "published"
                              ? "Publicado"
                              : item.status === "expired"
                              ? "Vencido"
                              : item.status === "working"
                              ? "En ejecución"
                              : item.statu === "completed"
                              ? "Finalizado"
                              : null}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTableData