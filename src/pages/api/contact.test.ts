import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import handler from './contact';
import '@testing-library/jest-dom';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: jest.fn() },
  })),
}));

type ResponseData = { success: boolean; error?: string };
type ResendMockInstance = { emails: { send: jest.Mock } };

// contact.ts calls `new Resend(key)` at module init — capture that instance here
const resendInstance = (
  Resend as unknown as jest.MockedClass<
    new (...args: unknown[]) => ResendMockInstance
  >
).mock.results[0]?.value as ResendMockInstance;

const mockReq = (overrides: Partial<NextApiRequest> = {}): NextApiRequest =>
  ({
    method: 'POST',
    body: { name: 'Test User', email: 'test@example.com', message: 'Hello' },
    ...overrides,
  }) as NextApiRequest;

const mockRes = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as unknown as NextApiResponse<ResponseData> & typeof res;
};

describe('/api/contact', () => {
  beforeEach(() => {
    resendInstance.emails.send.mockResolvedValue({ id: 'test-id' });
  });

  describe('method validation', () => {
    it('returns 405 for GET requests', async () => {
      const res = mockRes();
      await handler(mockReq({ method: 'GET' }), res);
      expect(res.status).toHaveBeenCalledWith(405);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Method not allowed',
      });
    });

    it('returns 405 for PUT requests', async () => {
      const res = mockRes();
      await handler(mockReq({ method: 'PUT' }), res);
      expect(res.status).toHaveBeenCalledWith(405);
    });
  });

  describe('field validation', () => {
    it('returns 400 when name is missing', async () => {
      const res = mockRes();
      await handler(
        mockReq({ body: { email: 'test@example.com', message: 'Hello' } }),
        res,
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'All fields are required',
      });
    });

    it('returns 400 when email is missing', async () => {
      const res = mockRes();
      await handler(mockReq({ body: { name: 'Test', message: 'Hello' } }), res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 400 when message is missing', async () => {
      const res = mockRes();
      await handler(
        mockReq({ body: { name: 'Test', email: 'test@example.com' } }),
        res,
      );
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 400 when all fields are whitespace only', async () => {
      const res = mockRes();
      await handler(
        mockReq({ body: { name: '   ', email: '   ', message: '   ' } }),
        res,
      );
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('email sending', () => {
    it('returns 200 on a successful send', async () => {
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('sends with the correct subject and reply-to address', async () => {
      const res = mockRes();
      await handler(mockReq(), res);
      expect(resendInstance.emails.send).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: 'test@example.com',
          subject: 'Portfolio contact from Test User',
        }),
      );
    });

    it('returns 500 when resend throws', async () => {
      resendInstance.emails.send.mockRejectedValueOnce(
        new Error('Resend error'),
      );
      const res = mockRes();
      await handler(mockReq(), res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Failed to send message. Please try again.',
      });
    });
  });
});
