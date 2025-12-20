package com.example.Sketchst;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.Sketchst"})
public class SketchstApplication {

	static {
		Dotenv dotenv = Dotenv.configure().directory(".").ignoreIfMissing().load();

		dotenv.entries().forEach(e -> {
					System.out.println(">>>>>>>>>>>>>>Loading env variable: " + e.getKey());
					System.setProperty(e.getKey(), e.getValue());
				}
		);
	}
	public static void main(String[] args) {

		SpringApplication.run(SketchstApplication.class, args);

	}

}
