import React, { useState, useEffect } from "react";

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  // Limpiar el mensaje después de 5 segundos
  useEffect(() => {
    if (formStatus.message) {
      const timeout = setTimeout(() => {
        setFormStatus({ message: "", type: null });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [formStatus]);
  return (
    <form className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre">Nombre *</label>
          <input
            name="nombre"
            id="nombre"
            className="w-full px-4 py-3 border rounded"
            placeholder="Tu nombre"
          />

          <p className="text-red-600">{"Mesanje de error"}</p>
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input
            name="email"
            id="email"
            type="email"
            className="w-full px-4 py-3 border rounded"
            placeholder="tu@email.com"
          />
          <p className="text-red-600">{"Mesanje de error"}</p>
        </div>
      </div>

      <div>
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          name="mensaje"
          id="mensaje"
          rows={4}
          className="w-full px-4 py-3 border rounded"
          placeholder="¿En qué podemos ayudarte?"
        />
        <p className="text-red-600">{"Mesanje de error"}</p>
      </div>

      <div className="flex items-start gap-2 mb-2">
        <input
          type="checkbox"
          name="privacidad"
          id="privacidad"
          className="accent-blue-600 mt-1"
        />
        <label htmlFor="privacidad">
          Acepto la{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            política de privacidad
          </a>{" "}
          y{" "}
          <a
            href="/legal-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            aviso legal
          </a>
          .
        </label>
      </div>
      <p className="text-red-600">{"Mesanje de error"}</p>

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

      <button
        type="submit"
        disabled={false}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
      >
        {false ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
