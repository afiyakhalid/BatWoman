package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendPasswordResetOtp(String toEmail, String otpCode) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("BatWoman - Password Reset Verification Code");

            String html = """
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #eee; border-radius: 16px;">
                    <h1 style="text-align: center; font-size: 24px; letter-spacing: 3px; margin-bottom: 24px; color: #111;">BATWOMAN</h1>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0 24px 0;" />
                    <p style="font-size: 15px; color: #333;">Hello,</p>
                    <p style="font-size: 14px; color: #666; line-height: 1.6;">
                        You recently requested to reset the password for your BatWoman account. Enter the verification code below:
                    </p>
                    <div style="text-align: center; margin: 32px 0;">
                        <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #000; background: #f5f5f5; padding: 14px 28px; border-radius: 8px; display: inline-block;">
                            %s
                        </span>
                    </div>
                    <p style="font-size: 13px; color: #888; text-align: center;">
                        This code will expire in <strong>10 minutes</strong>.
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;" />
                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                        If you did not request this, you can safely ignore this email.
                    </p>
                </div>
            """.formatted(otpCode);

            helper.setText(html, true);
            mailSender.send(mimeMessage);
            log.info("Password reset OTP sent to {}", toEmail);

        } catch (MessagingException | MailException ex) {
            log.error("Failed to send reset code email to {}", toEmail, ex);
            throw new ValidationException("Unable to send verification email. Please try again later.");
        }
    }
}
