'use server';

export default async function validateTheme(theme: string) {
  if (!theme || typeof theme !== 'string') return false;

  const sanitized = theme.trim();

  // 1. Length Check:
  // Prompt injections often require verbose explanations to override rules.
  // A game theme usually doesn't need more than 100-150 characters.
  if (sanitized.length < 3 || sanitized.length > 200) {
    return false;
  }

  // 2. Keyword Blocking (Regex):
  // We check for the specific prohibited topics you listed.
  // The 'i' flag makes it case-insensitive.
  const prohibitedPatterns = [
    /system prompt/i,
    /ignore (previous )?instruction/i,
    /json format/i,
    /external tool/i,
    /change rule/i,
    /new rule/i,
    /you are a/i, // attempting to redefine roles
    /your role is/i,
    /override/i,
  ];

  // If any pattern matches, reject the input
  for (const pattern of prohibitedPatterns) {
    if (pattern.test(sanitized)) {
      console.warn(`Blocked potential injection: "${sanitized}" matching ${pattern}`);
      return false;
    }
  }

  return true;
}