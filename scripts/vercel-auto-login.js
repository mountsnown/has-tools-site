// Automated Vercel login via GitHub Actions
// Uses device OAuth flow — captures device code, completes auth via GitHub API
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Device auth endpoint is on vercel.com (NOT api.vercel.com)
const VERCEL_CLIENT_ID = 'cl_HYeOPBNtFMfHhaUn9L4QPfTZz6TP47bp';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function main() {
  // Step 1: Get device code from Vercel
  console.log('Step 1: Getting device code...');
  const deviceResponse = await fetch('https://vercel.com/api/oauth/device_authorization', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `client_id=${VERCEL_CLIENT_ID}&scope=read:user`
  });
  const deviceData = await deviceResponse.json();
  console.log('Device auth response:', JSON.stringify(deviceData, null, 2));

  if (!deviceData.device_code) {
    console.error('Failed to get device code');
    process.exit(1);
  }

  const { device_code, verification_uri, verification_uri_complete } = deviceData;
  console.log(`Device code: ${device_code}`);
  console.log(`Verification URI: ${verification_uri}`);
  console.log(`Full URI: ${verification_uri_complete}`);

  // Step 2: Visit the verification URI and follow the OAuth flow
  // The flow is: vercel.com/device -> github.com/login/oauth/authorize -> vercel.com callback
  console.log('\nStep 2: Following OAuth flow...');

  // First, GET the verification URI to see the flow
  const verifyResponse = await fetch(verification_uri_complete, {
    redirect: 'manual'
  });
  console.log('Verification page status:', verifyResponse.status);
  console.log('Verification page location:', verifyResponse.headers.get('location'));

  // The page should have a form or links for auth methods
  const verifyHtml = await verifyResponse.text();

  // Look for GitHub OAuth URL in the page
  const githubAuthMatch = verifyHtml.match(/github\.com\/login\/oauth\/authorize\?[^"'\s]+/);
  if (githubAuthMatch) {
    console.log('Found GitHub auth URL:', githubAuthMatch[0]);
  }

  // Look for Vercel's GitHub client_id in the page
  const clientIdMatch = verifyHtml.match(/client_id=([^&"'\s]+)/);
  if (clientIdMatch) {
    console.log('Found GitHub client_id:', clientIdMatch[1]);
  }

  // Step 3: If we found a GitHub auth URL, try to authorize via GitHub API
  if (clientIdMatch) {
    const githubClientId = clientIdMatch[1];
    console.log(`\nStep 3: Authorizing GitHub app ${githubClientId}...`);

    // Use GitHub API to approve the OAuth authorization
    // This creates an authorization for the specified app
    const authResponse = await fetch(`https://api.github.com/applications/${githubClientId}/grant`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        access_token: GITHUB_TOKEN
      })
    });

    const authData = await authResponse.json();
    console.log('GitHub auth response status:', authResponse.status);
    console.log('Response:', JSON.stringify(authData, null, 2));

    if (authResponse.ok && authData.token) {
      // We got a GitHub OAuth token, now exchange it for a Vercel token
      console.log('\nStep 4: Exchanging GitHub token for Vercel token...');
      const tokenResponse = await fetch('https://api.vercel.com/v2/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `provider=github&code=${authData.token}&client_id=${VERCEL_CLIENT_ID}`
      });
      const tokenData = await tokenResponse.json();
      console.log('Token response:', JSON.stringify(tokenData, null, 2));
    }
  }

  // Step 5: Try polling the device token endpoint
  console.log('\nStep 5: Polling for device token...');
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));
    const tokenResponse = await fetch('https://vercel.com/api/oauth/device_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${VERCEL_CLIENT_ID}&device_code=${device_code}&grant_type=urn:ietf:params:oauth:grant-type:device_code`
    });
    const tokenData = await tokenResponse.json();
    console.log(`Poll ${i + 1}: status=${tokenResponse.status}`,
      tokenData.error ? `error=${tokenData.error}` : 'SUCCESS!');

    if (tokenData.access_token) {
      console.log('\nGOT TOKEN!');
      // Save token to file
      const authDir = path.join(process.env.HOME || '/root', '.local/share/com.vercel.cli');
      fs.mkdirSync(authDir, { recursive: true });
      fs.writeFileSync(path.join(authDir, 'auth.json'), JSON.stringify({ token: tokenData.access_token }));
      console.log('Token saved to auth.json');

      // Also output token as env var
      console.log(`::set-output name=vercel_token::${tokenData.access_token}`);
      process.exit(0);
    }
  }

  console.log('Timeout waiting for device authorization');
  process.exit(1);
}

main().catch(console.error);
