// package com.tzeenttch.backend.config;

// import org.springframework.context.annotation.Bean;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public WebMvcConfigurer corsConfigurer() {
//         return new WebMvcConfigurer() {
//             @Override
//             public void addCorsMappings(CorsRe registry) {
//                 registry.addMapping("/api/**")  // las rutas que quieres permitir
//                         .allowedOrigins("http://localhost:4200")  // URL de tu Angular
//                         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                         .allowedHeaders("*")
//                         .allowCredentials(true);
//             }
//         };
//     }
// }
