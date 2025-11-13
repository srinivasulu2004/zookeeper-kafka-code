package com.example.demo.controller;

import com.example.demo.model.UserEntity;
import com.example.demo.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserRepository repo;
  public UserController(UserRepository repo){ this.repo = repo; }

  @GetMapping
  public List<UserEntity> list(){ return repo.findAll(); }

  @PostMapping
  public ResponseEntity<UserEntity> create(@RequestBody UserEntity u){
    UserEntity saved = repo.save(new UserEntity(u.getName(), u.getEmail()));
    return ResponseEntity.ok(saved);
  }
}

