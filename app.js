//Book class: representw the booko

class Book{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
//Store class
class Store{
    static getBooks(){
        let books=[]
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static addBook(book){
        const books = this.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static deleteBook(isbn){
        const books = this.getBooks()
        books.forEach( (b, i)=>{
            if(b.isbn == isbn){
                books.splice(i, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
        // if(books.length >0){
        //     const idxDel = books.find(b=>b.isbn == isbn)
        //     if(idxDel){
        //         return books.splice(idxDel, 1)
        //     }
            
            // return books.filter( (b)=>b.isbn==isbn )

            // books.find(b=>{
            //     return b.isbn == isbn
            // }).remove()
        //}
    }
}
//UI Class
class UI{
    static displayBooks() {                                                                                                   
        const books = Store.getBooks()

        books.forEach(b=>{
            UI.addBookToList(b)
        })
        // showAlert('Books Loaded', 'success')
    }
    static addBookToList(book){
        const list = document.getElementById('books-list')
        const row = document.createElement('tr')
        row.innerHTML  =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class='btn btn-danger btn-sm delete'><i class="far fa-trash-alt delete"></i></a></td>
        `
        row.setAttribute('data-isbn', book.isbn)
        list.appendChild(row)
    }

    static deleteBookFromList(el){
        if(el.classList.contains('delete')){
            const isbn = el.closest('tr').getAttribute('data-isbn')
            el.closest('tr').remove()
            // el.parentElement.parentElement.remove()
        }
    }
    static showAlert(msg, className){
        const div = document.createElement('div')
        div.classList.add('alert', `alert-${className}`)
        div.appendChild(document.createTextNode(msg))
        const cont = document.querySelector('.container')
        const form = document.getElementById('book-form')
        cont.insertBefore(div, form)
        
        //disapear after 3 sec.
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);
    }
}

//Event: Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//Event: Add a book
document.getElementById('book-form').addEventListener('submit', e=>{
    e.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value
    if(title == '' || author == ''|| isbn == ''){
        UI.showAlert('Please check your input..', 'danger')
    } else {
        const book = new Book(title, author, isbn)
        console.log(book)
        UI.addBookToList(book)
        Store.addBook(book)  
        UI.showAlert('Book Added', 'success')      
    }

})

//Event: Remove Book
document.getElementById('books-list').addEventListener('click', e=>{
    console.log(e.target)
    if(e.target.classList.contains('delete')){
        UI.deleteBookFromList(e.target)
        Store.deleteBook(e.target.closest('tr').getAttribute('data-isbn'))
    }

})