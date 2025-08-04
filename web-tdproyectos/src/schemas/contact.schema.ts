import { z } from 'zod';
import { DISPOSABLE_EMAIL_DOMAINS } from '../lib/disposableEmailDomains';

// Función auxiliar limpiar teléfono
const cleanPhone = (value: string): string => {
  return value.replace(/\s|[-()]/g, '');
};

// Validar solo números españoles 9 dígitos que empiecen por 6, 7, 8 o 9 (+34 opcional)
const spanishPhoneRegex = /^(\+34|34)?[6-9]\d{8}$/;

// Validar nombre
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;

// Validar email y bloquear dominios temporales
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isDisposableEmail = (email: string): boolean => {
  try {
    const domain = email.toLowerCase().split('@')[1];
    return domain ? DISPOSABLE_EMAIL_DOMAINS.includes(domain as any) : false;
  } catch {
    return false;
  }
};

// 6. Esquema principal
export const ContactFormSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es obligatorio.' })
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(50, 'El nombre no puede superar los 50 caracteres.')
    .regex(nameRegex, 'El nombre solo puede contener letras, espacios, apóstrofos y guiones. No se permiten números ni símbolos.')
    .transform((val) => val.trim().replace(/\s+/g, ' ')),

  email: z
    .string({ required_error: 'El email es obligatorio.' })
    .email('Debe ser un email válido.')
    .regex(emailRegex, 'Formato de email no válido.')
    .refine((email) => !isDisposableEmail(email), {
      message: 'No se permiten correos temporales. Usa una dirección de correo permanente.',
    })
    .transform((email) => email.toLowerCase()),

  telefono: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val ? cleanPhone(val) : ''))
    .refine(
      (val) => val === '' || spanishPhoneRegex.test(val),
      'Introduce un número español válido (ej: 600 000 000 o +34 600 000 000).'
    ),

  mensaje: z
    .string({ required_error: 'El mensaje es obligatorio para poder ayudarte.' })
    .min(10, 'El mensaje debe tener al menos 10 caracteres.')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres.'),

  privacidad: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar la política de privacidad y aviso legal.'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;