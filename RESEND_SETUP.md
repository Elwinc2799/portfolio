# Resend Setup Instructions

## Quick Start

1. **Sign up:** https://resend.com
2. **Get API key:** Dashboard → API Keys → Create
3. **Add to Vercel:**
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   CONTACT_EMAIL=elwinczh@gmail.com
   ```
4. **Redeploy**

## Detailed Steps

### 1. Create Resend Account

- Go to https://resend.com
- Sign up with GitHub or email
- Verify your email

### 2. Get API Key

- Navigate to: Dashboard → API Keys
- Click "Create API Key"
- Name it: "Portfolio Contact Form"
- **Copy the key** (starts with `re_`) — you won't see it again!

### 3. Add Environment Variables to Vercel

1. Go to Vercel Dashboard
2. Select your portfolio project
3. Go to **Settings → Environment Variables**
4. Add two variables:

**Variable 1:**
- Key: `RESEND_API_KEY`
- Value: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your API key)
- Environments: Check all (Production, Preview, Development)

**Variable 2:**
- Key: `CONTACT_EMAIL`
- Value: `elwinczh@gmail.com` (or your preferred email)
- Environments: Check all

5. Click **Save**
6. **Important:** Redeploy your site for changes to take effect
   - Go to Deployments tab
   - Click "..." on latest deployment → Redeploy

### 4. Test Contact Form

1. Visit your live site: https://portfolio-elwinc2799.vercel.app/
2. Scroll to Contact section
3. Fill out the form and submit
4. Check your email (look in Spam folder too)

### 5. Monitor Emails (Optional)

- Resend Dashboard → Logs
- See all sent emails, delivery status, and errors
- Free tier: 3,000 emails/month, 100 emails/day

## Troubleshooting

**No emails received?**
1. Check Vercel logs: Deployments → [latest] → Functions → View Logs
2. Check Resend logs: https://resend.com/logs
3. Verify `RESEND_API_KEY` is set in Vercel (Settings → Environment Variables)
4. Try redeploying

**Emails in spam?**
- This is normal for `onboarding@resend.dev` sender
- To fix: Verify a custom domain in Resend (see below)

**Rate limits?**
- Free tier: 100 emails/day, 3,000/month
- If exceeded, upgrade to paid plan or wait for reset

## Advanced: Custom Email Domain (Optional)

To send from `contact@yourdomain.com` instead of `onboarding@resend.dev`:

1. **Verify domain in Resend:**
   - Dashboard → Domains → Add Domain
   - Enter your domain (e.g., `yourdomain.com`)
   - Add DNS records (TXT, MX, CNAME) to your domain provider

2. **Update code:**
   ```typescript
   // pages/api/contact.ts
   from: "Elwin Chiong <contact@yourdomain.com>",
   ```

3. **Redeploy**

## Support

- Resend Docs: https://resend.com/docs
- Resend Support: https://resend.com/support
- Portfolio Issue: Email elwinczh@gmail.com
