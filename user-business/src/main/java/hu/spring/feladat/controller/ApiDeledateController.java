package hu.spring.feladat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import hu.spring.feladat.openapi.api.ApiApiDelegate;
import hu.spring.feladat.openapi.model.User;
import hu.spring.feladat.service.UserService;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
public class ApiDeledateController implements ApiApiDelegate {

	@Autowired
	UserService service;

	@Override
	public ResponseEntity<List<User>> apiUsersGet() {
		return ResponseEntity.ok(service.getAllUsers());
	}

	@Override
	public ResponseEntity<Object> apiUsersIdDelete(Object id) {
		// TODO Auto-generated method stub
		return ApiApiDelegate.super.apiUsersIdDelete(id);
	}

	@Override
	public ResponseEntity<User> apiUsersIdGet(Object id) {
		// TODO Auto-generated method stub
		return ApiApiDelegate.super.apiUsersIdGet(id);
	}

	@Override
	public ResponseEntity<User> apiUsersIdPut(Object id, User user) {
		// TODO Auto-generated method stub
		return ApiApiDelegate.super.apiUsersIdPut(id, user);
	}

	@Override
	public ResponseEntity<User> apiUsersPost(User user) {
		// TODO Auto-generated method stub
		return ApiApiDelegate.super.apiUsersPost(user);
	}

}
