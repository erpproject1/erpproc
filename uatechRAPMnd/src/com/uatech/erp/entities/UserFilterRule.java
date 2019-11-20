package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint; 

@Entity  
public class UserFilterRule implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private long userId; 
	private String formCode;
	private String formName;
	private String filType;  
	private String filterKey;
	private Date create_date= new Date();
	
	public long getId() {
		return id;
	}
	public long getUserId() {
		return userId;
	}
	public String getFormCode() {
		return formCode;
	}
	public String getFormName() {
		return formName;
	}
	public String getFilType() {
		return filType;
	}
	public String getFilterKey() {
		return filterKey;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public void setFormCode(String formCode) {
		this.formCode = formCode;
	}
	public void setFormName(String formName) {
		this.formName = formName;
	}
	public void setFilType(String filType) {
		this.filType = filType;
	}
	public void setFilterKey(String filterKey) {
		this.filterKey = filterKey;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	
	 
	
	 
 
	 
}
