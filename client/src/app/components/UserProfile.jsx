function UserProfile({user, company}) {
  const defaultImg = '../assets/Energialy_Logo_Favicon-01'
  return (
    <>
      <div className="flex justify-center align-middle ml-4 sm:ml-2 sm:min-w-max">
        <div className="w-[50px] h-[50px] m-2">
          <img
            className="rounded-full"
            src={user?.img || defaultImg}
            alt={user?.name || 'Default Image'}
          />
        </div>
        <div className="hidden m-2 sm:block">
          <h4 className="text-sm">{company?.name || 'Nombre de la empresa'}</h4>
          <h4 className="text-xs text-gray-600 ">{user || 'Nombre de usuario'}</h4>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
