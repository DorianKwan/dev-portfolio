import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const senderEmail = process.env.SENDER_EMAIL;
const receiverEmail = process.env.RECEIVER_EMAIL;

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
};

type ResponseData = {
  success: boolean;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body as ContactRequestBody;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res
      .status(400)
      .json({ success: false, error: 'All fields are required' });
  }

  try {
    await resend.emails.send({
      from: `Portfolio Contact <${senderEmail}>`,
      to: receiverEmail || 'bsayerskwan@gmail.com',
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again.',
    });
  }
}
