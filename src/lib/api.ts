const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

/**
 * Register a new organization
 */
export async function registerOrganization(name: string, emailIds: string[]) {
    const res = await fetch(`${BACKEND_URL}/api/organizations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emailIds })
    });
    return await res.json();
}

/**
 * Initiate KYC workflow
 */
export async function initiateKYC(organizationNameId: string) {
    const res = await fetch(`${BACKEND_URL}/api/kyc/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationNameId })
    });
    return await res.json();
}

/**
 * Get CheckIn status (Polling)
 */
export async function getCheckInStatus(checkInId: string) {
    const res = await fetch(`${BACKEND_URL}/api/kyc/status/${checkInId}`);
    return await res.json();
}

/**
 * Get organization details
 */
export async function getOrganizationDetails(nameId: string) {
    const res = await fetch(`${BACKEND_URL}/api/organizations/${nameId}`);
    return await res.json();
}
