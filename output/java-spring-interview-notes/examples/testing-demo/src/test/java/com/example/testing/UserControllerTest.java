package com.example.testing;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired
    MockMvc mvc;

    @MockitoBean
    UserService service;

    @Test
    void getReturnsJson() throws Exception {
        when(service.getUserById(1)).thenReturn(new User(1, "Ravi"));
        mvc.perform(get("/users/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("Ravi"));
    }

    @Test
    void missingUserReturns404() throws Exception {
        when(service.getUserById(99)).thenThrow(new UserNotFoundException(99));
        mvc.perform(get("/users/99"))
            .andExpect(status().isNotFound());
    }

    @Test
    void postReturnsCreatedAndLocation() throws Exception {
        when(service.createUser("Ravi")).thenReturn(new User(10, "Ravi"));
        mvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Ravi\"}"))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", "/users/10"))
            .andExpect(jsonPath("$.id").value(10));
    }

    @Test
    void blankNameReturns400BeforeService() throws Exception {
        mvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"   \"}"))
            .andExpect(status().isBadRequest());
        verifyNoInteractions(service);
    }

    @Test
    void deleteReturnsNoContent() throws Exception {
        mvc.perform(delete("/users/1"))
            .andExpect(status().isNoContent())
            .andExpect(content().string(""));
        verify(service).deleteUser(1);
    }
}
