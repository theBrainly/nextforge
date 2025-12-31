export const featureFlags = {
  teamInvites: true,
  auditLogs: true,
  billingPortal: true
};

export function isFeatureEnabled(flag: keyof typeof featureFlags) {
  return featureFlags[flag];
}
