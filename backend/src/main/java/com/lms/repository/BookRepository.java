package com.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.model.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findByName(String name);

	@Query("select b from Book b where b.name like %:name%")
	List<Book> SearchBooksByName(String name);

	@Query(value="SELECT b.* FROM Book b INNER JOIN checkout_books cb ON cb.books_id=b.id GROUP BY b.id ORDER BY COUNT(cb.books_id) DESC LIMIT 10",nativeQuery = true)
	public List<Book> getRecentSales();

	@Query(value=
			"SELECT DISTINCT b.* " +
			"FROM Book b " +
			"INNER JOIN public.comment com ON b.id = com.book_id " +
			"INNER JOIN public.wish_book_list wb ON b.id = wb.book_list_id " +
			"INNER JOIN public.checkout_books cb ON b.id = cb.books_id " +
			"WHERE b.id != :id AND b.rating >= 4 AND b.category like %:category%",nativeQuery = true)
	public List<Book> getRecommended(String category,Long id);

}
