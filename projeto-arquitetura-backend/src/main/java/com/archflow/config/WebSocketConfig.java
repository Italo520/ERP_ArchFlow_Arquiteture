package com.archflow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefixo para mensagens enviadas do servidor para o cliente
        config.enableSimpleBroker("/topic", "/queue");
        // Prefixo para mensagens enviadas do cliente para o servidor
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Endpoint para conexão do cliente (SockJS)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Permitir qualquer origem em desenvolvimento
                .withSockJS();
    }
}
