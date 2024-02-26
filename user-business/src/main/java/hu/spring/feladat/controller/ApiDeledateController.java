package hu.spring.feladat.controller;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import hu.spring.feladat.openapi.api.ApiApiDelegate;
import hu.spring.feladat.openapi.model.User;
import hu.spring.feladat.openapi.model.UserResponse;
import hu.spring.feladat.service.UserService;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
public class ApiDeledateController implements ApiApiDelegate {

	private UserService service;

	private ModelMapper beanMapper;

	public ApiDeledateController(@Autowired UserService service, @Autowired ModelMapper beanMapper) {
		super();
		this.service = service;
		this.beanMapper = beanMapper;
	}

	public void setRepository(UserService service) {
		this.service = service;
	}

	public void setBeanMapper(ModelMapper beanMapper) {
		this.beanMapper = beanMapper;
	}

	@Override
	public ResponseEntity<UserResponse> readAllUser(Integer page, Integer size, final Pageable pageable) {

//		log.info("size:" + size);
//		log.info("page:" + page);
//		
//		log.info("pageable.size:" + pageable.getPageSize());
//		log.info("pageable.page:" + pageable.getPageNumber());
//		log.info("pageable.sort:" + pageable.getSort());

//		 - in: query
//         name: sort
//         schema:
//           type: array
//             items:
//             type: string
//         required: false
//         description: Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported.

//		pageable.setSort("fullname");

		UserResponse userResponse = new UserResponse(service.getCountAllUsers(), service.getAllUsers(pageable).stream()
				.map(user -> mapEntityToOpenapi(user)).collect(Collectors.toList()));

		return ResponseEntity.ok(userResponse);
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

		// check if id is null or -1
		if (id != null && id>-1) {
			throw new IllegalArgumentException("id must be empty or -1");
		}
		user.setId(null);
		hu.spring.feladat.entity.User userEntity = mapOpenapiToEntity(user);

		return ResponseEntity.ok(mapEntityToOpenapi(service.saveUser(userEntity)));
	}

	private hu.spring.feladat.openapi.model.User mapEntityToOpenapi(hu.spring.feladat.entity.User userEntity) {
		return beanMapper.map(userEntity, hu.spring.feladat.openapi.model.User.class);
	}

	private hu.spring.feladat.entity.User mapOpenapiToEntity(hu.spring.feladat.openapi.model.User user) {
		return beanMapper.map(user, hu.spring.feladat.entity.User.class);
	}
}
