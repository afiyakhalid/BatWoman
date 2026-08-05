package com.BatWoman.BatWoman_backend.service;

import com.BatWoman.BatWoman_backend.dto.contact.ContactRequest;

public interface ContactService {

    void sendMessage(ContactRequest request);

}