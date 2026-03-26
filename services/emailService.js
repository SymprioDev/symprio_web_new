// Email service using MailerSend SDK - ES6 Module
import { MailerSend, EmailParams, Recipient } from 'mailersend';

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendEnquiryEmails(enquiry, config, companyEmail) {
  try {
    console.log("Sending enquiry emails...");

    if (!config || !config.apiKey || !config.domain) {
      console.error("Mail config is incomplete. API Key and Domain are required.");
      return;
    }

    if (!companyEmail) {
      console.error("Company email not provided");
      return;
    }

    const mailerSend = new MailerSend({
      apiKey: config.apiKey,
    });

    const {
      fullName,
      email,
      phone,
      companyName,
      service,
      message
    } = enquiry;

    console.log("Sending email to company:", companyEmail);

    // Email to Company
    const companyEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio'
      })
      .setTo([new Recipient(companyEmail, 'Admin')])
      .setSubject('New Enquiry Received - Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Enquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(fullName) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(email) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(phone) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(companyName) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(service) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(message) || 'N/A'}</td>
            </tr>
          </table>
        </div>
      `);

    await mailerSend.email.send(companyEmailParams);

    console.log("Sending confirmation email to user:", email);

    // Email to User
    const userEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio'
      })
      .setTo([new Recipient(email, fullName)])
      .setSubject('We Received Your Enquiry - Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Thank You for Your Enquiry!</h2>
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>We have received your enquiry and our team will get back to you shortly.</p>
          <p>Best regards,<br>The Symprio Team</p>
        </div>
      `);

    await mailerSend.email.send(userEmailParams);

    console.log("Emails sent successfully");

  } catch (error) {
    console.error("Email Service Error:", error.message);
    if (error.response) {
      console.error("MailerSend response:", error.response.body);
    }
  }
}

export async function sendSubscriptionEmails(subscription, userEmail, config, companyEmail) {
  try {
    console.log("Sending subscription emails...");

    if (!config || !config.apiKey || !config.domain) {
      console.error("Mail config is incomplete. API Key and Domain are required.");
      return;
    }

    if (!companyEmail) {
      console.error("Company email not provided");
      return;
    }

    const mailerSend = new MailerSend({
      apiKey: config.apiKey,
    });

    const {
      name,
      companyName,
      contactNumber,
      message,
      hours,
      rate,
      totalAmount
    } = subscription;

    console.log("Sending subscription email to company:", companyEmail);

    // Email to Company
    const companyEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio'
      })
      .setTo([new Recipient(companyEmail, 'Admin')])
      .setSubject('New Subscription Request - Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Subscription Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(name) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(companyName) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Contact Number:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(contactNumber) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(message) || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Subscription Hours:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${hours || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Rate per Hour:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">$${rate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; background-color: #f0fdf4;"><strong>Total Amount:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; background-color: #f0fdf4; font-weight: bold; color: #0891b2;">$${totalAmount || 'N/A'}</td>
            </tr>
          </table>
        </div>
      `);

    await mailerSend.email.send(companyEmailParams);

    console.log("Sending confirmation email to user:", userEmail);

    // Email to User
    const userEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio'
      })
      .setTo([new Recipient(userEmail, name)])
      .setSubject('Subscription Request Received - Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Thank You for Your Subscription Request!</h2>
          <p>Hi ${escapeHtml(name)},</p>
          <p>We have received your subscription request for <strong>${hours} hours</strong> at <strong>$${rate}/hour</strong>.</p>
          <p><strong>Total Amount:</strong> <span style="color: #0891b2; font-weight: bold;">$${totalAmount}</span></p>
          <p>Our team will review your request and contact you shortly.</p>
          <p>Best regards,<br>The Symprio Team</p>
        </div>
      `);

    await mailerSend.email.send(userEmailParams);

    console.log("Subscription emails sent successfully");

  } catch (error) {
    console.error("Subscription Email Error:", error.message);
    if (error.response) {
      console.error("MailerSend response:", error.response.body);
    }
  }
}

export async function sendTestEmail(apiKey, domain, companyEmail) {
  try {
    console.log("Sending test email...");

    if (!apiKey || !domain || !companyEmail) {
      console.error("Test email: Missing required parameters");
      return { success: false, message: "API Key, Domain, and Company Email are required" };
    }

    const mailerSend = new MailerSend({
      apiKey: apiKey,
    });

    const emailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + domain,
        name: 'Symprio Test'
      })
      .setTo([new Recipient(companyEmail, 'Admin')])
      .setSubject('Test Email from Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Test Email</h2>
          <p>This is a test email to verify your MailerSend configuration.</p>
          <p>If you received this email, your email settings are working correctly!</p>
          <p>Best regards,<br>The Symprio System</p>
        </div>
      `);

    await mailerSend.email.send(emailParams);
    console.log("Test email sent successfully");
    return { success: true };

  } catch (error) {
    const errMsg = error.message || error.body?.message || JSON.stringify(error.body || error);
    console.error("Test Email Error:", errMsg);
    console.error("Test Email Full Error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
    if (error.response) {
      console.error("MailerSend response:", JSON.stringify(error.response.body || error.response));
    }
    return { success: false, message: errMsg };
  }
}

export async function sendJobApplicationEmails(application, email, config, companyEmail) {
  try {
    console.log("Sending application emails...");

    if (!config || !config.apiKey || !config.domain) {
      console.error("Mail config is incomplete. API Key and Domain are required.");
      return;
    }

    if (!companyEmail) {
      console.error("Company email not provided");
      return;
    }

    const mailerSend = new MailerSend({
      apiKey: config.apiKey,
    });

    const {
      firstName,
      lastName,
      mobileNumber,
      coverLetter,
      jobTitle,
      cvFilePath
    } = application;

    const fullName = `${firstName} ${lastName}`;
    const mobile = mobileNumber || 'N/A';
    const position = jobTitle || 'General Position';

    console.log("Sending application email to company:", companyEmail);

    // Email to Company
    const companyEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio Careers'
      })
      .setTo([new Recipient(companyEmail, 'Admin')])
      .setSubject(`New Job Application Received - ${fullName}`)
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Job Application Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(fullName) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(email) || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${mobile}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Position:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(position)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Cover Letter:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${escapeHtml(coverLetter) || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>CV:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${cvFilePath ? `<a href="${cvFilePath}">View CV</a>` : 'Uploaded in system'}</td>
            </tr>
          </table>
        </div>
      `);

    await mailerSend.email.send(companyEmailParams);

    console.log("Sending confirmation email to applicant:", email);

    // Email to Applicant
    const userEmailParams = new EmailParams()
      .setFrom({
        email: "no-reply@" + config.domain,
        name: 'Symprio Careers'
      })
      .setTo([new Recipient(email, fullName)])
      .setSubject('Your Application Has Been Received - Symprio')
      .setHtml(`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Thank You for Applying!</h2>
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>We have received your job application for the position of ${escapeHtml(position)}.</p>
          <p>Our team will review your profile and contact you if your qualifications match our requirements.</p>
          <p>Thank you for your interest in joining Symprio.</p>
          <p>Best regards,<br>The Symprio Team</p>
        </div>
      `);

    await mailerSend.email.send(userEmailParams);

    console.log("Application emails sent successfully");

  } catch (error) {
    console.error("Application Email Error:", error.message);
    if (error.response) {
      console.error("MailerSend response:", error.response.body);
    }
  }
}
