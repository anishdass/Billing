package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.CategoryRequest;
import In.anishdass.billingsoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();
}
