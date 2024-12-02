package com.example.demo.Service;
import com.example.demo.Entity.User_entity;
import com.example.demo.Repository.User_repository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
public class user_Test {


    @InjectMocks
    private User_service userService;

    @Mock
    private User_repository userRepo;

    private User_entity user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User_entity("John Doe", "password123", "johndoe@example.com", "1234567890", "12345678-9", 30, true, 5, 2, 3, 10000.0, false);
    }

    @Test
    void testGetAll() {
        // Given
        when(userRepo.findAll()).thenReturn(List.of(user));

        // When
        List<User_entity> result = userService.getall();

        // Then
        assertThat(result).containsExactly(user);
        verify(userRepo, times(1)).findAll();
    }

    @Test
    void testRegister_NewUser() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(null);
        when(userRepo.save(any(User_entity.class))).thenReturn(user);

        // When
        User_entity result = userService.register(user.getUsername(), user.getPassword(), user.getEmail(), user.getPhone(), user.getRut(), user.getAge(), user.isEmployee(), user.getAccount_seniority(), user.getWork_seniority(), user.getSaving_capacity(), user.getBalance(), user.isIndependent());

        // Then
        assertThat(result).isEqualTo(user);
        verify(userRepo, times(1)).save(any(User_entity.class));
    }

    @Test
    void testRegister_ExistingUser() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        User_entity result = userService.register(user.getUsername(), user.getPassword(), user.getEmail(), user.getPhone(), user.getRut(), user.getAge(), user.isEmployee(), user.getAccount_seniority(), user.getWork_seniority(), user.getSaving_capacity(), user.getBalance(), user.isIndependent());

        // Then
        assertNull(result); // Se espera null cuando el usuario ya existe
        verify(userRepo, never()).save(any(User_entity.class));
    }

    @Test
    void testRegister_MissingFields() {
        // Given: Missing name field
        User_entity result = userService.register("", user.getPassword(), user.getEmail(), user.getPhone(), user.getRut(), user.getAge(), user.isEmployee(), user.getAccount_seniority(), user.getWork_seniority(), user.getSaving_capacity(), user.getBalance(), user.isIndependent());

        // Then
        assertNull(result); // Se espera null cuando los campos requeridos faltan
        verify(userRepo, never()).save(any(User_entity.class));
    }

    @Test
    void testLogin_Success() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        int result = userService.login(user.getEmail(), user.getPassword());

        // Then
        assertEquals(1, result);
    }

    @Test
    void testLogin_UserNotFound() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(null);

        // When
        int result = userService.login(user.getEmail(), user.getPassword());

        // Then
        assertEquals(-1, result);
    }

    @Test
    void testLogin_IncorrectPassword() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        int result = userService.login(user.getEmail(), "wrongPassword");

        // Then
        assertEquals(0, result);
    }

    @Test
    void testGetUserByEmail() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        User_entity result = userService.getUser_byemail(user.getEmail());

        // Then
        assertThat(result).isEqualTo(user);
        verify(userRepo, times(1)).findByEmail(user.getEmail());
    }

    @Test
    void testGetUserById() {
        // Given
        long userId = 1L;
        when(userRepo.findById(userId)).thenReturn(user);

        // When
        User_entity result = userService.getUser_byid(userId);

        // Then
        assertThat(result).isEqualTo(user);
        verify(userRepo, times(1)).findById(userId);
    }

    @Test
    void testIsEmployee_True() {
        // Given
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        boolean result = userService.isemployee(user.getEmail());

        // Then
        assertThat(result).isTrue();
    }

    @Test
    void testIsEmployee_False() {
        // Given
        user.setEmployee(false);
        when(userRepo.findByEmail(user.getEmail())).thenReturn(user);

        // When
        boolean result = userService.isemployee(user.getEmail());

        // Then
        assertThat(result).isFalse();
    }
}
