package com.afpa.cda.service.impl;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.afpa.cda.dao.RoleRepository;
import com.afpa.cda.dao.UserRepository;
import com.afpa.cda.dto.RoleDto;
import com.afpa.cda.entity.Role;
import com.afpa.cda.entity.User;
import com.afpa.cda.service.IRoleService;


@Service
public class RoleServiceImpl implements IRoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public List<RoleDto> findAll() {
		return this.roleRepository.findAll()
				.stream().map(r-> {
					RoleDto roleDto = RoleDto.builder()
							.id(r.getId())
							.label(r.getLabel())
							.build();

					return roleDto;	
				})
				.collect(Collectors.toList());	
	}

	@Override
	public RoleDto findById(int id) {
		Optional <Role> roleOp = this.roleRepository.findById(id);
		RoleDto roleDto =null; 
		if(roleOp.isPresent()) {
			Role role= roleOp.get();

			roleDto=this.modelMapper.map(role,RoleDto.class);
		}
		return roleDto;
	}



	@Override
	public int add(RoleDto roleDto) {
		int id=0;
		
		Optional<Role> roleOp = this.roleRepository.findRoleByLabel(roleDto.getLabel());
		if (!roleOp.isPresent()) {
			id=this.roleRepository.save(this.modelMapper.map(roleDto,Role.class)).getId();
			return id;
		}
		
//	List <Role> listRoles = this.roleRepository.findAll();
//	boolean roleExistant = false;
//	for (Role role : listRoles) {
//		if (role.getLabel().equalsIgnoreCase(roleDto.getLabel())) {
//			roleExistant=true;
//		}
//	}
//		if (!roleExistant) {
//			this.roleRepository.save(this.modelMapper.map(roleDto,Role.class));
//			System.err.println("role ajouté");
//			return roleExistant;
//		}
		
		return id;
	}

	@Override
	public boolean update(RoleDto roleDto, int id) {
		Optional <Role> roleOp = this.roleRepository.findById(id);
		if(roleOp.isPresent()) {
			Role role = roleOp.get();
			role.setLabel(roleDto.getLabel());
			this.roleRepository.save(role);
			System.out.println("role "+role);
			System.err.println("role mise à jour");
			return true;
		}

		return false;
	}

	@Override
	public boolean delete(int id) {
		
		List <User> listUsers = this.userRepository.findUserByRole(id);
		
		if (listUsers.isEmpty() && this.roleRepository.existsById(id)) {
		this.roleRepository.deleteById(id);
		System.err.println("role supprimé");
			return true;
		}
		
		return false;
	}
}
