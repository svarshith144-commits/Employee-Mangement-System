package com.enterprise.hrms.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String assignedToId;
    private String assignedToName;
    private String assignedById;
    private String assignedByName;

    private String priority; // LOW, MEDIUM, HIGH, URGENT
    private LocalDate dueDate;
    private String status; // TODO, IN_PROGRESS, REVIEW, COMPLETED, OVERDUE
    private Integer progress;
    private String department;
}
