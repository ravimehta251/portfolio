package com.example.testing;

public class Calculator {
    public int add(int left, int right) { return left + right; }
    public boolean isEven(int value) { return value % 2 == 0; }
    public int divide(int left, int right) {
        if (right == 0) throw new IllegalArgumentException("Divisor must not be zero");
        return left / right;
    }
}
