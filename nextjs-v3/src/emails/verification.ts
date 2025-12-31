export function verificationEmailTemplate(url: string) {
  return `
    <div>
      <h1>Verify your email</h1>
      <p>Please confirm your account by clicking the link below:</p>
      <a href="${url}">Verify email</a>
    </div>
  `;
}
