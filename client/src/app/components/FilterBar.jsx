import LocationFilter from "./LocationFilter";

async function getLocations(){
  const res = await fetch("http://localhost:3001/locations", {
    next: { revalidate: 1 },
  });
  console.log(res.statusText)
  if (!res.ok) {
    console.log('no se pudo realizar la consulta')
  }

  return res.json();
}

const employerNumber = [
  "Menos de 50 empleados",
  "De 50 a 200 empleados",
  "De 200 a 1000 empleados",
  "De 1000 a 5000 empleados",
  "Mas de 5000 empleados",
];

async function FilterBar(props) {

  const locations = await getLocations()

  return (
    <div className="flex flex-col justify-items-stretch">
      <div className="bg-white p-8 mb-4">
        <div className="p-2 border-b-2 border-gray-300 mb-4 ">
          <h3 className="text-base">Buscador</h3>
        </div>
        <div>
          <input
            type="text"
            placeholder="Buscar Empresa"
            className="border-1 border-gray-400 p-3 rounded-sm text-sm focus:outline-none focus:border-secondary-500-500 focus:ring-1 focus:ring-secondary-500"
          />
        </div>
      </div>
      <div className="bg-white p-8 mb-4">
        <div className="p-2 border-b-2 border-gray-300 mb-4">
          <h3 className="text-base">Ubicación</h3>
        </div>
        <div>
          <LocationFilter locations={locations} />
        </div>
      </div>
      <div className="bg-white p-8 mb-4">
        <div className="p-2 border-b-2 border-gray-300 mb-4">
          <h3 className="text-base">No. De Empleados</h3>
        </div>
        <div>
          {employerNumber.map((item, index) => (
            <div>
              <input type="checkbox" className="mr-1" name={index} />
              <label>{item}</label>
            </div>
          ))}
          {/* <div>
            <input type="checkbox" name="cuenca" id="nqn" />
            <label>Menos de 50 Empleados</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="gsj" />
            <label>De 50 a 200 Empleados</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="austral" />
            <label>De 200 a 1000 Empleados</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="cuyo" />
            <label>De 1000 a 5000 Empleados</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="noa" />
            <label>Mas de 5000 Empleados</label>
          </div> */}
        </div>
      </div>
      <div className="bg-white p-8 mb-4">
        <div className="p-2 border-b-2 border-gray-300 mb-4">
          <h3 className="text-base">Especializaciones</h3>
        </div>
        <div>
          <div>
            <input type="checkbox" name="cuenca" id="nqn" />
            <label>Cuenca Neuquina</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="gsj" />
            <label>Cuenca Golfo San Jorge</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="austral" />
            <label>Cuenca Austral</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="cuyo" />
            <label>Cuenca Cuyana</label>
          </div>
          <div>
            <input type="checkbox" name="cuenca" id="noa" />
            <label>Cuenca Noroeste</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBar