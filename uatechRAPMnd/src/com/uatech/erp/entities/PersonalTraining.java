package com.uatech.erp.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class PersonalTraining implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private long personalId;// from Personal Entity
	private String name;
	@Column(length = 10)
	private BigDecimal nationalId;
	private String nameOfTraining;
	@Temporal(TemporalType.DATE)
	private Date startDate;
	@Temporal(TemporalType.DATE)
	private Date finishDate;
	

	private int certificateValidity;
	private byte validityType;// year,hour,month it must come from any code table
	private String organizer;
	private String certificateNo;
	private String filePath; // path of certificate file
	@Transient
	private String fStartDate;
	@Transient
	private String fFinishDate;
	private String duration;
	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getPersonalId() {
		return personalId;
	}

	public void setPersonalId(long personalId) {
		this.personalId = personalId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getNationalId() {
		return nationalId;
	}

	public void setNationalId(BigDecimal nationalId) {
		this.nationalId = nationalId;
	}

	public String getNameOfTraining() {
		return nameOfTraining;
	}

	public void setNameOfTraining(String nameOfTraining) {
		this.nameOfTraining = nameOfTraining;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Date finishDate) {
		this.finishDate = finishDate;
	}

	public String getOrganizer() {
		return organizer;
	}

	public void setOrganizer(String organizer) {
		this.organizer = organizer;
	}

	public String getCertificateNo() {
		return certificateNo;
	}

	public void setCertificateNo(String certificateNo) {
		this.certificateNo = certificateNo;
	}

	public int getCertificateValidity() {
		return certificateValidity;
	}

	public void setCertificateValidity(int certificateValidity) {
		this.certificateValidity = certificateValidity;
	}

	public byte getValidityType() {
		return validityType;
	}

	public void setValidityType(byte validityType) {
		this.validityType = validityType;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getfStartDate() {
		if (getStartDate() != null) {
			fStartDate = new SimpleDateFormat("MM/dd/yyyy").format(getStartDate());
		}

		return fStartDate;
	}

	public void setfStartDate(String fStartDate) {
		this.fStartDate = fStartDate;
	}

	public String getfFinishDate() {
		if (getFinishDate() != null) {
			fFinishDate = new SimpleDateFormat("MM/dd/yyyy").format(getFinishDate()); 
		}
		return fFinishDate;
	}

	public void setfFinishDate(String fFinishDate) {
		this.fFinishDate = fFinishDate;
	}

}
