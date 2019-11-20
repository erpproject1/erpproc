package com.uatech.models;

import java.util.ArrayList;

public class Nodes {
	
	private ArrayList<Node> nodes ;

	
	public ArrayList<Node> getNodes() {
		if (nodes==null) {
			nodes = new ArrayList<Node>(); 
		}
		return nodes;
	}

	public void setNodes(ArrayList<Node> nodes) {
		this.nodes = nodes;
	}
	


}
