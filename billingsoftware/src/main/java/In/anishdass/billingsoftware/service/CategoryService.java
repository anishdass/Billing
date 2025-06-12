package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.CategoryRequest;
import In.anishdass.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
