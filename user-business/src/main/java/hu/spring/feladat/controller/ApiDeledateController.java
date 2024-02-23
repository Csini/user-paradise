package hu.spring.feladat.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import hu.spring.feladat.openapi.api.ApiApiDelegate;
import hu.spring.feladat.openapi.model.User;
import hu.spring.feladat.repository.UserRepository;
import hu.spring.feladat.service.UserService;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
public class ApiDeledateController implements ApiApiDelegate {

	private UserService service;

	private Mapper dozerBeanMapper;

	public ApiDeledateController(@Autowired UserService service, @Autowired Mapper dozerBeanMapper) {
		super();
		this.service = service;
		this.dozerBeanMapper = dozerBeanMapper;
	}

	public void setRepository(UserService service) {
		this.service = service;
	}

	public void setDozerBeanMapper(Mapper dozerBeanMapper) {
		this.dozerBeanMapper = dozerBeanMapper;
	}

	@Override
	public ResponseEntity<List<User>> readAllUser() {

		return ResponseEntity
				.ok(service.getAllUsers().stream().map(user -> mapEntityToOpenapi(user)).collect(Collectors.toList()));
	}

	@Override
	public ResponseEntity<Integer> deleteUser(Integer id) {
		return ResponseEntity.ok(service.deleteUser(id));
	}

	@Override
	public ResponseEntity<User> readUser(Integer id) {
		return ResponseEntity.ok(mapEntityToOpenapi(service.getUser(id)));
	}

	@Override
	public ResponseEntity<User> updateUser(Integer id, User user) {

		// check if user exists
		hu.spring.feladat.entity.User userEntity = service.getUser(id);

		return ResponseEntity.ok(mapEntityToOpenapi(service.saveUser(userEntity)));
	}

	@Override
	public ResponseEntity<User> createUser(User user) {

		Integer id = user.getId();

		// check if id is null
		if (id != null && id != 0) {
			throw new IllegalArgumentException("id must be empty");
		}
		hu.spring.feladat.entity.User userEntity = mapOpenapiToEntity(user);

		return ResponseEntity.ok(mapEntityToOpenapi(service.saveUser(userEntity)));
	}

	private hu.spring.feladat.openapi.model.User mapEntityToOpenapi(hu.spring.feladat.entity.User userEntity) {
		return dozerBeanMapper.map(userEntity, hu.spring.feladat.openapi.model.User.class);
	}

	private hu.spring.feladat.entity.User mapOpenapiToEntity(hu.spring.feladat.openapi.model.User user) {
		return dozerBeanMapper.map(user, hu.spring.feladat.entity.User.class);
	}
}
