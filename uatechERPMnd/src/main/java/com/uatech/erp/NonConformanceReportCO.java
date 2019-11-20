package com.uatech.erp;
 
import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;

import com.itextpdf.awt.DefaultFontMapper.BaseFontParameters;
import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.TabSettings;
import com.itextpdf.text.TabStop;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfCopy;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.uatech.erp.entities.PersonalFiles;
import com.uatech.erp.entities.T00301NonConformance;
import com.uatech.file.service.ZXingHelper;

@Controller
public class NonConformanceReportCO {
	
 
	
public static void report1(HttpServletResponse response,T00301NonConformance t00,ArrayList<PersonalFiles> pf) {
		
	    OutputStream os = null;
	    try { 

	      os = response.getOutputStream();

	      Document document = null;

	      document = new Document(PageSize.A4);

	       ByteArrayOutputStream baos = new ByteArrayOutputStream();
	       PdfWriter writer = PdfWriter.getInstance(document, baos);
	      document.open();
 
	      
	      Image barcode = Image.getInstance(ZXingHelper.getImage( "Hello, I am a new Project", 200, 200) , null); 
	      barcode.scaleAbsolute(48f,48f);
	      
	      Resource resource1 = new ClassPathResource("image/check.png");
	      Resource resource2 = new ClassPathResource("image/noncheck.png");
	      Resource logo = new ClassPathResource("image/logo.png");
	      
	      Image imnc = Image.getInstance(resource2.getURL());
	      imnc.scaleAbsolute(12f, 12f);
	      Image imc = Image.getInstance(resource1.getURL());
	      imc.scaleAbsolute(12f, 12f); 
	      Image lg = Image.getInstance(logo.getURL());
	      imc.scaleAbsolute(12f, 12f);
	      Image img;
	      
	        PdfPTable table = new PdfPTable(100);
	        table.setWidthPercentage(100);
	        Paragraph p = new Paragraph();
	        Phrase ph=new Phrase();

	        PdfPCell c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(20);
	        c1.addElement(lg);  
	        table.addCell(c1); 
	        
	        
	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(60);
	        p = new Paragraph();
	        p.add(new Chunk(barcode, -24,-31));   
	        p.add(new Phrase("NON-CONFORMANCE REPORT",  kalinFont(14)));  
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement( p);      
	        table.addCell(c1);
	        
	         
	        c1 = new PdfPCell();
	        c1.addElement(new Paragraph("NCR#", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setRowspan(1);
	        c1.setColspan(8);
	        table.addCell(c1);

	        c1 = new PdfPCell();
	        c1.addElement(new Phrase(t00.getId()+"", normalCommetFont(8))); 
	        c1.setRowspan(1);
	        c1.setColspan(12);
	        table.addCell(c1);

	        c1 = new PdfPCell();
	        c1.addElement(new Paragraph("Discp.", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setRowspan(1);
	        c1.setColspan(8);
	        table.addCell(c1);
	        
	        c1 = new PdfPCell();
	        c1.addElement(new Phrase(t00.getDiscipline().getDescription(), normalCommetFont(8))); 
	        c1.setRowspan(1);
	        c1.setColspan(12);
	        table.addCell(c1);

	        c1 = new PdfPCell();
	        c1.addElement(new Paragraph("Date", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setRowspan(1);
	        c1.setColspan(8);
	        table.addCell(c1); 
	        
	        c1 = new PdfPCell();
	        c1.addElement(new Phrase(t00.getStatementDate().toString(), normalCommetFont(8))); 
	        c1.setRowspan(1);
	        c1.setColspan(12);
	        table.addCell(c1); 
	           
	        
	        document.add(table); 
	        
	        
	        /***********************************2 kýsým*********************************/
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);
	       
	        c1 = new PdfPCell();
	        c1.setRowspan(12);
	        c1.setColspan(3);   
	        c1.addElement(new Paragraph("Sec. I: Non-Conformity", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setHorizontalAlignment(Element.ALIGN_CENTER); 
	        c1.setPaddingRight(2.0f);
	        c1.setPaddingLeft(-2.0f);
	        c1.setPaddingBottom(50.0f);
	        c1.setRotation(90); 
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell(); 
	        c1.setRowspan(3);
	        c1.setColspan(77);
	        c1.addElement(new Phrase("Reference of the NCR:", kalinAltcizFont(8))); 
	        String degisken=t00.getReference()==null?"":t00.getReference();
	        c1.addElement(new Phrase(degisken, normalCommetFont(8))); 
	        c1.setFixedHeight(48f);
	        table.addCell(c1); 

	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(20);
	          
	        c1.addElement(new Phrase("Repeated NCR:",  kalinAltcizFont(8)));
	        
	        if(t00.getRepetedNCR().equals("Yes")) {img=imc;}
	        else {img=imnc;}
	        
	        p = new Paragraph();
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Yes",  normalFont(8)));    
	        p.setTabSettings(new TabSettings(20f)); 
	        p.add(Chunk.TABBING);
	        
	        if(t00.getRepetedNCR().equals("No")) {img=imc;}
	        else {img=imnc;}
	        
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("No",  normalFont(8)));  
	        c1.addElement(p);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(7);
	        c1.setColspan(77);
	        c1.addElement(new Phrase("Statement of Non-Conformity:",  kalinAltcizFont(8))); 
	        c1.addElement(new Phrase(t00.getStatementNCR(),  normalCommetFont(8)));
	        c1.setFixedHeight(112f);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(7);
	        c1.setColspan(20);
	        c1.addElement(new Phrase("Source",  kalinAltcizFont(8)));
	         
	        if(t00.getSource().equals("Vendor")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Vendor",  normalFont(8)));
	        c1.addElement(p);


	        if(t00.getSource().equals("Material Receiving")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Mat’l Receiving",  normalFont(8)));
	        c1.addElement(p);
	        

	        if(t00.getSource().equals("Surveillence")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Surveillance",  normalFont(8)));
	        c1.addElement(p);
	        

	        if(t00.getSource().equals("Inspection")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Inspection",  normalFont(8)));
	        c1.addElement(p);
	        

	        if(t00.getSource().equals("Audit")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Audit",  normalFont(8)));
	        c1.addElement(p);


	        if(t00.getSource().equals("Other")) {img=imc;} else {img=imnc;}
	        
	        p = new Paragraph(); 
	        p.setTabSettings(new TabSettings(10f));
	        p.add(Chunk.TABBING);
	        p.add(new Chunk(img, -2, -2));   
	        p.add(new Phrase("Other ",  normalFont(8)));
	        if(t00.getSource().equals("Other")) {

		        degisken=t00.getSourceReason()==null?"":t00.getSourceReason();
	        	p.add(new Phrase("("+degisken+")",  normalFont(6)));
	        	}
	        
	        c1.addElement(p);
	        
	         
	        table.addCell(c1); 
	        
	         
	        c1 = new PdfPCell();
	        c1.setRowspan(1);
	        c1.setColspan(58);
	        c1.addElement(new Phrase("Attachment(s):",  kalinFont(8)));
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(40);
	        c1.addElement(new Phrase("Originator name, date, signature",  kalinFont(8)));
	        c1.addElement(new Phrase(t00.getPer().getName()+" "+t00.getPer().getMidName()+" "+t00.getPer().getLastName(),  normalCommetFont(8)));
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(1);
	        c1.setColspan(58); 
	         
	        ph.add(new Phrase("Grading:",  kalinFont(8))); 
	        ph.add(Chunk.TABBING);
	        ph.setTabSettings(new TabSettings(40f));
	        
	        if(t00.getGrading().equals("Minor")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Minor",  normalFont(8))); 
	        ph.add(Chunk.TABBING); 
	        ph.setTabSettings(new TabSettings(40f));

	        if(t00.getGrading().equals("Moderate")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Moderate",  normalFont(8)));  
	        ph.add(Chunk.TABBING);
	        ph.setTabSettings(new TabSettings(40f));

	        if(t00.getGrading().equals("Major")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Major",  normalFont(8)));   
	        c1.addElement(ph);
	        table.addCell(c1); 
		      
	       document.add(table); 
	       /***********************************2 kýsým*********************************/
	       
	       /***********************************3 kýsým*********************************/
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        
	        
	        c1 = new PdfPCell(); 
	        c1.setColspan(100);    
	        c1.setFixedHeight(3f);
	        c1.setBackgroundColor(BaseColor.LIGHT_GRAY);
	        table.addCell(c1); 

	        document.add(table); 
	       
	        
	        
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        

	        
	        c1 = new PdfPCell();
	        c1.setRowspan(10);
	        c1.setColspan(3);   
	        c1.addElement(new Paragraph("Sec. II: Planning (Custodian Dept.)", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setHorizontalAlignment(Element.ALIGN_CENTER); 
	        c1.setPaddingRight(2.0f);
	        c1.setPaddingLeft(-2.0f);
	        c1.setPaddingBottom(20.0f);
	        c1.setRotation(90); 
	        table.addCell(c1); 
	         
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(97);  
	        c1.setFixedHeight(64f); 
	        
	        ph = new Phrase(); 
	        ph.add(new Phrase("Correction:",  kalinFont(8)));
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        degisken=t00.getCorrection()==null?"":t00.getCorrection();
	        if(degisken.equals("Use As Is")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Use as is",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        if(degisken.equals("Repair")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Repair",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        if(degisken.equals("Replace")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Replace",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        if(degisken.equals("Rework")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Rework",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        if(degisken.equals("Return")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Return",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        if(degisken.equals("Reject")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("Reject",  normalFont(8)));    
	        ph.setTabSettings(new TabSettings(70f));
	        ph.add(Chunk.TABBING);

	        c1.addElement(ph);

	        degisken=t00.getCorrectionDetail()==null?"":t00.getCorrectionDetail();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8))); 
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(5);
	        c1.setColspan(98); 
	        c1.addElement(new Phrase("Proposed corrective action:",  kalinFont(8))); 

	        degisken=t00.getProposedCorAct()==null?"":t00.getProposedCorAct();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8))); 
	        c1.setFixedHeight(96f);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(20);  
	        c1.setFixedHeight(32f);

	        p =new Paragraph("ACD",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        

	        degisken=t00.getActionCloseDate()==null?"":t00.getActionCloseDate().toString();
	        p =new Paragraph(degisken,  normalCommetFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        
	       // c1.setHorizontalAlignment(PdfPCell.ALIGN_CENTER);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(30);   
	        p =new Paragraph("Signature (Dept. Head)",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        table.addCell(c1); 

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(10); 
	        p =new Paragraph("Date",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(38); 
	        p =new Paragraph("Extended ACD",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        table.addCell(c1); 
	        

	        document.add(table); 
	       
	       
	       /***********************************3 kýsým*********************************/
	        
	        
	        /***********************************4 kýsým*********************************/
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        c1 = new PdfPCell(); 
	        c1.setColspan(100);    
	        c1.setFixedHeight(3f);
	        c1.setBackgroundColor(BaseColor.LIGHT_GRAY);
	        table.addCell(c1); 

	        document.add(table); 
	       
	        
	        
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        c1 = new PdfPCell();
	        c1.setRowspan(10);
	        c1.setColspan(3);   
	        c1.addElement(new Paragraph("Sec. III: Verification&Closure (Custodian Dept.)", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setHorizontalAlignment(Element.ALIGN_CENTER); 
	        c1.setPaddingRight(2.0f);
	        c1.setPaddingLeft(-2.0f);
	        c1.setPaddingBottom(20.0f);
	        c1.setRotation(90); 
	        table.addCell(c1); 
	         
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(5);
	        c1.setColspan(97); 
	        c1.setFixedHeight(96f);
	        p =new Paragraph("Root-Cause Analysis",  kalinAltcizFont(8)); 
	        p.setAlignment(Element.ALIGN_LEFT);
	        c1.addElement(p); 

	        degisken=t00.getRootCausesAnalysis()==null?"":t00.getRootCausesAnalysis();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8)));
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(98); 
	        c1.setFixedHeight(64f);
	        p =new Paragraph("Corrective actions:",  kalinAltcizFont(8)); 
	        p.setAlignment(Element.ALIGN_LEFT);
	        c1.addElement(p); 


	        degisken=t00.getCorrectiveActions()==null?"":t00.getCorrectiveActions();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8)));
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2); 
	        c1.setBorder(PdfPCell.NO_BORDER);
	        c1.setColspan(47); 
	        c1.setFixedHeight(32f); 
	        table.addCell(c1); 
	         

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(50);  
	        p =new Paragraph("Department Head (Name, date, signature)",  kalinAltcizFont(8)); 
	        p.setAlignment(Element.ALIGN_LEFT);
	        c1.addElement(p); 
	        table.addCell(c1); 
	         
	        document.add(table); 
	       
	       
	       /***********************************4 kýsým*********************************/
	        
	        
	        /***********************************5 kýsým*********************************/
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        c1 = new PdfPCell(); 
	        c1.setColspan(100);    
	        c1.setFixedHeight(3f);
	        c1.setBackgroundColor(BaseColor.LIGHT_GRAY);
	        table.addCell(c1); 

	        document.add(table); 
	        
	        
	        table = new PdfPTable(100);
	        table.setWidthPercentage(100);

	        c1 = new PdfPCell();
	        c1.setRowspan(6);
	        c1.setColspan(3);   
	        c1.addElement(new Paragraph("Sec. IV: Evaluation", new Font(BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),8)));
	        c1.setHorizontalAlignment(Element.ALIGN_CENTER); 
	        c1.setPaddingRight(2.0f);
	        c1.setPaddingLeft(-2.0f);
	        c1.setPaddingBottom(20.0f);
	        c1.setRotation(90); 
	        table.addCell(c1);  
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(1);
	        c1.setColspan(47);  
	        p =new Paragraph("Kolin Approval",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_CENTER);
	        c1.addElement(p);
	        table.addCell(c1); 

	        c1 = new PdfPCell();
	        c1.setRowspan(1);
	        c1.setColspan(50);  
	        p =new Paragraph("SA Approval",  kalinFont(8)); 
	        p.setAlignment(Element.ALIGN_MIDDLE);
	        c1.addElement(p);
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(47);  
	        c1.setFixedHeight(48f);
	        
	        ph= new Phrase(); 
	        ph.setTabSettings(new TabSettings(5f));
	        ph.add(Chunk.TABBING); 

	        if(t00.getEvaluation().equals("Yes")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("NCR completed",  normalFont(8))); 
	        
	        ph.setTabSettings(new TabSettings(50f));
	        ph.add(Chunk.TABBING);

	        if(t00.getEvaluation().equals("No")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("NCR not completed",  normalFont(8)));    
	        c1.addElement(ph);

	        c1.addElement(new Phrase("Comment(s):",  normalFont(8)));
	        degisken=t00.getEvaluationReason()==null?"":t00.getEvaluationReason();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8)));
	        
	        table.addCell(c1); 

	        c1 = new PdfPCell();
	        c1.setRowspan(3);
	        c1.setColspan(50); 
	        
	        ph= new Phrase(); 
	        ph.setTabSettings(new TabSettings(5f));
	        ph.add(Chunk.TABBING);

	        if(t00.getClientEvaluation().equals("Yes")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("NCR completed",  normalFont(8))); 
	        
	        ph.setTabSettings(new TabSettings(50f));
	        ph.add(Chunk.TABBING);

	        if(t00.getClientEvaluation().equals("No")) {img=imc;} else {img=imnc;}
	        
	        ph.add(new Chunk(img, -2, -2));   
	        ph.add(new Phrase("NCR not completed",  normalFont(8)));    
	        c1.addElement(ph);

	        c1.addElement(new Phrase("Comment(s):",  normalFont(8)));

	        degisken=t00.getClientEvaluationReason()==null?"":t00.getClientEvaluationReason();
	        c1.addElement(new Phrase(degisken,  normalCommetFont(8)));
	        table.addCell(c1); 
	        

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(47); 
	        c1.addElement(new Phrase("QA/QC Manager",  kalinFont(8))); 
	        c1.addElement(new Phrase("(Name, date, Signature)",  normalFont(8))); 
	        c1.setFixedHeight(32f);
	        table.addCell(c1); 

	        c1 = new PdfPCell();
	        c1.setRowspan(2);
	        c1.setColspan(50); 
	        c1.addElement(new Phrase("Approval",  kalinFont(8))); 
	        c1.addElement(new Phrase("(Name, date, signature)",  normalFont(8))); 
	        table.addCell(c1); 
	        
  
 
	          
	        document.add(table); 
	        document.close(); 
	       
	       /***********************************5 kýsým*********************************/
	        Date date = new Date();
	         
	        String p1 ="NCR_"+date.getTime(); 
	        String rootPath = System.getProperty("catalina.home")+ File.separator + "tmpFiles"+ File.separator ;
	        String p2=rootPath+p1+"1.pdf";
	        
	        baos.writeTo( new FileOutputStream(rootPath+p1+".pdf"));
	        writer.close();
	         
		    
	        File file = new File(p2);
	        file.getParentFile().mkdirs();
	        PdfCopy copy = new PdfCopy(document, baos); ///ön beleðe kayýt
	        document.open(); 
	        
	        pageAdd(copy,rootPath+p1+".pdf",""); 
	        
	        if (!pf.isEmpty()) {
				int x=1;
	        	for (PersonalFiles pp:pf) 
	        	{
						String pfPath= pp.getFilePath(); 
						int l=pfPath.length();
						String uzanti= pfPath.substring(l-3,l);
						System.out.println(uzanti);
						if (uzanti.equalsIgnoreCase("pdf")) {
							pageAdd(copy,pfPath,"Attachment-"+x+" ( "+pp.getClientFileName()+" )");
						}
						else if(uzanti.equalsIgnoreCase("jpg")||uzanti.equalsIgnoreCase("png")||uzanti.equalsIgnoreCase("jpeg")){
							Image fImage = Image.getInstance(pfPath);
							pageAdd(copy,fImage,"Attachment-"+x+" ( "+pp.getClientFileName()+" )");
						}
						x++;
					}
			}
	       // pageAdd(copy,rootPath+ "ags.pdf");
	       // pageAdd(copy,lg);   
	        document.close(); 
	         
	        baos.writeTo( new FileOutputStream(p2)); ///servere kayýt
	      
	      response.setContentType("Content-Type: text/html; charset=UTF-8");
	      response.addHeader(  "Content-Disposition", "attachment; filename="+p1+"1.pdf");
	      response.setContentLength(baos.size());
	      baos.writeTo(os);
	    } 
	    catch (final IOException | DocumentException e) {
	      e.printStackTrace();
	    } 
	    finally {
	      
	          try {
				os.flush();
				os.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	          
	       
	    }
	}

 

public static void pageAdd(PdfCopy copy,Image im,String title) throws DocumentException, IOException
{
	
	Document imageDocument = new Document();
    ByteArrayOutputStream imageDocumentOutputStream = new ByteArrayOutputStream();
    PdfWriter imageDocumentWriter = PdfWriter.getInstance(imageDocument, imageDocumentOutputStream);
    imageDocument.open();

     if (imageDocument.newPage()) {

    	 if(im.getHeight()>830||im.getWidth()>585)
    	 {
    		 System.out.println("HATA var");
    		 im.scaleToFit(500, 747);
    	 }
     	 imageDocument.add(im);  
         imageDocument.close();
         imageDocumentWriter.close();

         PdfReader reader = new PdfReader(imageDocumentOutputStream.toByteArray());
         PdfCopy.PageStamp stmp;
         PdfImportedPage ip= copy.getImportedPage(reader, 1);
    	 stmp=copy.createPageStamp(ip);
    	 ColumnText.showTextAligned(stmp.getOverContent(), Element.ALIGN_CENTER, new Phrase(title ,  kalinFont(8)),297.5f, ip.getHeight()-25, 0);
    	 stmp.alterContents();
         copy.addPage(ip);
      }

}

public static void pageAdd(PdfCopy copy,String path,String title) throws DocumentException, IOException
{ 

         PdfReader reader = new PdfReader(path);
         int a=reader.getNumberOfPages()+1;
         PdfCopy.PageStamp stmp;
         
         
          for (int i = 1; i <a ; i++) {
 
        	 PdfImportedPage ip= copy.getImportedPage(reader, i);
        	 stmp=copy.createPageStamp(ip);
        	 ColumnText.showTextAligned(stmp.getOverContent(), Element.ALIGN_CENTER, new Phrase(title,  kalinFont(8)),297.5f, ip.getHeight()-25, 0);
        	 stmp.alterContents();
             copy.addPage(ip);
		    }

         reader.close();
 

}

public static BufferedImage getImage( byte[] b) {
	
    ByteArrayInputStream bis = new ByteArrayInputStream(b);
    BufferedImage bImage2 = null;
	try {
		bImage2 = ImageIO.read(bis);
		b=null;
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
     
    return bImage2;
    
}		
public static Font kalinAltcizFont(int i)
{
	return new Font(Font.getFamily("TIMES_ROMAN"), i,Font.BOLD|Font.UNDERLINE);
}


public static Font normalFont(int i)
{
	return new Font(Font.getFamily("TIMES_ROMAN"), i);
}

public static Font kalinFont(int i)
{
	return new Font(Font.getFamily("TIMES_ROMAN"), i,Font.BOLD);
}

public static Font normalCommetFont(int i)
{
	return new Font(Font.getFamily("COURIER"), i);
}		
		
//BaseFont.createFont(BaseFont.TIMES_BOLD,BaseFont.CP1250,false),i
}




  /*
     PdfPCell horizontalAlignCell = new PdfPCell(new Phrase("row 2, col 2"));
     horizontalAlignCell.setHorizontalAlignment(Element.ALIGN_CENTER);
     table.addCell(horizontalAlignCell);
  
     PdfPCell verticalAlignCell = new PdfPCell(new Phrase("row 2, col 3"));
     verticalAlignCell.setVerticalAlignment(Element.ALIGN_BOTTOM);
     table.addCell(verticalAlignCell);*/

/*
Stream.of("column header 1", "column header 2", "column header 3")
.forEach(columnTitle -> {
  PdfPCell header = new PdfPCell();
  header.setBackgroundColor(BaseColor.LIGHT_GRAY);
  header.setBorderWidth(2);
  header.setPhrase(new Phrase(columnTitle));
  table.addCell(header);});*/

/* BufferedImage img = ZXingHelper.getImage("Merhabalar", 120, 120);//Image.getInstance(path.toAbsolutePath().toString());
	      //Image image = Image.getInstance(img , null); 
	      
	      image.scalePercent(15);
	      PdfPCell imageCell = new PdfPCell(image);
	      imageCell.setHorizontalAlignment(Element.ALIGN_CENTER);
	      imageCell.setBorderWidth(2);
	      imageCell.setBorder(Rectangle.BOTTOM); 
	      imageCell.setBorderColor(BaseColor.MAGENTA);
	      imageCell.setFixedHeight(40f);
	      table.addCell(imageCell);  */