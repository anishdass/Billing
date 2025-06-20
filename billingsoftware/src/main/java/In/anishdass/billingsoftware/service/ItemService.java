package In.anishdass.billingsoftware.service;

import In.anishdass.billingsoftware.io.ItemRequest;
import In.anishdass.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
