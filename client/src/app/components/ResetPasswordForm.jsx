'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { urlProduction } from '../data/dataGeneric';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Por favor, completa los campos.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await axios.post(`${urlProduction}/auth/resetPassword`, {
        userId,
        token,
        password: newPassword,
      });
      setMessage('Contraseña restablecida con éxito!');
    } catch (error) {
      console.log('Error al restablecer la contraseña:', error.response);
      setMessage('No fue posible restablecer la contraseña, intente enviando un nuevo email de restablecimiento.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Restablecer Contraseña</h2>
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
