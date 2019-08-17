const permissions = {
  canSignIn: ["ninja", "mentor", "admin"],
  canSeeWeekCode: ["mentor", "dojoManager", "multiDojoManager", "admin"],
  canSeeNinjaProfile: ["mentor", "dojoManager", "multiDojoManager", "admin"],
  canSeeGuardianProfile: ["mentor", "dojoManager", "multiDojoManager", "admin"],
  canSeeMentorProfile: ["dojoManager", "multiDojoManager", "admin"],
  canSeeAnalytics: ["mentor", "dojoManager", "multiDojoManager", "admin"]
};

export default permissions;
