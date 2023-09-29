'use client'

import { useSelector } from "react-redux"
import CardProposal from "@/app/components/CardProposal";

function ProposalContainer({proposals}) {
    const userData = useSelector((state) => state.user.userData);
    const userProposals = () => {
      if (userData.id) {
        const userProposals = proposals?.filter(
          (proposal) => proposal.company.id === userData.company.id
        );
        return userProposals;
      } else {
        const userProposals = [];
        return userProposals;
      }
    }

  return (
    <div className="px-5">
      <h2 className="text-2xl font-bold mb-3">Mis propuestas</h2>
      {userProposals.length > 0 ? (
        userProposals?.map((item) => <CardProposal item={item} />)
      ) : (
        <h1>No existen propuestas</h1>
      )}
    </div>
  );
}

export default ProposalContainer