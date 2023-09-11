'use client'
import React, { useState } from 'react';
import axios from "axios";
const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);


 
  const handleSendEmail = async () => {
    try {
      const emailURL = 'http://localhost:3001/users/enviar-email';
      const data = { email };

      const response = await axios.post(emailURL, data);

      if (response.status === 200) {
        console.log("Correo electrónico enviado con éxito.");
        setSubmitted(true);
      } else {
        console.error("Error al enviar el correo electrónico.");
        setError("Error al enviar el correo electrónico. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      setError("Error al enviar el correo electrónico. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-semibold mb-4">Enviar Correo de restablecimiento</h2>
      {submitted ? (
        <p className="text-green-600 mb-4">
          Se ha enviado un correo electrónico de restablecimiento de contraseña.
        </p>
      ) : (
        <>
          <p className="mb-4">
            Ingresa un correo electrónico y presiona el botón para enviar un correo electrónico de restablecimiento de contraseña.
          </p>
          <div className="flex items-center justify-center">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-3 border rounded mr-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              onClick={handleSendEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar Correo
            </button>
          </div>
          {error && (
            <p className="text-red-600 mt-2">{error}</p>
          )}
        </>
      )}
    </div>
  );
};

export default EmailForm;