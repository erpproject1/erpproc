package com.uatech.erp.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PersonalFiles {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private long parityId;// from PersonalTraining Entity
	private long personalId;// from PersonalTraining Entity
	private String parityType;
	private String filePath;
	private String clientFileName;
	private boolean active;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getParityId() {
		return parityId;
	}
	public void setParityId(long parityId) {
		this.parityId = parityId;
	}
	public long getPersonalId() {
		return personalId;
	}
	public void setPersonalId(long personalId) {
		this.personalId = personalId;
	}
	public String getParityType() {
		return parityType;
	}
	public void setParityType(String parityType) {
		this.parityType = parityType;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getClientFileName() {
		return clientFileName;
	}
	public void setClientFileName(String clientFileName) {
		this.clientFileName = clientFileName;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	 
	
	
}
