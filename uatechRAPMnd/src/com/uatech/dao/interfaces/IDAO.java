package com.uatech.dao.interfaces;

import java.util.ArrayList;


public interface IDAO<T,K> {  

	Long insert(T t); 
	boolean update(T t); 	
	boolean persist(T t) ; 	
	boolean delete(T t) ; 
	T getFindById(K k); 	
	ArrayList<T> getAll(); 	
	ArrayList<T> getResults(T t); 


}
