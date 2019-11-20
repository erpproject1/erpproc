package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
//@Table(name = "T0029AuditPlan")
public class T0014ViolationLog implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private long violationType;
	private long violationCode;
	private int violationNo;
	private String violationNoTxt;
	@Temporal(TemporalType.DATE)
	private Date date; 
	private long department;
	private long discipline;
	private String description;
	private String reference;
	private String subject;
	private String location;
	private long initiator;
	private String correction;
	private String rootCause;
	private String correctiveAction;
	@Temporal(TemporalType.DATE)
	private Date acd;
	@Temporal(TemporalType.DATE)
	private Date acdExt; 
	private long actionBy;
	@Temporal(TemporalType.DATE)
	private Date signOffDate;
	private String status;
	private String remarks;
	private boolean active;	
	private Date create_date = new Date();
	@ManyToOne
	@JoinColumn(name = "violationCode", insertable = false, updatable = false)
	private T0027ViolationType violationDesc;
	@ManyToOne
	@JoinColumn(name = "department", insertable = false, updatable = false)
	private Department departmentDesc;
	@ManyToOne
	@JoinColumn(name = "discipline", insertable = false, updatable = false)
	private WirSetting disciplineDesc;
	@ManyToOne
	@JoinColumn(name = "initiator", insertable = false, updatable = false)
	private PersonalFormContractor initiatorPerCont;
	@ManyToOne
	@JoinColumn(name = "initiator", insertable = false, updatable = false)
	private PersonalFormClient initiatorPerCli;
	@ManyToOne
	@JoinColumn(name = "actionBy", insertable = false, updatable = false)
	private PersonalFormContractor actionByPer;
	@Transient
	private Object initiatorPer; 

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}

	public long getViolationType() {
		return violationType;
	}

	public void setViolationType(long violationType) {
		this.violationType = violationType;
	}

	public long getViolationCode() {
		return violationCode;
	}

	public void setViolationCode(long violationCode) {
		this.violationCode = violationCode;
	}

	public int getViolationNo() {
		return violationNo;
	}

	public void setViolationNo(int violationNo) {
		this.violationNo = violationNo;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public long getDepartment() {
		return department;
	}

	public void setDepartment(long department) {
		this.department = department;
	}

	public long getDiscipline() {
		return discipline;
	}

	public void setDiscipline(long discipline) {
		this.discipline = discipline;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public long getInitiator() {
		return initiator;
	}

	public void setInitiator(long initiator) {
		this.initiator = initiator;
	}

	public String getCorrection() {
		return correction;
	}

	public void setCorrection(String correction) {
		this.correction = correction;
	}

	public String getRootCause() {
		return rootCause;
	}

	public void setRootCause(String rootCause) {
		this.rootCause = rootCause;
	}

	public String getCorrectiveAction() {
		return correctiveAction;
	}

	public void setCorrectiveAction(String correctiveAction) {
		this.correctiveAction = correctiveAction;
	}

	public Date getAcd() {
		return acd;
	}

	public void setAcd(Date acd) {
		this.acd = acd;
	}

	public Date getAcdExt() {
		return acdExt;
	}

	public void setAcdExt(Date acdExt) {
		this.acdExt = acdExt;
	}

	public long getActionBy() {
		return actionBy;
	}

	public void setActionBy(long actionBy) {
		this.actionBy = actionBy;
	}

	public Date getSignOffDate() {
		return signOffDate;
	}

	public void setSignOffDate(Date signOffDate) {
		this.signOffDate = signOffDate;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getViolationNoTxt() {
		return violationNoTxt;
	}

	public void setViolationNoTxt(String violationNoTxt) {
		this.violationNoTxt = violationNoTxt;
	}

	public Object getInitiatorPer() {
		String val = getViolationDesc().getViolationTypeCode().trim();
		if (val.equals("GC") || val.equals("SV") || val.equals("PN") || val.equals("NRC")) { 
			initiatorPer = getInitiatorPerCli();
		} else
			initiatorPer = getInitiatorPerCont();
		return initiatorPer;
	}

	public void setInitiatorPer(Object initiatorPer) {
		this.initiatorPer = initiatorPer;
	}

	public T0027ViolationType getViolationDesc() {
		return violationDesc;
	}

	public void setViolationDesc(T0027ViolationType violationDesc) {
		this.violationDesc = violationDesc;
	}

	public Department getDepartmentDesc() {
		return departmentDesc;
	}

	public void setDepartmentDesc(Department departmentDesc) {
		this.departmentDesc = departmentDesc;
	}

	public WirSetting getDisciplineDesc() {
		return disciplineDesc;
	}

	public void setDisciplineDesc(WirSetting disciplineDesc) {
		this.disciplineDesc = disciplineDesc;
	}

	public PersonalFormContractor getInitiatorPerCont() {
		return initiatorPerCont;
	}

	public void setInitiatorPerCont(PersonalFormContractor initiatorPerCont) {
		this.initiatorPerCont = initiatorPerCont;
	}

	public PersonalFormClient getInitiatorPerCli() {
		return initiatorPerCli;
	}

	public void setInitiatorPerCli(PersonalFormClient initiatorPerCli) {
		this.initiatorPerCli = initiatorPerCli;
	}

	public PersonalFormContractor getActionByPer() {
		return actionByPer;
	}

	public void setActionByPer(PersonalFormContractor actionByPer) {
		this.actionByPer = actionByPer;
	}

}
