package com.example.Sketchst;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import org.springframework.beans.factory.annotation.Value;


class ProcessingService {



    public ProcessingService() {

    }



    ResponseEntity<byte[]> processImage(MultipartFile image) {
        try {
            // Get the image bytes

                byte[] imageBytes = image.getBytes();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                System.out.println(">>>>>>>>>>Processing image of size: " + imageBytes.length + " bytes");
                Client client = new Client();
                GenerateContentResponse response =
                        client.models.generateContent(
                                "gemini-2.5-flash",
                                "Explain how AI works in a few words",
                                null);

                System.out.println(response.text());
                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);


             // Write nano banana processing logic here---->>>>



        } catch (IOException e) {
            System.out.println(">>>>>>>>>>>Error processing image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}