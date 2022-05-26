using RestWithASPNETUdemy.Data.Converter.Implementations;
using RestWithASPNETUdemy.Data.VO;
using RestWithASPNETUdemy.Hypermedia.Utils;
using RestWithASPNETUdemy.Model;
using RestWithASPNETUdemy.Repository;
using System.Collections.Generic;

namespace RestWithASPNETUdemy.Bussines.Implementations
{
    public class BookBusinessImplementation : IBookBusiness
    {
        private readonly IRepository<Book> _repository;

        private readonly BookConverter _converter;

        public BookBusinessImplementation(IRepository<Book> repository)
        {
            _repository = repository;
            _converter = new BookConverter();
        }

        public List<BookVO> FindAll()
        {
            return _converter.Parse(_repository.FindAll());
        }

        public PagedSearchVO<BookVO> FindWithPagedSearch(string title, string sortDirection, int pageSize, int page)
        {
            var sort = (!string.IsNullOrWhiteSpace(sortDirection)) && !sortDirection.Equals("desc") ? "asc" : "desc";
            var size = (pageSize < 1) ? 10 : pageSize;
            var offset = page > 0 ? (page - 1) * size : 0;

            string query = @"SELECT * FROM books p WHERE 1 = 1";
            if (!string.IsNullOrWhiteSpace(title)) query += $" AND p.title LIKE '%{title}%' ";
            query += $" ORDER BY p.title {sort} limit {size} offset {offset} ";

            string countQuery = @"SELECT COUNT(*) FROM books p WHERE 1 = 1";
            if (!string.IsNullOrWhiteSpace(title)) countQuery += $" AND p.title LIKE '%{title}%' ";

            var persons = _repository.FindWithPagedSearch(query);
            int totalResults = _repository.GetCount(countQuery);

            return new PagedSearchVO<BookVO>
            {
                CurrentPage = page,
                List = _converter.Parse(persons),
                PageSize = size,
                SortDirections = sort,
                TotalResults = totalResults
            };
        }

        public BookVO FindByID(long id)
        {
            return _converter.Parse(_repository.FindByID(id));
        }


        public BookVO Create(BookVO book)
        {
            var bookEntity = _converter.Parse(book); //Converte o Objeto para que seja possivel inserir os dados com o Create
            bookEntity = _repository.Create(bookEntity); // após o executado, o mesmo gera o id autoincremental e retorna a entidade
            return _converter.Parse(bookEntity); // a entidade é novamente convertida para objeto, porem agora com id já gerado anteriormente 
        }

        public BookVO Update(BookVO book)
        {
            var bookEntity = _converter.Parse(book);
            bookEntity = _repository.Update(bookEntity);
            return _converter.Parse(bookEntity);
        }

        public void Delete(long id)
        {
            _repository.Delete(id);
        }
    }
}
