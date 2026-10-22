package com.example.testing;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Repository;

@Repository
public class InMemoryUserRepository implements UserRepository {
    private final ConcurrentHashMap<Long, User> users = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong();

    @Override
    public Optional<User> findById(long id) { return Optional.ofNullable(users.get(id)); }

    @Override
    public User save(User user) {
        long id = user.id() == 0 ? sequence.incrementAndGet() : user.id();
        var saved = new User(id, user.name());
        users.put(id, saved);
        return saved;
    }

    @Override
    public boolean existsById(long id) { return users.containsKey(id); }

    @Override
    public void deleteById(long id) { users.remove(id); }
}
