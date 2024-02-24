package hu.spring.feladat.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import hu.spring.feladat.entity.User;
import jakarta.persistence.EntityNotFoundException;

public interface UserService {

	public Page<User> getAllUsers(final Pageable pageable);

	public User getUser(Integer id) throws EntityNotFoundException;

	public Integer deleteUser(Integer id) throws EntityNotFoundException;

	public User saveUser(User user);

	public long getCountAllUsers();


}
