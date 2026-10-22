package com.example.testing;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) { this.repository = repository; }

    public User getUserById(long id) {
        requirePositiveId(id);
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    public User createUser(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name must not be blank");
        }
        return repository.save(new User(0, name.trim()));
    }

    public void deleteUser(long id) {
        requirePositiveId(id);
        if (!repository.existsById(id)) throw new UserNotFoundException(id);
        repository.deleteById(id);
    }

    private static void requirePositiveId(long id) {
        if (id <= 0) throw new IllegalArgumentException("ID must be positive");
    }
}
