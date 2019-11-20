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
	    @UniqueConstraint(columnNames = {"userId" })})
public class UserAndTypeRelation implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	 
	private long userId;   
	private long userTypeId; 
	private Date create_date= new Date();

	@ManyToOne
	@JoinColumn(name = "userId", insertable = false, updatable = false)
	private UserDefine usr;
	

	@ManyToOne
	@JoinColumn(name = "userTypeId", insertable = false, updatable = false)
	private UserTypeDefine usrtpy;


	public long getId() {
		return id;
	}


	public long getUserId() {
		return userId;
	}


	public long getUserTypeId() {
		return userTypeId;
	}


	public Date getCreate_date() {
		return create_date;
	}


	public UserDefine getUsr() {
		return usr;
	}


	public UserTypeDefine getUsrtpy() {
		return usrtpy;
	}


	public void setId(long id) {
		this.id = id;
	}


	public void setUserId(long userId) {
		this.userId = userId;
	}


	public void setUserTypeId(long userTypeId) {
		this.userTypeId = userTypeId;
	}


	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}


	public void setUsr(UserDefine usr) {
		this.usr = usr;
	}


	public void setUsrtpy(UserTypeDefine usrtpy) {
		this.usrtpy = usrtpy;
	}
 
	 
}
