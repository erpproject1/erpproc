package com.uatech.erp.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class PersonalExperience implements Serializable {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private long personalId;// from Personal Entity
	private String name;
	@Column(length = 10) 
	private BigDecimal nationalId;
	@Temporal(TemporalType.DATE)
	private Date startDate;
	@Temporal(TemporalType.DATE)
	private Date finishDate; 
	private String company;
	private String position;
	private long country;
	private long city;
	private String project;
	private String client;
	private boolean approvalOfClient;
	private String approvalDocURL;
	@Transient
	private String fStartDate; 
	@Transient
	private String fFinishDate;
	private String briefDescOfWorkDone;
	public String getBriefDescOfWorkDone() {
		return briefDescOfWorkDone;
	}
	public void setBriefDescOfWorkDone(String briefDescOfWorkDone) {
		this.briefDescOfWorkDone = briefDescOfWorkDone;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getPersonalId() {
		return personalId;
	}
	public void setPersonalId(long personalId) {
		this.personalId = personalId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getNationalId() {
		return nationalId;
	}
	public void setNationalId(BigDecimal nationalId) {
		this.nationalId = nationalId;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getFinishDate() {
		return finishDate;
	}
	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public long getCountry() {
		return country;
	}
	public void setCountry(long country) {
		this.country = country;
	}
	public long getCity() {
		return city;
	}
	public void setCity(long city) {
		this.city = city;
	}
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public boolean isApprovalOfClient() {
		return approvalOfClient;
	}
	public void setApprovalOfClient(boolean approvalOfClient) {
		this.approvalOfClient = approvalOfClient;
	}
	public String getApprovalDocURL() {
		return approvalDocURL;
	}
	public void setApprovalDocURL(String approvalDocURL) {
		this.approvalDocURL = approvalDocURL;
	}
	
	public String getfStartDate() {
		
		if (getStartDate() != null) {
			fStartDate = new SimpleDateFormat("MM/dd/yyyy").format(getStartDate());
		}

		return fStartDate; 
	}

	public void setfStartDate(String fStartDate) {
		this.fStartDate = fStartDate; 
	}

	public String getfFinishDate() {
		if (getFinishDate() != null) { 
			fFinishDate = new SimpleDateFormat("MM/dd/yyyy").format(getFinishDate()); 
		}
		return fFinishDate;
	}

	public void setfFinishDate(String fFinishDate) {
		this.fFinishDate = fFinishDate;
	}
	
	
}
