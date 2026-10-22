package com.example.testing;

import java.util.Optional;

public interface UserRepository {
    Optional<User> findById(long id);
    User save(User user);
    boolean existsById(long id);
    void deleteById(long id);
}
