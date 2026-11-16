
package com.shopease.backend.controller;

import com.shopease.backend.entity.Visitor;
import com.shopease.backend.service.VisitorService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "*")
public class VisitorController {

    private final VisitorService visitorService;

    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    // Simulate one visitor
    @PostMapping("/simulate")
    public ResponseEntity<?> simulateVisitor(@RequestParam String ip) {
        if (!isValidIp(ip)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid IP address"));
        }

        try {
            Visitor visitor = visitorService.lookupAndSave(ip, true);
            return ResponseEntity.ok(visitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Simulate multiple visitors
    @PostMapping("/simulate/bulk")
    public ResponseEntity<?> simulateMultipleVisitors(
            @RequestBody List<String> ips) {

        if (ips == null || ips.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "IP list cannot be empty"));
        }

        if (ips.size() > 50) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Maximum 50 IPs allowed per request"));
        }

        List<Visitor> savedVisitors = new ArrayList<>();
        List<Map<String, String>> errors = new ArrayList<>();

        for (String ip : ips) {

            if (!isValidIp(ip)) {
                errors.add(Map.of(
                        "ip", ip == null ? "null" : ip,
                        "error", "Invalid IP address"
                ));
                continue;
            }

            try {
                Visitor visitor = visitorService.lookupAndSave(ip, true);
                savedVisitors.add(visitor);

            } catch (Exception e) {
                errors.add(Map.of(
                        "ip", ip,
                        "error", e.getMessage()
                ));
            }
        }

        return ResponseEntity.ok(Map.of(
                "requested", ips.size(),
                "saved", savedVisitors.size(),
                "failed", errors.size(),
                "visitors", savedVisitors,
                "errors", errors
        ));
    }

    private boolean isValidIp(String ip) {
        if (ip == null || ip.isBlank() || ip.length() > 45) {
            return false;
        }

        if (!ip.matches("[0-9a-fA-F:.]+")) {
            return false;
        }

        try {
            InetAddress address = InetAddress.getByName(ip);

            if (address instanceof java.net.Inet4Address) {
                String[] parts = ip.split("\\.", -1);

                if (parts.length != 4) return false;

                for (String part : parts) {
                    if (part.isEmpty() || part.length() > 3) return false;

                    int value = Integer.parseInt(part);

                    if (value < 0 || value > 255) return false;
                }

                return true;
            }

            return address instanceof java.net.Inet6Address;

        } catch (Exception e) {
            return false;
        }
    }
    @GetMapping
public List<Visitor> getAllVisitors() {
    return visitorService.getAllVisitors();
}
}
