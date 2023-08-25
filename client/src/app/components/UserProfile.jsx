
function UserProfile() {
  return (
    <>
      <div className="flex justify-center align-middle ml-4 sm:ml-2 sm:min-w-max">
        <div className="w-[50px] h-[50px] m-2">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/gym-go/image/upload/v1689976470/gym-go/i3yovpwjhgydo4lvhdan.jpg"
          />
        </div>
        <div className="hidden m-2 sm:block">
          <h4 className="text-sm">Company Name</h4>
          <h4 className="text-xs text-gray-600 ">User Name</h4>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
