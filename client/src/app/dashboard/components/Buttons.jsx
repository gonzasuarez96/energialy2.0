'use client';

const buttonsOptions = [
    'PUBLICAR LICITACION',
    'SOLICITAR FINANCIAMIENTO',
];

export default function Buttons() {
    return(
        <div className="flex h-100 justify-end">
            {buttonsOptions.map((option, index) => (
                <button key={index} className="m-4 p-4 text-white font-semibold bg-[#191654] rounded hover:bg-secondary-600 transition duration-300">
                    {option}
                </button>
            ))}
        </div>
    );
}
