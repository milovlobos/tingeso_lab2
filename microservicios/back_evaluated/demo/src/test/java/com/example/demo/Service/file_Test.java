package com.example.demo.Service;
import com.example.demo.Entity.file_entity;
import com.example.demo.Repository.file_repository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ActiveProfiles("test")
public class file_Test {

    @InjectMocks
    private file_service fileService;

    @Mock
    private file_repository fileRepository;

    private file_entity fileEntity;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fileEntity = new file_entity();
        fileEntity.setCreditId(1L);
        fileEntity.setType(1);
        fileEntity.setFilename("testfile.txt");
        fileEntity.setFileContent("Sample content".getBytes());
    }

    @Test
    void testUploadFile() throws IOException {
        // Given
        long creditId = 1L;
        int type = 1;
        MultipartFile file = new MockMultipartFile("file", "testfile.txt", MediaType.TEXT_PLAIN_VALUE, "Sample content".getBytes());

        // When
        int result = fileService.uploadFile(creditId, type, file);

        // Then
        assertEquals(1, result);
        verify(fileRepository, times(1)).save(any(file_entity.class));
    }

    @Test
    void testDownloadFile_Success() {
        // Given
        long creditId = 1L;
        int type = 1;
        when(fileRepository.getByCreditIdAndType(creditId, type)).thenReturn(fileEntity);

        // When
        file_entity result = fileService.downloadFile(creditId, type);

        // Then
        assertThat(result).isEqualTo(fileEntity);
        verify(fileRepository, times(1)).getByCreditIdAndType(creditId, type);
    }

    @Test
    void testDownloadFile_NotFound() {
        // Given
        long creditId = 1L;
        int type = 1;
        when(fileRepository.getByCreditIdAndType(creditId, type)).thenReturn(null);

        // When
        file_entity result = fileService.downloadFile(creditId, type);

        // Then
        assertThat(result).isNull();
        verify(fileRepository, times(1)).getByCreditIdAndType(creditId, type);
    }

    @Test
    void testDeleteFiles_Success() throws Exception {
        // Given
        long creditId = 1L;

        // When
        int result = fileService.deleteFiles(creditId);

        // Then
        assertEquals(1, result);
        verify(fileRepository, times(1)).deleteByCreditId(creditId);
    }

    @Test
    void testDeleteFiles_Exception() throws Exception {
        // Given
        long creditId = 1L;
        doThrow(new RuntimeException("Delete failed")).when(fileRepository).deleteByCreditId(creditId);

        // When
        int result = fileService.deleteFiles(creditId);

        // Then
        assertEquals(0, result);
        verify(fileRepository, times(1)).deleteByCreditId(creditId);
    }

    @Test
    void testGetFilesByCreditId() {
        // Given
        long creditId = 1L;
        when(fileRepository.findAllByCreditId(creditId)).thenReturn(List.of(fileEntity));

        // When
        List<file_entity> result = fileService.getFilesByCreditId(creditId);

        // Then
        assertThat(result).containsExactly(fileEntity);
        verify(fileRepository, times(1)).findAllByCreditId(creditId);
    }
}
