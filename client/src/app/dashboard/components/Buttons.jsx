'use client';

const buttonsOptions = [
    'PUBLICAR LICITACION',
    'PUBLICAR PRODUCTO',
    'PUBLICAR EMPLEO',
    'PUBLICAR FINANCIAMIENTO',
];

export default function Buttons() {
    return(
        <div className="flex h-100 justify-end">
            {buttonsOptions.map((option, index) => (
                <button key={index} className="m-2 p-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300">
                    {option}
                </button>
            ))}
        </div>
    );
}
