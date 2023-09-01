'use client'
import CompanyCard from './CompanyCard';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function CompanyCardContainer() {
  const companies = useSelector((state) => state.company.companies);
  return (
    <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center">
      {companies?.map((comp) => (
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