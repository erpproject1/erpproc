package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;

@Entity 
@Table(uniqueConstraints={
	    @UniqueConstraint(columnNames = {"userId", "departmentId", "disciplineId", "jobDescriptionId", "permissionArea" })})
public class DashboardSet implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; 
	private long userId;  
	private long departmentId;  
	private long disciplineId;  
	private long jobDescriptionId;  
	private int permissionArea;
	private String permissionStatu; 
	
	private boolean active =true;	
	private Date create_date = new Date();
	
 
	private String dep; 
	 
	private String dis;  
	
	private String job; 

	private String usee; 
	
	public long getId() {
		return id;
	}
	public long getUserId() {
		return userId;
	}
	public int getPermissionArea() {
		return permissionArea;
	}
	public String getPermissionStatu() {
		return permissionStatu;
	}
	public boolean isActive() {
		return active;
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
	public void setPermissionArea(int permissionArea) {
		this.permissionArea = permissionArea;
	}
	public void setPermissionStatu(String permissionStatu) {
		this.permissionStatu = permissionStatu;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	public long getDepartmentId() {
		return departmentId;
	}
	public long getDisciplineId() {
		return disciplineId;
	}
	public long getJobDescriptionId() {
		return jobDescriptionId;
	}
	public void setDepartmentId(long departmentId) {
		this.departmentId = departmentId;
	}
	public void setDisciplineId(long disciplineId) {
		this.disciplineId = disciplineId;
	}
	public void setJobDescriptionId(long jobDescriptionId) {
		this.jobDescriptionId = jobDescriptionId;
	}
	public String getDep() {
		return dep;
	}
	public String getDis() {
		return dis;
	}
	public String getJob() {
		return job;
	}
	public String getUsee() {
		return usee;
	}
	public void setDep(String dep) {
		this.dep = dep;
	}
	public void setDis(String dis) {
		this.dis = dis;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public void setUsee(String usee) {
		this.usee = usee;
	}
 
	   
}
