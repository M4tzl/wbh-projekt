package com.github.dmn1k.tfm.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Value("${ssl.required}")
    private boolean sslRequired;

    @Bean
    public PasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .httpBasic()
            .and()
            .authorizeRequests()
            .antMatchers("/index.html", "/",
                "/health",
                "/assets/**",
                "/*.css",
                "/*.js",
                "/*.html",
                "/*.ico",
                "/*.eot",
                "/*.svg",
                "/*.ttf",
                "/*.woff",
                "/*.woff2",
                "/api/user", "/api/logout",
                "/api/password/reset/**",
                "/api/stories/**", "/api/inserate/**",
                "/api/breeds",
                "/api/register/**").permitAll()
            .anyRequest().authenticated()
            .and().csrf()
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            .and().logout()
            .logoutUrl("/api/logout")
            .and().sessionManagement()
            .sessionAuthenticationErrorUrl("/#/session-expired")
            .and().headers().frameOptions().disable();

        if(sslRequired) {
            http.requiresChannel().anyRequest().requiresSecure();
        }
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(bCryptPasswordEncoder());
    }
}
