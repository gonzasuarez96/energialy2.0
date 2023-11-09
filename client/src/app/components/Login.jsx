"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserData } from "../redux/features/userSlice";
import { displayFailedMessage, displaySuccessMessage } from "./Toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const loginValidator = () => {
    if (!email || !password) {
      setError("Por favor, completa ambos campos.");
      return;
    } else if (!isValidEmail(email)) {
      setEmailError(
        "Por favor, ingresa una dirección de correo electrónico válida."
      );
      setPasswordError("");
      return;
    } else if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      setEmailError("");
      return;
    } else {
      setEmailError("");
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    const validations = loginValidator();
    if (validations) {
      return;
    }

    const user = {
      email: email,
      password: password,
      email: email,
      password: password,
    };

    try {
      console.log("Datos enviados:", user);
      const response = await axios.post("http://localhost:3001/auth", user);
      const accessToken = response.data.accessToken;
      // Después del inicio de sesión exitoso, obtén los detalles del usuario
      const userDetailsResponse = await axios.get(
        `http://localhost:3001/users?email=${email}`
      );
      const userDetails = userDetailsResponse.data;
      console.log("Datos del usuario:", userDetails);

      console.log("Respuesta del servidor:", response);
      console.log("Estado accessToken:", response.data.accessToken);

      displaySuccessMessage("Sesion iniciada");

      // Guardar en localStorage
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(userDetails));

      dispatch(setUserData(userDetails));
      dispatch(setAccessToken(accessToken));

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      if (error.response.data.error == "Incorrect password.") {
        displayFailedMessage("Contraseña incorrecta");
      } else if (error.response.data.error == "Email not registered.") {
        displayFailedMessage("El usuario no esta registrado");
      } else {
        displayFailedMessage(error.response.data.error);
      }
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePasswordFormClick = () => {
    window.location.href = "/emailPassword";
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="bg-white shadow rounded w-50">
        <h3 className=" mb-0 p-4 bg-gray-100 border-b border-gray-300">
          Iniciar sesión
        </h3>
        <form className="mb-2 pl-4 pr-4 pt-4">
          <div className="mb-3 items-center">
            <div className="flex items-center">
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
            </div>
            {emailError && (
              <div className="text-danger  mb-2">{emailError}</div>
            )}
          </div>
          <div className="mb-3 items-center">
            <div className="flex">
              <label htmlFor="password" className="form-label w-40">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                required
              />
            </div>
            {passwordError && (
              <div className="text-danger mt- mb-2">{passwordError}</div>
            )}
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="remember" />
            <label htmlFor="remember" className="form-check-label">
              Recuérdame
            </label>
          </div>
          <div className="flex justify-center border-t pt-4">
            <button
              type="button"
              className="px-8 py-2 text-white bg-[#191654] rounded hover:bg-secondary-600 transition duration-300"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </div>
          {error && (
            <div className="flex justify-center text-danger mt-2 mb-2">
              {error}
            </div>
          )}
        </form>
        <div className="text-center p-2">
          <a href="#" className="text-decoration-none text-muted">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <ToastContainer style={{ marginTop: "100px" }} />
    </div>
  );
}
