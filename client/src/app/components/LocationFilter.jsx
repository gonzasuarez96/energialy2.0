'use client'

function LocationFilter({locations}) {
  return (
    <div>
      {locations.map((item) => (
        <div>
          <input type="checkbox" name="cuenca" id={item.id} className="mr-2" />
          <label>{item.name}</label>
        </div>
      ))}
    </div>
  );
}

export default LocationFilter