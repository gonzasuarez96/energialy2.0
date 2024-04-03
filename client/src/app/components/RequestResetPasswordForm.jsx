'use client';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { urlProduction } from '../data/dataGeneric';

const RequestResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState('');

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/g;
    let result = re.test(email);
    return result;
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleRequestResetPassword = async (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      setMessage('Por favor, ingresá un email válido.');
      return;
    }
    try {
      const response = await axios.post(`${urlProduction}/auth/requestResetPassword`, {
        email: email,
      });
      setMessage('Email enviado con éxito!');
    } catch (error) {
      if (error.response.status === 404) {
        setMessage('No hay una cuenta asociada con ese email.');
      } else {
        console.log(error.response);
        setMessage('Hubo un error, intente nuevamente.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Restablecer Contraseña</h2>
        <p>Ingresá tu email y si hay una cuenta de Energialy asociada, te vamos a mandar un link para restablecer tu contraseña.</p>
        <form>
          <input
            type="email"
            id="email"
            required
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleEmailChange}
            className="w-full mt-4 p-2 border rounded"
          />
          <button
            type="submit"
            onClick={handleRequestResetPassword}
            className="w-full mt-4 p-2 bg-[#191654] text-white rounded hover:bg-secondary-600 trasition duration-300"
          >
            Obtener link
          </button>
          {message && <p className={`mt-4 ${message.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </form>
      </div>
      <ToastContainer style={{ marginTop: '100px' }} />
    </div>
  );
};

export default RequestResetPasswordForm;
