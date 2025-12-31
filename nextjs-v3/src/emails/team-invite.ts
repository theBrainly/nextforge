export function teamInviteTemplate(teamName: string, inviteeEmail: string) {
  return `
    <div>
      <h1>Team invitation</h1>
      <p>${inviteeEmail}, you have been invited to join ${teamName}.</p>
      <p>Log in to accept your invite and access your team workspace.</p>
    </div>
  `;
}
