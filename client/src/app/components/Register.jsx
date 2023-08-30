'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setEmailError('Por favor, ingresa una dirección de correo electrónico válida.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Por favor, ingresa una dirección de correo electrónico válida.');
      setPasswordError('');
      return;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      setEmailError('');
      return;
    } else {
      setError('');
      setEmailError('');
      setPasswordError('');
    }

    // Resto del código para registrar al usuario utilizando la API
    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:3001/register', user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center bg-light pt-5 pb-5">
      <div className="bg-white shadow rounded w-50">
        <h3 className="mb-0 p-4 bg-gray-100 border-b border-gray-300">Registro de usuario</h3>
        <form className="mb-2 pl-4 pr-4 pt-4">
          {/* Campo de Correo Electrónico */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label w-40">Correo electrónico</label>
            <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} required />
            {emailError && <div className="text-danger mb-2">{emailError}</div>}
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label w-40">Contraseña</label>
            <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} onBlur={handlePasswordBlur} required />
            {passwordError && <div className="text-danger mt- mb-2">{passwordError}</div>}
          </div>

          {/* Botón de Registro */}
          <button type="button" className="btn btn-primary w-100" style={{ backgroundColor: '#191654', borderColor: '#191654' }} onClick={handleRegister}>Registrarse</button>

          {error && <div className="flex justify-center text-danger mt-2 mb-2">{error}</div>}
        </form>
        <div className="text-center p-2">
          <a href="#" className="text-decoration-none text-muted">¿Ya tienes una cuenta? Iniciar sesión</a>
        </div>
      </div>
    </div>
  );
}
