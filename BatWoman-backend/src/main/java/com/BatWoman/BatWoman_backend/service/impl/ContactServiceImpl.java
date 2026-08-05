package com.BatWoman.BatWoman_backend.service.impl;

import com.BatWoman.BatWoman_backend.dto.contact.ContactRequest;
import com.BatWoman.BatWoman_backend.exception.ValidationException;
import com.BatWoman.BatWoman_backend.service.ContactService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final JavaMailSender mailSender;

    @Value("${contact.support-email}")

    private String supportEmail;

    @Override
    public void sendMessage(ContactRequest request) {

        try {

            MimeMessage mimeMessage = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            mimeMessage,
                            false,
                            "UTF-8"
                    );

            helper.setTo(supportEmail);

            helper.setReplyTo(request.email());

            helper.setSubject(
                    "New Customer Enquiry - " + request.name()
            );

            helper.setText(buildEmailBody(request));

            mailSender.send(mimeMessage);

            log.info(
                    "Customer enquiry email sent successfully from {}",
                    request.email()
            );

        } catch (MessagingException | MailException ex) {

            log.error(
                    "Failed to send customer enquiry email.",
                    ex
            );

            throw new ValidationException(
                    "Unable to send your message at the moment. Please try again later."
            );
        }
    }

    private String buildEmailBody(ContactRequest request) {

        return """
                =====================================================

                         NEW CUSTOMER ENQUIRY

                =====================================================

                Name:
                %s

                Email:
                %s

                Phone:
                %s

                Order Number:
                %s

                -----------------------------------------------------

                Message

                %s

                =====================================================
                """
                .formatted(
                        request.name(),
                        request.email(),
                        request.phone(),
                        request.orderNumber() == null
                                || request.orderNumber().isBlank()
                                ? "Not Provided"
                                : request.orderNumber(),
                        request.message()
                );
    }

}
