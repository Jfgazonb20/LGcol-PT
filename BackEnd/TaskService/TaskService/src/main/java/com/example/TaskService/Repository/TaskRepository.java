package com.example.TaskService.Repository;

import com.example.TaskService.Model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
Optional<Task> findById(Long id);
}
