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

  // Limpiar el mensaje después de 5 segundos
  useEffect(() => {
    if (formStatus.message) {
      const timeout = setTimeout(
        () => setFormStatus({ message: "", type: null }),
        5000
      );
      return () => clearTimeout(timeout);
    }
  }, [formStatus]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(formData.email)) {
      newErrors.email = "Introduce un email válido.";
    }
    if (!formData.mensaje.trim())
      newErrors.mensaje = "El mensaje no puede estar vacío.";
    if (!formData.privacidad)
      newErrors.privacidad = "Debes aceptar la política de privacidad.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // 'checked' only exists on HTMLInputElement, so we need to cast
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulación de envío (puedes reemplazar con tu lógica)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setFormStatus({
        message: "Tu mensaje ha sido enviado correctamente.",
        type: "success",
      });
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
        privacidad: false,
      });
    } catch {
      setFormStatus({
        message: "Ocurrió un error al enviar el mensaje.",
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
