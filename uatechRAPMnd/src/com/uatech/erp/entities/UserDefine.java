package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint; 

@Entity 
@Table(uniqueConstraints={
		@UniqueConstraint(columnNames = {"username","personalId" }),
		@UniqueConstraint(columnNames = {"username" })})
public class UserDefine implements Serializable {
 

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	private long personalId;  
	private String username; 
	private String pass;  
	private String activekey;  
	private boolean active=false;
	private Date create_date= new Date();
	
	 
	//(cascade=CascadeType.ALL)
	@ManyToOne
	@JoinColumn(name = "personalId", insertable = false, updatable=false)
	private Personal per;
	
  
	public Personal getPer() {
		return per;
	}
	public void setPer(Personal per) {
		this.per = per;
	} 
	
	public long getPersonalId() {
		return personalId;
	}
	public void setPersonalId(long personalId) {
		this.personalId = personalId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	} 
	public String getActivekey() {
		return activekey;
	}
	public void setActivekey(String activekey) {
		this.activekey = activekey;
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
