package com.imagegen.cloud;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ImageService {

    @Value("${cloudflare.api.token}")
    private String apiToken;

    @Value("${cloudflare.account.id}")
    private String accountId;

    public byte[] generateImage(String prompt) {

        WebClient webClient = WebClient.builder()
                .baseUrl(
                        "https://api.cloudflare.com/client/v4/accounts/"
                                + accountId
                                + "/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0"
                )
                .defaultHeader("Authorization", "Bearer " + apiToken)
                .exchangeStrategies(
                        ExchangeStrategies.builder()
                                .codecs(configurer ->
                                        configurer.defaultCodecs()
                                                .maxInMemorySize(20 * 1024 * 1024))
                                .build())
                .build();

        Map<String, String> body = Map.of(
                "prompt", prompt
        );

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.IMAGE_PNG)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}