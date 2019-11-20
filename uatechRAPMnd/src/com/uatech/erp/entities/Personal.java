package com.uatech.erp.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Personal implements Serializable {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = true)
	private long companyId;

	@Column(nullable = false)
	private String name="";
	

	@Column(nullable = false)
	private String personType="";
	
	private String midName;	
	
	@Column(nullable = false)
	private String lastName="";
	 
	@Column(length=10)
	private long nationalId; 
	
	@Column(nullable = false)
	private long nationalityId; //ülke
	
	@Column(nullable = false)
	private String passportNo=" ";
	
	@Temporal(TemporalType.DATE)
	private Date birthDate;
	
	@Column(nullable = true)
	private long countryId;
	
	@Column(nullable = true)
	private long cityId;
	
	@Column(nullable = true)
	private String address;

	@Column(nullable = true)
	private String company;
	
	@Column(length=20)
	private String companyPhone;
	
	@Column(length=20) 
	private String personalPhone; 
	
	private String companyEmail;  
	
	private String personalEmail; 
	
	@Column(length=20) 
	private String emergencyPhone;
	
	private String emergencyEmail;
	
	@Column(nullable = true)
	private String homeCountryId;
	
	@Column(nullable = true)
	private String homeCityId;
	
	@Column(nullable = true)
	private String homeAddress;
	
	@Column(length=20) 
	private String homePersonalPhone;
	
	@Column(length=20) 
	private String homeEmergencyPhone;
	
	private String homeEmergencyEmail;
	

	@Column(nullable = true)
	private String graduation;
	
	@Column(nullable = true)
	private String degree;
	
	@Column(nullable = true)
	private String nameOfSchool;
	
	@Column(nullable = true)
	private int schoolCountry;
	
	@Column(nullable = true)
	private int yearOfGraduation;
	
	@Column(nullable = true)
	private String graduationScore;

	@Column(nullable = true)
	private long departmentId ;	

	@Column(nullable = true)
	private long disciplineId ;

	@Column(nullable = true)
	private long jobId ;
	
	@Column(nullable = true)
	private long designationId ;
	
	@Temporal(TemporalType.DATE)
	private Date contractDate;

	@Column(nullable = true)
	private int contractDuration;
	
	@Column(nullable = true)
	private String contractDurationDesc;

	@Column(nullable = true)
	private int vocationDays;  
	
	@Column(nullable = true)
	private String vocationDaysDesc;   
	
	@Column(nullable = true)
	private int vocationPeriod;	
	 
	@Column(nullable = true)
	private String vocationPeriodDesc;   
	
	@Column(nullable = true)
	private long basicSalary;
	

	@Column(nullable = true)
	private String basicSalaryDesc;   
	
	@Column(nullable = true)
	private long homeAllowance; 
	
	@Column(nullable = true)
	private String homeAllowanceDesc;   
	
	@Column(nullable = true)
	private long transAllowance; 

	@Column(nullable = true)
	private String transAllowanceDesc;   
	
	@Column(nullable = true)
	private long foodAllowance;

	@Column(nullable = true)
	private String foodAllowanceDesc;   
	
	@Column(nullable = true)
	private String otherAllowanceText;
	
	@Column(nullable = true)
	private long otherAllowance; // for other allowance

	@Column(nullable = true)
	private String otherAllowanceDesc;   
	
	
	private boolean active;
	private Date create_date = new Date();
	
	
	//for personal page
	public String fatherName;
	public String motherName;
	public String drivingLicence;
	public String placeOfBirth;
	public String bloodGroup;
	public String maritalStatus;
	public boolean isMaleFemale=false;
	public boolean isSmoker=false;
	private String path;
	private String fileName;
	
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getFileName() {
		
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	//for contact page
	public int socialMediaAccounts=0;
	private String socialMediaAccountsURL;
	//for contract page
	private long allowance=0; 
	private String allowanceDesc;  
	//for education page 
	private Date dateOfGrad;
	//for language skills
	private String language;
	private int understanding=0;
	private int reading=0;
	private int writing=0;
	private int internationallangtest=0;
	private int score=0;
	//for bank accounts
	private int nameOfBank=0;
	private int branch=0;
	@Column(nullable = true)
	private int ibanNo=0;
	private int nameOfBankcredit=0;
	private int creditCardNo=0;
	private Date cutOffDate;
	private Date paymentDate;
	// for social hobbies
	private String social;
	private int hobbies=0;
	//for references
	private String nameReference;
	private String jobDescReference;
	private String companyReference;
	private int countryReference=0;
	private String emailReference;
	private int relation;
	private String remarks;
	//for comments
	private String comments;
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public int getRelation() {
		return relation;
	}
	public void setRelation(int relation) {
		this.relation = relation;
	}
	public String getEmailReference() {
		return emailReference;
	}
	public void setEmailReference(String emailReference) {
		this.emailReference = emailReference;
	}
	public int getCountryReference() {
		return countryReference;
	}
	public void setCountryReference(int countryReference) {
		this.countryReference = countryReference;
	}
	public String getCompanyReference() {
		return companyReference;
	}
	public void setCompanyReference(String companyReference) {
		this.companyReference = companyReference;
	}
	public String getJobDescReference() {
		return jobDescReference;
	}
	public void setJobDescReference(String jobDescReference) {
		this.jobDescReference = jobDescReference;
	}
	public String getNameReference() {
		return nameReference;
	}
	public void setNameReference(String nameReference) {
		this.nameReference = nameReference;
	}
	public int getHobbies() {
		return hobbies;
	}
	public void setHobbies(int hobbies) {
		this.hobbies = hobbies;
	}
	public String getSocial() {
		return social;
	}
	public void setSocial(String social) {
		this.social = social;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Date getCutOffDate() {
		return cutOffDate;
	}
	public void setCutOffDate(Date cutOffDate) {
		this.cutOffDate = cutOffDate;
	}
	public int getCreditCardNo() {
		return creditCardNo;
	}
	public void setCreditCardNo(int creditCardNo) {
		this.creditCardNo = creditCardNo;
	}
	public int getNameOfBankcredit() {
		return nameOfBankcredit;
	}
	public void setNameOfBankcredit(int nameOfBankcredit) {
		this.nameOfBankcredit = nameOfBankcredit;
	}
	
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
		public String getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}	
	public boolean isMaleFemale() {
		return isMaleFemale;
	}
	public void setMaleFemale(boolean isMaleFemale) {
		this.isMaleFemale = isMaleFemale;
	}
	public boolean isSmoker() {
		return isSmoker;
	}
	public void setSmoker(boolean isSmoker) {
		this.isSmoker = isSmoker;
	}
	public int getIbanNo() {
		return ibanNo;
	}
	public void setIbanNo(int ibanNo) {
		this.ibanNo = ibanNo;
	}
	public int getBranch() {
		return branch;
	}
	public void setBranch(int branch) {
		this.branch = branch;
	}
	public int getNameOfBank() {
		return nameOfBank;
	}
	public void setNameOfBank(int nameOfBank) {
		this.nameOfBank = nameOfBank;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public int getInternationallangtest() {
		return internationallangtest;
	}
	public void setInternationallangtest(int internationallangtest) {
		this.internationallangtest = internationallangtest;
	}
	public int getWriting() {
		return writing;
	}
	public void setWriting(int writing) {
		this.writing = writing;
	}
	public int getReading() {
		return reading;
	}
	public void setReading(int reading) {
		this.reading = reading;
	}
	public int getUnderstanding() {
		return understanding;
	}
	public void setUnderstanding(int understanding) {
		this.understanding = understanding;
	}	
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public Date getDateOfGrad() {
		return dateOfGrad;
	}
	public void setDateOfGrad(Date dateOfGrad) {
		this.dateOfGrad = dateOfGrad;
	}
	public String getAllowanceDesc() {
		return allowanceDesc;
	}
	public void setAllowanceDesc(String allowanceDesc) {
		this.allowanceDesc = allowanceDesc;
	}
	public long getAllowance() {
		return allowance;
	}
	public void setAllowance(long allowance) {
		this.allowance = allowance;
	}
	public int getSocialMediaAccounts() {
		return socialMediaAccounts;
	}
	public void setSocialMediaAccounts(int socialMediaAccounts) {
		this.socialMediaAccounts = socialMediaAccounts;
	}	
	public String getSocialMediaAccountsURL() {
		return socialMediaAccountsURL;
	}
	public void setSocialMediaAccountsURL(String socialMediaAccountsURL) {
		this.socialMediaAccountsURL = socialMediaAccountsURL;
	}
	public String getPlaceOfBirth() {
		return placeOfBirth;
	}
	public void setPlaceOfBirth(String placeOfBirth) {
		this.placeOfBirth = placeOfBirth;
	}
	public String getDrivingLicence() {
		return drivingLicence;
	}
	public void setDrivingLicence(String drivingLicence) {
		this.drivingLicence = drivingLicence;
	}
	public String getMotherName() {
		return motherName;
	}
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public long getDisciplineId() {
		return disciplineId;
	}
	public void setDisciplineId(long disciplineId) {
		this.disciplineId = disciplineId;
	}
	public String getPersonType() {
		return personType;
	}
	public void setPersonType(String personType) {
		this.personType = personType;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMidName() {
		return midName;
	}
	public void setMidName(String midName) {
		this.midName = midName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	 
	public long getNationalityId() {
		return nationalityId;
	}
	public void setNationalityId(long nationalityId) {
		this.nationalityId = nationalityId;
	}
	public String getPassportNo() {
		return passportNo;
	}
	public void setPassportNo(String passportNo) {
		this.passportNo = passportNo;
	}
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}
	public long getCountryId() {
		return countryId;
	}
	public void setCountryId(long countryId) {
		this.countryId = countryId;
	}
	public long getCityId() {
		return cityId;
	}
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCompanyPhone() {
		return companyPhone;
	}
	public void setCompanyPhone(String companyPhone) {
		this.companyPhone = companyPhone;
	}
	public String getPersonalPhone() {
		return personalPhone;
	}
	public void setPersonalPhone(String personalPhone) {
		this.personalPhone = personalPhone;
	}
	public String getCompanyEmail() {
		return companyEmail;
	}
	public void setCompanyEmail(String companyEmail) {
		this.companyEmail = companyEmail;
	}
	public String getPersonalEmail() {
		return personalEmail;
	}
	public void setPersonalEmail(String personalEmail) {
		this.personalEmail = personalEmail;
	}
	public String getEmergencyPhone() {
		return emergencyPhone;
	}
	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}
	public String getEmergencyEmail() {
		return emergencyEmail;
	}
	public void setEmergencyEmail(String emergencyEmail) {
		this.emergencyEmail = emergencyEmail;
	}
	public String getHomeCountryId() {
		return homeCountryId;
	}
	public void setHomeCountryId(String homeCountryId) {
		this.homeCountryId = homeCountryId;
	}
	public String getHomeCityId() {
		return homeCityId;
	}
	public void setHomeCityId(String homeCityId) {
		this.homeCityId = homeCityId;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}
	public String getHomePersonalPhone() {
		return homePersonalPhone;
	}
	public void setHomePersonalPhone(String homePersonalPhone) {
		this.homePersonalPhone = homePersonalPhone;
	}
	public String getHomeEmergencyPhone() {
		return homeEmergencyPhone;
	}
	public void setHomeEmergencyPhone(String homeEmergencyPhone) {
		this.homeEmergencyPhone = homeEmergencyPhone;
	}
	public String getHomeEmergencyEmail() {
		return homeEmergencyEmail;
	}
	public void setHomeEmergencyEmail(String homeEmergencyEmail) {
		this.homeEmergencyEmail = homeEmergencyEmail;
	}
	public String getGraduation() {
		return graduation;
	}
	public void setGraduation(String graduation) {
		this.graduation = graduation;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getNameOfSchool() {
		return nameOfSchool;
	}
	public void setNameOfSchool(String nameOfSchool) {
		this.nameOfSchool = nameOfSchool;
	}
	public int getSchoolCountry() {
		return schoolCountry;
	}
	public void setSchoolCountry(int schoolCountry) {
		this.schoolCountry = schoolCountry;
	}
	public int getYearOfGraduation() {
		return yearOfGraduation;
	}
	public void setYearOfGraduation(int yearOfGraduation) {
		this.yearOfGraduation = yearOfGraduation;
	}
	public String getGraduationScore() {
		return graduationScore;
	}
	public void setGraduationScore(String graduationScore) {
		this.graduationScore = graduationScore;
	}
	public long getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(long departmentId) {
		this.departmentId = departmentId;
	}
	public long getJobId() {
		return jobId;
	}
	public void setJobId(long jobId) {
		this.jobId = jobId;
	}
	public long getDesignationId() {
		return designationId;
	}
	public void setDesignationId(long designationId) {
		this.designationId = designationId;
	}
	public Date getContractDate() {
		return contractDate;
	}
	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}
	public int getContractDuration() {
		return contractDuration;
	}
	public void setContractDuration(int contractDuration) {
		this.contractDuration = contractDuration;
	}
	public String getContractDurationDesc() {
		return contractDurationDesc;
	}
	public void setContractDurationDesc(String contractDurationDesc) {
		this.contractDurationDesc = contractDurationDesc;
	}
	public int getVocationDays() {
		return vocationDays;
	}
	public void setVocationDays(int vocationDays) {
		this.vocationDays = vocationDays;
	}
	public String getVocationDaysDesc() {
		return vocationDaysDesc;
	}
	public void setVocationDaysDesc(String vocationDaysDesc) {
		this.vocationDaysDesc = vocationDaysDesc;
	}
	public int getVocationPeriod() {
		return vocationPeriod;
	}
	public void setVocationPeriod(int vocationPeriod) {
		this.vocationPeriod = vocationPeriod;
	}
	public String getVocationPeriodDesc() {
		return vocationPeriodDesc;
	}
	public void setVocationPeriodDesc(String vocationPeriodDesc) {
		this.vocationPeriodDesc = vocationPeriodDesc;
	}
	public long getBasicSalary() {
		return basicSalary;
	}
	public void setBasicSalary(long basicSalary) {
		this.basicSalary = basicSalary;
	}
	public String getBasicSalaryDesc() {
		return basicSalaryDesc;
	}
	public void setBasicSalaryDesc(String basicSalaryDesc) {
		this.basicSalaryDesc = basicSalaryDesc;
	}
	public long getHomeAllowance() {
		return homeAllowance;
	}
	public void setHomeAllowance(long homeAllowance) {
		this.homeAllowance = homeAllowance;
	}
	public String getHomeAllowanceDesc() {
		return homeAllowanceDesc;
	}
	public void setHomeAllowanceDesc(String homeAllowanceDesc) {
		this.homeAllowanceDesc = homeAllowanceDesc;
	}
	public long getTransAllowance() {
		return transAllowance;
	}
	public void setTransAllowance(long transAllowance) {
		this.transAllowance = transAllowance;
	}
	public String getTransAllowanceDesc() {
		return transAllowanceDesc;
	}
	public void setTransAllowanceDesc(String transAllowanceDesc) {
		this.transAllowanceDesc = transAllowanceDesc;
	}
	public long getFoodAllowance() {
		return foodAllowance;
	}
	public void setFoodAllowance(long foodAllowance) {
		this.foodAllowance = foodAllowance;
	}
	public String getFoodAllowanceDesc() {
		return foodAllowanceDesc;
	}
	public void setFoodAllowanceDesc(String foodAllowanceDesc) {
		this.foodAllowanceDesc = foodAllowanceDesc;
	}
	public String getOtherAllowanceText() {
		return otherAllowanceText;
	}
	public void setOtherAllowanceText(String otherAllowanceText) {
		this.otherAllowanceText = otherAllowanceText;
	}
	public long getOtherAllowance() {
		return otherAllowance;
	}
	public void setOtherAllowance(long otherAllowance) {
		this.otherAllowance = otherAllowance;
	}
	public String getOtherAllowanceDesc() {
		return otherAllowanceDesc;
	}
	public void setOtherAllowanceDesc(String otherAllowanceDesc) {
		this.otherAllowanceDesc = otherAllowanceDesc;
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
	public long getNationalId() {
		return nationalId;
	}
	public void setNationalId(long nationalId) {
		this.nationalId = nationalId;
	}
	 
	
	
}
