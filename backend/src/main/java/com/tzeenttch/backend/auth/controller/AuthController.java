// package com.tzeenttch.backend.auth.controller;

// import com.tzeenttch.demo.model.LoginRequest;
// import com.tzeenttch.demo.model.JwtResponse;
// import com.tzeenttch.backend.service.JwtTokenUtil;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private JwtTokenUtil jwtTokenUtil;

//     @Autowired
//     private UserDetailsService userDetailsService;

//     @PostMapping("/login")
//     public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest loginRequest) throws Exception {

//         Authentication authentication = authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
//         );

//         SecurityContextHolder.getContext().setAuthentication(authentication);

//         // Generamos el JWT
//         String jwt = jwtTokenUtil.generateToken(authentication);
        
//         return ResponseEntity.ok(new JwtResponse(jwt));
//     }
// }
