package hu.spring.feladat.service;

import java.util.List;

import hu.spring.feladat.entity.User;
import jakarta.persistence.EntityNotFoundException;

public interface UserService {

	public List<User> getAllUsers();

	public User getUser(Integer id) throws EntityNotFoundException;

	public Integer deleteUser(Integer id) throws EntityNotFoundException;

	public User saveUser(User user);


}
