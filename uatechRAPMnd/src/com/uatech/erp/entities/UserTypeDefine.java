package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint; 

@Entity 
@Table(uniqueConstraints={
	    @UniqueConstraint(columnNames = {"usertype"})})
public class UserTypeDefine implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	private String usertype;  
	private String description;   
	private Date create_date= new Date();
	
	public long getId() {
		return id;
	}
	public String getUsertype() {
		return usertype;
	}
	public String getDescription() {
		return description;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setId(long id) {
		this.id = id;
	}
	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	
 
	 
 
	 
}
