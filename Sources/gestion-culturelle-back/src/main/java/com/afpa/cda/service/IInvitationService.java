package com.afpa.cda.service;

import java.util.List;

import com.afpa.cda.dto.InvitationDto;


public interface IInvitationService {

	List<InvitationDto> findAll();

	int add(InvitationDto invitationDto);

	InvitationDto findById(int id);

	List<InvitationDto> findInvitationByUserId(int id);

	List<InvitationDto> findInvitationByManifestationId(int id);

	boolean update(InvitationDto invitationDto, int id);

	boolean delete(int id);

	boolean deleteAll(int id);

	boolean updateReponse(String reponse, int id);

	List<InvitationDto> findNewInvitationByUserId(int id);
}
