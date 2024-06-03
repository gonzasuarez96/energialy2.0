'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUserData } from '../redux/features/userSlice';
import { displayFailedMessage, displaySuccessMessage } from './Toastify';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import Link from 'next/link';
import { Button} from 'antd';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loadings, setLoadings] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    const emailValue = event.target.value.toLowerCase();
    setEmail(emailValue);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const loginValidator = () => {
    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return false;
    } else if (!isValidEmail(email)) {
      setEmailError('Por favor, ingresa una dirección de correo electrónico válida.');
      setPasswordError('');
      setError('');
      return false;
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      setEmailError('');
      setError('');
      return false;
    } else {
      setEmailError('');
      setPasswordError('');
      setPasswordError('');
      return true;
    }
  };

  const handleLogin = async () => {
    const validations = loginValidator();
    console.log(validations);
    if (!validations) {
      return;
    }

    const user = {
      email: email,
      password: password,
    };
    console.log(user);

    try {
      console.log('URL:', process.env.NEXT_PUBLIC_BASE_URL);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, user);
      const accessToken = response.data.accessToken;
      // Después del inicio de sesión exitoso, obtén los detalles del usuario
      const userDetailsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users?email=${email}`);
      const userDetails = userDetailsResponse.data;
      // console.log("Datos del usuario:", userDetails);

      // console.log("Respuesta del servidor:", response);
      // console.log("Estado accessToken:", response.data.accessToken);

      displaySuccessMessage('Sesion iniciada');

      // Guardar en localStorage
      sessionStorage.setItem('accessToken', accessToken);
      
      if(userDetails.company){

        sessionStorage.setItem('companyId', userDetails.company.id);
        sessionStorage.setItem('companyName', userDetails.company.name)
        
      }
      sessionStorage.setItem('userId', userDetails.id);
      sessionStorage.setItem('user', JSON.stringify(userDetails));

      dispatch(setUserData(userDetails));
      dispatch(setAccessToken(accessToken));

      window.location.href = '/dashboard';
    } catch (error) {
      console.log("Error:", error);
      if (error.response.data.error == 'Incorrect password.') {
        displayFailedMessage('Contraseña incorrecta');
      } else if (error.response.data.error == 'Email not registered.') {
        displayFailedMessage('El usuario no esta registrado');
      } else {
        displayFailedMessage(error.response.data.error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    return emailPattern.test(email);
  };

  const handlePasswordFormClick = () => {
    window.location.href = '/emailPassword';
  };

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  const handleClick = () =>{
    enterLoading(0)
    handleLogin()
  }


  return (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="bg-white shadow rounded w-[70%]">
        <h3 className="p-4 mb-0 bg-gray-100 border-b border-gray-300 ">Iniciar sesión</h3>
        <form className="pt-4 pl-4 pr-4 mb-2">
          <div className="items-center mb-3">
            <div className="flex items-center">
              <label htmlFor="email" className="w-40 form-label">
                Correo electrónico
              </label>
              <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} required />
            </div>
            {emailError && <div className="mb-2 text-danger">{emailError}</div>}
          </div>
          <div className="items-center mb-3">
            <div className="flex">
              <label htmlFor="password" className="w-40 form-label">
                Contraseña
              </label>

              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              <button type="button" className="pl-1 focus:outline-none" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </button>
            </div>
            {passwordError && <div className="mb-2 text-danger mt-">{passwordError}</div>}
          </div>
          <div className="flex justify-center pt-4 border-t">
            <Button
              onClick={handleClick}
              type="button"
              loading={loadings[0]}
              className="px-12 py-4 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
            >
              <span>
              Iniciar sesión
              </span>
            </Button>
          </div>
          {error && <div className="flex justify-center mt-2 mb-2 text-danger">{error}</div>}
        </form>
        <div className="p-2 text-center">
          <Link className="text-black" href="/forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
      <ToastContainer style={{ marginTop: '100px' }} />
    </div>
  );
}
