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
	    @UniqueConstraint(columnNames = {"userTypeId", "userFilterRuleId" })})
public class UserFilterRuleRelation implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private long userTypeId;  
	private long userFilterRuleId;   
	private Date create_date= new Date();

	@ManyToOne
	@JoinColumn(name = "userFilterRuleId", insertable = false, updatable = false)
	private UserFilterRule usrfilrul;
	

	@ManyToOne
	@JoinColumn(name = "userTypeId", insertable = false, updatable = false)
	private UserTypeDefine usrtpy;


	public long getId() {
		return id;
	}


	public long getUserTypeId() {
		return userTypeId;
	}


	public long getUserFilterRuleId() {
		return userFilterRuleId;
	}


	public Date getCreate_date() {
		return create_date;
	}


	public UserFilterRule getUsrfilrul() {
		return usrfilrul;
	}


	public UserTypeDefine getUsrtpy() {
		return usrtpy;
	}


	public void setId(long id) {
		this.id = id;
	}


	public void setUserTypeId(long userTypeId) {
		this.userTypeId = userTypeId;
	}


	public void setUserFilterRuleId(long userFilterRuleId) {
		this.userFilterRuleId = userFilterRuleId;
	}


	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}


	public void setUsrfilrul(UserFilterRule usrfilrul) {
		this.usrfilrul = usrfilrul;
	}


	public void setUsrtpy(UserTypeDefine usrtpy) {
		this.usrtpy = usrtpy;
	}
 
	 
	
	 
 
	 
}
