export const get_books = async (query: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    if (!response.ok) {
        console.error('Error fetching data from Google Books API:', response.statusText);
        return {};
    }
    return await response.json();
}