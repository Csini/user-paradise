package hu.spring.feladat.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hu.spring.feladat.repository.UserRepository;
import hu.spring.feladat.service.UserService;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class UserServiceImpl implements UserService {

	private UserRepository repository;

	private Mapper dozerBeanMapper;

	public UserServiceImpl(@Autowired UserRepository repository, @Autowired Mapper dozerBeanMapper) {
		super();
		this.repository = repository;
		this.dozerBeanMapper = dozerBeanMapper;
	}

	public void setRepository(UserRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<hu.spring.feladat.openapi.model.User> getAllUsers() {
		return repository.findAll().stream()
				.map(user -> dozerBeanMapper.map(user, hu.spring.feladat.openapi.model.User.class))
				.collect(Collectors.toList());
	}

}
