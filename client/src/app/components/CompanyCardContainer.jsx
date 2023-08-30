import React from 'react'
import data from '@/app/data/company.json'
import CompanyCard from './CompanyCard';

function CompanyCardContainer({data}) {
  
  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
      {data?.map((comp) => (
        <CompanyCard
          key={comp.id}
          compBanner={comp.bannerPicture}
          compLogo={comp.profilePicture}
          compName={comp.name}
          compId={comp.id}
        />
      ))}
    </div>
  );
}

export default CompanyCardContainer