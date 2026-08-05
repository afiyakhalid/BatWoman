package com.BatWoman.BatWoman_backend.controller;

import com.BatWoman.BatWoman_backend.dto.contact.ContactRequest;
import com.BatWoman.BatWoman_backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Void> sendMessage(

            @Valid
            @RequestBody
            ContactRequest request

    ) {

        contactService.sendMessage(request);

        return ResponseEntity.noContent().build();

    }

}
