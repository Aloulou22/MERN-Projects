import { useMangasQuery } from "../Features/mangasApi"; 
import { Manga } from '../Interfaces/Manga';
import { FaCartPlus } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useAppDispatch } from "../App/Hooks";
import { addToCart } from "../Features/ShopSlice";




function Home() {
  const {data,isLoading,error} = useMangasQuery()
  const [search, setSearch] = useState("")
  const [sortData, setSortData] = useState("")

  const dispatch = useAppDispatch()

  const mangas = sortData === "low" ? data && data.slice().sort((a,b) => a.price - b.price) :
                 sortData === "high" ? data && data.slice().sort((a,b) => b.price - a.price) :
                 sortData === "a-z" ? data && data.slice().sort((a,b) => (a.title > b.title ? 1 : -1)) :
                 sortData === "z-a" ? data && data.slice().sort((a,b) => (b.title > a.title ? 1 : -1)) : 
                 sortData === "default" ? data :
                 data

                
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSortData(e.target.id)
  }


  console.log("Loading:", isLoading);
  console.log("Error:", error);
  console.log("Data:", data);

  return (
    <div className="container-lg py-4">

    <div className="input-group mb-3">
        <input type="search" placeholder="Monster..." onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} className="form-control" aria-label="Text input with dropdown button" />
        <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort By</button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="default" className="form-check-label">Default</label>
              <input type="radio" id="default" name="sort" value={sortData} onChange={handleChange} className="form-check-input" />
            </div>
          </li>
          <hr className="dropdown-divider" />
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="low" className="form-check-label">Price (Lowest)</label>
              <input type="radio" id="low" name="sort" value={sortData} onChange={handleChange} className="form-check-input" />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="high" className="form-check-label">Price (Highest)</label>
              <input type="radio" id="high" name="sort" value={sortData} onChange={handleChange} className="form-check-input" />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="a-z" className="form-check-label">A-Z</label>
              <input type="radio" id="a-z" name="sort" value={sortData} onChange={handleChange} className="form-check-input" />
            </div>
          </li>
          <li className="dropdown-item">
            <div className="form-check">
              <label htmlFor="z-a" className="form-check-label">Z-A</label>
              <input type="radio" id="z-a" name="sort" value={sortData} onChange={handleChange} className="form-check-input" />
            </div>
          </li>
        </ul>
      </div>
      <div className="row">
      {mangas && mangas.filter((items) => {
        return search.toLocaleLowerCase() === "" ? items :
        items.title.toLocaleLowerCase().includes(search)
      }).map((manga: Manga) => (
        <div key={manga.id} className="col-md-6 col-lg-4 text-center">
          <div className="py-4">
          <img src={manga.imgUrl} alt={manga.title} className="rounded" width={180} height={250} />
          <h3 className="fs-5 my-4">{manga.title}</h3>
          <h2 className="lead fw-bold fs-4 my-2">{manga.price}$</h2>
          <button className="btn btn-danger text-decoration-none ms-2 my-4" onClick={() => dispatch(addToCart(manga))} ><FaCartPlus className="me-2 fs-5"/>Add To Cart</button>
          </div>
        </div>
      ))}
      </div>
    </div>

  );
}

export default Home;


