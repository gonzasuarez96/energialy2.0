import Login from "./components/Login";

export default function Home() {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="lg:w-[50%] lg:h-screen bg-gray-100 flex justify-center items-center py-4">
        <h1 className="lg:text-6xl text-2xl font-bold text-gray-800">
         Bienvenido a Energialy
        </h1>
      </div>
      <div className="lg:w-[50%] h-screen bg-gray-100 flex justify-center items-center">
      <Login />
      </div>
    </div>
  );
}
