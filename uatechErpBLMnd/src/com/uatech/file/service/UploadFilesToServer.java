package com.uatech.file.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class UploadFilesToServer {

	private static UploadFilesToServer uploadFilesToServer;

	private UploadFilesToServer() {

	}

	public static UploadFilesToServer getInstance() {
		if (uploadFilesToServer == null)
			uploadFilesToServer = new UploadFilesToServer();

		return uploadFilesToServer;
	}

	public ArrayList<String> uploadMultipleFile(String[] names, MultipartFile[] files) {
  
		if (files.length != names.length)
			return null ;

		ArrayList<String> paths = new ArrayList<String>(files.length); 
		for (int i = 0; i < files.length; i++) {
			MultipartFile file = files[i];
			String name = names[i];
			try {
				byte[] bytes = file.getBytes();

				// Creating the directory to store file
				String rootPath = System.getProperty("catalina.home");
				File dir = new File(rootPath + File.separator + "tmpFiles");
				if (!dir.exists())
					dir.mkdirs();

				// Create the file on server
				File serverFile = new File(dir.getAbsolutePath() + File.separator + name);
				while(serverFile.exists() && !serverFile.isDirectory()) 
				{ 
					 name = UUID.randomUUID().toString() + name.substring(name.indexOf("."));
					 serverFile = new File(dir.getAbsolutePath() + File.separator + name);
				}
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
				
				paths.add( serverFile.getAbsolutePath());
				
			} catch (Exception e) {
				return null;
			}
		}
		return paths;
	} 
}
