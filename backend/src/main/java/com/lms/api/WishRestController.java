package com.lms.api;

import com.lms.dto.DeleteBookFromWish;
import com.lms.dto.WishDto;
import com.lms.model.DecodedToken;
import com.lms.service.imp.UserServiceImp;
import com.lms.service.imp.WishServiceImp;
import com.lms.util.ApiPaths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping(ApiPaths.WishCtrl.CTRL)
@CrossOrigin
public class WishRestController {
    private final WishServiceImp wishServiceImp;
    private final UserServiceImp userServiceImp;


    public WishRestController(WishServiceImp wishServiceImp, UserServiceImp userServiceImp) {
        this.wishServiceImp = wishServiceImp;
        this.userServiceImp = userServiceImp;
    }

    @GetMapping()
    public ResponseEntity<WishDto> getWish(HttpServletRequest httpServletRequest) throws UnsupportedEncodingException {

        String token=httpServletRequest.getHeader("Authorization");
        DecodedToken decoded = DecodedToken.getDecoded(token);

        return ResponseEntity.ok(this.wishServiceImp.getActiveWish(decoded.userId));
    }

    @PostMapping("/add-book/{bookId}")
    public ResponseEntity<WishDto> addBookToWish(HttpServletRequest httpServletRequest,
                                                 @PathVariable Long bookId) throws UnsupportedEncodingException {
        String token=httpServletRequest.getHeader("Authorization");
        DecodedToken decoded = DecodedToken.getDecoded(token);

        if(bookId !=null)
        {
            return ResponseEntity.ok(wishServiceImp.addProductToWish(decoded.userId,bookId));
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/delete-book/{wishId}/{bookId}")
    public ResponseEntity<Boolean> deleteBookFromWish(HttpServletRequest httpServletRequest,
                                                      @PathVariable(name = "wishId", required = true) Long wishId,
                                                      @PathVariable(name = "bookId", required = true) Long bookId) throws UnsupportedEncodingException {
        String token=httpServletRequest.getHeader("Authorization");
        DecodedToken decoded = DecodedToken.getDecoded(token);

        if(bookId !=null) {
            DeleteBookFromWish deleteBook = new DeleteBookFromWish(decoded.userId,wishId,bookId);
            return ResponseEntity.ok(wishServiceImp.deleteBookFromWish(deleteBook));
        }
        return ResponseEntity.ok(true);
    }
}
