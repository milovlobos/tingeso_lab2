package com.example.demo.Controller;

import com.example.demo.Entity.file_entity;
import com.example.demo.Service.file_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/file")

public class file_controller {

    @Autowired
    file_service FileService;

    @PostMapping("/upload/{id}/{type}")
    public int saveFile(@PathVariable long id,
                        @PathVariable int type,
                        @RequestParam("file") MultipartFile file) {
        try {
            return FileService.uploadFile(id, type, file);
        } catch (IOException e) {
            return 0;
        }
    }

    @GetMapping("/download/{id}/{type}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable long id,
                                               @PathVariable int type) {
        file_entity pdfFile = FileService.downloadFile(id,type);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + pdfFile.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfFile.getFileContent());
    }
    @GetMapping("/list/{creditId}")
    public List<file_entity> getFilesByCreditId(@PathVariable long creditId) {
        return FileService.getFilesByCreditId(creditId);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteFiles(@PathVariable long id){
        try{
            FileService.deleteFiles(id);
            return 1;
        } catch (Exception e) {
            return 0;
        }
    }
}
