
package com.shopease.backend.service;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import com.shopease.backend.entity.Visitor;
import com.shopease.backend.repository.VisitorRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorService {

    private final VisitorRepository visitorRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public VisitorService(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    // Find the country associated with an IP address
    public Visitor lookupAndSave(String ipAddress, boolean simulated) {

        try {
            String url = "https://ipwho.is/" + ipAddress;

            String response = restTemplate.getForObject(
                    url, String.class
            );

            JsonNode json = objectMapper.readTree(response);

            if (!json.path("success").asBoolean()) {
                throw new RuntimeException("IP lookup failed");
            }

            String country = json.path("country").asText();

            Visitor visitor = new Visitor();

            visitor.setIpAddress(ipAddress);
            visitor.setCountry(country);
            visitor.setVisitedAt(LocalDateTime.now());
            visitor.setSimulated(simulated);

            return visitorRepository.save(visitor);

        } catch (Exception e) {
            throw new RuntimeException(
                    "Unable to identify country for IP: " + ipAddress, e
            );
        }
    }
    public List<Visitor> getAllVisitors() {
    return visitorRepository.findAll();
}
}
