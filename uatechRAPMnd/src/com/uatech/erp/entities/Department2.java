package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

@Entity
public class Department2 implements Serializable {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String department;	
	private String code;	
	private long upperDepartmentId;	  
	private long designationId;	
	private boolean active; 
	
	@Transient
	private String topDepartment;   
	
	@Transient
	private ArrayList<Department2> children;  
	
	@Transient
	private ArrayList<Department2> list; 
	
	@Transient
	private String name;   
	@Transient
	private String gsm;     
	
	@ManyToOne 
	@JoinColumn(name="designationId",insertable = false,updatable = false) 
	private Designation2 designation; 
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public long getUpperDepartmentId() {
		return upperDepartmentId;
	}
	public void setUpperDepartmentId(long upperDepartmentId) {
		this.upperDepartmentId = upperDepartmentId;
	}
	public long getDesignationId() {
		return designationId;
	}
	public void setDesignationId(long designationId) {
		this.designationId = designationId;
	}
	public String getTopDepartment() {
		return topDepartment;
	}
	public void setTopDepartment(String topDepartment) {
		this.topDepartment = topDepartment;
	}
	public Designation2 getDesignation() {
		if (designation==null) {
			designation = new Designation2();
		}
		return designation;
	}
	public void setDesignation(Designation2 designation) {
		this.designation = designation;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	public ArrayList<Department2> getChildren() {
		if (children==null) {
			children = new ArrayList<Department2>(); 
		}
		return children;
	}
	public void setChildren(ArrayList<Department2> children) {
		this.children = children;
	}
	
	public ArrayList<Department2> getList() {
		if (list==null) {
			list = new ArrayList<Department2>();  
		}
		return list;
	}
	public void setList(ArrayList<Department2> list) {
		this.list = list;
	}
	public String getName() {
		name = "Uður KIRÇÝÇEK";
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGsm() {
		gsm = "0555 555 55 55";
		return gsm;
	}
	public void setGsm(String gsm) {
		this.gsm = gsm; 
	}
	
	
	
}
