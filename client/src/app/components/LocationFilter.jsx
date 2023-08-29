'use client'

function LocationFilter({locations}) {
  return (
    <div>
      {locations.map((item) => (
        <div>
          <input
            type="checkbox"
            name="cuenca"
            id={item.id}
            className="mr-2 cursor-pointer peer"
          />
          <label className="peer-checked:text-secondary-500 peer-checked:font-semibold">
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default LocationFilter