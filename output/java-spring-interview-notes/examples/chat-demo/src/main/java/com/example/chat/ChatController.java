package com.example.chat;

import jakarta.validation.Valid;
import java.time.Instant;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public ChatMessage send(@Valid ChatInput input) {
        return new ChatMessage(input.sender().trim(), input.content().trim(), Instant.now());
    }

    @MessageExceptionHandler(Exception.class)
    @SendToUser(value = "/queue/errors", broadcast = false)
    public String invalidMessage(Exception exception) {
        return "Message rejected. Check the sender and content limits.";
    }
}
