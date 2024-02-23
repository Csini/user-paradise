package hu.spring.feladat.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.spring.feladat.repository.UserRepository;
import hu.spring.feladat.service.UserService;
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

}
