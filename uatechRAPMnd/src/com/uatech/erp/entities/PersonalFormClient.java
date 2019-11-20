package com.uatech.erp.entities;

import java.io.Serializable; 
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient; 

@Entity
public class PersonalFormClient implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	   
	private String name;
	  
	private String midName;	
	  
	private String lastName; 
 
	private String company;
	 
	@Column(nullable = true)
	private long departmentId ;
	 
	private String position;
	  
	@Column(length=20) 
	private String personalPhone;  
	 
	private String personalEmail; 
   
	private boolean active;
	
	@Transient
	private String fullName; 

	private Date create_date = new Date();
	
	

	public String getFullName() {
		
		fullName = getName()+" "+getMidName()+" "+ getLastName(); 
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	
	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getMidName() {
		return midName;
	}


	public void setMidName(String midName) {
		this.midName = midName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getCompany() {
		return company;
	}


	public void setCompany(String company) {
		this.company = company;
	}


	public long getDepartmentId() {
		return departmentId;
	}


	public void setDepartmentId(long departmentId) {
		this.departmentId = departmentId;
	}


	public String getPosition() {
		return position;
	}


	public void setPosition(String position) {
		this.position = position;
	}


	public String getPersonalPhone() {
		return personalPhone;
	}


	public void setPersonalPhone(String personalPhone) {
		this.personalPhone = personalPhone;
	}


	public String getPersonalEmail() {
		return personalEmail;
	}


	public void setPersonalEmail(String personalEmail) {
		this.personalEmail = personalEmail;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}


	public Date getCreate_date() {
		return create_date;
	}


	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	
	 
}
