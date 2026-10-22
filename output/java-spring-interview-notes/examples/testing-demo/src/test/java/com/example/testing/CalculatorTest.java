package com.example.testing;

import java.util.Map;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calculator;

    @BeforeAll
    static void beforeClass() { System.out.println("Before all calculator tests"); }

    @BeforeEach
    void setUp() { calculator = new Calculator(); }

    @AfterEach
    void tearDown() { calculator = null; }

    @AfterAll
    static void afterClass() { System.out.println("After all calculator tests"); }

    @Test
    @DisplayName("Adds two integers")
    void addsNumbers() {
        int actual = calculator.add(2, 3);
        assertEquals(5, actual);
        assertNotEquals(6, actual);
    }

    @ParameterizedTest
    @ValueSource(ints = {-2, 0, 2, 10})
    void identifiesEvenNumbers(int value) {
        assertTrue(calculator.isEven(value));
    }

    @Test
    void rejectsZeroDivisor() {
        var error = assertThrows(IllegalArgumentException.class,
            () -> calculator.divide(10, 0));
        assertEquals("Divisor must not be zero", error.getMessage());
    }

    @Test
    void groupsIndependentChecks() {
        var names = Map.of(1L, "Ravi");
        assertAll("basic behavior",
            () -> assertEquals(3, calculator.divide(7, 2)),
            () -> assertFalse(calculator.isEven(3)),
            () -> assertNotNull(names.get(1L)),
            () -> assertNull(names.get(99L)));
    }

    @Disabled("Demonstrates a skipped test; remove when studying real test failures")
    @Test
    void skippedExample() { assertEquals(4, calculator.add(2, 2)); }
}
