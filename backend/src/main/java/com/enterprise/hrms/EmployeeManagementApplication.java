package com.enterprise.hrms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("  ENTERPRISE EMPLOYEE MANAGEMENT SYSTEM BACKEND STARTED ");
        System.out.println("  Port: 8080 | WebSocket STOMP: /ws | DB: H2 Console /h2-console");
        System.out.println("=========================================================");
    }
}
