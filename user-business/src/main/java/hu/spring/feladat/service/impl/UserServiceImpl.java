package hu.spring.feladat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hu.spring.feladat.entity.User;
import hu.spring.feladat.repository.UserRepository;
import hu.spring.feladat.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

	private UserRepository repository;

	public UserServiceImpl(@Autowired UserRepository repository) {
		super();
		this.repository = repository;
	}

	public void setRepository(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public Page<User> getAllUsers(final Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public User getUser(Integer id) throws EntityNotFoundException {
		return repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("User " + id + " nem található"));
	}

	@Override
	public Integer deleteUser(Integer id) {
		repository.deleteById(id);
		return id;
	}

	@Override
	public User saveUser(User user) {
		return repository.saveAndFlush(user);
	}

	@Override
	public long getCountAllUsers() {
		return repository.count();
	}

}
