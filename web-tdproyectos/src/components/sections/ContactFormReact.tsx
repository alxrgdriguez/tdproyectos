import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactFormSchema,
  type ContactFormData,
} from "../../schemas/contact.schema";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formData = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const res = await fetch(import.meta.env.PUBLIC_ENDPOINT_BASIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!res.ok) throw new Error("Error al enviar el formulario");

      alert("Mensaje enviado con éxito.");
      reset();
    } catch (err) {
      alert("Hubo un problema al enviar el formulario.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre">Nombre *</label>
          <input
            {...register("nombre")}
            id="nombre"
            className="w-full px-4 py-3 border rounded"
            placeholder="Tu nombre"
          />
          {errors.nombre && (
            <p className="text-red-600">{errors.nombre.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full px-4 py-3 border rounded"
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="telefono">Teléfono</label>
        <input
          {...register("telefono")}
          id="telefono"
          className="w-full px-4 py-3 border rounded"
          placeholder="Opcional"
        />
        {errors.telefono && (
          <p className="text-red-600">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="mensaje">Mensaje *</label>
        <textarea
          {...register("mensaje")}
          id="mensaje"
          rows={4}
          className="w-full px-4 py-3 border rounded"
          placeholder="¿En qué podemos ayudarte?"
        />
        {errors.mensaje && (
          <p className="text-red-600">{errors.mensaje.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          {...register("privacidad")}
          id="privacidad"
          className="accent-blue-600 mt-1"
        />
        <label htmlFor="privacidad">
          Acepto la{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            política de privacidad
          </a>{" "}
          y{" "}
          <a href="/legal-notice" target="_blank" rel="noopener noreferrer">
            aviso legal
          </a>
          .
        </label>
      </div>
      {errors.privacidad && (
        <p className="text-red-600">{errors.privacidad.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
