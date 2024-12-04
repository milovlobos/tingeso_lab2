package com.example.demo.Service;
import com.example.demo.Entity.file_entity;
import com.example.demo.Repository.file_repository;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@Service

public class file_service {

        @Autowired
        file_repository file_repository;

        public int uploadFile(long creditId,int type,MultipartFile file) throws IOException {
            file_entity newFile = new file_entity();
            newFile.setCreditId(creditId);
            newFile.setType(type);
            newFile.setFilename(file.getOriginalFilename());
            newFile.setFileContent(file.getBytes());
            file_repository.save(newFile);
            return 1;
        }

        @Transactional
        public file_entity downloadFile(long creditId,int type){
            return file_repository.getByCreditIdAndType(creditId,type);
        }

        public int deleteFiles(long creditId) throws Exception {
            try{
                file_repository.deleteByCreditId(creditId);
                return 1;
            } catch (Exception e) {
                return 0;
            }
        }
    @Transactional
    public List<file_entity> getFilesByCreditId(long creditId) {
        return file_repository.findAllByCreditId(creditId);
    }

}

