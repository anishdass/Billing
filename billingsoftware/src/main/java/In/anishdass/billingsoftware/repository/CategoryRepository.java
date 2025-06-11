package In.anishdass.billingsoftware.repository;

import In.anishdass.billingsoftware.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
