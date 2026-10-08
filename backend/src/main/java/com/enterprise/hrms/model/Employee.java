package com.enterprise.hrms.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    private String id; // e.g. EMP-1024

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    private String gender;
    private LocalDate dob;
    private String address;
    private String emergencyContact;

    private String department;
    private String designation;
    private LocalDate joiningDate;
    private String employmentType;
    private String manager;
    private String workLocation;
    private String status; // ACTIVE, ON_LEAVE, PROBATION, INACTIVE

    private String avatar;
    
    @Column(unique = true, nullable = false)
    private String qrToken;

    private BigDecimal basicSalary;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
