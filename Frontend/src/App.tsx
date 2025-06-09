import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { BooksList } from './features/books/pages/list'
import { BookCreate } from './features/books/pages/create'
import { BookEdit } from './features/books/pages/edit'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BooksList />} />
        <Route path="/create" element={<BookCreate />} />
        <Route path="/edit/:id" element={<BookEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
