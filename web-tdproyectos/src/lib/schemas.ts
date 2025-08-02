import { z } from 'zod';

// Limpiar y normalizar teléfono
const cleanPhone = (value: string): string => {
  return value.replace(/\s|[-()]/g, '');
};

// Validar solo números españoles: 9 dígitos que empiecen por 6, 7, 8 o 9
const spanishPhoneRegex = /^(\+34|34)?[6-9]\d{8}$/;

// Validar nombre: solo letras, espacios, apóstrofes y guiones
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;

export const ContactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no puede superar los 50 caracteres.')
    .regex(nameRegex, 'El nombre solo puede contener letras, espacios, apóstrofos y guiones. No se permiten números ni símbolos.')
    .transform((val) => val.trim().replace(/\s+/g, ' ')), // Limpia espacios extra

   email: z
    .string()
    .email('Debe ser un email válido.')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Formato de email no válido.')
    .transform((email) => email.toLowerCase()),

  telefono: z
    .string()
    .transform(cleanPhone)
    .refine((val) => val === '' || spanishPhoneRegex.test(val), {
      message: 'Introduce un número español válido (ej: 600 000 000 o +34 600 000 000).',
    })
    .optional()
    .or(z.literal('')),

  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres.'),

  privacidad: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar la política de privacidad y aviso legal.'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;