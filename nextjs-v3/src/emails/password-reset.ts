export function passwordResetTemplate(url: string) {
  return `
    <div>
      <h1>Reset your password</h1>
      <p>Click below to set a new password:</p>
      <a href="${url}">Reset password</a>
    </div>
  `;
}
