package In.anishdass.billingsoftware.repository;

import In.anishdass.billingsoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {
    Optional<ItemEntity> findbyItemId(String id);

    Integer countByCategory(Long id);
}
