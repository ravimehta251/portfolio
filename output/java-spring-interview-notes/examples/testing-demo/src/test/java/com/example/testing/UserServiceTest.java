package com.example.testing;

import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    UserRepository repository;

    @InjectMocks
    UserService service;

    @Test
    void getsExistingUser() {
        var user = new User(1, "Ravi");
        when(repository.findById(1)).thenReturn(Optional.of(user));
        User actual = service.getUserById(1);
        assertEquals(user, actual);
        verify(repository).findById(1);
    }

    @Test
    void missingUserThrows() {
        when(repository.findById(99)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> service.getUserById(99));
    }

    @Test
    void createsUserWithTrimmedName() {
        var input = new User(0, "Ravi");
        var saved = new User(10, "Ravi");
        when(repository.save(input)).thenReturn(saved);
        User actual = service.createUser("  Ravi  ");
        assertAll(
            () -> assertEquals(10, actual.id()),
            () -> assertEquals("Ravi", actual.name()));
        verify(repository).save(input);
    }

    @Test
    void blankNameIsRejectedWithoutRepositoryCall() {
        assertThrows(IllegalArgumentException.class, () -> service.createUser("   "));
        verifyNoInteractions(repository);
    }

    @Test
    void deletesExistingUser() {
        when(repository.existsById(1)).thenReturn(true);
        service.deleteUser(1);
        verify(repository).deleteById(1);
    }

    @Test
    void missingUserIsNotDeleted() {
        when(repository.existsById(99)).thenReturn(false);
        assertThrows(UserNotFoundException.class, () -> service.deleteUser(99));
        verify(repository, never()).deleteById(anyLong());
    }
}
