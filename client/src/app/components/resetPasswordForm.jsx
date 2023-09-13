"use client";


import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setMessage('Las contraseñas no coinciden.');
        return;
      }

      const response = await axios.post(`http://localhost:3001/users/reset-password/${email}`, {
        newPassword,
      });

      if (response.status === 200) {
        setMessage('Contraseña restablecida con éxito.');
      } else {
        setMessage('Error al restablecer la contraseña. Verifica tus datos.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setMessage('Error interno del servidor.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Restablecer Contraseña</h2>
        <p>Ingresa tu nueva contraseña y presiona el botón para restablecerla.</p>
        <input
          type="text"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Confirmar Nueva Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mt-4 p-2 border rounded"
        />
        <button
          onClick={handleResetPassword}
          className="w-full mt-4 p-2 bg-[#191654] text-white rounded hover:bg-secondary-600 trasition duration-300"
        >
          Restablecer Contraseña
        </button>
        {message && <p className={`mt-4 ${message.includes('éxito') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
      <ToastContainer style={{ marginTop: '100px' }} />
    </div>
  );
};

export default ResetPasswordForm;