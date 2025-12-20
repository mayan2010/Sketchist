package com.example.Sketchst;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
class ProcessorController {
//    private final ProcessingService processingService;
//
//    public ProcessorController() {
//        this.processingService = new ProcessingService();
//    }
    @GetMapping("/")
    public String getStatus() {
        return "Processor is running";
    }
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<byte[]> uploadImage(@RequestParam("image") MultipartFile image) {
        ProcessingService service = new ProcessingService();
        return service.processImage(image);
    }
}