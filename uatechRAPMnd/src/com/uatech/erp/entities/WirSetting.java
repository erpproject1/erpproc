package com.uatech.erp.entities;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint; 

@Entity  
@Table(uniqueConstraints={
	    @UniqueConstraint(columnNames = {"type", "description"})
	})
public class WirSetting {
 
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String type;
	private String description; 
	private String code;  
	private int value;
	private boolean active;
	
	

	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	
	 
	
}
