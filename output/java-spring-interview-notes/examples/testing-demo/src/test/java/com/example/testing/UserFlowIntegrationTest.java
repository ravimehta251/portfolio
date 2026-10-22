package com.example.testing;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserFlowIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper json;

    @Test
    void createReadDeleteRoundTrip() throws Exception {
        var result = mvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"  Ravi  \"}"))
            .andExpect(status().isCreated())
            .andReturn();

        long id = json.readTree(result.getResponse().getContentAsString()).get("id").asLong();
        try {
            mvc.perform(get("/users/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Ravi"));
            mvc.perform(delete("/users/{id}", id))
                .andExpect(status().isNoContent());
            mvc.perform(get("/users/{id}", id))
                .andExpect(status().isNotFound());
        } finally {
            // Best-effort cleanup if an earlier assertion fails.
            mvc.perform(delete("/users/{id}", id));
        }
    }
}
