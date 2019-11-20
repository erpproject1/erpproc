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
public class T00301NonConformance implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String statementNCR; 
	private String reference; 
	
	@Temporal(TemporalType.DATE)
	private Date statementDate;  

	
	private String source;
	private String sourceReason; 
	private String repetedNCR; 
	private String grading;  
	private long originator;
	private long departmentId;
	private long disciplineId;
	
	
	private String confirmation="0";
	private String confirmationReason;

	private String correction;
	private String correctionDetail;
	private String proposedCorAct; 
	@Temporal(TemporalType.DATE)
	private Date actionCloseDate;  
	 

	private String review="0";
	private String reviewReason;

	private String rootCausesAnalysis;
	private String correctiveActions;
	

	private String evaluation="0";
	private String evaluationReason;
	
	private String clientEvaluation="0";
	private String clientEvaluationReason;
	
	private int step=0;
	
	private boolean active =true;	
	private Date create_date = new Date();
	
	
	@Transient
	private int stepnumber; 
	 
	@ManyToOne
	@JoinColumn(name = "departmentId", insertable = false, updatable = false)
	private Department dep;
 
	  

	@ManyToOne
	@JoinColumn(name = "originator", insertable = false, updatable=false)
	private Personal per;
	
    @ManyToOne 
	@JoinColumn(name="disciplineId",insertable = false,updatable = false) 
	private WirSetting discipline; 

	
	public WirSetting getDiscipline() {
		return discipline;
	}
	public void setDiscipline(WirSetting discipline) {
		this.discipline = discipline;
	}
	public Department getDep() {
		return dep;
	}
	public void setDep(Department dep) {
		this.dep = dep;
	}
	public Personal getPer() {
		return per;
	}
	public void setPer(Personal per) {
		this.per = per;
	}
	public String getReference() {
		return reference;
	}
	public void setReference(String reference) {
		this.reference = reference;
	}
	
	public long getId() {
		return id;
	}
	public int getStepnumber() {
		return stepnumber;
	}
	public void setStepnumber(int stepnumber) {
		this.stepnumber = stepnumber;
	}
	public String getStatementNCR() {
		return statementNCR;
	}
	public Date getStatementDate() {
		return statementDate;
	}
	public String getSource() {
		return source;
	}
	public String getSourceReason() {
		return sourceReason;
	}
	public String getRepetedNCR() {
		return repetedNCR;
	}
	public String getGrading() {
		return grading;
	}
	public long getOriginator() {
		return originator;
	}
	public long getDepartmentId() {
		return departmentId;
	}
	public long getDisciplineId() {
		return disciplineId;
	}
	public String getConfirmation() {
		return confirmation;
	}
	public String getConfirmationReason() {
		return confirmationReason;
	}
	public String getCorrection() {
		return correction;
	}
	public String getCorrectionDetail() {
		return correctionDetail;
	}
	public String getProposedCorAct() {
		return proposedCorAct;
	}
	public Date getActionCloseDate() {
		return actionCloseDate;
	}
	public String getReview() {
		return review;
	}
	public String getReviewReason() {
		return reviewReason;
	}
	public String getRootCausesAnalysis() {
		return rootCausesAnalysis;
	}
	public String getCorrectiveActions() {
		return correctiveActions;
	}
	public String getEvaluation() {
		return evaluation;
	}
	public String getEvaluationReason() {
		return evaluationReason;
	}
	public String getClientEvaluation() {
		return clientEvaluation;
	}
	public String getClientEvaluationReason() {
		return clientEvaluationReason;
	}
	public int getStep() {
		return step;
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
	public void setStatementNCR(String statementNCR) {
		this.statementNCR = statementNCR;
	}
	public void setStatementDate(Date statementDate) {
		this.statementDate = statementDate;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public void setSourceReason(String sourceReason) {
		this.sourceReason = sourceReason;
	}
	public void setRepetedNCR(String repetedNCR) {
		this.repetedNCR = repetedNCR;
	}
	public void setGrading(String grading) {
		this.grading = grading;
	}
	public void setOriginator(long originator) {
		this.originator = originator;
	}
	public void setDepartmentId(long departmentId) {
		this.departmentId = departmentId;
	}
	public void setDisciplineId(long disciplineId) {
		this.disciplineId = disciplineId;
	}
	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}
	public void setConfirmationReason(String confirmationReason) {
		this.confirmationReason = confirmationReason;
	}
	public void setCorrection(String correction) {
		this.correction = correction;
	}
	public void setCorrectionDetail(String correctionDetail) {
		this.correctionDetail = correctionDetail;
	}
	public void setProposedCorAct(String proposedCorAct) {
		this.proposedCorAct = proposedCorAct;
	}
	public void setActionCloseDate(Date actionCloseDate) {
		this.actionCloseDate = actionCloseDate;
	}
	public void setReview(String review) {
		this.review = review;
	}
	public void setReviewReason(String reviewReason) {
		this.reviewReason = reviewReason;
	}
	public void setRootCausesAnalysis(String rootCausesAnalysis) {
		this.rootCausesAnalysis = rootCausesAnalysis;
	}
	public void setCorrectiveActions(String correctiveActions) {
		this.correctiveActions = correctiveActions;
	}
	public void setEvaluation(String evaluation) {
		this.evaluation = evaluation;
	}
	public void setEvaluationReason(String evaluationReason) {
		this.evaluationReason = evaluationReason;
	}
	public void setClientEvaluation(String clientEvaluation) {
		this.clientEvaluation = clientEvaluation;
	}
	public void setClientEvaluationReason(String clientEvaluationReason) {
		this.clientEvaluationReason = clientEvaluationReason;
	}
	public void setStep(int step) {
		this.step = step;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public void setCreate_date(Date create_date) {
		this.create_date = create_date;
	}
	
	
 
}
