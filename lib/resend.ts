import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      return new Proxy({} as Resend, {
        get() {
          return () =>
            Promise.resolve({ data: null, error: { message: "No API key" } });
        },
      });
    }
    _resend = new Resend(key);
  }
  return _resend;
}

export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return (getResend() as any)[prop];
  },
});
