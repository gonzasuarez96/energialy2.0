'use client'
import CompanyCard from './CompanyCard';
import { useSelector } from 'react-redux';

function CompanyCardContainer() {
  const companies = useSelector((state) => state.company.companies);
  const filterCompanies = useSelector((state) => state.company.filterCompanies);
  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
      {filterCompanies.length > 0
        ? filterCompanies?.map((comp) => (
            <CompanyCard
              key={comp.id}
              compBanner={comp.bannerPicture}
              compLogo={comp.profilePicture}
              compName={comp.name}
              compId={comp.id}
            />
          ))
        : companies?.map((comp) => (
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