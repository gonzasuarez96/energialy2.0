"use client";
import React, { use, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { urlProduction } from "../data/dataGeneric";

//Toastify module for success message
const displaySuccessMessage = (mensaje) => {
  toast.success(mensaje, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

// Toastify module for error messages
const displayFailedMessage = (mensaje) => {
  toast.error(mensaje, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const handleFirstNameBlur = () => {
    if (!isValidName(firstName)) {
      setFirstNameError("Por favor, ingresa un nombre válido.");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameBlur = () => {
    if (!isValidName(lastName)) {
      setLastNameError("Por favor, ingresa un apellido válido.");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setEmailError(
        "Por favor, ingresa una dirección de correo electrónico válida."
      );
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%#$%&/()=¿'@$*?&.,]{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula, y un carácter especial (?*.)."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfPasswordBlur = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%#$%&/()=¿'@$*?&.,]{6,}$/;

    if ( confirmPassword !== password) {
      setConfirmPasswordError(
        "Las contraseñas no coinciden"
      )
    }else {
      setConfirmPasswordError("");
    }
  };

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password || !confirmPassword ||!firstName || !lastName) {
      setError("Por favor, completa todos los campos.");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError(
        "Por favor, ingresa una dirección de correo electrónico válida."
      );
      setPasswordError("");
      return;
    } else if (passwordError || confirmPasswordError) {
      setError("Revisa los campos")
      return;
    } else {
      setError("");
      setEmailError("");
      setPasswordError("");
      setFirstNameError("");
    }

    // Resto del código para registrar al usuario utilizando la API
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${urlProduction}/register`, user);
      displaySuccessMessage("Usuario creado con exito");
      console.log("Datos enviados:", user);
      console.log(response);
      console.log(response.statusText);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      // console.log("Error:", error.response.data.error);
      displayFailedMessage(error.response.data.error);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center m-4">
      <div className="bg-white shadow rounded w-50">
        <h3 className="mb-0 p-4 bg-gray-100 border-b border-gray-300">
          Registro de usuario
        </h3>
        <form className="mb-2 pl-4 pr-4 pt-4">
          {/* Campo de Correo Electrónico */}
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label w-40">
                Nombre
              </label>
              <input
                type="firstName"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                onBlur={handleFirstNameBlur}
                required
              />
              {firstNameError && (
                <div className="text-danger mb-2">{firstNameError}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label w-40">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={handleLastName}
                onBlur={handleLastNameBlur} // Reutilizamos la misma función
                required
              />
              {lastNameError && (
                <div className="text-danger mb-2">{lastNameError}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label w-40">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              required
            />
            {emailError && <div className="text-danger mb-2">{emailError}</div>}
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-8">
            <label htmlFor="password" className="form-label w-40">
              Contraseña
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pr-10"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
              <button
                type="button"
                className="focus:outline-none ml-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </button>
            </div>
            {passwordError && (
              <div className="text-danger mt-2">{passwordError}</div>
            )}
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="form-label w-40">
              Repetir contraseña
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pr-10"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfPasswordChange}
                onBlur={handleConfPasswordBlur}
                required
              />
              <button
                type="button"
                className="focus:outline-none ml-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
              </button>
            </div>
            {confirmPasswordError && (
              <div className="text-danger mt-2">{confirmPasswordError}</div>
            )}
          </div>
          

          {/* Botón de Registro */}
          <div className="flex justify-center border-t pt-4">
            <button
              type="button"
              className="px-8 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
              onClick={handleRegister}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div className="flex justify-center text-danger mt-2 mb-2">
              {error}
            </div>
          )}
        </form>
        <div className="text-center p-2">
          <Link href="login" className="text-decoration-none text-muted">
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
      <ToastContainer style={{ marginTop: "100px" }} />
    </div>
  );
}
