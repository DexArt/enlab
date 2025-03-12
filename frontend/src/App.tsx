import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MoviesPage} from "pages/MoviesPage/ui/MoviesPage.tsx";
import {MovieDetailsPage} from "pages/MovieDetailsPage/ui/MovieDetailsPage.tsx";
import {NotFoundPage} from "pages/NotFoundPage.tsx";




function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MoviesPage />} />
                <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
