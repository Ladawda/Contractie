import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://joinguild.app";

type RoleConfig = {
  roleName: string;
  roleEmoji: string;
  heroColor: string;
  ctaHtml: string;
  ctaText: string;
};

function getRoleConfig(role: string): RoleConfig {
  switch (role) {
    case "quest_giver":
      return {
        roleName: "Quest Giver",
        roleEmoji: "\u{1F3F0}",
        heroColor: "#F97316",
        ctaHtml:
          "As a Quest Giver, you'll be able to post jobs and find verified contractors — with your first month completely free.",
        ctaText:
          "As a Quest Giver, you'll post jobs and find verified contractors — first month free.",
      };
    case "both":
      return {
        roleName: "Quest Giver & Adventurer",
        roleEmoji: "\u{2694}\uFE0F\u{1F3F0}",
        heroColor: "#0D9488",
        ctaHtml:
          "You've signed up as both a Quest Giver and an Adventurer — the best of both worlds. Post quests <em>and</em> pick them up. Your first month posting is free, and as one of the first 100 adventurers you lock in $25/mo forever.",
        ctaText:
          "You've signed up as both a Quest Giver and an Adventurer — the best of both worlds. Post quests and pick them up. Your first month posting is free, and as one of the first 100 adventurers you lock in $25/mo forever.",
      };
    default:
      return {
        roleName: "Adventurer",
        roleEmoji: "\u{2694}\uFE0F",
        heroColor: "#2563EB",
        ctaHtml:
          "As an Adventurer, you'll get matched with real quests from verified clients. First 100 adventurers lock in $25/mo forever.",
        ctaText:
          "As an Adventurer, you'll get matched with real quests. First 100 lock in $25/mo forever.",
      };
  }
}

export async function sendWelcomeEmail(
  email: string,
  role: string,
  unsubscribeToken: string
) {
  const config = getRoleConfig(role);
  const unsubscribeUrl = `${BASE_URL}/unsubscribe?token=${unsubscribeToken}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Guild <noreply@joinguild.app>",
      to: [email],
      subject: `${config.roleEmoji} Welcome to the Guild, ${config.roleName}!`,
      html: buildWelcomeHtml(config, unsubscribeUrl),
      text: buildWelcomeText(config, unsubscribeUrl),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
      tags: [
        { name: "type", value: "welcome" },
        { name: "role", value: role },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (e) {
    console.error("Failed to send welcome email:", e);
    return { success: false, error: "Email send failed" };
  }
}

function buildWelcomeHtml(config: RoleConfig, unsubscribeUrl: string): string {
  const { roleName, roleEmoji, heroColor, ctaHtml } = config;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563EB,#0D9488);padding:32px 40px;text-align:center;">
              <img src="https://tdhxydzsguacwuwtledk.supabase.co/storage/v1/object/public/Logo/logo.svg" alt="Guild" height="36" style="height:36px;width:auto;" />
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#1a1a1a;line-height:1.3;">
                Quest Accepted! ${roleEmoji}
              </h1>
              <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
                You've been added to the Guild waitlist as a <strong style="color:${heroColor};">${roleName}</strong>.
              </p>

              <div style="background-color:#f9fafb;border-radius:12px;padding:20px 24px;margin-bottom:24px;border-left:3px solid ${heroColor};">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                  ${ctaHtml}
                </p>
              </div>

              <h2 style="margin:0 0 12px;font-size:16px;font-weight:600;color:#1a1a1a;">What happens next?</h2>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#4b5563;line-height:1.5;">
                    <span style="color:${heroColor};font-weight:600;">1.</span> &nbsp;We're building the platform right now
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#4b5563;line-height:1.5;">
                    <span style="color:${heroColor};font-weight:600;">2.</span> &nbsp;You'll get early access before public launch
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:14px;color:#4b5563;line-height:1.5;">
                    <span style="color:${heroColor};font-weight:600;">3.</span> &nbsp;Founding member pricing is locked in forever
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <div style="border-top:1px solid #e5e7eb;padding-top:24px;">
                <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;line-height:1.5;">
                  You're receiving this because you signed up at <a href="https://joinguild.app" style="color:#2563EB;text-decoration:none;">joinguild.app</a>.<br />
                  No lead fees. No commissions. No BS.
                </p>
                <p style="margin:0;font-size:11px;">
                  <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a>
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function buildWelcomeText(config: RoleConfig, unsubscribeUrl: string): string {
  const { roleName, ctaText } = config;

  return `
Quest Accepted!

You've been added to the Guild waitlist as a ${roleName}.

${ctaText}

What happens next?
1. We're building the platform right now
2. You'll get early access before public launch
3. Founding member pricing is locked in forever

No lead fees. No commissions. No BS.

— The Guild Team
https://joinguild.app

Unsubscribe: ${unsubscribeUrl}
`.trim();
}
