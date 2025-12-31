import nodemailer from 'nodemailer';

import { serverEnv } from '@/lib/env';

const transporter = nodemailer.createTransport(serverEnv?.EMAIL_SERVER ?? 'smtp://localhost:1025');

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: serverEnv?.EMAIL_FROM ?? 'noreply@example.com',
    to,
    subject,
    html
  });
}
