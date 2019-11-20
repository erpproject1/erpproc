package com.uatech.erp.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id; 


@Entity
//@Table(name = "T0029AuditPlan")
public class T0027ViolationType {
 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String violationTypeCode;
	private String violationType; 
    private Date create_date = new Date();
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getViolationTypeCode() {
		return violationTypeCode;
	}
	public void setViolationTypeCode(String violationTypeCode) {
		this.violationTypeCode = violationTypeCode;
	}
	public String getViolationType() {
		return violationType;
	}
	public void setViolationType(String violationType) {
		this.violationType = violationType;
	}
	public Date getCreate_date() {
		return create_date;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
    
     
}