package com.example.TaskService.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "Tasks")

public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private boolean completed = false;
}