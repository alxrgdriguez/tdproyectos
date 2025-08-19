// src/components/ContactForm.tsx
import React, { useState, useEffect } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
    privacidad: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Limpiar mensaje después de 5 segundos
  useEffect(() => {
    if (formStatus.message) {
      const timeout = setTimeout(
        () => setFormStatus({ message: "", type: null }),
        8000
      );
      return () => clearTimeout(timeout);
    }
  }, [formStatus]);

  // ✅ Validación frontend (básica, para mejor UX)
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "Debe tener al menos 2 caracteres.";
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = "No puede superar los 50 caracteres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email no válido.";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es obligatorio.";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "Debe tener al menos 10 caracteres.";
    } else if (formData.mensaje.length > 2000) {
      newErrors.mensaje = "No puede superar los 2000 caracteres.";
    }

    if (!formData.privacidad) {
      newErrors.privacidad = "Debes aceptar la política de privacidad.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "privacidad" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormStatus({ message: "", type: null });

    // Usar variable de entorno o fallback
    const BACKEND_URL =
      import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          message: "Te hemos enviado un correo para verificar tu mensaje.",
          type: "success",
        });
        // Resetear formulario
        setFormData({
          nombre: "",
          email: "",
          mensaje: "",
          privacidad: false,
        });
        setErrors({});
      } else {
        // Mostrar primer error del backend
        const errorMsg = Array.isArray(data.details)
          ? data.details[0]
          : data.error || "Error al enviar el mensaje.";

        setFormStatus({
          message: errorMsg,
          type: "error",
        });
      }
    } catch (err) {
      setFormStatus({
        message: "No se pudo conectar con el servidor. Intenta más tarde.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block font-medium text-gray-700">
            Nombre <span className="text-red-600">*</span>
          </label>
          <input
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            aria-invalid={!!errors.nombre}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tu nombre"
          />
          {errors.nombre && (
            <p className="text-red-600 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className="block font-medium text-gray-700">
          Mensaje <span className="text-red-600">*</span>
        </label>
        <textarea
          name="mensaje"
          id="mensaje"
          rows={4}
          value={formData.mensaje}
          onChange={handleChange}
          aria-invalid={!!errors.mensaje}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            errors.mensaje ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="¿En qué podemos ayudarte?"
        />
        {errors.mensaje && (
          <p className="text-red-600 text-sm mt-1">{errors.mensaje}</p>
        )}
      </div>

      {/* Checkbox privacidad */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          name="privacidad"
          id="privacidad"
          checked={formData.privacidad}
          onChange={handleChange}
          className={`mt-1 accent-blue-600 ${
            errors.privacidad ? "ring-2 ring-red-500 rounded" : ""
          }`}
        />
        <label htmlFor="privacidad" className="text-sm text-gray-700">
          Acepto la{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 hover:text-blue-700 transition"
          >
            política de privacidad
          </a>{" "}
          y{" "}
          <a
            href="/legal-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500 hover:text-blue-700 transition"
          >
            aviso legal
          </a>
          .
        </label>
      </div>
      {errors.privacidad && (
        <p className="text-red-600 text-sm">{errors.privacidad}</p>
      )}

      {/* Mensaje de estado */}
      {formStatus.message && (
        <p
          className={`text-sm font-medium px-4 py-2 rounded-md ${
            formStatus.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {formStatus.message}
        </p>
      )}

      {/* Botón */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
