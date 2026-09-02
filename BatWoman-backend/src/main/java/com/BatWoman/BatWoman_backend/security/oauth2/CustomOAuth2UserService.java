package com.BatWoman.BatWoman_backend.security.oauth2;

import com.BatWoman.BatWoman_backend.entity.User;
import com.BatWoman.BatWoman_backend.enums.AuthProvider;
import com.BatWoman.BatWoman_backend.enums.Role;
import com.BatWoman.BatWoman_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(
            OAuth2UserRequest userRequest
    ) throws OAuth2AuthenticationException {
        System.out.println("🔥🔥🔥 CUSTOM OAUTH2 USER SERVICE WAS CALLED 🔥🔥🔥");

        OAuth2User oauth2User = super.loadUser(userRequest);

        String providerId = oauth2User.getAttribute("sub");
        String email = oauth2User.getAttribute("email");
        String firstName = oauth2User.getAttribute("given_name");
        String lastName = oauth2User.getAttribute("family_name");

        System.out.println("========================================");
        System.out.println("GOOGLE OAUTH2 USER");
        System.out.println("Email: " + email);
        System.out.println("Provider ID: " + providerId);
        System.out.println("First Name: " + firstName);
        System.out.println("Last Name: " + lastName);
        System.out.println("========================================");

        if (email == null || email.isBlank()) {
            throw new OAuth2AuthenticationException(
                    "Google account did not provide an email address."
            );
        }

        Optional<User> optionalUser =
                userRepository.findByEmail(email);

        User user;

        if (optionalUser.isPresent()) {

            user = optionalUser.get();

            user.setLastLogin(OffsetDateTime.now());
            user.setUpdatedAt(OffsetDateTime.now());

            /*
             * Associate the existing account with Google.
             */
            user.setProvider(AuthProvider.GOOGLE);
            user.setProviderId(providerId);
            user.setVerified(true);
            user.setActive(true);

        } else {

            user = User.builder()
                    .id(UUID.randomUUID())
                    .firstName(
                            firstName != null && !firstName.isBlank()
                                    ? firstName
                                    : "Google"
                    )
                    .lastName(lastName)
                    .email(email)
                    .passwordHash(
                            passwordEncoder.encode(
                                    UUID.randomUUID().toString()
                            )
                    )
                    .provider(AuthProvider.GOOGLE)
                    .providerId(providerId)
                    .role(Role.USER)
                    .verified(true)
                    .active(true)
                    .createdAt(OffsetDateTime.now())
                    .updatedAt(OffsetDateTime.now())
                    .lastLogin(OffsetDateTime.now())
                    .build();
        }

        user = userRepository.saveAndFlush(user);

        System.out.println("========================================");
        System.out.println("GOOGLE USER SAVED");
        System.out.println("Database ID: " + user.getId());
        System.out.println("Database Email: " + user.getEmail());
        System.out.println("Provider: " + user.getProvider());
        System.out.println("Provider ID: " + user.getProviderId());
        System.out.println("========================================");

        return new DefaultOAuth2User(
                Collections.singleton(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                ),
                oauth2User.getAttributes(),
                "email"
        );
    }
}