package com.BatWoman.BatWoman_backend.exception;

import com.BatWoman.BatWoman_backend.dto.common.ErrorResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.OffsetDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(

            ResourceNotFoundException ex) {

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.NOT_FOUND.value(),

                HttpStatus.NOT_FOUND.getReasonPhrase(),

                ex.getMessage(),

                List.of()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(

            ValidationException ex) {

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.BAD_REQUEST.value(),

                HttpStatus.BAD_REQUEST.getReasonPhrase(),

                ex.getMessage(),

                List.of()
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodValidation(

            MethodArgumentNotValidException ex) {

        List<String> details = ex.getBindingResult()

                .getFieldErrors()

                .stream()

                .map(FieldError::getDefaultMessage)

                .toList();

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.BAD_REQUEST.value(),

                HttpStatus.BAD_REQUEST.getReasonPhrase(),

                "Validation failed.",

                details
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraint(

            ConstraintViolationException ex) {

        List<String> details = ex.getConstraintViolations()

                .stream()

                .map(v -> v.getMessage())

                .toList();

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.BAD_REQUEST.value(),

                HttpStatus.BAD_REQUEST.getReasonPhrase(),

                "Constraint violation.",

                details
        );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(

            AccessDeniedException ex) {

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.FORBIDDEN.value(),

                HttpStatus.FORBIDDEN.getReasonPhrase(),

                "Access denied.",

                List.of()
        );

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(

            Exception ex) {

        ErrorResponse response = new ErrorResponse(

                OffsetDateTime.now(),

                HttpStatus.INTERNAL_SERVER_ERROR.value(),

                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),

                ex.getMessage(),

                List.of()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}