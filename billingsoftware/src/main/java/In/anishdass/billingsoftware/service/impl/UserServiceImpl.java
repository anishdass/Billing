package In.anishdass.billingsoftware.service.impl;

import In.anishdass.billingsoftware.entity.UserEntity;
import In.anishdass.billingsoftware.io.UserRequest;
import In.anishdass.billingsoftware.io.UserResponse;
import In.anishdass.billingsoftware.repository.UserRespository;
import In.anishdass.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRespository userRespository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRespository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .build();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }


    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRespository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found for the email " + email));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRespository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRespository.findByUserId(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        userRespository.delete(existingUser);
    }
}
