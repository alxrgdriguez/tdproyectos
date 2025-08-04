import { z } from 'zod';
import disposableDomains from 'disposable-email-domains';

// Función auxiliar para limpiar teléfono
const cleanPhone = (value: string): string => {
  return value.replace(/\s|[-()]/g, '');
};

// Regex para números españoles válidos (con o sin +34)
const spanishPhoneRegex = /^(\+34|34)?[6-9]\d{8}$/;

// Regex para nombre
const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']+$/;

// Regex para mensaje
const messageRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,;:'"¡!¿?()\[\]\-]+$/;

// Regex básico para email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Dominios permitidos
export const allowedDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'yahoo.com',
  'msn.com',
  'me.com',
  'aol.com',
  'protonmail.com',
  'tutanota.com',
  'mail.com',
  'gmx.com',
  'gmx.es',
  'gmx.de',
  'zoho.com',
  'fastmail.com',
];


// Función para comprobar si el dominio es permitido
const isAllowedEmailDomain = (email: string) => {
  const domain = email.toLowerCase().split('@')[1];
  return allowedDomains.includes(domain);
};

// Función para comprobar si es un email temporal
const isDisposable = (email: string) => {
  const domain = email.toLowerCase().split('@')[1];
  return disposableDomains.includes(domain);
};

// Esquema del formulario de contacto
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
    .refine((email) => !isDisposable(email), {
      message: 'No se permiten correos temporales. Usa una dirección de correo permanente.',
    })
    .refine((email) => isAllowedEmailDomain(email), {
      message: 'Solo se permiten correos de gmail.com, hotmail.com u outlook.com.',
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
    .max(2000, 'El mensaje no puede superar los 2000 caracteres.')
    .regex(
      messageRegex,
      'El mensaje solo puede contener letras, números, espacios y puntuación básica. No se permiten símbolos especiales.'
    ),

  privacidad: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar la política de privacidad y aviso legal.'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
