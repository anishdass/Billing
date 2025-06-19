package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.UserRequest;
import In.anishdass.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
