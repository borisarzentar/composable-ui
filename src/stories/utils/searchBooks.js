import debounce from 'lodash.debounce';

const API_URL = 'https://api.itbook.store/1.0/search';

function searchBooks(searchTerm) {
  return fetch(`${API_URL}/${searchTerm}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => data.books.slice(0, 100));
}

export default debounce(searchBooks, 500, {
  leading: true,
  trailing: true,
});
